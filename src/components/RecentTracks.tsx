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
import TrackListCard from "./TrackListCard";

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
      {recentTracks && (
        <>
          <ul className="sm:w-12/12 w-full gap-1 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
            {recentTracks.map((track: SpotifyTracks, t: number) => (
              <TrackListCard track={track.track} key={t} />
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
      )}
    </>
  );
};

export default RecentTracks;
