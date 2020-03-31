<style lang="less">
// ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
//   // padding-left: 26px;
// }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  // padding-left: 26px;
  opacity: 1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  // padding-left: 26px;
  opacity:  1;
}
// :-ms-input-placeholder { /* Internet Explorer 10-11 */
//   // padding-left: 26px;
// }
// ::-ms-input-placeholder { /* Microsoft Edge */
//   // padding-left: 26px;
// }
.lbg {
  width: 320px;
  height: 400px;
   background-color: rgba(21,20,20,0.5);
}
.ivu-card .title {
  color: #fff;
  text-align: center;
  height: 100%;
  font-size: 24px;
  line-height: 24px;
  margin-top: 50px;
}
.ivu-card-head {
  border-bottom: none;
  padding: none;
}
.ivu-input {
  // width: 90%;
  // margin-left: 5%;
  background: transparent;
  // background: url("../../assets/people.png") no-repeat scroll left center transparent;
  // border: 2px solid rgba(255,255,255,0.3);
  // box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px	rgba(255,255,255,0.2);
  -moz-border-radius:6px;
  -webkit-border-radius:6px;
  border-radius:6px;
  // border:2px solid #F0F0F0;
  border: none;
  -o-transition:all .5s;
  -moz-transition:all .5s;
  -webkit-transition:all .5s;
  -ms-transition:all .5s;
  height: 40px;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
  padding-left: 50px;
}
.people {
 background: url("../../assets/people.png") no-repeat scroll left center transparent;
}
.password {
 background: url("../../assets/lock.png") no-repeat scroll left center transparent;
}
.ivu-input:focus{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-input:hover{
  border-color: #fff;
  outline:none;
  box-shadow:0 0 5px #fff;
}
.ivu-form-item {
  margin-bottom: 35px;
}
.ivu-form-item-error .ivu-input {
  border: 2px solid #ed3f14;
}
.ivu-form-item-error-tip {
  font-size: 13px;
}
.ivu-btn-primary{
  // background: transparent;
  background-color: rgba(39,32,32,0.5);
  // background-color: rgba(45, 183, 245, 0.5);
  // border-color: #fff;
  border: 1px solid rgba(45, 183, 245, 0.5) !important;
  box-shadow:0 0 5px rgba(45, 183, 245, 0.5);
}
.ivu-btn-primary:hover{
  // background: #fff;
  background-color: rgba(33,30,30,0.5);
  border-color: #fff !important;
  color: #fff;
  box-shadow:0 0 5px #fff;
}
.ivu-btn {
  border: none;
}
.tlogin{
  width: 268px;
  height: 45px;
  font-size: 18px;
  margin-top: 27px;
}
</style>
<template>
  <div id="particles">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false" class="lbg">
          <!-- <p slot="title"> -->
            <div class="title">
            瑞幸分期后台管理系统
            </div>
          <!-- </p> -->
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="username">
                <Input class="people" v-model="form.username" placeholder="请输入用户名">
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input class="password" type="password" v-model="form.password" placeholder="请输入密码">
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" :loading="loading" class="tlogin">登录</Button>
              </FormItem>
            </Form>
            <!-- <p class="login-tip">密码:123456</p> -->
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
  import Cookies from 'js-cookie';
  import particles from 'particles.js';
  import {login} from '../../api/login';
  import {adminPermission} from '../../api/login';
  import {mapMutations} from  'vuex';
  export default {
    data () {
      return {
        loading: false,
        redirect: undefined,
        form: {
          userName: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleSubmit (option) {
        //表单验证
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //登录接口传值
            login({username: this.form.username, password: this.form.password})
              .then(res => {
                if(res.data.code == 200) {
                  let head = res.data.data.tokenHead;
                  // console.log(head)
                  let tokens = res.data.data.token;
                  let token = head+tokens;
                  let userId = res.data.data.userId;
                  let userName = res.data.data.userName;
                  localStorage.setItem('userName',userName);
                  sessionStorage.setItem('token',token);
                  this.$store.commit('$_setToken',token)
                  localStorage.setItem('userId',userId);
                  // this.$message.success(`${res.data.message}`)
                  this.$message.success("操作成功！")
                  //完成页面跳转
                  let userInfo = {
                    username: this.form.username,
                    password: this.form.password,
                  };
                  Cookies.set('userInfo', userInfo);
                  this.$store.commit('setUserInfo', userInfo);
                  //设置收缩栏默认为展开
                  this.$store.state.app.sidebar = false;
                  this.$router.push("/");
                  const userIds = localStorage.getItem('userId')
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                // this.$message.error("登录失败！")
                // if(err.message == undefined) {
                //   this.$message.error("登录失败！")
                // }else{
                // this.$message.error(`${err.message}`, 'ERROR!')
                // }
              })
          }else{
            // this.$message.error(`表单验证失败`)
            return false;
          }
        });
        // console.log(window.location.pathname)
      },
    },
    mounted() {
      particlesJS.load('particles','../../static/particles.json');
    },
  }
</script>
<style lang="less">
  canvas{
    display:block;
    vertical-align:bottom;
  }
  #particles{
    position: absolute;
    width: 100%;
    height: 100%;
    // background-color: #000;
    background-image: url("../../assets/bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: 100% 100%;
  }
  .login {
    width: 100%;
    height: 100%;
    // background: #000;
    // background-image: url("../../assets/bg1.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    &-con {
      position: absolute;
      right: 42%;
      top: 63%;
      transform: translateY(-60%);
      width: 360px;
      &-header {
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con {
        padding: 50px 10px 10px;
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>



<!--
  // 菜单获取bug
  // <style lang="less">
// ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
//   // padding-left: 26px;
// }
// :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
//   // padding-left: 26px;
//   opacity: 1;
// }
// ::-moz-placeholder { /* Mozilla Firefox 19+ */
//   // padding-left: 26px;
//   opacity:  1;
// }
// :-ms-input-placeholder { /* Internet Explorer 10-11 */
//   // padding-left: 26px;
// }
// ::-ms-input-placeholder { /* Microsoft Edge */
//   // padding-left: 26px;
// }
// .lbg {
//   width: 320px;
//   height: 400px;
//    background-color: rgba(21,20,20,0.5);
// }
// .ivu-card .title {
//   color: #fff;
//   text-align: center;
//   height: 100%;
//   font-size: 24px;
//   line-height: 24px;
//   margin-top: 50px;
// }
// .ivu-card-head {
//   border-bottom: none;
//   padding: none;
// }
// .ivu-input {
//   // width: 90%;
//   // margin-left: 5%;
//   background: transparent;
//   // background: url("../../assets/people.png") no-repeat scroll left center transparent;
//   // border: 2px solid rgba(255,255,255,0.3);
//   // box-shadow: inset 0 0 4px rgba(255,255,255,0.2),0 0 4px	rgba(255,255,255,0.2);
//   -moz-border-radius:6px;
//   -webkit-border-radius:6px;
//   border-radius:6px;
//   // border:2px solid #F0F0F0;
//   border: none;
//   -o-transition:all .5s;
//   -moz-transition:all .5s;
//   -webkit-transition:all .5s;
//   -ms-transition:all .5s;
//   height: 40px;
//   color: #fff;
//   font-size: 15px;
//   line-height: 20px;
//   padding-left: 50px;
// }
// .people {
//  background: url("../../assets/people.png") no-repeat scroll left center transparent;
// }
// .password {
//  background: url("../../assets/lock.png") no-repeat scroll left center transparent;
// }
// .ivu-input:focus{
//   border-color: #fff;
//   outline:none;
//   box-shadow:0 0 5px #fff;
// }
// .ivu-input:hover{
//   border-color: #fff;
//   outline:none;
//   box-shadow:0 0 5px #fff;
// }
// .ivu-form-item {
//   margin-bottom: 35px;
// }
// .ivu-form-item-error .ivu-input {
//   border: 2px solid #ed3f14;
// }
// .ivu-form-item-error-tip {
//   font-size: 13px;
// }
// .ivu-btn-primary{
//   // background: transparent;
//   background-color: rgba(39,32,32,0.5);
//   // background-color: rgba(45, 183, 245, 0.5);
//   // border-color: #fff;
//   border: 1px solid rgba(45, 183, 245, 0.5) !important;
//   box-shadow:0 0 5px rgba(45, 183, 245, 0.5);
// }
// .ivu-btn-primary:hover{
//   // background: #fff;
//   background-color: rgba(33,30,30,0.5);
//   border-color: #fff !important;
//   color: #fff;
//   box-shadow:0 0 5px #fff;
// }
// .ivu-btn {
//   border: none;
// }
// .tlogin{
//   width: 268px;
//   height: 45px;
//   font-size: 18px;
//   margin-top: 27px;
// }
// </style>
// <template>
//   <div id="particles">
//     <div class="login" @keydown.enter="handleSubmit">
//       <div class="login-con">
//         <Card :bordered="false" class="lbg">
//             <div class="title">
//             后台管理系统
//             </div>
//           <div class="form-con">
//             <Form ref="loginForm" :model="form" :rules="rules">
//               <FormItem prop="username">
//                 <Input class="people" v-model="form.username" placeholder="请输入用户名">
//                 </Input>
//               </FormItem>
//               <FormItem prop="password">
//                 <Input class="password" type="password" v-model="form.password" placeholder="请输入密码">
//                 </Input>
//               </FormItem>
//               <FormItem>
//                 <Button @click="handleSubmit" type="primary" :loading="loading" class="tlogin">登录</Button>
//               </FormItem>
//             </Form>
//           </div>
//         </Card>
//       </div>
//     </div>
//   </div>
// </template>
// <style lang="less">
//   .el-collapse-item__header {
//     font-size: 15px;
//   }
// 	.main .single-page-con {
// 			background: #fff;
// 		}
// </style>
// <script>
//   import Cookies from 'js-cookie';
//   import particles from 'particles.js';
//   import {login} from '../../api/login';
//   import {adminPermission} from '../../api/login';
//   import {mapMutations} from  'vuex';
//   export default {
//     data () {
//       return {
//         loading: false,
//         redirect: undefined,
//         form: {
//           userName: '',
//           password: ''
//         },
//         rules: {
//           username: [
//             {required: true, message: '账号不能为空', trigger: 'blur'}
//           ],
//           password: [
//             {required: true, message: '密码不能为空', trigger: 'blur'}
//           ]
//         }
//       };
//     },
//     watch: {
//       $route: {
//         handler: function(route) {
//           this.redirect = route.query && route.query.redirect
//         },
//         immediate: true
//       }
//     },
//     methods: {
//       handleSubmit (option) {
//         //表单验证
//         this.$refs.loginForm.validate((valid) => {
//           if (valid) {
//             //登录接口传值
//             login({username: this.form.username, password: this.form.password})
//               .then(res => {
//                 if(res.data.code == 200) {
//                   let head = res.data.data.tokenHead;
//                   console.log(head)
//                   let tokens = res.data.data.token;
//                   let token = head+tokens;
//                   let userId = res.data.data.userId;
//                   let userName = res.data.data.userName;
//                   localStorage.setItem('userName',userName);
//                   sessionStorage.setItem('token',token);
//                   this.$store.commit('$_setToken',token)
//                   localStorage.setItem('userId',userId);
//                   this.$message.success(`${res.data.message}`)
//                   //完成页面跳转
//                   let userInfo = {
//                     username: this.form.username,
//                     password: this.form.password,
//                   };
//                   Cookies.set('userInfo', userInfo);
//                   this.$store.commit('setUserInfo', userInfo);
//                   //设置收缩栏默认为展开
//                   this.$store.state.app.sidebar = false;
//                   this.$router.push("/");
//                   const userIds = localStorage.getItem('userId')
//                   //获取权限接口
//                   adminPermission({userId: userIds}).then(res=>{
//                   var menu = JSON.stringify(res.data.data);
//                   console.log(menu)
//                   localStorage.setItem('menu',menu);
//               })
//                 }else {
//                   this.$message.error(`${res.data.message}`)
//                   return false;
//                 }
//               })
//               .catch(err => {
//                 this.$message.error(`${err.message}`, 'ERROR!')
//               })
//           }else{
//             // this.$message.error(`表单验证失败`)
//             return false;
//           }
//         });
//         console.log(window.location.pathname)
//       },
//     },
//     mounted() {
//       particlesJS.load('particles','../../static/particles.json');
//       var menu= JSON.parse(localStorage.getItem('menu'));
//       //myId,pId为随机定义的主键（muenId）; 父级（parentMuenId）；menu：后端返回的菜单数组链式
//       //parentMuenId：后端返回数组的主键，
//       //注意：myId和pId为随机定义的
//       function list(myId,pId,menu){
//         console.log(menu)
//         function exists(menu, parentMuenId){
//           for(var i=0; i<menu.length; i++){
//           if (menu[i][myId] == parentMuenId) return true;
//           }
//           return false;
//         }

//         var nodes = [];
//         // get the top level nodes
//         for(var i=0; i<menu.length; i++){
//           var row = menu[i];
//           if (!exists(menu, row[pId])){
//           nodes.push(row);
//           // console.log(nodes)
//           }
//         }
//         var toDo = [];
//         for(var i=0; i<nodes.length; i++){
//           toDo.push(nodes[i]);
//         }
//         while(toDo.length){
//           var node = toDo.shift(); // the parent node
//           // get the children nodes
//           for(var i=0; i<menu.length; i++){
//           var row = menu[i];
//           if (row[pId] == node[myId]){
//             //var child = {id:row.id,text:row.name};
//             if (node.children){
//             node.children.push(row);
//             } else {
//             node.children = [row];
//             }
//             toDo.push(row);
//           }
//           }
//         }
//         return nodes;
//         // console.log(nodes)
//       }
//         var menuTree = list("muenid","parentMuenId",menu);
//         var m = JSON.stringify(menuTree)
//         localStorage.setItem('menuTree',m);
//         //将菜单存储至本地
//         var menuTree = JSON.parse(localStorage.getItem('menuTree'))
//         console.log(menuTree)
//         // console.log(menuTree[0].children)
//     },
//   }
// </script>
// <style lang="less">
//   canvas{
//     display:block;
//     vertical-align:bottom;
//   }
//   #particles{
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     // background-color: #000;
//     background-image: url("../../assets/bg1.jpg");
//     background-repeat: no-repeat;
//     background-size: cover;
//     -webkit-background-size: cover;
//     -o-background-size: cover;
//     background-position: 100% 100%;
//   }
//   .login {
//     width: 100%;
//     height: 100%;
//     // background: #000;
//     // background-image: url("../../assets/bg1.jpg");
//     background-size: cover;
//     background-position: center;
//     position: absolute;
//     &-con {
//       position: absolute;
//       right: 42%;
//       top: 63%;
//       transform: translateY(-60%);
//       width: 360px;
//       &-header {
//         font-size: 16px;
//         font-weight: 300;
//         text-align: center;
//         padding: 30px 0;
//       }
//       .form-con {
//         padding: 50px 10px 10px;
//       }
//       .login-tip {
//         font-size: 10px;
//         text-align: center;
//         color: #c3c3c3;
//       }
//     }
//   }
// </style>
