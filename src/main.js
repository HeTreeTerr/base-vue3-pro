//默认写法
import { createApp } from 'vue'
import App from './App.vue'
//引入自定义路由
import router from './router'
//引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//less引入（全局样式优化）
import './assets/less/index.less'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$api = api
//链式写法
//app.use(router).use(store)
//等价写法
app.use(router)
app.use(store)
app.mount('#app')

/*
1）element-plus 全部引入
*/
// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// const app = createApp(App)

// app.use(ElementPlus)
// app.mount('#app')

/*
验证：
修改src\components\HelloWorld.vue中的
<button>成<el-button>，保存文件后观察页面上的按钮样式改变

*/