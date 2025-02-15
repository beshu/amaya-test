import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const review = await prisma.review.create({
    data: {
      productAppId: body.productAppId,
      score: body.score,
      text: body.text,
      signature: body.signature || "Anonymous",
    },
  });

  return review;
});
