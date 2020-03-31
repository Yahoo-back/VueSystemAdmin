import 'babel-polyfill'
import Vue from 'vue'
import 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import particles from 'particles.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
// import componnts from '../components.json'
// import 'iview/src/styles/index.less'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
//
// // 引入echarts 这种引入体积过大，目前在需要页面中按需求引入
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.use(iView);
Vue.use(ElementUI)
Vue.use(particles)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios;
// Vue.use(componnts)
NProgress.configure({});
Vue.config.productionTip = false;


Vue.prototype.forumTreeData = function (froum) {
 
  for (let i in froum) {
      froum[i].value = froum[i].muenid;
      froum[i].label = froum[i].muenName;
  }
  let temp = {};
  let ans = [];
  for (let i in froum) {
      temp[froum[i].value] = froum[i];

  }
  for (let i in temp) {
      if (temp[i].parentMuenId != 0) {
          if (!temp[temp[i].parentMuenId].children) {
              temp[temp[i].parentMuenId].children = [];

          }
          temp[temp[i].parentMuenId].children.push(temp[i]);
      } else {
          ans.push(temp[i]);

      }
  }
  return ans;
}

const whiteList = ['/login'];
//判断是否有token
// router.beforeEach((to,from,next)=>{
//   if(to.matched.some((route)=>route.meta.Auth)){
//       if(localStorage.getItem('token')){
//           next()
//       }else{
//            next({
//               path:'/login',
//               query:{
//                   returnURL:to.path
//               }
//           })
//       }
     
//   }else{
//        next()
//   }
// })
//判断用户名是否存在进项判断
//1.成功，但是再启动项目时直接跳home
router.beforeEach((to, from, next) => {
  let a = sessionStorage.getItem('token')
  // console.log(a)
  NProgress.start(); // 开启Progress
  if (a && store.getters.userInfo) {
    if (to.path === '/login') {
      next();
    }else if (!a || a === "" || a === null) {
      next('/login');
    }else{
      store.dispatch('GenerateRoutes', "").then(() => {
        next();
      })
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login');  // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

//
// router.beforeEach((to, from, next) => {
//   const nextRoute = [ 'temp','editTemplate','plugin','toolList','templateList','template','workflow','workflowList','sysmanage','addWorkflow'];
//   let a = localStorage.getItem('token');
//   console.log(a)
//   // NProgress.start(); // 开启Progress
//   if (nextRoute.indexOf(to.name) >=0 && !a) {
//     next({
//       path: '/login',
//       query: {redirect: to.fullPath}
//     })
//   }else{
//     next()
//   }
//   if(to.name === 'login') {
//     if(!a) {
//       router.push({path: '/home'})
//     }
//   }
// });

// router.beforeEach((to, from, next) => {
//   NProgress.start(); 
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('token');
 
//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       store.dispatch('GenerateRoutes', "").then(() => {
//         next();
//       })
//       next();
//     }
//   }
// });
 


function formatDate(date, fmt) {
  date = new Date(date);
  if (typeof(fmt) === "undefined") {
      fmt = "yyyy-MM-dd HH:mm:ss";
  }
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
      }
  }
  return fmt
};
 
//定义一个时间过滤器
Vue.filter("FormatDate", function(date, fmt) {
  return formatDate(date, fmt);
});
//   router.beforeEach((to, from, next) => {
//     let a = localStorage.getItem('token')
//     console.log(a);
//   NProgress.start(); // 开启Progress
//   if (store.getters.userInfo) {
//     if (to.path === '/login') {
//       next();
//     }else{
//       store.dispatch('GenerateRoutes', "").then(() => {
//         next();
//       })
//     }
//   }else{
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next();
//     } else {
//       next('/login');  // 否则全部重定向到登录页
//       NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//     }
//   }
// });

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
