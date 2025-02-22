<template>
  <div class="review-slider-box">
    <div class="review-slider">
      <Slider>
        <template #slides>
          <swiper-slide
            v-for="(r, i) in sliderStore.reviews"
            :key="r.id"
            :virtual-index="i"
          >
            <ReviewCard
              :product-logo-file-name="r.productApp.logoFileName"
              :score="r.score"
              :text="r.text"
              :signature="r.signature"
            ></ReviewCard>
          </swiper-slide>
        </template>
      </Slider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";
import { useSliderStore } from "~/stores/slider";
const sliderStore = useSliderStore();
await useAsyncData("fetchReviews", sliderStore.fetchReviews);
</script>

<style lang="css">
:root {
  --swiper-pagination-bottom: -32px;
  --swiper-navigation-sides-offset: 5vw;
  --swiper-navigation-color: #fe9539;
  --swiper-theme-color: #fe9539;
}
@media (min-width: 768px) {
  :root {
    --swiper-navigation-sides-offset: 10vw;
  }
}

@media (min-width: 1668px) {
  :root {
    --swiper-navigation-sides-offset: 18vw;
  }
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  color: black;
}
</style>
<style lang="scss" scoped>
@use "sass:map";
@use "~/assets/stylesheet/grid.scss" as g;
@use "~/assets/stylesheet/vars.scss";

$lg: map.get(vars.$breakpoints, "lg");
$md: map.get(vars.$breakpoints, "md");
$xl: map.get(vars.$breakpoints, "xl");

.review-slider-box {
  @extend g, .d-flex !optional;
  @extend .justify-center;
  position: relative;
}
.review-slider {
  width: 70vw;
  .swiper {
    position: static;
  }
}
@media (min-width: calc($xl - 250px)) {
  .review-slider {
    width: 52vw;
  }
}
</style>
