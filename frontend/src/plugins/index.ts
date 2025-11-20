import type { App } from 'vue'; // import type 导入仅用于类型的 App
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";


export default (app: App): void =>{
    // 注册Element Plus
    app.use(ElementPlus);

    // 注册所有Element Plus图标
    Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
        app.component(key, component);
    });
}