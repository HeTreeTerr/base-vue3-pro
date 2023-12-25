<!-- header组件 -->
<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示  -->
      <!-- 1)icon方式展示图标 -->
      <!-- 
      <el-icon :size="size" :color="color">
      <Edit />
      </el-icon> -->
      <!-- 2)svg方式展示图标 -->
      <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" /> -->
      <!-- 3)图标集合方式展示图标 -->
      <!-- <el-icon><Plus /></el-icon> -->
      <!-- 4)结合button展示图标 -->
      <el-button size="small">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
      <h3>首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown>
      <span class="el-dropdown-link">
        <!-- img固定写法 -->
        <!-- <img class="userImg" src="../assets/image/user.jpg" alt="" /> -->
        <!-- img灵活写法 -->
        <img class="userImg" :src="getImgSrc('user')" alt="" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  setup() {
    const getImgSrc = (user)=>{
      //console.log(user);
      //console.log(import.meta.url);
      //console.log(new URL(`../assets/image/${user}.jpg`, import.meta.url));
      return new URL(`../assets/image/${user}.jpg`, import.meta.url).href;
    };

    return {
      getImgSrc,
    };
  }
  
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
</style>