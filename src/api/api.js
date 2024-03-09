/**
 * 整个项目api的管理
 */
import request from "./request";
export default{
    //home组件 左侧表格数据获取
    getTableDate(params){
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            //mock: true
        })
    },
    //home组件 右上侧统计获取
    getCountData(params){
        return request({
            url: '/home/getCountData',
            method: 'get',
            data: params,
            //mock: true
        })
    },
    //home组件 右下侧统计获取
    getChartData(params){
        return request({
            url: '/home/getChartData',
            method: 'get',
            data: params,
            //mock: true
        })
    },
    //获取用户列表数据
    getUserData(params){
        return request({
            url: '/user/getUser',
            method: 'get',
            data: params,
            //mock: true
        })
    },
    //创建用户
    addUser(params){
        return request({
            url: '/user/add',
            method: 'post',
            data: params,
            //mock: true
        })
    },
    //编辑用户
    editUser(params){
        return request({
            url: '/user/edit',
            method: 'post',
            data: params,
            //mock: true
        })
    },
    //删除用户
    deleteUser(params){
        return request({
            url: '/user/delete',
            method: 'get',
            data: params,
            //mock: true
        })
    },
}