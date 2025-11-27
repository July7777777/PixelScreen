<script setup lang="ts">
  // 使用defineProps定义props，包括RGB亮度值（范围0-255）
  defineProps<{
    // 红、绿、蓝亮度值，默认均为255（最大亮度）
    rgb?: {
      red?: number,
      green?: number,
      blue?: number
    },
  }>()
</script>

<template>
  <div
    class="pixel"
    :style="{
      backgroundImage: `linear-gradient(
      90deg,
      rgb(${rgb?.red || 0}, 0, 0) 33.33%,
      rgb(0, ${rgb?.green || 0}, 0) 33.33%,
      rgb(0, ${rgb?.green || 0}, 0) 66%,
      rgb(0, 0, ${rgb?.blue || 0}) 66%
    )`
    }"
  />
</template>

<style scoped>
  .pixel {
    width: 3px;
    height: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4px;
    /* 更小字体适应小像素块 */
    color: white;
    text-shadow: 0 0 1px black;
    /* 增加文本可读性 */
    background-size: 100% 100%;
  }
</style>