import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";
async function get(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          age: true,
          title: true,
          imageString: true,
          overview: true,
          release: true,
          duration: true,
          videoSource: true,
          id: true,
          WatchLists: true,
          youtubeString: true,
        },
      },
    },
  });
  return data;
}
export default async function WatchList() {
  const session = await getServerSession(authOptions);
  const data = await get(session?.user?.email as string);
  return (
    <>
      <h1 className="text-white font-bold text-4xl underline mt-10 px-3 sm:px-0 ">
        {" "}
        Your watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  px-5 sm:px-0 mt-10 gap-6">
        {data?.map((movie) => (
          <div key={movie.Movie?.id as number} className="relative h-60">
            <Image
              src={movie.Movie?.imageString as string}
              alt={movie.Movie?.title as string}
              width={500}
              height={400}
              className="absolute h-full w-full rounded-sm  object-cover"
              priority
            />
            <div className="h-60 relative z-10 w-full transform  transition duration-500 delay-100 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  width={800}
                  height={800}
                  src={movie.Movie?.imageString as string}
                  alt={movie?.Movie?.title as string}
                  className="rounded-lg -z-10 absolute w-full h-full object-cover"
                />
                <MovieCard
                  movieId={movie.Movie?.id as number}
                  overview={movie.Movie?.overview as string}
                  title={movie.Movie?.title as string}
                  watchList={
                    (movie.Movie?.WatchLists.length as number) > 0
                      ? true
                      : false
                  }
                  youtubeUrl={movie.Movie?.youtubeString as string}
                  wachtListId={movie.Movie?.WatchLists[0]?.id as string}
                  key={movie.Movie?.id as number}
                  age={movie.Movie?.age as number }
                  time={movie.Movie?.duration as number}
                  year={movie.Movie?.release as number}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
