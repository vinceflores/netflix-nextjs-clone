"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "../../public/Google logo.svg";
import { signIn } from "next-auth/react";
type GoogleSignInButtonProps = {};

const GoogleSignInButton = ({}: GoogleSignInButtonProps) => (
  <Button onClick={() => signIn("google")} variant={"outline"} size={"icon"}>
    <Image src={GoogleIcon} alt="Google icon" className="w-6 h-6" />
  </Button>
);
export default GoogleSignInButton;
