<!-- 登录页面 -->
<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="large">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent,reactive } from 'vue';
export default defineComponent({
    setup(){
        //登录的form数据
        const loginForm = reactive({});
        return{
            loginForm,
        }
    }
});
</script>

<style lang="less" scoped>
.login-container{
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;
    h3{
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }
    
    :deep(.el-form-item__content){
        justify-content: center;
    }
}
</style>