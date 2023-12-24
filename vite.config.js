//默认写法
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})

/*
2）element-plus按需引入
*/
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],
//     }),
//   ],
// })

/*
验证：
修改src\components\HelloWorld.vue中的：
1）<button>成<el-button>
2）保存文件后观察页面上的按钮样式改变

*/

/*
3）element-plus手动引入
*/
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import ElementPlus from 'unplugin-element-plus/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     ElementPlus(),
//   ],
// })

/*
修改src\components\HelloWorld.vue中的：
1）在script下加入引用
import { ElButton } from 'element-plus'
2）<button>成<el-button>
3）保存文件后观察页面上的按钮样式改变
*/