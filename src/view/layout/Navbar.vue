<style lang="less">
    .el-dialog{
      width: 30%
    }
    .ivu-menu-item {
      font-size: 15px;
    }
    .ivu-menu-light {
      background: #293038;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
      color: #fff;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
      color: #2db7f5;
      background: #22282e;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
      height: 2px;
      background: none !important;
    }
    .ivu-menu-item-selected {
      color: #fff;
    }
    .ivu-btn-text{
      color: #fff;
    }
    .ivu-dropdown-item {
      text-align: center;
      font-size: 13px !important;
    }
    .ivu-dropdown-item:hover {
      color: #66b1ff;
      background: #ecf5ff;
    }
    
</style>
<template>
  <div>
    <div class="main-header">
      <!--设置菜单默认选中条目-->
      <Menu style="font-size: 15px" mode="horizontal" :active-name="activeName" @on-select="selectMenu">
        <div class="navicon-con">
          <!--菜单的缩进和展开功能-->
          <Button :style="{transform: 'rotateZ(' + (this.sidebar ? '90' : '0') + 'deg)'}" type="text"
                  @click="toggleSideBar">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <!-- 顶部导航 -->
        <breadcrumbNav/>
        <div class="layout-nav">
          <div class="main-header-operate">
            <!-- <div class="header-avator-con-icon">
              <div>
                <screenfull style="margin-top: 4px"/>
              </div>
              <div>
                <themeDropMenu @on-select="selectMenu"/>
              </div>
            </div> -->
            <div class="header-avator-con">
              <div class="user-dropdown-menu-con">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                  <Dropdown transfer trigger="click">
                    <div href="javascript:void(0)" style="color: #fff; font-size: 15px">
                      <span class="main-user-name"><i class="el-icon-user-solid" style="margin-right: 3px"></i>{{this.user}}</span>
                    </div>
                    <DropdownMenu slot="list">
                      <DropdownItem divided><span @click="dialogFormVisible = true">修改密码</span></DropdownItem>
                      <DropdownItem name="loginout" divided><span style="color：#000" @click="handleClickUserDropdown">退出登录</span></DropdownItem>
                      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body='true' :close-on-click-modal='false'>
                        <el-form ref="ruleForm" :model="form" :rules="rules" >
                          <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpassword">
                            <el-input type="password" v-model="form.oldpassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
                          </el-form-item>
                          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpassword">
                            <el-input type="password" v-model="form.newpassword" autocomplete="off" placeholder="请输入新密码"></el-input>
                          </el-form-item>
                          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password">
                            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请确认密码"></el-input>
                          </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                          <el-button  @click="handleCancle()">取 消</el-button>
                          <el-button type="primary" @click="handleSubmit('ruleForm')">确 定</el-button>
                        </div>
                      </el-dialog>
                    </DropdownMenu>
                  </Dropdown>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </div>
    <div class="tags-con">
      <tagsOpened  @on-select="selectMenu" :pageTagsList="pageTagsList"></tagsOpened>
    </div>
  </div>
</template>

<script>
  import {logout,adminInfo,login,changePassword} from '../../api/login.js'
  import {mapGetters,mapMutations} from 'vuex';
  import breadcrumbNav from './BreadcrumbNav.vue';
  import tagsOpened from './TagsOpened.vue';
  import screenfull from '@/components/main/Screenfull.vue';
  import themeDropMenu from '@/components/main/ThemeDropMenu.vue';
  import avator from '@/assets/avator.png';

  export default {
    // inject: ['reload'],
    name: 'navbar',
    components: {
      breadcrumbNav,
      tagsOpened,
      screenfull,
      themeDropMenu,
    },
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.form.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeName: '',
        avator: avator,
        username: '',
        user: localStorage.getItem('userName'),
        dialogFormVisible: false,
         form: {
          oldpassword: '',
          newpassword: '',
          password: '',
        },
        rules: {
          oldpassword: [
            {validator:validateOldPass, trigger: 'blur'}
          ],
          newpassword: [
            {validator:validatePass, trigger: 'blur'}
          ],
          password: [
            {validator:validatePass2, trigger: 'blur'}
          ]
        },
         formLabelWidth: '90px'
      };
    },
    props: ['menuActive'],
    computed: {
      pageTagsList() {
        return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
      },
      ...mapGetters([
        'sidebar',
        'userInfo',
      ]),
      userName() {
        if (this.userInfo.username === null && this.userInfo.username !== "") {
          return ""
        } else {
          //导航栏顶部用户名显示
          return this.userInfo.username
        }
      },
    },
    methods: {
      handleSubmit (option) {
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            // 每次再点击修改密码时表单内的数据就清空
            this.dialogFormVisible = false;
            var userId = Number(localStorage.getItem('userId',userId));
            var oldPassword = this.form.oldpassword
            var newPassword = this.form.password
            changePassword({
              id: userId,
              oldPassWord: oldPassword,
              passWord: newPassword
            }).then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$refs.ruleForm.resetFields();
                }else {
                  this.$message.error(`${res.data.message}`)
                  this.$refs.ruleForm.resetFields(); 
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
            this.$refs.ruleForm.resetFields(); 
          }else{
            return false;
          }
        });
      },
      //取消按钮
      handleCancle (option) {
        this.dialogFormVisible = false;
        this.$refs.ruleForm.resetFields(); 
      },
      //获取用户信息
      // getUserInfo() {
      //   adminInfo().then(res=>{
      //     if(res.data.code == 200){
      //       this.username = res.data.data.roles[0];
      //     }
      //   })
      // },
      toggleSideBar() {
        this.$store.dispatch('ChangeSidebar')
      },
      //退出登录
      handleClickUserDropdown () {
        //表单验证
        let token = sessionStorage.getItem('token')
          if (token) {
            //登录接口传值
            logout()
              .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  //完成页面跳转
                  // this.delToken({token: ''});
                  this.$store.commit('$_removeStorage',token)
                  //退出登录后清空被选中的tags
                  this.$store.commit('clearAllPageTags');
                  localStorage.removeItem('menu')
                  this.$router.push("/login");
                  localStorage.removeItem('menu')
                }if(res.data.code == 401) {
                  this.$router.push("/login");
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$router.push("/login");
                // this.$message.error(`${err.message}`, 'ERROR!')
              }) 
          }else{
            // this.$message.error(`没有token`);
            this.$router.push("/login");
            return false;
          }
      },
      // handleClickUserDropdown(e) {
      //   if (e === "loginout") {
      //     this.$store.dispatch('LogOut').then(() => {
      //       location.reload();
      //     });
      //   }
      // },
      //选中导航菜单回调
      selectMenu(name) {
        if(name == 'role' || name == 'meun') {
          name = 'users'
        }
        if(name == 'qd') {
          name = 'qudao'
        }
        var names = name.substr(name.lastIndexOf('/', name.lastIndexOf('/') - 1) + 1);
        // var names = name.split('/')[0] ;
        var nnnames = names.split('/')[0];
          // console.log("0550"+nnnames)
        var name1 = name.split('/')[0] == "null" ? name.split('/')[1] : name.split('/')[0]
        // console.log(name1)
        //控制侧面和顶部根据路径name
        this.$emit("select", name);
        this.$emit("select", nnnames);
        this.$emit("select", name1);
        
        // this.reload()
        // location.reload();
      }
    },
    mounted () {
      this.activeName = this.$route.path.split('/')[1];
    },
     created(){
      // this.getUserInfo();
    }
  }
</script>
