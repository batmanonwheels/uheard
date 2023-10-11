import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as client } from "./prisma";
import { spotify } from "@lucia-auth/oauth/providers";
import { nextjs } from "lucia/middleware";

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs(),
  adapter: prisma(client),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      ...data,
    };
  },
});

export const spotifyAuth = spotify(auth, {
  clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  redirectUri: process.env.SPOTIFY_REDIRECT_URI ?? "",
  scope: [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-library-modify",
    "user-library-read",
  ],
});

export type Auth = typeof auth;
