import { ReactNode } from "react";
import BackgroundImage from "../../public/Login Background.jpg";
import Image from "next/image";
import NetflixLogo from "../../public/Netflix logo.svg";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col bg-black w-screen h-screen md:items-center md:justify-center md:bg-transparent">
      <Image
        src={BackgroundImage}
        alt="background image"
        className="hidden sm:flex sm:object-cover -z-10  brightness-50"
        priority
        fill
      />
      <Image
        src={NetflixLogo}
        alt="netflix logo"
        width={120}
        height={120}
        priority
        className="absolute top-4 left-4  object-contain md:left-10 md:top-6"
      />
      {children}
    </div>
  );
}
