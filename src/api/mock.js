import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'

//拦截请求
Mock
.mock('/home/getTableData',homeApi.getTableData)
.mock('/home/getCountData',homeApi.getCountData)

//本地获取user的数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)