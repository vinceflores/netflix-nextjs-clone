"use client";

import { Button } from "@/components/ui/button";
import { InfoIcon, Play } from "lucide-react";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";
interface iAppProps {
  title: string;
  overview: string;
  youtubeUrl: string;
  //   state: boolean;
  //   changeState: any;
  id: number;
  age: number
  duration: number;
  release: number;
}
function MovieButtons(props: iAppProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="">
        <Play className="m-2 h-6 w-6" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-whtie  "
      >
        <InfoIcon className="m-2 h-6 w-6 " /> Learn More
      </Button>
      <PlayVideoModal
        age={props.age}
        duration={props.duration}
        release={props.release}
        overview={props.overview}
        title={props.title}
        youtubeUrl={props.youtubeUrl}
        Key={props.id}
        changeState={setOpen}
        state={open}
      />
    </>
  );
}

export default MovieButtons;
