import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);

  const updatedProductApp = await prisma.productApp.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
    },
  });

  return updatedProductApp;
});
