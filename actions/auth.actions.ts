// src/app/signup/actions.ts
"use server";

import { ID, OAuthProvider } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  const { account } = await createAdminClient();

  await account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });
  const session = await account.createEmailPasswordSession({
    email,
    password,
  });
  (await cookies()).set("keepli-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/dashboard");
}

export async function signInWithEmail(email: string, password: string) {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession({
    email,
    password,
  });
  (await cookies()).set("keepli-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/dashboard");
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account.deleteSession({
    sessionId: "current",
  });

  redirect("/sign-in");
}

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Github,
    success: `${origin}/api/oauth`,
    failure: `${origin}/sign-in`,
  });

  return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token({
    provider: OAuthProvider.Google,
    success: `${origin}/api/oauth`,
    failure: `${origin}/sign-in`,
  });

  return redirect(redirectUrl);
}
