<!-- 项目主页 -->
<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <!-- 引入头部 -->
        <CommonHeader />
        <!-- 主体可变部分 -->
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommonHeader from '../components/CommonHeader.vue'
import { RouterView } from 'vue-router';

export default defineComponent({
  components:{
    CommonHeader,
    RouterView,
},
})
</script>