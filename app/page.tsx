import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
const page = () => {
  return (
    <div>
      <h1>Keepli</h1>
      <Link className={buttonVariants()} href={"/sign-in"}>
        Get Started
      </Link>
    </div>
  );
};

export default page;
