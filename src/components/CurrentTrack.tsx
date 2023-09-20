//'use client'

import { Session } from "lucia";
import {
  SpotifyArtist,
  SpotifyTrackResponse,
  SpotifyTracks,
  SpotifyTracksResponse,
} from "@/types/spotify";
import Link from "next/link";
import { redirect } from "next/navigation";
import RecommendButton from "./RecommendButton";

interface CurrentTrackProps {
  getSession: () => Promise<Session | null>;
  refreshAccessToken: () => Promise<false | null | undefined>;
}

const CurrentTrack = async ({
  getSession,
  refreshAccessToken,
}: CurrentTrackProps) => {
  const fetchCurrentTrack = async () => {
    const session = await getSession();

    if (!session) return null;

    const currentTrack = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.user.accessToken,
        },
      },
    )
      .then((res) => (res === null ? null : res.json()))
      .catch((res) => res);

    if (currentTrack === null) return null;

    return currentTrack;
  };

  //current track
  const { item: currentTrack }: SpotifyTrackResponse =
    await fetchCurrentTrack();

  return (
    <>
      {currentTrack && (
        <div className="flex flex-col p-2">
          <h2 className="pb-2">{"Currently Playing"}</h2>
          <Link href={currentTrack.uri}>
            <h3 className="text-zinc-200">{currentTrack.name}</h3>
            <p className="text-zinc-500">
              {currentTrack.artists
                .map((artist: SpotifyArtist) => artist.name)
                .join(", ")}
            </p>
          </Link>
          <RecommendButton trackId={currentTrack.id} />
        </div>
      )}
    </>
  );
};

export default CurrentTrack;
