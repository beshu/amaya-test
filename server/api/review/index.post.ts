import { PrismaClient } from "@prisma/client";
import { type Review, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<Review> => {
  const body: Omit<
    Prisma.ReviewCreateInput,
    "productApp" | "createdAt" | "updatedAt"
  > & {
    productAppId: number;
  } = await readBody(event);

  try {
    return await prisma.review.create({
      data: {
        score: body.score,
        text: body?.text,
        signature: body?.signature || "Anonymous",
        productApp: { connect: { id: body.productAppId } },
      },
    });
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 422,
      message: `Review has not created because of error: ${err.message}`,
    });
  }
});
