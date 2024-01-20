import Mock from 'mockjs'
import homeApi from './mockData/home.js'

//拦截请求
Mock
.mock('/home/getTableData',homeApi.getTableData)
.mock('/home/getCountData',homeApi.getCountData)