import { auth } from "@/lib/lucia";
import { Session } from "lucia";
import { cookies } from "next/headers";

export const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session: Session | null = await authRequest.validate();

  return session;
};
