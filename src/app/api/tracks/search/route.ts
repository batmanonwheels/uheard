import { NextRequest, NextResponse } from "next/server";
import { auth, spotifyAuth } from "@/lib/lucia";
import { cookies } from "next/headers";

const getSession = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({
    request,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const query: string = req.nextUrl.searchParams.get("query")!;
  const params = req.nextUrl.searchParams;

  const session = await getSession(req);
  if (!session) throw new Error("User is not signed in ");

  try {
    const { tracks, error } = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.user.accessToken,
        },
      },
    ).then((res) => res.json());

    if (!tracks) return NextResponse.json([]);

    return NextResponse.json(tracks);
  } catch (error: any) {
    return new NextResponse(error.message, { status: error.status });
  }
};
