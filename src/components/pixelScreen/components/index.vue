<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Pixel from './pixel.vue';
  // 使用defineOptions设置组件name（Vue 3.3+支持）
  defineOptions({
    name: 'pixelScreen'
  })

  // 实际像素屏幕的尺寸（1920*1080）
  const screenWidth = 1920;
  const screenHeight = 1080;

  // 为了性能考虑，我们创建一个缩小版的显示（192*108），每个像素代表实际的10*10像素
  const displayWidth = 192;
  const displayHeight = 108;

  // 像素数据 - 使用二维数组存储
  const pixelData = ref<Array<Array<{ r: number, g: number, b: number }>>>([]);

  // 初始化像素数据
  onMounted(() => {
    // 创建Canvas用于读取图片像素数据
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // 创建图片对象，使用在线示例图片URL
    const img = new Image();
    // 使用picsum.photos提供的示例图片，尺寸为1920x1080
    img.src = 'https://picsum.photos/1920/1080';

    // 处理跨域问题
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // 设置canvas尺寸为图片原始尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 在canvas上绘制图片
      ctx.drawImage(img, 0, 0);

      // 创建缩小的像素数据数组
      const data: Array<Array<{ r: number, g: number, b: number }>> = [];

      // 计算缩放比例
      const scaleX = img.width / displayWidth;
      const scaleY = img.height / displayHeight;

      // 遍历缩小后的像素网格
      for (let y = 0; y < displayHeight; y++) {
        const row: Array<{ r: number, g: number, b: number }> = [];
        for (let x = 0; x < displayWidth; x++) {
          // 计算对应的原图坐标
          const originalX = Math.floor(x * scaleX);
          const originalY = Math.floor(y * scaleY);

          try {
            // 获取该位置的像素数据
            const imageData = ctx.getImageData(originalX, originalY, 1, 1).data;

            // 提取RGB值并添加到数组
            row.push({
              r: imageData[0] || 0,
              g: imageData[1] || 0,
              b: imageData[2] || 0
            });
          } catch (error) {
            // 如果出现跨域错误，使用默认颜色
            row.push({ r: 100, g: 100, b: 100 });
          }
        }
        data.push(row);
      }

      // 更新pixelData
      pixelData.value = data;
    };

    // 处理图片加载错误
    img.onerror = () => {
      console.error('图片加载失败，使用默认颜色');
      // 创建默认的灰色像素数据
      const data: Array<Array<{ r: number, g: number, b: number }>> = [];
      for (let y = 0; y < displayHeight; y++) {
        const row: Array<{ r: number, g: number, b: number }> = [];
        for (let x = 0; x < displayWidth; x++) {
          row.push({ r: 150, g: 150, b: 150 });
        }
        data.push(row);
      }
      pixelData.value = data;
    };
  });
</script>

<template>
  <div class="pixelScreen">
    <div class="pixelGrid">
      <!-- 使用嵌套的v-for渲染像素网格 -->
      <div
        v-for="(row, rowIndex) in pixelData"
        :key="`row-${rowIndex}`"
        class="pixelRow"
      >
        <Pixel
          v-for="(pixel, colIndex) in row"
          :key="`pixel-${rowIndex}-${colIndex}`"
          :rgb="{ red: pixel.r, green: pixel.g, blue: pixel.b }"
        />
      </div>
    </div>

    <!-- 显示信息 -->
    <div class="info">
      <p>分辨率: {{ screenWidth }}x{{ screenHeight }} 像素</p>
      <p>显示比例: {{ displayWidth }}x{{ displayHeight }} (每像素代表实际的{{ Math.floor(screenWidth / displayWidth) }}x{{
        Math.floor(screenHeight / displayHeight) }}像素)</p>
    </div>
  </div>
</template>

<style scoped>
  .pixelScreen {
    width: 100%;
    height: 100%;
    overflow: auto;
    /* 允许滚动查看完整屏幕 */
    background-color: #1a1a1a;
    padding: 20px;
    box-sizing: border-box;
  }

  .pixelGrid {
    display: inline-block;
    background-color: #000;
    border: 1px solid #333;
    /* 确保像素网格有正确的比例 */
    aspect-ratio: 16/9;
  }

  .pixelRow {
    display: flex;
    height: 3px;
    /* 每个像素的高度 */
  }

  .info {
    margin-top: 20px;
    color: white;
    font-family: Arial, sans-serif;
  }

  .info p {
    margin: 5px 0;
  }
</style>