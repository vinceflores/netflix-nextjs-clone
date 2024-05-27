import { Gothic_A1 } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getServerActionDispatcher } from "next/dist/client/components/app-router";
import { authOptions } from "./utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  } else {
    return redirect("/home");
  }

  // return (
  //   <div className="">
  //     <Button>Button</Button>
  //     <h1>{session?.user?.name}</h1>
  //     <img width={40} height={40} src={session?.user.image} alt="profile pic" />
  //   </div>
  // );
}
