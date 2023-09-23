//'use client'

import { Session } from "lucia";
import {
  SpotifyArtist,
  SpotifyTracks,
  SpotifyTracksResponse,
} from "@/types/spotify";
import Link from "next/link";
import { redirect } from "next/navigation";
import RecommendLink from "./RecommendLink";
import Image from "next/image";

interface RecentTracksProps {
  getSession: () => Promise<Session | null>;
  refreshAccessToken: () => Promise<false | null | undefined>;
  loadMoreTracks: (limit: number) => string;
  searchParams: {
    type: string;
    limit: string;
  };
}

const RecentTracks = async ({
  getSession,
  refreshAccessToken,
  loadMoreTracks,
  searchParams,
}: RecentTracksProps) => {
  const session = await getSession();

  const limit = parseInt(searchParams.limit);
  const type = searchParams.type;

  const fetchRecentTracks = async (limit: number) => {
    if (!session) return null;

    const recentTracks = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${
        limit + ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.user.accessToken,
        },
      },
    ).then((res) => res.json());

    if (recentTracks.error) {
      refreshAccessToken();
      return redirect(`/tracks?type=${type}&limit=${limit}`);
    }

    return recentTracks;
  };

  const { items: recentTracks }: SpotifyTracksResponse =
    await fetchRecentTracks(limit);

  return (
    <>
      {recentTracks ? (
        <>
          <ul className="w-full">
            {recentTracks.map((song: SpotifyTracks, t: number) => (
              <li
                key={t}
                className="flex max-w-full flex-row gap-2 py-2 text-left"
              >
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
                  <h3 className="text-zinc-200 ">
                    {song.track.name.split(" - ")[0]}
                  </h3>
                  <p className="text-sm  text-zinc-400">
                    {song.track.artists
                      .map((artist: SpotifyArtist) => artist.name)
                      .join(", ")}
                  </p>
                  {song.track.album.total_tracks > 1 && (
                    <p className=" overflow-ellipsis text-xs text-zinc-500">
                      {song.track.album.name}
                    </p>
                  )}
                </Link>
                <RecommendLink trackId={song.track.id} />
              </li>
            ))}
          </ul>

          {limit < 50 || limit === undefined ? (
            <Link
              href={loadMoreTracks(limit ? limit : 10)}
              scroll={false}
              className="text-green-500"
              replace
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

export default RecentTracks;
