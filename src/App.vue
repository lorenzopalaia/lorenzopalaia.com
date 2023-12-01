<template>
  <div @mousemove="updateCursorPosition" :style="backgroundStyle">
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { computed } from 'vue'

const cursorPosition = ref({ x: 0, y: 0 })

const updateCursorPosition = (event) => {
  cursorPosition.value = {
    x: event.clientX + window.scrollX,
    y: event.clientY + window.scrollY
  }
}

const backgroundStyle = computed(() => {
  const gradientSize = '500px'; // Adjust the size as needed
  const gradientCenter = `${cursorPosition.value.x}px ${cursorPosition.value.y}px`;

  return {
    background: `radial-gradient(circle ${gradientSize} at ${gradientCenter}, #112048 0%, #10172A 100%)`,
    transition: 'background 0.3s ease-out'
  };
})
</script>

<style scoped>
</style>
