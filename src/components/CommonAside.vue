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
            <span>{{item.label}}</span>
          </template>
          <!-- 二级菜单处理 -->
          <el-menu-item-group v-if="item.children && item.children.length > 0">
            <el-menu-item 
            :index="subItem.path"
            v-for="(subItem,subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)">
                <component class="icons" :is="subItem.icon"></component>
                <span>{{subItem.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {

        //拿到路由对象
        const router = useRouter();
        //仓库/存储处
        const store = useStore();

        //菜单数据
        /*const list = [
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "UserManage/UserManage"
            },
            {
                path: "",
                name: "other",
                label: "其他",
                icon: "location",
                children:[
                    {
                        path: "/page1",
                        name: "page1",
                        label: "页面1",
                        icon: "setting",
                        url: "Other/PageOne"
                    },
                    {
                        path: "/page2",
                        name: "page2",
                        label: "页面2",
                        icon: "setting",
                        url: "Other/PageTwo"
                    },
                ]
            },
        ];*/

        const asyncList = store.state.menu;
        
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
            return asyncList;
        };
        
        //菜单跳转方法
        const clickMenu = (item)=>{
            if(item.children && item.children.length > 0){
                return;
            }else{
                router.push({
                    path : item.path,
                });
                //vuex 来管理
                store.commit("selectMenu", item);
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