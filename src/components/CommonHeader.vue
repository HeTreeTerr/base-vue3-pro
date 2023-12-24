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
    </div>
    <div class="r-content">
      首页
    </div>
  </el-header>
</template>
