// 'use client';
import SpotifyLoginButton from "@/components/SpotifyLoginButton";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPageProps {}

const LoginPage = async ({}: LoginPageProps) => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });

  const session = await authRequest.validate();

  if (session) redirect("/");

  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center p-4 text-center">
      <SpotifyLoginButton />
    </main>
  );
};

export default LoginPage;
