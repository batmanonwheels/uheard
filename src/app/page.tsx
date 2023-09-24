/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Form from "@/components/Form";
import Image from "next/image";
import type { Metadata } from "next";

interface HomeProps {}

const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();

  return session;
};

export const generateMetadata = async ({}: HomeProps): Promise<Metadata> => {
  const session = await getSession();

  if (!session) return { title: "Home - uheard" };

  return {
    title: `${session.user.name}'s Home - uheard`,
  };
};

const Home = async () => {
  const session = await getSession();

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-around p-4 text-center">
      {!session && <Link href="/login">Connect with Spotify</Link>}
      {session && (
        <div className="flex flex-col items-center">
          <h1>Welcome, {session.user.name.split(" ")[0]}!</h1>
          <img
            src={session.user.picture}
            alt={`${session.user.name}'s profile picture`}
            className=""
          />
          <Link href={session.user.spotifyUri}>
            <p>View your Spotify profile</p>
          </Link>
          <Link href={"/tracks"}>
            <p>Create a track recommendation!</p>
          </Link>
          <Form action="/api/logout">
            <input type="submit" value="Sign out" />
          </Form>
        </div>
      )}
    </main>
  );
};

export default Home;
