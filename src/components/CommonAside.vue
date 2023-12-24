<!-- 左侧菜单组件 -->
<template>
    <el-aside width="200px">
        <el-menu 
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        :collapse="false"
        >
        <!-- 无子集菜单 -->
        <el-menu-item 
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path">
          <component class="icons" :is="item.icon"></component>
          <span>{{item.lable}}</span>
        </el-menu-item>
        <!-- 有子集菜单 -->
        <el-sub-menu 
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.lable}}</span>
          </template>
          <!-- 二级菜单处理 -->
          <el-menu-item-group>
            <el-menu-item 
            :index="subItem.path"
            v-for="(subItem,subIndex) in item.children"
            :key="subIndex">
                <component class="icons" :is="subItem.icon"></component>
                <span>{{subItem.lable}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script>
export default {
    setup() {
        //菜单数据
        const list = [
            {
                path: "/user",
                name: "user",
                lable: "用户管理",
                icon: "user",
                url: "UserManage/UserManage"
            },
            {
                path: "/other",
                name: "other",
                lable: "其他",
                icon: "location",
                children:[
                    {
                        path: "/page1",
                        name: "page1",
                        lable: "页面1",
                        icon: "setting",
                        url: "Other/PageOne"
                    },
                    {
                        path: "/page2",
                        name: "page2",
                        lable: "页面2",
                        icon: "setting",
                        url: "Other/PageTwo"
                    },
                ]
            },
        ]
        
        //无子集
        const noChildren = ()=>{
            return list.filter((item)=> !item.children);
        }

        //有子集
        const hasChildren = ()=>{
            return list.filter((item)=> item.children);
        }

        return {
            noChildren,
            hasChildren,
        }
    }
}
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
}
</style>