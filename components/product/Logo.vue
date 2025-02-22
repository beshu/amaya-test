<template>
  <NuxtImg class="product-logo" :src="path"></NuxtImg>
</template>
<script setup lang="ts">
const props = defineProps<{ filename: string }>();
const path = computed(() => `/assets/logo/${props.filename}`);
</script>
<style lang="scss" scoped>
.product-logo {
  object-fit: contain;
  min-width: 120px;
}
</style>
