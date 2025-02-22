import { PrismaClient } from "@prisma/client";
import { handleQueryPaginationOpts } from "~/shared/pagination";
import type { ProductApp } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event): Promise<ProductApp[]> => {
  const { skip, take } = handleQueryPaginationOpts(event);
  const productApps = await prisma.productApp.findMany({
    skip: skip,
    take: take,
  });

  return productApps;
});
