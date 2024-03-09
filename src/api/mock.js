import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'
import permissionApi from './mockData/permission.js'

//拦截请求
//主页
Mock
.mock('/home/getTableData',homeApi.getTableData)
.mock('/home/getCountData',homeApi.getCountData)
.mock('/home/getChartData',homeApi.getChartData)

//本地获取user的数据
Mock
.mock(/user\/getUser/,'get',userApi.getUserList)
.mock(/user\/add/,'post',userApi.createUser)
.mock(/user\/edit/,'post',userApi.updateUser)
.mock(/user\/delete/,'get',userApi.deleteUser)

//用户、权限
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)