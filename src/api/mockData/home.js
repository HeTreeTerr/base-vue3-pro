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
    }
}