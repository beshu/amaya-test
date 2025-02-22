<template>
  <div class="button-group">
    <button class="btn-nav back" @click="navigate('back')">
      ⬅ Slider back ws event
    </button>
    <button class="btn-nav forward" @click="navigate('forward')">
      Slider forward ws event ➡
    </button>
  </div>
</template>
<script setup lang="ts">
import { socket } from "@/composables/socket";

const navigate = (direction: string) => {
  console.log(`Emitting navigation event: ${direction}`);
  socket.emit("nav", direction, (response: { success: boolean }) => {
    console.log(response);
  });
};
</script>
<style lang="scss">
@use "~/assets/stylesheet/grid" as *;

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-nav {
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  &.back {
    background: #ff6b6b;
    color: white;
  }

  &.back:hover {
    background: #d64949;
    transform: translateX(-2px);
  }

  &.forward {
    background: #4caf50;
    color: white;
  }

  &.forward:hover {
    background: #388e3c;
    transform: translateX(2px);
  }
}
</style>
