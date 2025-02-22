import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const deletedReview = await prisma.review.delete({
      where: { id: Number(id) },
    });

    return deletedReview;
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 500,
      message: `Database error while deleting review: ${err.message}`,
    });
  }
});
