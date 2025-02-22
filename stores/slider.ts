import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { socket } from "@/composables/socket";
import type { Prisma } from "@prisma/client";
import type { SerializeObject } from "nitropack/types";

export const useSliderStore = defineStore("slider", () => {
  // State
  const reviews = ref<
    SerializeObject<
      Prisma.ReviewGetPayload<{ include: { productApp: true } }>
    >[]
  >([]);
  const pageSize = ref(10);
  const page = ref(1);
  const swiperIndex = ref(1);
  const swiperDirectionCommands = ref<{ direction: string }[]>([]);

  // Computed Property
  const totalReviews = computed(() => reviews.value.length);

  // Fetch Reviews
  async function fetchReviews() {
    try {
      const data = await $fetch("/api/review", {
        method: "GET",
        params: { pageSize: pageSize.value, page: page.value },
      });
      reviews.value = data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }

  // Set Page Size
  function setPageSize(size: number) {
    pageSize.value = size;
    fetchReviews();
  }

  // Navigation Functions
  function goToNextSlide() {
    if (swiperIndex.value < totalReviews.value - 1) {
      swiperIndex.value++;
      swiperDirectionCommands.value.push({ direction: "next" });
    }
  }

  function goToPrevSlide() {
    if (swiperIndex.value > 1) {
      swiperIndex.value--;
      swiperDirectionCommands.value.push({ direction: "prev" });
    }
  }
  function resetSlideCommands() {
    swiperIndex.value = 1;
    swiperDirectionCommands.value = [];
  }

  // Update Reviews List
  function updateReviews(updatedReviews: typeof reviews.value) {
    reviews.value = updatedReviews;
  }

  // WebSocket Event Binding
  function bindEvents() {
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("nav", (data) => {
      if (data === "forward") {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    });
    socket.on("reviews:flush", async () => {
      await fetchReviews();
      resetSlideCommands();
    });
  }

  return {
    reviews,
    pageSize,
    page,
    swiperIndex,
    swiperDirectionCommands,
    totalReviews,
    fetchReviews,
    setPageSize,
    goToNextSlide,
    goToPrevSlide,
    updateReviews,
    bindEvents,
    resetSlideCommands,
  };
});
