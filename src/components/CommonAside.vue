<!-- 左侧菜单组件 -->
<template>
    <el-aside :width="$store.state.isCollapse ? '180px':'64px'">
        <el-menu 
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        :collapse="!$store.state.isCollapse"
        :collapse-transition="false"
        >
        <!-- 一级目录处理 -->
        <el-sub-menu 
        :index="item.path"
        v-for="item in menuListData()"
        :key="item.path">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.lable}}</span>
          </template>
          <!-- 二级菜单处理 -->
          <el-menu-item-group v-if="item.children && item.children.length > 0">
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
        ];
        
        //无子集（方法）
        /*const noChildren = ()=>{
            return list.filter((item)=> !item.children);
        }*/

        //有子集（方法）
        /*const hasChildren = ()=>{
            return list.filter((item)=> item.children);
        }*/

        //菜单数据（方法）
        const menuListData = ()=>{
            return list;
        }

        return {
            // noChildren,
            // hasChildren,
            menuListData,
        }
    }
}
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
}
.el-menu {
    border-right: none;
}
</style>