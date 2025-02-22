import { PrismaClient } from "@prisma/client";
import { handleQueryPaginationOpts } from "~/shared/pagination";
import { type Review, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(
  async (
    event,
  ): Promise<Prisma.ReviewGetPayload<{ include: { productApp: true } }>[]> => {
    const { skip, take } = handleQueryPaginationOpts(event);
    const reviews = await prisma.review.findMany({
      include: {
        productApp: true,
      },
      skip: skip,
      take: take,
    });

    return reviews;
  },
);
