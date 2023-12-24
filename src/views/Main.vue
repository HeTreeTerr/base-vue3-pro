<!-- 项目主页 -->
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 左侧菜单 -->
      <el-aside width="200px">Aside</el-aside>
      <el-container class="r-container">
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

<style lang="less" scoped>
.r-container {
  flex-wrap: wrap;
}
</style>