import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router"
import plugins from "./plugins"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
// 初始化插件
plugins(app)
app.mount('#app')