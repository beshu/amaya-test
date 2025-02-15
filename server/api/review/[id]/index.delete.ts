import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const deletedReview = await prisma.review.delete({
    where: { id: Number(id) },
  });

  return deletedReview;
});
