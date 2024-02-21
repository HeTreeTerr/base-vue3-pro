<!-- user组件 -->
<template>
    <div class="user-header">
        <!-- 新增按钮 -->
        <el-button type="primary">+新增</el-button>
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
        return {
            list,
            tableLabel,
            config,
            changePage,
            formInline,
            handleSearch,
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