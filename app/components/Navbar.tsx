"use client";
import Link from "next/link";
import Logo from "../../public/Netflix logo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UseNav from "./UserNav";

interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: "Home", href: "/home" },
  { name: "TV Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/list" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-7xl mx-auto items-center  justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href={"/home"} className="w-32">
          <Image src={Logo} alt="netflix logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden ">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  href={link.href}
                  className="text-white underline text-sm underline-offset-4"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className=" text-gray-300 font-normal text-sm hover:text-red-500"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300  cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-300  cursor-pointer" />
        <UseNav />
      </div>
    </div>
  );
}
