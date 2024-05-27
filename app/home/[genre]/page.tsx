import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { deflate } from "zlib";
import Image from "next/image";
import MovieCard from "../../components/MovieCard";
async function getData(category: string, userId: string) {
  switch (category) {
    case "shows": {
      const data = await prisma.movie.findMany({
        where: {
          category: "show",
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });

      return data;
    }
    case "movies": {
      const data = await prisma.movie.findMany({
        where: {
          category: "movie",
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "recently":
      {
        return await prisma.movie.findMany({
          where: {
            category: "recent",
          },
          select: {
            age: true,
            duration: true,
            id: true,
            overview: true,
            title: true,
            release: true,
            imageString: true,
            youtubeString: true,
            WatchLists: {
              where: {
                userId: userId,
              },
            },
          },
        });
      }
      deflate: {
        throw new Error();
      }
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { genre: string };
}) {
  const session = await getServerSession(authOptions);
  const data = await getData(params.genre, session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  px-5 sm:px-0 mt-10 gap-6">
      {data?.map((movie) => (
        <div key={movie.id} className="relative h-60">
          <Image
            src={movie.imageString}
            alt={movie.title}
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
