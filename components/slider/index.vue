<template>
  <swiper
    :modules="swiperModules"
    :breakpoints="swiperBreakpointOpts"
    :slides-per-view="1"
    :space-between="16"
    :auto-height="true"
    :navigation="true as any"
    :pagination="
      {
        dynamicBullets: true,
        dynamicMainBullets: 2,
      } as any
    "
    :virtual="true as any"
    @swiper="onSwiper"
  >
    <slot name="slides"></slot>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Virtual } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const sliderStore = useSliderStore();

const swiperModules = [Navigation, Pagination, Virtual];
const viewport: ViewportManager = useViewport();
const breakpoints = {
  xs: viewport.breakpointValue("xs"),
  sm: viewport.breakpointValue("sm"),
  md: viewport.breakpointValue("md"),
  lg: viewport.breakpointValue("lg"),
};

const swiperBreakpointOpts = {
  [breakpoints.xs]: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  [breakpoints.md]: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  [breakpoints.lg]: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const localSwiperIndex = ref(1);
const swiperRef: Ref<SwiperType | null> = ref(null);

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

watch(
  () => sliderStore.swiperIndex,
  (value) => {
    if (value != localSwiperIndex.value) {
      localSwiperIndex.value = value;
    }
  },
  { immediate: true },
);
watch(
  () => localSwiperIndex.value,
  (val) => {
    swiperRef.value.slideTo(val - 1);
  },
);
onMounted(() => {
  sliderStore.resetSlideCommands();
});
</script>

<style lang="scss">
.swiper-slide {
  & {
    display: inline-flex;
  }
}
</style>
