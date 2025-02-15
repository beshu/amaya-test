import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const review = await prisma.review.findUnique({
    where: { id: Number(id) },
  });

  if (!review) {
    throw createError({
      statusCode: 404,
      message: `Review with ID ${id} not found`,
    });
  }

  return review;
});
