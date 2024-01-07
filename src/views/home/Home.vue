<!-- home组件 -->
<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <!-- 身份卡片 -->
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/image/user.jpg" alt=""/>
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2024-01-06</span></p>
                    <p>上次登录地点：<span>杭州</span></p>
                </div>
            </el-card>
            <!-- 销量卡片 -->
            <el-card shadow="hover" style="margin-top: 20px;" height="450px">
                <el-table :data="tableData">
                    <el-table-column 
                    v-for="(val,key) in tableLabel" 
                    :key="key"
                    :prop="key"
                    :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
        </el-col>
    </el-row>
</template>

<script>
import {defineComponent,onMounted,ref} from "vue"
import axios from "axios"

export default defineComponent({
    setup(){
        //表数据
        let tableData = ref([]);
        //列名
        const tableLabel = {
            name:"品牌",
            todayBuy: "今日购买",
            monthBuy: "本月购买",
            totalBuy: "总购买",
        };
        //axios发送ajax
        const getTableList = async ()=>{
            await axios.get("/home/getData").then((res)=>{
                console.log(res);
                if(res.data.code == 200){
                    tableData.value = res.data.data.tableData;
                }
            });
        };
        //调用ajax
        onMounted(()=>{
            getTableList();
        });
        return{
            tableData,
            tableLabel,
        };
    }
});
</script>

<style lang="less" scoped>
.home{
    .user{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
}
.login-info{
    p{
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span{
            color: #666;
            margin-left: 60px;
        }
    }
}
</style>