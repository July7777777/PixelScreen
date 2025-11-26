# PixelScreen - 像素屏幕展示组件
 版本：v0.0.1
 开发时所用node版本：v22.15.0
## 项目介绍
PixelScreen是一个基于Vue 3和TypeScript开发的像素化屏幕组件，能够将图片转换为像素网格进行展示。该项目使用Canvas API读取图片像素数据，并通过可配置的像素网格进行渲染，支持不同分辨率的缩放显示。

## 功能特点
- 支持将任意图片转换为像素网格展示(别信我，我只是一个像素化展示组件)
- 可配置的像素网格大小，默认192×108像素（对应原始1920×1080）
- 每个像素支持RGB颜色控制
- 响应式设计，支持滚动查看完整像素屏幕
- 像素块支持自定义样式和效果
- 使用Vue 3 Composition API和TypeScript确保类型安全

## 技术栈
- **前端框架**：Vue 3
- **开发语言**：TypeScript
- **构建工具**：Vite
- **组件样式**：CSS (scoped)
- **图片处理**：Canvas API


## 安装与运行

### 前提条件
- Node.js (v14或更高版本)
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发环境运行
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 组件使用

### 在项目中注册和使用

```javascript
// 在main.ts中注册组件
import { createApp } from 'vue'
import App from './App.vue'
import pixelScreen from './components/pixelScreen'

createApp(App).use(pixelScreen).mount('#app')
```

```vue
<!-- 在Vue组件中使用 -->
<template>
  <div class="app">
    <pixelScreen />
  </div>
</template>
```

### 组件参数
像素屏幕组件支持以下配置（可通过修改组件内部参数实现）：
- `displayWidth`: 显示宽度（像素列数），默认192
- `displayHeight`: 显示高度（像素行数），默认108
- 图片源可通过组件内的`img.src`进行配置

## 像素组件说明

### pixel.vue
单个像素组件，支持以下属性：
- `rgb`: 控制像素的RGB颜色值对象，格式为 `{ red: number, green: number, blue: number }`
- 像素内部实现了RGB三色竖条纹效果，每个颜色通道的亮度可单独控制

### index.vue
主像素屏幕组件，负责：
- 图片加载和像素数据提取
- 像素网格的布局和渲染
- 提供像素数据到子组件的传递
- 包含错误处理和降级方案

## 核心实现原理

### 图片像素化处理
1. 使用Canvas API加载图片并绘制到canvas上
2. 通过`getImageData()`方法获取图片的像素数据
3. 根据配置的显示比例，计算缩放后的像素坐标
4. 将像素数据存储到二维数组中供渲染使用

### 像素渲染机制
1. 使用嵌套的`v-for`循环遍历像素数据二维数组
2. 为每个像素渲染一个`<Pixel>`组件
3. 将RGB颜色数据通过props传递给像素组件
4. 像素组件内部使用CSS实现RGB三色竖条纹效果

## 性能优化
- 使用缩小的像素网格（192×108）代替原始分辨率（1920×1080）提高性能
- 使用二维数组存储像素数据，提高数据访问效率
- 图片预加载和错误处理机制确保稳定性
- 响应式布局适配不同设备屏幕
- 使用CSS `aspect-ratio`保持正确的16:9宽高比

## 浏览器兼容性
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 常见问题解决

### 图片加载失败
如果在线图片无法加载，组件会自动使用默认的灰色像素网格进行显示，确保界面不会空白。

### 跨域问题
代码中已添加`img.crossOrigin = 'anonymous'`来处理可能的跨域问题。如果仍然遇到跨域错误，组件会捕获异常并使用默认颜色。

### 性能考虑
对于非常大的图片或网格，可能会影响页面性能。建议保持默认的192×108显示分辨率，或根据实际需要调整大小。

## 扩展与定制

### 自定义像素样式
可以修改`pixel.vue`中的CSS样式来自定义像素的外观，例如改变条纹宽度、添加边框或阴影效果。

### 调整分辨率
可以通过修改`index.vue`中的`displayWidth`和`displayHeight`变量来调整显示分辨率，以平衡细节和性能。

## License
MIT