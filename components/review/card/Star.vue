<template>
  <div class="">
    <div v-for="_ in props.length" class="flex-inline">
      <img src="/assets/svg/star.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  length: number;
}>();
</script>

<style scoped></style>
