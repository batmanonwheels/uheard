import { auth, spotifyAuth } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const storedState = cookieStore.get("spotify_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, spotifyUser, createUser, spotifyTokens } =
      await spotifyAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: spotifyUser.id,
        },
      });

      if (existingUser) {
        // update accessToken on sign in
        const updatedUser = await prisma.user.update({
          where: {
            id: spotifyUser.id,
          },
          data: {
            accessToken: spotifyTokens.accessToken,
            tokenExpiresIn: spotifyTokens.accessTokenExpiresIn,
            refreshToken: spotifyTokens.refreshToken,
          },
        });
        return updatedUser;
      }

      const user = await prisma.user.create({
        data: {
          id: spotifyUser.id,
          name: spotifyUser.display_name!,
          email: spotifyUser.email!,
          picture: spotifyUser.images[spotifyUser.images.length - 1].url,
          spotifyProfileLink: spotifyUser.href,
          spotifyUri: spotifyUser.uri,
          accessToken: spotifyTokens.accessToken,
          tokenExpiresIn: spotifyTokens.accessTokenExpiresIn,
          refreshToken: spotifyTokens.refreshToken,
        },
      });
      return user;
    };

    const user = await getUser();

    const session = await auth.createSession({
      userId: user.id,
      attributes: {},
    });

    const authRequest = auth.handleRequest({ request, cookies });

    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
