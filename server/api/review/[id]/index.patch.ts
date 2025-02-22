import { PrismaClient } from "@prisma/client";
import { type Prisma, type Review } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<Review> => {
  const { id } = event.context.params;
  const body: Prisma.ReviewUncheckedUpdateInput = await readBody(event);

  try {
    return await prisma.review.update({
      where: { id: Number(id) },
      data: {
        id: body?.id,
        score: body?.score,
        text: body?.text,
        signature: body?.signature,
        createdAt: body?.createdAt,
        updatedAt: body?.updatedAt,
        productAppId: body?.productAppId,
      },
    });
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 422,
      message: `Review was not updated because of error: ${err.message}`,
    });
  }
});
