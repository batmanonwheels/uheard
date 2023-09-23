import { Session } from "lucia";
import {
  SpotifyArtist,
  SpotifyTracks,
  SpotifyTracksResponse,
} from "@/types/spotify";
import Link from "next/link";
import RecommendLink from "./RecommendLink";
import Image from "next/image";

interface LikedTracksProps {
  getSession: () => Promise<Session | null>;
  refreshAccessToken: () => Promise<false | null | undefined>;
  loadMoreTracks: (limit: number) => string;
  searchParams: {
    type: string;
    limit: string;
  };
}

const LikedTracks = async ({
  getSession,
  refreshAccessToken,
  loadMoreTracks,
  searchParams,
}: LikedTracksProps) => {
  const session = await getSession();

  const limit = parseInt(searchParams.limit);
  const type = searchParams.type;

  const fetchLikedTracks = async (limit: number) => {
    if (!session) return null;

    const likedTracks = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=${limit + ""}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.user.accessToken,
        },
      },
    ).then((res) => res.json());

    if (likedTracks.error) {
      const newToken = await refreshAccessToken();
      if (newToken) fetchLikedTracks(limit);
    }

    return likedTracks;
  };

  const { items: likedTracks }: SpotifyTracksResponse =
    await fetchLikedTracks(limit);

  return (
    <>
      {likedTracks ? (
        <>
          <ul className="w-full">
            {likedTracks.map((song: SpotifyTracks, t: number) => (
              <li key={t} className="flex flex-row gap-2 py-2 text-left">
                <Image
                  height={song.track.album.images[0].height}
                  width={song.track.album.images[0].width}
                  src={song.track.album.images[0].url}
                  alt={`${song.track.name} cover art`}
                  className="rounded-xs my-auto h-full w-3/12 items-center"
                />
                <Link
                  href={song.track.uri}
                  className="my-auto flex flex-1 flex-col"
                >
                  <h3 className="text-zinc-200">{song.track.name}</h3>
                  <p className="text-sm  text-zinc-400">
                    {song.track.artists
                      .map((artist: SpotifyArtist) => artist.name)
                      .join(", ")}
                  </p>
                  {song.track.album.total_tracks > 1 && (
                    <p className="text-xs text-zinc-500">
                      {song.track.album.name}
                    </p>
                  )}
                </Link>
                <RecommendLink trackId={song.track.id} />
              </li>
            ))}
          </ul>

          {limit! < 50 || limit === undefined ? (
            <Link
              href={loadMoreTracks(limit ? limit! : 10)}
              scroll={false}
              replace
              className="text-green-500"
            >
              Load More
            </Link>
          ) : null}
        </>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default LikedTracks;
