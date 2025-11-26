// components->LiButton->index.ts
import pixelScreen from './components/index.vue'
// 如果有多个组件，可以在这里添加，比如cesbutton,记得引入
//  const components = [NewButton,cesbutton];
const components = [pixelScreen];
const install = (app: any) => {
  components.forEach((component) => {
    app.component(component.name , component);
  });
};

export { pixelScreen };
export default { install };
