<!-- 项目主页 -->
<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 左侧菜单 -->
      <CommonAside />
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
import CommonAside from '../components/CommonAside.vue'
import { RouterView } from 'vue-router';

export default defineComponent({
  components:{
    CommonHeader,
    CommonAside,
    RouterView,
},
})
</script>

<style lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>