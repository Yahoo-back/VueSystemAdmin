<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
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
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        人员管理列表
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
					<!-- 登录账号： -->
          <div class="search">
            <el-input placeholder="请输入登录账号" style="width: 180px" v-model="user_code_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 员工姓名： -->
          <div class="search">
            <el-input placeholder="请输入员工姓名" style="width: 180px" v-model="user_name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
					<!-- 身份证号： -->
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="identity_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 性别： -->
          <div class="search">
            <el-select v-model="sex_cnd" placeholder="请选择性别" style="width:180px">
              <el-option  value="">请选择</el-option>
              <el-option label="男" value="0">男</el-option>
              <el-option label="女" value="1">女</el-option>
            </el-select>
          </div>
          <!-- 状态： -->
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
            label="登录账号"
            width="180"
            >
          </el-table-column>
					<el-table-column
            prop="USER_NAME"
            label="员工姓名"
            sortable
						align="center"
            width="180"
            >
          </el-table-column>
					<el-table-column
            fixed
            sortable
						align="center"
            label="性别"
            >
            <template slot-scope="scope">
              {{scope.row.SEX == "0" ? '男' : scope.row.SEX == "1" ? '女' : '未知' }}
            </template>
          </el-table-column>
					<el-table-column
            prop="IDENTITY_CARD"
            label="身份证号"
            sortable
						align="center"
            width="240">
          </el-table-column>
					<el-table-column
            fixed
            prop="STATUS"
            sortable
						align="center"
            label="状态"
           >
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
              <!-- 查看界面跳转 -->
              <!-- <el-button @click="handleView" type="text" size="small">查看</el-button> -->
              <!-- <el-button @click="handlefp(scope.row)" type="text" size="small" v-if="scope.row.STATUS == 2">分配弹框</el-button> -->
              <el-dialog append-to-body title="分配角色" :visible.sync="dialogTable" width="900px" :close-on-click-modal='false'>
                <Alert type="warning" show-icon>必须给该账号分配至少一个角色！</Alert>
                <!-- <el-table ref="roleTable"
                  :data="roleData"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    fixed="left"
                    label="序号"
                    type="index"
                    align="center"
                    width="80px">
                  </el-table-column>
                  <el-table-column
                    fixed="left"
                    prop="roleid"
                    sortable
                    align="center"
                    label="角色ID">
                  </el-table-column>
                  <el-table-column
                    prop="roleName"
                    label="角色名称"
                    sortable
                    align="center">
                  </el-table-column>
                </el-table>
                 <el-pagination
                  style="padding-top: 30px"
                  background
                  class="pagination"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-sizes="[5,7,10,20,30,40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalr">
                </el-pagination> -->
                <div style="margin-top: 20px;font-size: 1rem">当前角色</div>
                
                <el-table
                  v-loading="loading"
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
              <!-- <el-button @click="handleDistribute(scope.row)" type="text" size="small" v-if="scope.row.STATUS == 2">分配岗位</el-button> -->
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
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" :before-close="closeDiv"  @close="onDialogClose()"  :close-on-click-modal='false'>
        <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="100px">
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="姓名：" prop="userName">
                <template v-if="dialogTitle=='员工详情'">{{this.userName }}</template>
                <el-input  v-else v-model="dataForm.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="登录账号：" prop="userCode">
                <template v-if="dialogTitle=='员工详情'">{{this.userCode }}</template>
                <el-input  v-else v-model="dataForm.userCode" placeholder="登录帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="性别：" >
                <template v-if="dialogTitle=='查看员工信息'">{{this.sex == "0" ? "男" : dataForm.sex == "1" ? "女" : "未知"}}</template>
                <el-select  v-else v-model="dataForm.sex" placeholder="请选择">
                  <el-option label="男" value="0">男</el-option>
                  <el-option label="女" value="1">女</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="身份证：" prop="identityCard">
                <template v-if="dialogTitle=='员工详情'">{{this.identityCard}}</template>
                <el-input v-else v-model="dataForm.identityCard" placeholder="身份证"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="电话：" prop="phone">
                <template v-if="dialogTitle=='员工详情'">{{this.phone}}</template>
                <el-input v-else v-model="dataForm.phone" placeholder="电话"></el-input>
              </el-form-item>
            </el-col>       
          </el-row>
          <!-- <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="学历：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.degree == "0" ? "本科以上" : dataForm.degree == "1" ? "本科" :  dataForm.degree == "2" ? "大专" : dataForm.degree == "3" ? "高中" : dataForm.degree == "4" ? "初中" : "未知" }}</template>
                <el-select  v-else v-model="dataForm.degree" placeholder="请选择">
                  <el-option label="本科以上" value="0">本科以上</el-option>
                  <el-option label="本科" value="1">本科</el-option>
                  <el-option label="大专" value="2">大专</el-option>
                  <el-option label="高中" value="3">高中</el-option>
                  <el-option label="初中" value="4">初中</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="工号：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.jobNum}}</template>
                <el-input v-else v-model="dataForm.jobNum" placeholder="工号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="公司邮箱：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.companyEmail}}</template>
                <el-input v-else v-model="dataForm.companyEmail" placeholder="公司邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="个人邮箱：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.personalEmail}}</template>
                <el-input v-else v-model="dataForm.personalEmail" placeholder="个人邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="QQ：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.qq}}</template>
                <el-input v-else v-model="dataForm.qq" placeholder="QQ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="微信：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.weixin}}</template>
                <el-input v-else v-model="dataForm.weixin" placeholder="微信"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="入职时间：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.dataForm.onjobdate}}</template>
                  <el-date-picker
                    v-else v-model="dataForm.onjobdate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="所属部门：">
                <template v-if="dialogTitle=='查看员工信息'">{{this.department}}</template>
                <el-input v-else v-model="dataForm.department" placeholder="所属部门"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="家庭住址：" prop="liveAddr">
            <template v-if="dialogTitle=='查看员工信息'">{{this.liveAddr}}</template>
            <el-input v-else v-model="dataForm.liveAddr" placeholder="家庭地址"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle()">关闭</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='员工详情'"></span>
          <!-- <el-button type="primary" @click="handleSubmit('dataForm')" v-else>保存</el-button> -->
          <el-button type="primary" @click="handleSubmit('dataForm')"  v-else-if="dialogTitle=='修改员工'">保存</el-button>
          <el-button type="primary" @click="handleAddSubmit('dataForm')"  v-else="dialogTitle=='新增员工'">保存</el-button>
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
import {qryUserByLgnId,qryUserList,resetPassword,saveUser,updateUserStatus,qryRoles,qryUserRole,allocationRoles} from '../../api/right';
import * as table from './data/table';
  export default {
    inject:['reload'],   //在子组件中注入在父组件中出创建的属性
      data () {
        return {
          loading: true,
          row: '',
          usern: '',
          roleNames: [],
            now: [],
            give: [],
            userCode: '',
            userName: '',
            userId: '',
            sex: '',
            degree: '',
            jobNum: '',
            phone: '',
            companyEmail: '',
            personalEmail: '',
            qq: '',
            weixin: '',
            onjobdate: '',
            od: '',
            createDate: '',
            department: '',
            liveAddr: '',
            identityCard: '',
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
            userId: '',
            LGN_ID: '',
            userCode: '',
            userName: '',
            sex: '',
            degree: '',
            jobNum: '',
            phone: '',
            companyEmail: '',
            personalEmail: '',
            qq: '',
            weixin: '',
            onjobdate: '',
            od: '',
            createDate: '',
            department: '',
            liveAddr: '',
            identityCard: '',
          },
          roleForm:{
          },
          dialogVisible: false,
          dialogTitle: '员工详情',
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
              { required: true, message: '请输入员工姓名', trigger: 'blur' },
            ],
            userCode: [
              { required: true, message: '请输入登陆账号', trigger: 'blur' }
            ],
            identityCard: [
              { required: true, message: '请输入身份证号', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入电话', trigger: 'blur' }
            ]
          }
        }
    },
    methods:{
      resetForm(dataForm){
        if(this.$refs['dataForm'] == undefined)
        this.$refs['dataForm'].resetFields();
        // console.log("form名称:"+this.$refs['dataForm'].resetFields());
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
            // this.roleForm.roleData.map(item=> {
            //   this.roleForm.roleid = item.roleid;
            //   this.roleForm.roleName = item.roleName;
            // })
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
        qryUserList({pageSize: this.pageSize,pageNum: this.currentPage,user_code_cnd: this.user_code_cnd,identity_card_cnd: this.identity_card_cnd,user_name_cnd: this.user_name_cnd,
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
        this.loading = true;
        this.currentPage = 1;
        qryUserList({pageSize: this.pageSize,pageNum: this.currentPage,user_code_cnd: this.user_code_cnd,identity_card_cnd: this.identity_card_cnd,user_name_cnd: this.user_name_cnd,
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
      //新增
      handleAddSubmit(option) {
        // console.log(this.dataForm.userId)
        //表单验证
        // this.$refs.dataForm.resetFields();
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;

            //员工保存接口传值
            saveUser({
              companyEmail: this.dataForm.companyEmail,
              degree: this.dataForm.degree,
              department: this.dataForm.department,
              identityCard: this.dataForm.identityCard,
              jobNum: this.dataForm.jobNum,
              liveAddr: this.dataForm.liveAddr,
              onjobDate: this.dataForm.onjobdate,
              personalEmail: this.dataForm.personalEmail,
              phone: this.dataForm.phone,
              qq: this.dataForm.qq,
              userCode: this.dataForm.userCode,
              sex: this.dataForm.sex,
              userName: this.dataForm.userName,
              id: '',
              weixin: this.dataForm.weixin,
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
      //保存员工信息
      handleSubmit(option) {
        // console.log(this.dataForm.userId)
        //表单验证
        // this.$refs.dataForm.resetFields();
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;

            //员工保存接口传值
            saveUser({
              companyEmail: this.dataForm.companyEmail,
              degree: this.dataForm.degree,
              department: this.dataForm.department,
              identityCard: this.dataForm.identityCard,
              jobNum: this.dataForm.jobNum,
              liveAddr: this.dataForm.liveAddr,
              onjobDate: this.dataForm.onjobdate,
              personalEmail: this.dataForm.personalEmail,
              phone: this.dataForm.phone,
              qq: this.dataForm.qq,
              userCode: this.dataForm.userCode,
              sex: this.dataForm.sex,
              userName: this.dataForm.userName,
              id: this.dataForm.LGN_ID,
              weixin: this.dataForm.weixin,
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
        // this.$refs['dataForm'].resetFields()
        // this.$refs.dataForm.resetFields();
        // this.$refs[option].validate((valid) => {
        //   if (valid) {
        //     this.dialogVisible = false;
        //     this.$refs.dataForm.resetFields();
        // // this.dialogVisible = false;
        // // this.$refs.dataForm.resetFields();
        //   }
        // })
      },
      handleDistribute() {
        this.$router.push({ path:'/rightManage/people/distributionPosts'  })
      },
      //点击编辑弹出对话框dialog
      closeDiv(){
        this.dialogVisible = false;
        // this.$refs['dataForm'].resetFields()
        this.$refs.dataForm.resetFields();
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisible = false;
        // this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields();
        // this.$refs['dataForm'].resetFields()
      },
      // 查看员工
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '员工详情'
        qryUserByLgnId({userId: row.LGN_ID}).then(res => {
          if(res.data.code == 200) {
            this.peopleDetail = res.data.data.user;
            this.peopleLogin = res.data.data.login;
            this.userCode = this.peopleLogin.userCode;
            this.userName = this.peopleDetail.userName;
            this.sex = this.peopleDetail.sex;
            this.degree = this.peopleDetail.degree;
            this.jobNum = this.peopleDetail.jobNum;
            this.department = this.peopleDetail.department;
            this.phone = this.peopleDetail.phone;
            this.companyEmail = this.peopleDetail.companyEmail;
            this.personalEmail = this.peopleDetail.personalEmail;
            this.qq = this.peopleDetail.qq;
            this.weixin = this.peopleDetail.weixin;
            this.createDate = this.peopleDetail.createDate;
            this.dataForm.onjobdate = this.peopleDetail.onjobdate;
            if(this.dataForm.onjobdate == null) {
            }else {
              var ct = new Date(this.dataForm.onjobdate).toJSON();
              let times = new Date(Date.parse(this.dataForm.onjobdate));
              var Y = times.getFullYear() + '-'
              var M = (times.getMonth()+1 < 10 ? '0'+(times.getMonth()+1) : times.getMonth()+1) + '-'
              var D = times.getDate() + ' '
              var ab = Y+M+D;

              var time = new Date(+new Date(ct) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              this.od = time;
              this.dataForm.onjobdate = ab;
            }
            // var ct = new Date(this.peopleDetail.onjobdate).toJSON();
            // let times = new Date(Date.parse(this.peopleDetail.onjobdate));
            // var Y = times.getFullYear() + '-'
            // var M = (times.getMonth()+1 < 10 ? '0'+(times.getMonth()+1) : times.getMonth()+1) + '-'
            // var D = times.getDate() + ' '
            // var ab = Y+M+D;
            // var time = new Date(+new Date(ct) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            // this.od = time;
            // this.onjobdate = ab;
            this.department = this.peopleDetail.department;
            this.liveAddr = this.peopleDetail.liveAddr;
            this.identityCard = this.peopleDetail.identityCard;
          }
        })
      },
      //编辑员工
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改员工'
        qryUserByLgnId({userId: row.LGN_ID}).then(res => {
          if(res.data.code == 200) {
            this.peopleDetail = res.data.data.user == null ? "" : res.data.data.user;
            this.peopleLogin = res.data.data.login;
            this.dataForm.userCode = this.peopleLogin.userCode;
            this.dataForm.userName = this.peopleDetail.userName == undefined ? "" : this.peopleDetail.userName;
            this.dataForm.LGN_ID = this.peopleLogin.lgnid;
            this.dataForm.sex = this.peopleDetail.sex;
            this.dataForm.degree = this.peopleDetail.degree;
            this.dataForm.jobNum = this.peopleDetail.jobNum;
            this.dataForm.phone = this.peopleDetail.phone;
            this.dataForm.companyEmail = this.peopleDetail.companyEmail;
            this.dataForm.personalEmail = this.peopleDetail.personalEmail;
            this.dataForm.qq = this.peopleDetail.qq;
            this.dataForm.weixin = this.peopleDetail.weixin;
            this.dataForm.onjobdate = this.peopleDetail.onjobdate;
            this.dataForm.createDate = this.peopleDetail.createDate;
            this.dataForm.department = this.peopleDetail.department;
            this.dataForm.liveAddr = this.peopleDetail.liveAddr;
            this.dataForm.identityCard = this.peopleDetail.identityCard;
            if(this.dataForm.onjobdate == null) {
            }else {
              var ct = new Date(this.dataForm.onjobdate).toJSON();
              let times = new Date(Date.parse(this.dataForm.onjobdate));
              var Y = times.getFullYear() + '-'
              var M = (times.getMonth()+1 < 10 ? '0'+(times.getMonth()+1) : times.getMonth()+1) + '-'
              var D = times.getDate() + ' '
              var ab = Y+M+D;

              var time = new Date(+new Date(ct) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              this.od = time;
              this.dataForm.onjobdate = ab;
            }
            
          }
        })
      },
      // 添加员工
      handleAdd() {
        // this.dataForm = [];
        // this.$refs.dataForm.resetFields();
        this.dialogVisible = true
        this.dialogTitle = '新增员工'
        this.dataForm.userCode = '';
        this.dataForm.userName = '';
        this.dataForm.LGN_ID = '';
        this.dataForm.sex = '';
        this.dataForm.degree = '';
        this.dataForm.jobNum = '';
        this.dataForm.phone = '';
        this.dataForm.companyEmail = '';
        this.dataForm.personalEmail = '';
        this.dataForm.qq = '';
        this.dataForm.weixin = '';
        this.dataForm.onjobdate = '';
        this.dataForm.userId = '';
        this.dataForm.department = '';
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
        var test = totalRole.join(',') +","
        var userId = this.roleForm.userId
        allocationRoles({roleId: userId,roleId_cnd: test}).then(res=>{
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
      this.getPeopleList(this.pageSize,this.currentPage);
      this.getRoleList(this.pageSize,this.currentPage);
    },
    mounted () {
      // this.getPeopleList(this.pageSize,this.currentPage);
      // this.getRoleList(this.pageSize,this.currentPage);
    },
    created(){
    },
    watch: {
      '$route' () {
        // this.getPeopleList(this.pageSize,this.currentPage);
        // this.getRoleList(this.pageSize,this.currentPage);
      }
    }
  }
</script>
