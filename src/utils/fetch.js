import axios from 'axios';
import router from '@/router'
import {Message} from 'iview';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 8000,                  // 请求超时时间
  withCredentials: false
});
// request拦截器
//判断是否有token
service.interceptors.request.use(config=>{
  // config.headers['Access-Control-Max-Age'] = 86400
  // if(config.method === 'post') {
  //   config.data = qs.stringify(config.data);
  // }
  const token=sessionStorage.getItem('token')
  // if(token){
      token?config.headers.Authorization=token:null;


  // }
  if(window.location.pathname == '/login') {
    config.headers.Authorization = null;
  }
  if(window.location.pathname == '/product/list/productInfo') {
    config.headers.Authorization = token;
  }
  return config
});

// respone拦截器
// service.interceptors.response.use(res=>{
//   if(res.data.code=== 401){
//       router.replace('/login');
//       localStorage.removeItem('token')
//   }
//   return res
// })

//对token进行验证若后端返回token401则页面跳转至login[10010:token过期30天，10011：token无效]
// service.interceptors.response.use(function(res) {
//   if(res.data.code === 10010 || res.data.code === 10011 || res.data.code === 401){
//     sessionStorage.removeItem('token')
//     router.replace('/login');
//   }else if(res.data.token) { //判断token是否存在，若存在则刷新token
//     sessionStorage.setItem('token',res.data.token)//覆盖原来的token（默认一天刷新一次）
//   }
//   return res
// },function(error){
//   return Promise.reject(error)
// })

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    //token过期返回，后端返回status：500
    if (error.response) {
      switch (error.response.code) {
        case 401:
          router.push({path: '/login'})
        case 403:
          router.push({path: '/login'})
        case 404:
          router.push({path: '/login'})
      }
      switch (error.response.status) {
        case 401:
            router.push({path: '/login'})
          // router.replace({
          //   path: 'login',
          //   // query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          // })
        // case 500:
        //     router.push({path: '/login'})
          // router.replace({
          //   path: 'login',
          //   // query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          // })
        case 403:
          router.push({path: '/login'})
        case 404:
          router.push({path: '/login'})
      }
    }
    return Promise.reject(error.response)
  }
)

//////////////根据用户名做判断
// request拦截器
// service.interceptors.request.use(config => {
//   return config;
// }, error => {
//   console.log(error); // for debug
//   Promise.reject(error);
// })

// respone拦截器
// service.interceptors.response.use(
//   response => response,
//   error => {
//     console.log('err' + error);// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     });
//     return Promise.reject(error);
//   }
// )

export default service;
