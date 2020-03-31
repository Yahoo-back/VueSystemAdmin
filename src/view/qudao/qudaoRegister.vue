<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    // 产品访问数据统计
      .el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
		.main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .search {
      float: left;
      margin-left: 40px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .el-dialog {
      width: 40%;
      -webkit-box-shadow: none;
      box-shadow: none;
    //  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
    //  box-shadow: 0 1px 1px rgba(0,0,0,.3);
    }
    .el-dialog__title{
      // color:#409eff;
    }
    .ivu-row {
      // margin-left: -40px;
    }

</style>
<template>
  <div id="app">
		<Card>
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入渠道账号" style="width: 180px" v-model="user_code_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入渠道名称" style="width: 180px" v-model="user_name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-select v-model="status_cnd" placeholder="请选择状态" style="width:180px">
              <el-option  value="">请选择状态</el-option>
              <el-option label="在职" value="2">在职</el-option>
              <el-option label="离职" value="4">离职</el-option>
            </el-select>
          </div>
          <div class="search" style="float: right;margin-top: 20px">
            <el-button  @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">新增</el-button>
             <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="peopleList"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="USER_CODE"
            sortable
						align="center"
            label="渠道账号">
          </el-table-column>
					<el-table-column
            prop="USER_NAME"
            label="渠道名称"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            prop="uvUrl"
            label="H5Uvurl"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="STATUS"
            sortable
						align="center"
            label="状态">
            <template slot-scope="scope">
              {{scope.row.STATUS == 2 ? '在职' : scope.row.STATUS == 4 ? '离职' : scope.row.STATUS == 0 ? '离职' : '未知'}}
            </template>
          </el-table-column>
					 <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="480">
            <template slot-scope="scope">
              <el-dialog append-to-body title="分配角色" :visible.sync="dialogTable" width="900px"  :close-on-click-modal='false'>
                <Alert type="warning" show-icon>必须给该账号分配至少一个角色！</Alert>
                <div style="margin-top: 20px;font-size: 1rem">当前角色</div>
                <el-table
                  :data="userRole"
                  border
                  style="width: 100%; align: center;margin-top: 10px">
                  <el-table-column
                    fixed="left"
                    label="序号"
                    type="index"
                    align="center"
                    width="80px">
                  </el-table-column>
                  <el-table-column
                    prop="roleName"
                    label="角色名称"
                    sortable
                    align="center">
                  </el-table-column>
                </el-table>
                <el-form :model="roleForm" ref="roleForm">
                  <el-form-item prop="userRole">
                    当前角色：
                    <el-checkbox-group  v-model="roleNames" >
                      <el-checkbox  @change="changeCheck(item)" v-for="item in userRole" :key="item.roleid" :label="item.roleid" >{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                    <br/>
                  </el-form-item>
                  <el-form-item props="give">
                    可分配角色：
                    <el-checkbox-group v-model="give" >
                      <el-checkbox  @change="changeChecks(i)"  v-for="i in roleData" :key="i.roleid" :label="i.roleid" >{{i.roleName}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleCancleRole()">关闭</el-button>
                  <el-button type="primary" @click="handleSaveRoles(scope.row)">保存</el-button>
                  
                </div>
              </el-dialog>
              <el-button @click="handleLook(scope.$index, scope.row)" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" size="small"  v-if="scope.row.STATUS == 2">修改</el-button>
              <el-button @click="handleLeave(scope.row)" size="small" v-if="scope.row.STATUS == 2">离职</el-button>
              <el-button @click="handleRecover(scope.row)" size="small" v-if="scope.row.STATUS == 0 || scope.row.STATUS == 4">复职</el-button>
              <el-button @click="handlefp(scope.row)" size="small" v-if="scope.row.STATUS == 2">分配角色</el-button>
              <el-button @click="handleReset(scope.row)" size="small" v-if="scope.row.STATUS == 2">重置密码</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="padding-top: 30px"
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5,10,20,30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" :before-close="closeDiv" :close-on-click-modal='false'  @close="onDialogClose()" >
        <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="100px">
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item
              label="姓名："
              prop="userName"
              >
                <template v-if="dialogTitle=='渠道注册详情'">{{this.dataForm.userName }}</template>
                <el-input  v-else v-model="dataForm.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="登录账号：" prop="userCode">
                <template v-if="dialogTitle=='渠道注册详情'">{{this.dataForm.userCode }}</template>
                <el-input  v-else v-model="dataForm.userCode" placeholder="登录帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="金额：" prop="cpa">
                <template v-if="dialogTitle=='渠道注册详情'">{{this.dataForm.cpa}}</template>
                <el-input v-else v-model="dataForm.cpa" placeholder="金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="CPA：" prop="cpaType" >
                <template v-if="dialogTitle=='渠道注册详情'">{{this.dataForm.cpaType}}</template>
                <el-select  v-else v-model="dataForm.cpaType" placeholder="请选择">
                  <el-option label="uv" value="0">uv</el-option>
                  <el-option label="注册" value="1">注册</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="放款率：" prop="loanRate">
                <template v-if="dialogTitle=='渠道注册详情'">{{this.dataForm.loanRate}}</template>
                <el-input v-else v-model="dataForm.loanRate" placeholder="放款率"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-form-item>
            <el-button @click="handleCancle('dataForm')">取 消</el-button>
            <span @click="onDialogSubmit()" v-if="dialogTitle=='查看'"></span>
            <el-button type="primary" @click="handleSubmit('dataForm')" v-else>保存</el-button>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle()">关闭</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='渠道注册详情'"></span>
          <el-button type="primary" @click="handleSubmit('dataForm')"  v-else-if="dialogTitle=='修改渠道注册'">保存</el-button>
          <el-button type="primary" @click="handleAddSubmit('dataForm')"  v-else="dialogTitle=='新增渠道注册'">保存</el-button>
        </div>
      </el-dialog>
		</Card>
  </div>
</template>
<style scoped>
  .paging{
    float:right;
    margin-top:30px;
	}
	.table{
		margin-top: 30px;
	}
</style>
<script>
import {saveUserQudao,qryUserListByType,qryUserByLgnId,resetPassword,saveUser,updateUserStatus,qryRoles,qryUserRole,allocationRoles} from '../../api/qudao.js';
import * as table from './data/table';
  export default {
      data () {
        var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
        return {
          loading: true,
          row: '',
          usern: '',
          roleNames: [],
            now: [],
            give: [],
           userId: '',
            userCode: '',
            userName: '',
            cpa: '',
            cpaType: '',
            loanRate: '',
            //modal内嵌表单
            totalr: 10,
            roleData: [],
            userRole: [],
            roleId_cnd: '',
            roleName_cnd: '',
            roleCode_cnd: '',
            dialogTable: false,
            choseRole: [],
            choseRoleId: '',
            //查看用户已经分配的角色
            roleid: '',
          dataForm: {
            lgnid: '',
            userCode: '',
            userName: '',
            cpa: '',
            cpaType: '',
            loanRate: ''
          },
          roleForm:{
          },
          dialogVisible: false,
          dialogTitle: '渠道注册详情',
          user_code_cnd: '',
          user_name_cnd: '',
          sex_cnd: '',
          identity_card_cnd: '',
          status_cnd: '',
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
          peopleList: [],
          peopleDetail: '',
          dialogVisibleLeave: false,
          dialogVisibleResume: false,
					dialogVisibleNo: false,
					dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
          createTime: '',
          createTime: '',
          status: '',

          rules: {
            userName: [
              // {validator:validateName, trigger: 'blur'}
              { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            userCode: [
              { required: true, message: '请输入登录账号', trigger: 'blur' }
            ],
            cpa: [
              { required: true, message: '请输入金额', trigger: 'blur' }
            ],
            cpaType: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ],
            loanRate: [
              { required: true, message: '请输入放款率', trigger: 'blur' }
            ]
          }
        }
    },
    methods:{
      resetForm(dataForm){
        if(this.$refs['dataForm'] == undefined)
        this.$refs['dataForm'].resetFields();
      },
      resetForm(roleForm){
        if(this.$refs['roleForm'] == undefined)
        this.$refs['roleForm'].resetFields();
      },
      //获取角色列表
      getRoleList(){
        this.loading = true;
        qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
          if(res.data.code == 200) {
            this.roleData = res.data.data.list;
            this.roleForm.roleData = res.data.data.list;
            this.totalr = res.data.data.total;
            this.roleForm.roleData = res.data.data.list;
            this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.roleData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //获取员工列表
      getPeopleList(){
        this.loading = true;
        qryUserListByType({pageSize: this.pageSize,pageNum: this.currentPage,user_code_cnd: this.user_code_cnd,identity_card_cnd: this.identity_card_cnd,user_name_cnd: this.user_name_cnd,
        status_cnd: this.status_cnd,sex_cnd: this.sex_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.peopleList = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.currentPage = 1;
        this.loading = true;
        qryUserListByType({pageSize: this.pageSize,pageNum: this.currentPage,user_code_cnd: this.user_code_cnd,identity_card_cnd: this.identity_card_cnd,user_name_cnd: this.user_name_cnd,
        status_cnd: this.status_cnd,sex_cnd: this.sex_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.peopleList = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getPeopleList(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getPeopleList(this.pageSize,val);
      },
      //重置密码
      handleReset(row) {
        this.$alert('确定要重置该员工密码吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resetPassword({id: row.userId})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getPeopleList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
      //离职
      handleLeave(row) {
        this.$alert('确定给该员工离职吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateUserStatus({id: row.LGN_ID,status: "4"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getPeopleList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {
        });
      },
      //复职
      handleRecover(row) {
        this.$alert('确定要给该员工复职吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateUserStatus({id: row.LGN_ID,status: "2"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getPeopleList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {
        });
      },
      //删除
      handleDelete(row) {
        this.$alert('确定删除该员工吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateUserStatus({id: row.LGN_ID,status: "5"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getPeopleList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {
        });
      },
      //保存新增员工信息
      handleAddSubmit (option) {
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            //渠道保存接口传值
            saveUserQudao({
              cpa: this.dataForm.cpa,
              cpaType: this.dataForm.cpaType == "uv" ? 0 : this.dataForm.cpaType == "注册" ? 1 : this.dataForm.cpaType,
              loanRate: this.dataForm.loanRate,
              userName: this.dataForm.userName,
              userCode: this.dataForm.userCode,
              id: '',
            }).then(res => {
                if(res.data.code == 200) {
                  this.getPeopleList(this.pageSize,this.currentPage);
                  this.$message.success(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
          }else{
            return false;
          }
        });
        // console.log('submit!');
      },
      //保存编辑员工信息
      handleSubmit (option) {
        // console.log(this.dataForm.lgnid)
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            //渠道保存接口传值
            saveUserQudao({
              cpa: this.dataForm.cpa,
              cpaType: this.dataForm.cpaType == "uv" ? 0 : this.dataForm.cpaType == "注册" ? 1 : this.dataForm.cpaType,
              loanRate: this.dataForm.loanRate,
              userName: this.dataForm.userName,
              userCode: this.dataForm.userCode,
              id: this.dataForm.lgnid,
            }).then(res => {
                if(res.data.code == 200) {
                  this.getPeopleList(this.pageSize,this.currentPage);
                  this.$message.success(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
          }else{
            return false;
          }
        });
        // console.log('submit!');
      },
       //取消按钮
      handleCancle () {
        this.dialogVisible = false;
        this.$refs.dataForm.resetFields();
        // this.resetForm('dataForm');
      },
      handleDistribute() {
        this.$router.push({ path:'/rightManage/people/distributionPosts'  })
      },
      //点击编辑弹出对话框dialog
      closeDiv(){
        this.dialogVisible = false;
        // this.$refs['dataForm'].resetFields()
        this.$refs.dataForm.resetFields();
        // this.resetForm('dataForm');
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisible = false;
        // this.dataForm.tempRoleIds = []
        // this.resetForm('dataForm');
        this.$refs.dataForm.resetFields();
        // this.$refs['dataForm'].resetFields()
      },
      // 查看员工
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '渠道注册详情'
        qryUserByLgnId({userId: row.LGN_ID}).then(res => {
          if(res.data.code == 200) {
            this.peopleLogin = res.data.data.login;
            this.dataForm.userCode = this.peopleLogin.userCode;

            this.peopleDetail = res.data.data.user;
            if(!this.peopleDetail) {
              this.dataForm.userName = '';
              this.dataForm.cpaType = '';
              this.dataForm.cpa = '';
              this.dataForm.loanRate = '';
            }else{
              this.dataForm.userName = this.peopleDetail.userName;
              this.dataForm.userCode = this.peopleLogin.userCode;
              this.dataForm.cpaType = this.peopleDetail.cpatype == 0 ? "uv" : this.peopleDetail.cpatype == 1 ? "注册" : '';
              this.dataForm.cpa = this.peopleDetail.cpa;
              this.dataForm.loanRate = this.peopleDetail.loanrate;
            }
            if(this.onjobdate == null) {
            }else{
              var ct =  new Date(this.dataForm.onjobdate).toJSON();
              var time = new Date(+new Date(ct) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              this.od = time;
            }
          }
        })
      },
      //编辑员工
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改渠道注册'
        qryUserByLgnId({userId: row.LGN_ID}).then(res => {
          if(res.data.code == 200) {
            this.peopleLogin = res.data.data.login;
            this.dataForm.userCode = this.peopleLogin.userCode;

            this.peopleDetail = res.data.data.user;
            if(!this.peopleDetail){
              this.dataForm.userName = '';
              this.dataForm.lgnid = '';
              this.dataForm.cpaType = '';
              this.dataForm.cpa = '';
              this.dataForm.loanRate = '';
            }else{
              this.dataForm.userName = this.peopleDetail.userName;
              this.dataForm.userCode = this.peopleLogin.userCode;
              this.dataForm.lgnid = this.peopleLogin.lgnid;
              this.dataForm.cpaType = this.peopleDetail.cpatype == 0 ? "uv" : this.peopleDetail.cpatype == 1 ? "注册" : '';
              this.dataForm.cpa = this.peopleDetail.cpa;
              this.dataForm.loanRate = this.peopleDetail.loanrate;
            }
            
            if(this.dataForm.onjobdate == null) {
            }else {
              var ct = new Date(this.dataForm.onjobdate).toJSON();
              var time = new Date(+new Date(ct) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              this.od = time;
              this.dataForm.onjobdate = time;
            }
          }
        })
      },
      // 添加员工
      handleAdd() {
        // this.dataForm = [];
        // this.$refs.dataForm.resetFields();
        this.dialogVisible = true
        this.dialogTitle = '新增渠道注册'
        this.dataForm.userCode = '';
        this.dataForm.userName = '';
        this.dataForm.lgnid = '';
        this.dataForm.loanRate = '';
        this.dataForm.cpaType = '';
        this.dataForm.cpa = '';
      },
      onDialogSubmit() {

      },
      //获取分配角色列表
      handlefp(row) {
        this.dialogTable = true;
        let _row = row;
        this.roleForm = Object.assign({}, _row)
        qryUserRole({userCode: row.LGN_ID}).then(res=>{
          if(res.data.code == 200) {
            this.userRole = res.data.data.list;
            this.roleNames = [];
            this.give = [];
            this.userRole.forEach(item => {
              let key = item.roleid
              this.roleNames.push(key)
            })
            // console.log(this.roleNames)
          }
        })
        // qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
        //    if(res.data.code == 200) {
        //      this.roleData = res.data.data.list;
        //      this.totalr = res.data.data.total;
        //    }
        // })
      },
      //获取分配角色列表内的复选框值
      handleSelectionChange(val) {
        this.choseRole = val;
      },
      //取消按钮
      handleCancleRole(){
        this.$refs.roleForm.resetFields();
        this.dialogTable = false
      },
      //点击角色分配复选框
      changeCheck(item) {
        let i = item.roleid;
        this.choseRoleId = item.roleid;
        this.checkNow = [];
        this.id1 = [];
        let arr = this.roleNames;
        for(let i = 0;i < arr.length; i++){
          let nowRole = arr[i];
            let obj = {
              roleid: this.userRole[i].roleid,
              roleids: []
            }
              obj.roleids.push(nowRole)
            this.checkNow.push(obj)
        }
        for (let j = 0; j < this.checkNow.length; j++) {
          let id2 = this.checkNow[j].roleid;
          this.id1.push(id2)
        }
      },
      //点击角色分配复选框
      changeChecks(i) {
        let item = i.roleid;
        this.choseRoleId = i.roleid;
        this.checkNow = [];
        this.id2 = [];
        let arr = this.give;
        for(let i = 0;i < arr.length; i++){
          let nowRole = arr[i];
            let obj = {
              roleid: this.roleData[i].roleid,
              roleids: []
            }
              obj.roleids.push(nowRole)
            this.checkNow.push(obj)
        }
        for (let j = 0; j < this.checkNow.length; j++) {
          let id3 = this.checkNow[j].roleid;
          this.id2.push(id3)
        }
		  },
      //保存角色分配
      handleSaveRoles(row){
        this.handlefp(this.roleForm);
        this.$refs.roleForm.resetFields();
        this.$refs.roleForm.validate((valid) => {
          if(valid) {
          }
        })
        var a = JSON.parse(JSON.stringify(this.roleNames));
        var b = JSON.parse(JSON.stringify(this.give));
        var totalRole = [];
        totalRole = totalRole.concat(a).concat(b)
        // console.log("totalRole"+totalRole)
        if(!totalRole){
          var test = totalRole;
        }else{
          var test = totalRole.join(',') +",";
        }
        var LGN_ID = this.roleForm.LGN_ID
        allocationRoles({roleId: LGN_ID,roleId_cnd: test}).then(res=>{
          if(res.data.code == 200){
            this.$message.success(`${res.data.message}`)
            this.dialogTable = false
            this.getPeopleList(this.pageSize,this.currentPage);
          }
        })
      },
    },
    computed: {
    },
    activated() {
      this.getPeopleList();
      this.getRoleList();
    },
    mounted () {
      // this.getPeopleList();
      // this.getRoleList();
    },
    created(){
    },
    watch: {
      '$route' () {
        // this.getPeopleList();
        // this.getRoleList();
      }
    }
  }
</script>
