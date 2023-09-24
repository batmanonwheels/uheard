import { NextRequest, NextResponse } from "next/server";
import { auth, spotifyAuth } from "@/lib/lucia";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SpotifyTrack, SpotifyTrackResponse } from "@/types/spotify";

const getSession = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({
    request,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const trackId: string = req.nextUrl.searchParams.get("track")!;

  const session = await getSession(req);
  if (!session)
    throw new Error("User is either not signed in or does not exist.");

  const track: SpotifyTrack = await fetch(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.user.accessToken,
      },
    },
  ).then((res) => res.json());

  if (!track) throw new Error("Track does not exist.");

  try {
    const recommendation = await prisma.recommendation.create({
      data: {
        userId: session.user.id,
        trackId: track.id,
        trackTitle: track.name,
        trackAlbum: track.album.name,
        trackArtist: track.artists.map((artist) => artist.name),
        trackImage: track.album.images[0].url,
        trackPreviewUrl: track.preview_url,
        trackUrl: track.href,
        trackISRC: track.external_ids.isrc,
      },
    });

    return NextResponse.json({ recommendation, ok: true });
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
};
