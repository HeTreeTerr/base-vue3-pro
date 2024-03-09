<!-- user组件 -->
<template>
    <div class="user-header">
        <!-- 新增按钮 -->
        <el-button type="primary" @click="handleAdd()">+新增</el-button>
        <!-- 用户搜索 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="list" style="width: 100%; height: 500px;">
            <el-table-column 
            v-for="item in tableLabel"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :width="item.width ? item.width : 125"
            />
            
            <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分页部分 -->
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="config.total"
            @current-change="changePage"
            class="pager mt-4"
        />
    </div>
    <!-- 模态框-用户新增/编辑 -->
    <el-dialog
        v-model="dialogVisible"
        :title="action == 'add' ? '新增用户' : '编辑用户'"
        width="35%"
        :before-close="handleClose"
    >
        <el-form :inline="true" :model="formUser" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" 
                    :rules="[{required: true,message: '姓名是必填项'}]"
                    >
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age"
                    :rules="[
                        {required: true,message: '年龄是必填项'},
                        {type: 'number',message: '年龄必须是数字'}
                        ]"
                    >
                        <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex"
                    :rules="[{required: true,message: '性别是必选项'}]"
                    >
                        <el-select
                            v-model="formUser.sex"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option label="男" value="0" />
                            <el-option label="女" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth"
                    :rules="[{required: true,message: '出生日期是必填项'}]"
                    >
                        <el-date-picker
                            v-model="formUser.birth"
                            type="date"
                            label="出生日期"
                            placeholder="请输入出生日期"
                            style="width: 100%"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr"
                :rules="[{required: true,message: '地址是必填项'}]"
                >
                    <el-input v-model="formUser.addr" placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end;">
                <el-form-item>
                <el-button @click="handleCanel">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';

export default defineComponent({
    setup(){
        const { proxy } = getCurrentInstance();
        const list = ref([]);

        //表头设置
        const tableLabel = reactive([
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "sexLabel",
                label: "性别",
            },
            {
                prop: "birth",
                label: "出生日期",
                width: 200
            },
            {
                prop: "addr",
                label: "地址",
                width: 320
            },
        ]);
        //发送请求，获取用户列表数据
        onMounted(() =>{
            getUserData(config);
        });
        //分页配置信息
        const config = reactive({
            total: 0,
            page: 1,
            name: '',
            limit: 10,
        });

        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            //console.log(res);
            config.total = res.count;
            list.value = res.list.map((item) => {
                item.sexLabel = item.sex === 0 ? '女' : '男';
                return item;
            });
        };
        //分页切换方法
        const changePage = (page)=>{
            //console.log(page);
            config.page = page;
            getUserData(config);
        };
        //用户搜索表单
        const formInline = reactive({
            keyword: "",
        });
        //用户搜索方法
        const handleSearch = ()=>{
            config.name = formInline.keyword;
            getUserData(config);
        };
        //控制模态框的显示/隐藏
        const dialogVisible = ref(false);
        //模态框的关闭
        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭吗?')
                .then(() => {
                    //字段样式恢复（字段校验等样式）
                    proxy.$refs.userForm.resetFields();
                    done();
                })
                .catch(() => {
                    // catch error
                })
        };
        //添加用户的form数据
        const formUser = reactive({
            name: "", //用户名
            age: "", //年龄
            sex: "", //性别
            birth: "", //出生日期
            addr: "", //地址
        });
        //时间格式转换
        const timeFormat = (time) => {
            var time = new Date(time);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            function add(m){
                return m < 10 ? "0"+m : m;
            }
            return year + "-" + add(month) + "-" + add(date);
        };
        //表单提交，添加/编辑用户
        const onSubmit = () => {
            proxy.$refs.userForm.validate(async (vaild) => {
                //参数校验通过
                if(vaild){
                    //添加操作
                    if(action.value == "add"){
                        //出生日期格式转换
                        formUser.birth = timeFormat(formUser.birth);
                        let res = await proxy.$api.addUser(formUser);
                        console.log(res);
                        if(res){
                            //@ts-ignore
                            ElMessage.success("添加成功");
                            //关闭模态框
                            dialogVisible.value = false;
                            //重置表单
                            proxy.$refs.userForm.resetFields();
                            //刷新页面
                            getUserData(config);
                        }
                    }
                    //编辑操作
                    else{
                        console.log(formUser);
                        formUser.sex == "男" ? (formUser.sex=1) : (formUser.sex=0);
                        let res = await proxy.$api.editUser(formUser);
                        //console.log(res);
                        if(res){
                            //@ts-ignore
                            ElMessage.success("编辑成功");
                            //关闭模态框
                            dialogVisible.value = false;
                            //重置表单
                            proxy.$refs.userForm.resetFields();
                            //刷新页面
                            getUserData(config);
                        }
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
        //取消
        const handleCanel = () => {
            //关闭模态框
            dialogVisible.value = false;
            //字段样式恢复（字段校验等样式）
            proxy.$refs.userForm.resetFields();
        };
        //区分编辑和新增
        const action = ref('add');
        //编辑用户
        const handleEdit = (row) => {
            dialogVisible.value = true;
            action.value = 'edit';
            console.log(row);
            row.sex == 0 ? (row.sex='女') : (row.sex='男');
            proxy.$nextTick(() => {
                //浅拷贝
                Object.assign(formUser,row);
            });
        };
        //新增用户
        const handleAdd = () => {
            dialogVisible.value = true;
            action.value = 'add';
        };
        return {
            list,
            tableLabel,
            config,
            changePage,
            formInline,
            handleSearch,
            dialogVisible,
            handleClose,
            formUser,
            onSubmit,
            handleCanel,
            action,
            handleEdit,
            handleAdd,
        }
    },
})
</script>

<style lang="less" scoped>
.table{
    position: relative;
    height: 520px;
    .pager{
        position: absolute;
        right: 0;
        bottom: -20px;
    }
}
.user-header{
    display: flex;
    justify-content: space-between;
}
</style>