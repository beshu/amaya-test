<template>
  <main>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
<script setup lang="ts">
import { useSliderStore } from "@/stores/slider";
import { socket } from "@/composables/socket";

const sliderStore = useSliderStore();

socket.off();

sliderStore.bindEvents();
</script>
