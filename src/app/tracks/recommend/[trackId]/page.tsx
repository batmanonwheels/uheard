import { auth } from "@/lib/lucia";
import { SpotifyArtist, SpotifyTrack } from "@/types/spotify";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import RecommendButtonBar from "@/components/RecommendButtonBar";

interface RecommendPageProps {
  params: { trackId: string };
}

const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

const fetchTrack = async (trackId: string): Promise<SpotifyTrack | null> => {
  const session = await getSession();

  if (!session || !trackId) return null;

  const track: SpotifyTrack = await fetch(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.user.accessToken,
      },
    },
  ).then((res) => res.json());

  return track;
};

export const generateMetadata = async ({
  params,
}: RecommendPageProps): Promise<Metadata> => {
  const { trackId } = params;
  const track: SpotifyTrack | null = await fetchTrack(trackId);

  if (!track) return { title: "Create Recommendation - uheard" };

  return {
    title: `Share - ${track.name} by ${track.artists[0].name} - uheard`,
  };
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
  const { trackId } = params;
  const track: SpotifyTrack | null = await fetchTrack(trackId);

  let recommended: boolean = true;

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleRecommendation = async (trackId: string) => {
    const { ok } = await fetch(
      "api/tracks/recommend?" +
        new URLSearchParams({
          track: trackId,
        }),
      {
        method: "POST",
      },
    );

    if (!ok) return;

    recommended = true;

    return;
  };

  return (
    <main className="flex w-full flex-1 justify-center p-4 text-center">
      {track && (
        <>
          <div className="flex flex-col p-2">
            <Image
              height={track.album.images[0].height}
              width={track.album.images[0].width}
              src={track.album.images[0].url}
              alt={`${track.name} cover art`}
              className="rounded-xs w-full pb-2"
            />
            <Link href={track.uri}>
              <h3 className="text-2xl text-zinc-200">{track.name}</h3>
              <p className="text-lg text-zinc-400">
                {track.artists
                  .map((artist: SpotifyArtist) => artist.name)
                  .join(", ")}
              </p>
              {track.album.total_tracks > 1 && (
                <p className="text-lg text-zinc-500">{track.album.name}</p>
              )}
              <p className="text-sm text-zinc-500">
                {`Released on ${
                  months[parseInt(track.album.release_date.split("-")[1]) - 1]
                } ${parseInt(track.album.release_date.split("-")[2])}, ${
                  track.album.release_date.split("-")[0]
                }`}
              </p>
            </Link>
            <RecommendButtonBar trackId={trackId} />
          </div>
        </>
      )}
    </main>
  );
};

export default RecommendPage;
