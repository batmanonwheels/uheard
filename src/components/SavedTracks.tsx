import { Session } from "lucia";
import { SpotifyTracks, SpotifyTracksResponse } from "@/types/spotify";
import Link from "next/link";
import TrackListCard from "./TrackListCard";

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
          <ul className="sm:w-12/12 w-full gap-1 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
            {likedTracks.map((track: SpotifyTracks, t: number) => (
              <TrackListCard track={track.track} key={t} />
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
