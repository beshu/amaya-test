<template>
  <div class="review-card-box">
    <div class="d-flex flex-row card-gap">
      <div class="d-flex flex-col">
        <ProductLogo :filename="props.productLogoFileName"></ProductLogo>
      </div>
      <div class="d-flex flex-col">
        <ReviewCardStar :length="props.score"></ReviewCardStar>
        <ReviewCardText
          :author="props.signature"
          :text="props.text"
        ></ReviewCardText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productLogoFileName: string;
  score: number;
  signature: string;
  text: string;
}>();
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "~/assets/stylesheet/vars";
@use "~/assets/stylesheet/grid" as *;

$mobile: map.get(vars.$breakpoints, "xs");
$col-gap-xs: 12px;
$col-gap-sm-and-up: 24px;
$padding-xs: 12px;
$padding-sm-and-up: 16px;
$width-card-xs: 320px;
$width-card-sm-and-up: 352px;

.review-card-box {
  @extend .flex-container;
  @extend .justify-between;
  background: map.get(vars.$colors, "background-blue");
  padding: $padding-sm-and-up;
  column-gap: $col-gap-sm-and-up;
  border: 2px solid map.get(vars.$colors, "border-gray");
  border-radius: 12px;
}
.card-gap {
  gap: 20px;
}

@media (max-width: $mobile) {
  .review-card-box {
    padding: $padding-xs;
    column-gap: $col-gap-xs;
    width: $width-card-xs;
  }
}

@media (min-width: calc($mobile + 1px)) {
  .review-card-box {
    width: $width-card-sm-and-up;
  }
}
</style>
