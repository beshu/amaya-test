import type { Prisma } from "@prisma/client";
import type { SerializeObject } from "nitropack/types";

export interface ISliderState {
  reviews: SerializeObject<
    Prisma.ReviewGetPayload<{ include: { productApp: true } }>
  >[];
  pageSize: number;
  page: number;
  swiperIndex: number;
  swiperDirectionCommands: { direction: string }[];
}

export const useSliderState = (): Ref<ISliderState> => {
  return useState<ISliderState>("sliderState", () => {
    return {
      reviews: [],
      pageSize: 10,
      page: 1,
      swiperIndex: 0,
      swiperDirectionCommands: [],
    };
  });
};
