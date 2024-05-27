import prisma from "../utils/db";
import Image from "next/image";
import MovieCard from "./MovieCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
async function getData(userId: string) {
  const data = await prisma.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      imageString: true,
      videoSource: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-8 my-3 gap-6  ">
      {data.map((movie, index) => (
        <div key={movie.id} className="relative h-48 ">
          <Image
            width={500}
            height={500}
            src={movie.imageString}
            alt={movie.title}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-60 relative z-10 w-full transform  transition duration-500 delay-100 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black z-10 w-full h-full rounded-lg flex items-center justify-center">
              <Image
                width={800}
                height={800}
                src={movie.imageString}
                alt={movie.title}
                className="rounded-lg -z-10 absolute w-full h-full object-cover"
              />
              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                watchList={movie.WatchLists.length > 0 ? true : false}
                youtubeUrl={movie.youtubeString}
                wachtListId={movie.WatchLists[0]?.id}
                key={movie.id}
                age={movie.age}
                time={movie.duration}
                year={movie.release}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
