import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const productApp = await prisma.productApp.findUnique({
    where: { id: Number(id) },
  });

  if (!productApp) {
    throw createError({
      statusCode: 404,
      message: `ProductApp with ID ${id} not found`,
    });
  }

  return productApp;
});
