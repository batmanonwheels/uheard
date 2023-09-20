//'use client'

import { Session } from "lucia";
import {
  SpotifyArtist,
  SpotifyTrack,
  SpotifyTracks,
  SpotifyTracksResponse,
} from "@/types/spotify";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RecommendButton from "./RecommendButton";

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

  const handleRecommendation = async (track: SpotifyTrack) => {
    if (!session) return null;
    try {
      const recommendation = await prisma.recommendation.create({
        data: {
          userId: session.user.id,
          trackId: track.id,
          trackTitle: track.name,
          trackArtist: track.artists.map((artist) => artist.name),
          trackPreviewUrl: track.preview_url,
          trackUrl: track.href,
          trackISRC: track.external_ids.isrc,
        },
        include: {
          user: true,
        },
      });
      console.log(recommendation);
    } catch (error: any) {
      return new Error(error.message);
    }
  };

  return (
    <>
      {recentTracks ? (
        <>
          <ul>
            {recentTracks.map((song: SpotifyTracks, t: number) => (
              <li
                key={t}
                className="flex flex-row justify-between p-2 text-left"
              >
                <Link href={song.track.uri}>
                  <h3 className="text-zinc-200">{song.track.name}</h3>
                  <p className="text-zinc-500">
                    {song.track.artists
                      .map((artist: SpotifyArtist) => artist.name)
                      .join(", ")}
                  </p>
                </Link>
                <RecommendButton trackId={song.track.id} />
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
