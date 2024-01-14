/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * development
 * test
 * prod
 */
//当前环境
const env = import.meta.env.MODE || 'prod'

//环境对应的服务配置
const EnvConfig = {
    development:{
        baseApi: '/api',
        mockApi: ''
    },
    test:{
        baseApi: '/api',
        mockApi: 'http://test.cn'
    },
    prod:{
        baseApi: '/api',
        mockApi: 'http://prod.cn'
    },
}

export default {
    env,
    //mock的总开关
    mock: true,
    ...EnvConfig[env]
}