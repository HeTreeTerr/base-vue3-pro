import axios from 'axios'
import config from '../config'
//import {ElMessage} from 'element-plus'

const NETEORK_ERROR = '网络请求异常，请稍后重试...';

//创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi
})

//在请求前做一些事情
service.interceptors.request.use((req)=>{
    //可以自定义header
    //jwt-token认证的时候
    return req;
})

//在请求之后做一些事情
service.interceptors.response.use((res)=>{
    const {code,data,msg} = res.data
    //根据后端 协商 视情况而定
    if(code == 200){
        return data
    }else{
        //网络请求错误
        //@ts-ignore
        ElMessage.error(msg || NETEORK_ERROR)
        return Promise.reject(msg || NETEORK_ERROR)
    }
})

//封装的核心函数
function request(options){
    //请求方式和参数处理
    options.method = options.method || 'get'
    if(options.method.toLowerCase() == 'get'){
        options.params = options.data 
    }
    //对mock处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }
    console.log(config.env);
    //对线上环境做处理
    if(config.env == 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request