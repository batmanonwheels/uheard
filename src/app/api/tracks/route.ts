import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";

import { SpotifyTrack } from "@/types/spotify";

const getSession = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({
    request,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const trackId: string = req.nextUrl.searchParams.get("trackId")!;
  try {
    const session = await getSession(req);
    if (!session) throw new Error("User is not signed in.");

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

    return NextResponse.json(track);
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
};
