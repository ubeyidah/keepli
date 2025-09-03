import React from "react";
import SignInForm from "../_components/sign-in-form";
import { Metadata } from "next";
import { publicRoute } from "@/actions/auth.actions";
export const metadata: Metadata = {
  title: "Sign In | Keepli",
  description:
    "Access your Keepli account to continue saving, organizing, and managing all your important notes and files in one secure place.",
  keywords: [
    "Keepli sign in",
    "login Keepli account",
    "access notes online",
    "manage files and documents",
    "personal organization app",
    "productivity tool",
    "cloud organizer",
  ],
};

const SignIn = async () => {
  await publicRoute();
  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] h-screen lg:grid-cols-[1fr_2fr]">
      <div className="flex justify-center items-center px-4">
        <div className="flex-1 max-w-xs">
          <SignInForm />
        </div>
      </div>
      <div className="bg-gray-200/40 max-md:hidden"></div>
    </main>
  );
};

export default SignIn;
