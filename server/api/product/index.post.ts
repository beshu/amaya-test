import { AppName, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body: { name: AppName } = await readBody(event);

  const productApp = await prisma.productApp.create({
    data: {
      name: body.name,
    },
  });

  return productApp;
});
