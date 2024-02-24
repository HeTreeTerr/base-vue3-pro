/**
 * 整个项目api的管理
 */
import request from "./request";
export default{
    //home组件 左侧表格数据获取
    getTableDate(params){
        return request({
            url: '/home/getTableData',
            mothod: 'get',
            data: params,
            //mock: true
        })
    },
    //home组件 右上侧统计获取
    getCountData(params){
        return request({
            url: '/home/getCountData',
            mothod: 'get',
            data: params,
            //mock: true
        })
    },
    //home组件 右下侧统计获取
    getChartData(params){
        return request({
            url: '/home/getChartData',
            mothod: 'get',
            data: params,
            //mock: true
        })
    },
    //获取用户列表数据
    getUserData(params){
        return request({
            url: '/user/getUser',
            mothod: 'get',
            data: params,
            //mock: true
        })
    },
}