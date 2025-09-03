"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { GithubLogin, GoogleLogin, login } from "@/lib/auth";
import { LoginSchema, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    try {
      setError(null);
      await login(data.email, data.password);
      form.reset();
      setError(null);
      router.push("/dashboard");
    } catch (error: Error | any) {
      setError(error.message);
      // console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex justify-center items-center gap-2 mb-4">
          <Image src="/icon-logo.png" alt="logo" width={40} height={40} />
          <h2 className="text-3xl font-bold">Keepli</h2>
        </div>
        <p className="text-center mb-7">
          Welcome back! Sign in to your Keepli account and pick up where you
          left off.
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-5">
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href={"#"}
                  className="text-primary hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="destructive" className="mb-3 text-center">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full rounded-xl"
          disabled={form.formState.isSubmitting || oauthLoading}
        >
          {form.formState.isSubmitting ? <Spinner /> : "Sign In"}
        </Button>
        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <span className="text-gray-400">or</span>
          <div className="w-full h-[1px] bg-gray-400"></div>
        </div>
        <div className="flex gap-4 mb-10">
          <Button
            variant="outline"
            className="flex-1 rounded-xl mt-4"
            onClick={() => {
              setOauthLoading(true);
              GoogleLogin();
            }}
            type="button"
            disabled={form.formState.isSubmitting || oauthLoading}
          >
            <Image
              src="/icons/google.svg"
              alt="google"
              width={18}
              height={18}
            />{" "}
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-xl mt-4"
            onClick={() => {
              setOauthLoading(true);
              GithubLogin();
            }}
            type="button"
            disabled={form.formState.isSubmitting || oauthLoading}
          >
            <Image
              src="/icons/github.svg"
              alt="github"
              width={18}
              height={18}
            />
            Github
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
