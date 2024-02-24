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
            <div class="num">
                <el-card 
                :body-style="{display: 'flex',padding: 0}"
                v-for="item in countData"
                :key="item.name">
                    <component class="icons" 
                    :is="item.icon" 
                    :style="{background: item.color}">
                    </component>
                    <div class="details">
                        <p class="num">¥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- 折线图表 -->
            <el-card style="height: 280px;">
                <div ref="echart" style="height: 280px;" />
            </el-card>
            <div class="graph">
                <!-- 柱状图表 -->
                <el-card style="height: 260px;">
                    <div ref="userechart" style="height: 240px;" />
                </el-card>
                <!-- 饼形图表 -->
                <el-card style="height: 260px;">
                    <div ref="videoechart" style="height: 240px;" />
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {defineComponent,getCurrentInstance,onMounted,reactive,ref} from "vue"
import * as echarts from 'echarts'
import axios from "axios"

export default defineComponent({
    setup(){
        const {proxy} = getCurrentInstance();
        //表数据
        let tableData = ref([]);
        //统计数据
        let countData = ref([]);
        //列名
        const tableLabel = {
            name:"品牌",
            todayBuy: "今日购买",
            monthBuy: "本月购买",
            totalBuy: "总购买",
        };
        //axios发送ajax
        const getTableList = async ()=>{
            //axios 原生写法
            /*await axios.get("/home/getData").then((res)=>{
                console.log(res);
                if(res.data.code == 200){
                    tableData.value = res.data.data.tableData;
                }
            });*/
            //axios 二次封装
            let res = await proxy.$api.getTableDate();
            console.log(res);
            tableData.value = res;
        };
        //axios发送ajax
        const getCountList = async ()=>{
            //axios 二次封装
            let res = await proxy.$api.getCountData();
            console.log(res);
            countData.value = res;
        };
        //调用ajax
        onMounted(()=>{
            //获取table数据
            getTableList();
            //获取count数据
            getCountList();
            //获取echart数据
            getChartData();
        });
        //关于echarts 表格的渲染部分
        let xOptions = reactive({
            //图例文字颜色
            textStyle:{
                color: "#333"
            },
            grid:{
                left: "20%"
            },
            //提示框
            tooltip:{
                trigger: "axis"
            },
            xAxis: {
                type:"category", //类目轴
                data: [],
                axisLine:{
                    lineStyle:{
                        color: "#17b3a3"
                    }
                },
                axisLabel:{
                    interval: 0,
                    color: "#333",
                },
            },
            yAxis: [
                {
                    type: "value",
                    axisLine:{
                        lineStyle:{
                            color: "#17b3a3"
                        }
                    },
                }
            ],
            color: ["#2ec7e9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
            series: []
        });
        let pieOptions = reactive({
            tooltip:{
                trigger:"item",
            },
            color:[
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
            ]

        });

        //图表数据对象
        let orderData = reactive({
            xData: [],
            series: [],
        });
        let userData = reactive({
            xData:[],
            series:[]
        });
        let videoData = reactive({
            series:[]
        });

        //获取数据
        const getChartData = async ()=>{
            let result = await proxy.$api.getChartData();
            //console.log(result);
            //得到接口数据
            let orderRes = result.orderData;
            let userRes = result.userData;
            let videoRes = result.videoData;
            
            //orderData 折线图进行渲染
            orderData.xData = orderRes.date;
            const keyArray = Object.keys(orderRes.data[0]);
            const series = [];
            keyArray.forEach((key) => {
                series.push({
                    name: key,
                    data: orderRes.data.map((item) => item[key]),
                    type: "line",
                });
            });
            orderData.series = series;
            xOptions.xAxis.data = orderData.xData;
            xOptions.series =  orderData.series;
            
            let hEcharts = echarts.init(proxy.$refs['echart']);
            hEcharts.setOption(xOptions);
            
            //userData 柱状图进行渲染
            userData.xData = userRes.map((item)=> item.date);
            userData.series = [
                {
                    name: "新增用户",
                    data: userRes.map((item)=> item.new),
                    type: "bar",
                },
                {
                    name: "活跃用户",
                    data: userRes.map((item)=> item.active),
                    type: "bar",
                },
            ];
            xOptions.xAxis.data = userData.xData;
            xOptions.series = userData.series;

            let uEcharts = echarts.init(proxy.$refs["userechart"])
            uEcharts.setOption(xOptions)

            //videoData 饼状图
            videoData.series=[
                {
                    data: videoRes,
                    type: "pie"
                },
            ];
            pieOptions.series = videoData.series;
            let vEcharts = echarts.init(proxy.$refs["videoechart"]);
            vEcharts.setOption(pieOptions)
        }

        return{
            tableData,
            tableLabel,
            countData,
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
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
    .icons{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .details{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .num{
        font-size: 30px;
        margin-bottom: 10px;
    }
    .txt{
        font-size: 14px;
        text-align: center;
        color: #999;
    }
}
.graph{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
        }
    }
</style>