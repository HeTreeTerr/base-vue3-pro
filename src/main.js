//默认写法
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

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