import Cookies from 'js-cookie'
import {otherRouterMap, constantRouterMap} from '../../router';

//  var menuTree = JSON.parse(localStorage.getItem('menuTree'));
// console.log(localStorage.getItem('menuTree'))
const app = {
  state: {
    // activeName: 1,
    sidebar: !+Cookies.get('sidebarStat'),
    routers: constantRouterMap,
    menuTheme: 'dark',
    // menuTree: menuTree,
    currentPathArr: [],
    //第一个显示商品列表
    pageOpenedList: [{
      name: "home_index",
      path: "/home",
      title: "首页"
      // name: "list",
      // path: "/product/list",
      // title: "商品列表"
    }],
  },
  mutations: {
    // set_active_name: state => {
    //   state.activeName = this.$route.path
    // },
    SET_menu: (state, menuTree) => {
      state.menuTree = menuTree
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers);
    },
    SET_SIDEBAR: state => {
      Cookies.set('sidebarStat', state.sidebar ? 1 : 0);
      state.sidebar = !state.sidebar
    },
    SET_currentPathArr: (state, currentPathArr) => {
      state.currentPathArr = currentPathArr
    },
    addPageOpened: (state, tag) => {
      let flag = true;
      state.pageOpenedList.map((item, index) => {
        if (item.name === tag.name) {
          flag = false;
        }
      });
      if (flag) {
        state.pageOpenedList.push(tag);
      }
      // 设置大于五个就删除一个
      // if (state.pageOpenedList.length > 5) {
      //   state.pageOpenedList.splice(1, 1);
      // }
    },
    closeOnePageOpend: (state, name) => {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    clearAllPageTags: (state) => {
      state.pageOpenedList = [{
        name: "home_index",
        path: "/home",
        title: "首页"
        //第一个显示商品列表
        // name: "list",
        // path: "/product/list",
        // title: "商品列表"
      }];
    },
    clearOtherPageTags: (state, name) => {
      let newPageList = [];
      state.pageOpenedList.map((item, index) => {
        if (item.name === name || item.name === "home_index") {
          newPageList.push(item)
        }
      });
      state.pageOpenedList = newPageList;
    },
    ChangeMenuTheme: (state, name) => {
      // console.log(state.menuTheme)

      if (state.menuTheme === 'dark') {
        state.menuTheme = 'light';
      } else {
        state.menuTheme = 'dark';
      }
    }
  },
  actions: {
    ChangeSidebar: ({commit}) => {
      commit('SET_SIDEBAR')
    },
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', otherRouterMap);
        resolve();
      })
    },
    ChangeCurrentPathArr({commit}, data) {
      commit('SET_currentPathArr', data);
    },
    ChangeMenu({commit}, data) {
      commit('SET_menu', data);
    }
  }
}

export default app
