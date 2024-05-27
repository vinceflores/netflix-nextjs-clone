import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import MovieVideo from "../components/MovieVideo";
import RecentlyAdded from "../components/RecentlyAdded";
export default async function HomePage() {
  return (
    <div className="p-5 lg:p-0">
      <MovieVideo />
      <h1 className="text-3xl font-bold">Recently Added</h1>
      <RecentlyAdded />
    </div>
  );
}
