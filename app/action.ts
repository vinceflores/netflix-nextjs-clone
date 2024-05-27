// create two server actions
"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addToWatchList(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const pathname = formData.get("pathname");
  const movieId = formData.get("movieId");
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });
  revalidatePath(pathname as string);
}

export async function deleteFromWatchList(formData: FormData) {
  const pathname = formData.get("pathname") as string;
  const watchlistId = formData.get("watchlistId") as string;
  const data = await prisma.watchList.delete({
    where: {
      id: watchlistId,
    },
  });
  revalidatePath(pathname);
}
