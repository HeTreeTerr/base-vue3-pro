<!-- 登录页面 -->
<template>
    <el-form :model="formLogin" class="login-container" ref="loginForm">
        <h3>系统登录</h3>
        <el-form-item prop="username" 
        :rules="[{required: true,message: '账号是必填项'}]"
        >
            <el-input type="input" placeholder="请输入账号" 
            v-model="formLogin.username"
            ></el-input>
        </el-form-item>
        <el-form-item prop="password" 
        :rules="[{required: true,message: '密码是必填项'}]"
        >
            <el-input type="password" placeholder="请输入密码" 
            v-model="formLogin.password"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="large" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
    setup(){
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const router = useRouter();

        //登录的form数据
        const formLogin = reactive({
            username: '',
            password: '',
        });
        const login = () => {
            proxy.$refs.loginForm.validate(async (vaild) => {
                //参数校验通过
                if(vaild){
                    try{
                        const res = await proxy.$api.getMenu(formLogin);
                        console.log(res);
                        if(res){
                            //@ts-ignore
                            ElMessage.success("登录成功");
                            //重置表单
                            proxy.$refs.loginForm.resetFields();
                            //存储菜单目录信息
                            store.commit('setMenu',res.menu);
                            store.commit('addMenu',router);
                            //路由跳转到主页
                            router.push({
                                name: 'home',
                            });
                        }
                    }catch(error){
                        console.error(error);
                    }
                }else{
                    //@ts-ignore
                    ElMessage({
                        showClose: true,
                        message: '请输入正确的内容',
                        type: 'error',
                    });
                }
            });
        };
        return{
            formLogin,
            login,
        }
    },
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