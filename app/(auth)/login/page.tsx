import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import GithubSignInButton from "../../components/GithubSigninButton";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";
type LoginProps = {};

const Login = async ({}: LoginProps) => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/home");
  }
  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14 ">
      <form method="post" action={"/api/auth/signin"}>
        <h1 className="text-3xl font-semibold text-white ">Log In</h1>
        <div className="space-y-4 mt-5 ">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button
            variant={"destructive"}
            className="w-full bg-[#650914] "
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-sm mt-2">
        New to Netflix ?
        <Link href="/sign-up" className="text-white hover:underline">
          Sign up now
        </Link>
      </div>
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default Login;
