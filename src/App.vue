<script setup>
/*import { RouterView, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
//从localStorage中持久化菜单目录到vuex中
store.commit('addMenu',router);*/
</script>

<!-- 项目初始化生成内容注掉 -->
<!-- <template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->

<!-- 路由视图 -->
<template>
  <RouterView />
</template>

<style scoped></style>
