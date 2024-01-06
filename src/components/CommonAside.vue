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
        <!-- 系统名称 -->
        <h3 v-show="$store.state.isCollapse">后台管理</h3>
        <h3 v-show="!$store.state.isCollapse">后台</h3>
        <!-- 一级目录处理 -->
        <el-sub-menu 
        :index="item.path"
        v-for="item in menuListData()"
        :key="item.path"
        @click="clickMenu(item)">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.lable}}</span>
          </template>
          <!-- 二级菜单处理 -->
          <el-menu-item-group v-if="item.children && item.children.length > 0">
            <el-menu-item 
            :index="subItem.path"
            v-for="(subItem,subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)">
                <component class="icons" :is="subItem.icon"></component>
                <span>{{subItem.lable}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script>
import {useRouter} from 'vue-router'
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
        };
        
        //拿到路由对象
        const router = useRouter();
        router.beforeEach((to,from)=>{
            // 若路由为空，则取消跳转
            if (to.path === '') return false;
        })
        //菜单跳转方法
        const clickMenu = (item)=>{
            //当前菜单无子集时，代表是最底层，提供跳转
            if(item.children == undefined 
            || item.children == null 
            || item.children.length == 0){
                router.push({
                    path : item.path,
                });
            }
            //否则是目录，不进行跳转
            else{
                router.push({
                    path : router.currentRoute.value.path,
                });
            }
        };

        return {
            // noChildren,
            // hasChildren,
            menuListData,
            clickMenu,
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
    h3{
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
</style>