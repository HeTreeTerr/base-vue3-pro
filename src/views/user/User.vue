<!-- user组件 -->
<template>
    <div class="user-header">
        <!-- 新增按钮 -->
        <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
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
            <template #default>
                <el-button size="small"
                >编辑</el-button
                >
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
    <!-- 模态框-用户新增 -->
    <el-dialog
        v-model="dialogVisible"
        title="新增用户"
        width="35%"
        :before-close="handleClose"
    >
        <el-form :inline="true" :model="formUser">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄">
                        <el-input v-model="formUser.age" placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别">
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
                    <el-form-item label="出生日期">
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
                <el-form-item label="地址">
                    <el-input v-model="formUser.addr" placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end;">
                <el-form-item>
                <el-button @click="dialogVisible = false">取消</el-button>
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
        //========添加用户===========
        //控制模态框的显示/隐藏
        const dialogVisible = ref(false);
        //模态框的关闭
        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭吗?')
                .then(() => {
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