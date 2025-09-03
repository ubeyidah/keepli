import React from "react";
import SignUpForm from "../_components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Keepli",
  description:
    "Create your Keepli account and start saving, keeping, and organizing everything important in one secure place.",
  keywords: [
    "Keepli sign up",
    "create Keepli account",
    "organize notes online",
    "save files and documents",
    "personal organization app",
    "productivity tool",
    "cloud organizer",
  ],
};
const SignUp = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] h-screen lg:grid-cols-[1fr_2fr]">
      <div className="flex justify-center items-center px-4">
        <div className="flex-1 max-w-xs">
          <SignUpForm />
        </div>
      </div>
      <div className="bg-gray-200/40 max-md:hidden"></div>
    </main>
  );
};

export default SignUp;
