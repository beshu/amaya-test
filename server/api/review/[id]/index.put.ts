import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);

  const updatedReview = await prisma.review.update({
    where: { id: Number(id) },
    data: {
      score: body.score,
      text: body.text,
      signature: body.signature || "Anonymous",
    },
  });

  return updatedReview;
});
