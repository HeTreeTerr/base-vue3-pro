import Mock from 'mockjs'

// 图表数据
let OrderList = [];

//本地mock的使用
export default {
    //获取home页表格数据
    getTableData: ()=>{
        return {
            code: 200,
            data: [
                {
                    name:"oppo",
                    todayBuy: 500,
                    monthBuy: 3500,
                    totalBuy: 22000,
                },
                {
                    name:"vivo",
                    todayBuy: 300,
                    monthBuy: 2200,
                    totalBuy: 24000,
                },
                {
                    name:"苹果",
                    todayBuy: 300,
                    monthBuy: 2200,
                    totalBuy: 24000,
                },
                {
                    name:"小米",
                    todayBuy: 300,
                    monthBuy: 2200,
                    totalBuy: 24000,
                },
                {
                    name:"三星",
                    todayBuy: 300,
                    monthBuy: 2200,
                    totalBuy: 24000,
                }
            ],
            msg: "success",
        }
    },
    //获取home页右上侧统计数据
    getCountData: ()=>{
        return {
            code: 200,
            data: [
                {
                    name: "每日支付订单",
                    value: 1234,
                    icon: "SuccessFilled",
                    color: "#2ec7c9"
                },
                {
                    name: "每日收藏订单",
                    value: 210,
                    icon: "StarFilled",
                    color: "#ffb980"
                },
                {
                    name: "每日未支付订单",
                    value: 1234,
                    icon: "GoodsFilled",
                    color: "#5ab1ef"
                },
                {
                    name: "每日支付订单",
                    value: 1234,
                    icon: "SuccessFilled",
                    color: "#2ec7c9"
                },
                {
                    name: "每日收藏订单",
                    value: 210,
                    icon: "StarFilled",
                    color: "#ffb980"
                },
                {
                    name: "每日未支付订单",
                    value: 1234,
                    icon: "GoodsFilled",
                    color: "#5ab1ef"
                }
            ],
            msg: "success"
        }
    },
    //获取echart统计表格部分数据
    getChartData: ()=>{
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            OrderList.push(
                Mock.mock({
                    苹果: Mock.Random.float(1000, 5000, 0, 0),
                    小米: Mock.Random.float(1000, 5000, 0, 0),
                    华为: Mock.Random.float(1000, 5000, 0, 0),
                    oppo: Mock.Random.float(1000, 5000, 0, 0),
                    vivo: Mock.Random.float(1000, 5000, 0, 0),
                    一加: Mock.Random.float(1000, 5000, 0, 0)
                })
            )
        }

        return {
            code: 200,
            data: {
                //折线图
                orderData: {
                    date: ["20191001","20191002","20191003","20191004","20191005","20191006","20191007"],
                    data: OrderList
                },
                //柱状图
                videoData: [
                    { name: "小米", value: 2999 },
                    { name: "苹果", value: 5999 },
                    { name: "vivo", value: 1500 },
                    { name: "oppo", value: 1999 },
                    { name: "魅族", value: 2200 },
                    { name: "三星", value: 4500 },
                ],
                // 柱状图
                userData: [
                    { date: "周一", new: 5, active: 200 },
                    { date: "周二", new: 10, active: 500 },
                    { date: "周三", new: 12, active: 550 },
                    { date: "周四", new: 60, active: 800 },
                    { date: "周五", new: 65, active: 550 },
                    { date: "周六", new: 53, active: 770 },
                    { date: "周日", new: 33, active: 170 },
                ],
            },
            msg: "success"
        }
    }
}