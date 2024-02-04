<!-- tag标签页 -->
<template>
    <div class="tags">
        <el-tag
        :key="tag.name"
        v-for="(tag,index) in tags"
        :closable="tag.name != 'home'"
        :disable-transitions="false"
        :effect="$route.name == tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)">
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const route = useRouter();
        //获取公共的标签页数据
        const tags = store.state.tabsList;
        //标签页切换
        const changeMenu=(item)=>{
            route.push({name : item.name});
        }
        return {
            tags,
            changeMenu,
        }
    }
}
</script>

<style lang="less" scoped>
.tags{
    padding: 10px;
    width: 100%;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>