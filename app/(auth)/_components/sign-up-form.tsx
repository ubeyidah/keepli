"use client";

import {
  signUpWithEmail,
  signUpWithGithub,
  signUpWithGoogle,
} from "@/actions/auth.actions";
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
import { authSchema, type AuthSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleSubmit = async (data: AuthSchema) => {
    try {
      setError(null);
      await signUpWithEmail(data.email, data.password, data.name);
      form.reset();
      setError(null);
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
        <p className="text-center mb-7">Create your Keepli account</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
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
          {form.formState.isSubmitting ? <Spinner /> : " Sign Up "}
        </Button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign In
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
            onClick={async () => {
              setOauthLoading(true);
              await signUpWithGoogle();
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
            onClick={async () => {
              setOauthLoading(true);
              await signUpWithGithub();
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
        <p className="text-center text-xs mt-4">
          By signing up, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
