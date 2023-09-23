//'use client'

import Link from "next/link";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SavedTracks from "@/components/SavedTracks";
import RecentTracks from "@/components/RecentTracks";
import CurrentTrack from "@/components/CurrentTrack";
import SearchTracks from "@/components/SearchTracks";
import type { Metadata } from "next";

interface TrackPageProps {
  searchParams: {
    type: string;
    limit: string;
    query: string;
  };
}
const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

export const generateMetadata = async ({
  searchParams,
}: TrackPageProps): Promise<Metadata> => {
  const session = await getSession();
  const type = searchParams.type;

  if (!session) return { title: "Your Spotify Tracks - uheard" };

  if (type === "search")
    return {
      title: `Search - uheard`,
    };

  if (type === "saved")
    return {
      title: `${session.user.name.split(" ")[0]}'s Saved Tracks - uheard`,
    };

  return {
    title: `${session.user.name.split(" ")[0]}'s Recent Tracks - uheard`,
  };
};

const refreshAccessToken = async () => {
  const session = await getSession();

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  const clientBTOA = btoa(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET,
  );

  const { access_token: newAccessToken } = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ` + clientBTOA,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: user?.refreshToken,
      }),
    },
  ).then((res) => res.json());

  if (!newAccessToken) return false;

  const accessToken = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      accessToken: newAccessToken,
    },
  });

  if (!accessToken) return false;
};

const TrackPage = async ({ searchParams }: TrackPageProps) => {
  const limit = parseInt(searchParams.limit);
  const type = searchParams.type;

  if (!type && !limit) redirect("/tracks?type=recent&limit=10");

  const loadMoreTracks = (limit: number) => {
    if (limit! >= 50) return `/tracks?type=${type}&limit=50`;
    return `/tracks?type=${type}&limit=${limit + 10}`;
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center p-4 text-center">
      <CurrentTrack
        getSession={getSession}
        refreshAccessToken={refreshAccessToken}
      />

      <div className="flex w-full flex-row justify-evenly pb-4">
        <Link
          href={`/tracks?type=search&limit=50&query=`}
          scroll={false}
          className={`${type === "search" && "text-green-500"}`}
          replace
        >
          Search
        </Link>
        <Link
          href={`/tracks?type=recent&limit=${limit}`}
          scroll={false}
          className={`${type === "recent" && "text-green-500"}`}
          replace
        >
          Recently Played
        </Link>
        <Link
          href={`/tracks?type=liked&limit=${limit}`}
          className={`${type === "liked" && "text-green-500"}`}
          scroll={false}
          replace
        >
          Liked
        </Link>
      </div>

      {type === "search" && <SearchTracks searchParams={searchParams} />}
      {type === "recent" && (
        <RecentTracks
          getSession={getSession}
          loadMoreTracks={loadMoreTracks}
          refreshAccessToken={refreshAccessToken}
          searchParams={searchParams}
        />
      )}
      {type === "liked" && (
        <SavedTracks
          getSession={getSession}
          loadMoreTracks={loadMoreTracks}
          refreshAccessToken={refreshAccessToken}
          searchParams={searchParams}
        />
      )}
    </main>
  );
};

export default TrackPage;
