//'use client'

import Link from "next/link";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";
import {
  SpotifyArtist,
  SpotifyTrack,
  SpotifyTrackResponse,
} from "@/types/spotify";

interface TrackPageProps {
  searchParams: {
    show?: number | undefined;
  };
}

const fetchRecentTracks = async (show: number | undefined) => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });

  const session = await authRequest.validate();

  if (!session) return null;

  const items = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${
      show === undefined ? 10 : show
    }`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.user.accessToken,
      },
    },
  ).then((res) => res.json());

  if (items.ok === false) return null;

  return items;
};

const TrackPage = async ({ searchParams }: TrackPageProps) => {
  let show = searchParams.show;

  if (show === undefined) {
    show = 10;
  }

  const {
    items: recentTracks,
    cursors,
    limit,
    next,
    href,
  }: SpotifyTrackResponse = await fetchRecentTracks(show);

  const loadMoreTracks = () => {
    if (show! >= 50) return `/tracks?show=50`;

    show = parseInt(show) + 10;

    const url = `/tracks?show=${show}`;

    return url;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-center">
      <h2>Your Recently Played Tracks:</h2>
      {!recentTracks && <p>Loading..</p>}
      {recentTracks && (
        <>
          <ul>
            {recentTracks.map((song: SpotifyTrack, t: number) => (
              <li key={t}>{`${song.track.name} by ${song.track.artists
                .map((artist: SpotifyArtist) => artist.name)
                .join(" & ")}`}</li>
            ))}
          </ul>

          {show! < 50 ? (
            <Link href={loadMoreTracks()} scroll={false}>
              Load More
            </Link>
          ) : null}
        </>
      )}
    </main>
  );
};

export default TrackPage;
