"use client";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, HeartOff } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";
import { addToWatchList, deleteFromWatchList } from "../action";
import { usePathname } from "next/navigation";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  wachtListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export default function MovieCard({
  movieId,
  overview,
  title,
  watchList,
  wachtListId,
  youtubeUrl,
  year,
  age,
  time,
}: iAppProps) {
  const [state, setState] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <Button
        onClick={() => setState(!state)}
        variant={"ghost"}
        className="-mt-14"
      >
        <PlayCircle className="h-20 w-20" />
      </Button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={deleteFromWatchList}>
            <input type="hidden" name="pathname" value={pathname} />
            <input type="hidden" name="watchlistId" value={wachtListId} />
            <Button
              size={"icon"}
              variant={"outline"}
            >
              <Heart className="w-4 h-4  text-red-500 " />
            </Button>
          </form>
        ) : (
          <form action={addToWatchList}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button size={"icon"} variant={"outline"}>
              {/* <Heart className="w-4 h-4" /> */}
              <HeartOff className="w-4 h-4"/>
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0 ">
        <h1 className="text-lg font-bold line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{`${year}`}</p>
          <p className="font-normal boder py-0.5 px-1 border-gray-200 rounded text-sm ">
            {`${age}`}+
          </p>
          <p className="font-normal text-sm">{`${time}`}h</p>
        </div>
        <p className="line-clamp-2 text-gray-200 font-light text-xs mt-1">
          {overview}
        </p>
      </div>
      <PlayVideoModal
        state={state}
        changeState={setState}
        overview={overview}
        Key={movieId}
        title={title}
        youtubeUrl={youtubeUrl}
        release={year}
        age={age}
        duration={time}
      />
    </>
  );
}
