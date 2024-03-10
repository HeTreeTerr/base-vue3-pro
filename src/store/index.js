import { createStore } from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        updateIsCollapse(state,payload) {
            //console.log(payload);
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state,val){
            //判断
            //val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            
            if(val.name == 'home'){
                state.currentMenu = null;
            }else{
                state.currentMenu = val;
                let result = state.tabsList.findIndex(item => item.name === val.name);
                result == -1 ? state.tabsList.push(val) : '';
            }
        },
        closeTab(state,val){
            let res = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(res,1);
        },
        setMenu(state,val){
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val));
        },
        addMenu(state){
            if(!localStorage.getItem('menu')){
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;
        }
    }
})