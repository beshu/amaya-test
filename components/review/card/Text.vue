<template>
  <div class="review-card-text-box">
    <span class="review-card-text">{{ props.text }}</span>
    <span class="review-card-author">{{ props.author }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  author: string;
  text: string;
}>();
</script>

<style lang="scss">
@use "sass:map";
@use "~/assets/stylesheet/vars";
@use "~/assets/stylesheet/grid" as *;

$mobile: map.get(vars.$breakpoints, "xs");
$font-size-xs: 14px;
$line-height-xs: 18px;
$font-size-sm-and-up: 16px;
$line-height-sm-and-up: 20px;
$text-color: map.get(vars.$colors, "text-primary-light");

.text-color-primary {
  color: $text-color;
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}
.review-card-text-box {
  @extend .text-overflow;

  display: flex;
  flex-direction: column;

  span {
    padding-top: 12px;
  }
}

.review-card-text {
  font-weight: map.get(vars.$font-weights, "regular");
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  line-clamp: 7;
}

.review-card-author {
  @extend grid, .flex-col !optional;
  @extend .flex-grow !optional;
  font-size: $font-size-sm-and-up;
  line-height: $line-height-sm-and-up;
  font-weight: map.get(vars.$font-weights, "bold");
}

@media (max-width: $mobile) {
  .review-card-text {
    font-size: $font-size-xs;
    line-height: $line-height-xs;
  }
}

@media (min-width: calc($mobile + 1px)) {
  .review-card-text {
    font-size: $font-size-sm-and-up;
    line-height: $line-height-sm-and-up;
  }
}
</style>
