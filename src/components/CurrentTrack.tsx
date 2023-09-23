//'use client'

import { Session } from "lucia";
import { SpotifyArtist, SpotifyTrackResponse } from "@/types/spotify";
import Link from "next/link";
import RecommendLink from "./RecommendLink";
import Image from "next/image";

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
        <div className="flex max-w-full flex-row gap-2 pb-3 text-left">
          <Image
            height={currentTrack.album.images[0].height}
            width={currentTrack.album.images[0].width}
            src={currentTrack.album.images[0].url}
            alt={`${currentTrack.name} cover art`}
            className="rounded-xs my-auto w-3/12 items-center"
          />
          <Link
            href={currentTrack.uri}
            className="my-auto flex flex-1 flex-col"
          >
            <h2 className="text-xs text-green-400 text-opacity-75">
              {"Currently Playing"}
            </h2>
            <h3 className="text-zinc-200 ">
              {currentTrack.name.split(" - ")[0]}
            </h3>
            <p className="text-sm  text-zinc-400">
              {currentTrack.artists
                .map((artist: SpotifyArtist) => artist.name)
                .join(", ")}
            </p>
            {currentTrack.album.total_tracks > 1 && (
              <p className=" overflow-ellipsis text-xs text-zinc-500">
                {currentTrack.album.name}
              </p>
            )}
          </Link>
          <RecommendLink trackId={currentTrack.id} />
        </div>
      )}
    </>
  );
};

export default CurrentTrack;
