<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    .main .single-page-con {
			background: #fff;
    }
      .el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
    .el-dialog {
      width: 60%;
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
        渠道缩量
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <!-- <div class="search">
            <el-input placeholder="请输入缩量百分比" style="width: 180px" v-model="user_code_cnd" suffix-icon="el-icon-search" clearable />
          </div> -->
          <div class="search">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </div>
          <div class="search" style="float: right">
            <el-button @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">新增</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
				</div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="slData"
          border
          style="width: 100%; align: center">
          <el-table-column
            fixed="left"
            label="序号"
            type="index"
						align="center"
						width="80px">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="source"
            sortable
						align="center"
            label="缩量名称">
          </el-table-column>
					<el-table-column
            prop="sl"
            label="缩量百分比"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="update_time"
            sortable
						align="center"
            label="缩量操作时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
              <el-button @click="handleLook(scope.$index, scope.row)" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
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
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" :before-close="closeDiv" :close-on-click-modal='false'  @close="onDialogClose()">
        <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="150px">
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道名：" prop="userName">
                <template v-if="dialogTitle=='渠道缩量详情'">{{this.userName}}</template>
                <el-input v-else v-model="dataForm.userName" placeholder="渠道名"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道账号：" prop="userCode">
                <template v-if="dialogTitle=='查看渠道缩量'">{{dataForm.userCode}}</template>
                <el-input v-else v-model="dataForm.userCode" placeholder="渠道帐号"></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道账号：" prop="source">
                <template v-if="dialogTitle=='渠道缩量详情'">{{this.source}}</template>
                <el-input v-else v-model="dataForm.source" placeholder="渠道帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道缩量百分比：" prop="sl">
                <template v-if="dialogTitle=='渠道缩量详情'">{{this.sl}}</template>
                <el-input v-else v-model="dataForm.sl" placeholder="渠道缩量百分比"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="渠道缩量更改时间：" prop="updateTime">
              <template v-if="dialogTitle=='渠道缩量详情'">{{this.updateTime}}</template>
              <el-date-picker v-else value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.updateTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              <!-- <el-input v-else v-model="dataForm.update_time" placeholder="渠道缩量更改时间"></el-input> -->
            </el-form-item>
          </el-row>
          <!-- <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <span @click="onDialogSubmit()" v-if="dialogTitle=='查看渠道缩量'"></span>
            <el-button type="primary" @click="handleSubmit('dataForm')" v-else>保存</el-button>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle()">关闭</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='渠道缩量详情'"></span>
          <el-button type="primary" @click="handleSubmit('dataForm')" v-else-if="dialogTitle=='修改渠道缩量'">保存</el-button>
          <el-button type="primary" @click="handleAddSubmit('dataForm')" v-else="dialogTitle=='新增渠道缩量'">保存</el-button>
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

import {qryQuDaoSl,qryMySourceAll,qrySourceByLgnId,saveQdaoSlList} from '../../api/qudao.js';
  export default {
      data () {
        return {
          loading: true,
          slData: [],
          source_cnd: '',
          source: '',
          userName: '',
          source: '',
          sl: '',
          updateTime: '',
          dataForm: {
            userName: '',
            source: '',
            sl: '',
            updateTime: '',
            id: ''
          },
          form: {
          },
          dialogVisibleNo: false,
          dialogVisible: false,
          dialogTitle: '渠道缩量详情',
          createTime: '',
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
          rules: {
            userName: [
              { required: true, message: '请输入渠道账号名', trigger: 'blur' },
            ],
            sl: [
              { required: true, message: '请输入渠道缩量百分比', trigger: 'blur' }
            ],
            updateTime: [
              { required: true, message: '请选择渠道缩量更改时间', trigger: 'change' }
            ],
            source: [
              { required: true, message: '请输入渠道账号', trigger: 'blur' }
            ],
          }
        }
    },
    methods:{
      resetForm(dataForm){
        if(this.$refs['dataForm'] == undefined)
        this.$refs['dataForm'].resetFields();
      },
      //取消按钮
      handleCancle () {
        this.dialogVisible = false;
        this.$refs.dataForm.resetFields();
        // this.resetForm('dataForm');
      },
      //table内时间格式转换
      // dateFormat (row, column) {
      //   if(row.update_time == null) {
      //   }else {
      //     var dateee = new Date(row.update_time).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      // },
      dateFormat (row, column) {
        var date = new Date(row.update_time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.update_time == null) {
        }else {
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
        var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds())
        return Y+M+D+h+m+s
        }
      },
      //渠道来源
      qrySource() {
        this.loading = true;
        qryMySourceAll({}).then(res => {
          if(res.data.code == 200){
            this.source = res.data.data;
            this.loading = false;
          }
        })
      },
      getList(){
        this.loading = true;
        const visit_time_FROM_cnd = this.createTime[0];
        const visit_time_TO_cnd = this.createTime[1];
        qryQuDaoSl({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.slData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        if(!this.createTime){
          qryQuDaoSl({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.slData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
            })
        }else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          qryQuDaoSl({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.slData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getList(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getList(this.pageSize,val);
      },
      //按钮
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //点击编辑弹出对话框dialog
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      //查看渠道缩量
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '渠道缩量详情'
        qrySourceByLgnId({id: row.id}).then(res => {
          if(res.data.code == 200) {
            this.peopleDetail = res.data.data.user;
            this.peopleLogin = res.data.data.login;
            this.source = this.peopleDetail.source;
            var time  = this.peopleDetail.updateTime;
            this.sl = this.peopleDetail.sl;
            this.updateTime = new Date(+new Date(time ) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            if(this.peopleLogin == null || this.userName == null) {
              this.userName = ""
            }else{
              this.userName = this.peopleLogin.userName;
            }
          }
        })
      },
      //修改
      handleEdit(index, row) {
        let _row = row;
        this.form = Object.assign({}, _row)
        this.dialogVisible = true
        this.dialogTitle = '修改渠道缩量'
        // console.log(row.id)
        qrySourceByLgnId({id: row.id}).then(res => {
          if(res.data.code == 200) {
            this.peopleDetail = res.data.data.user;
            this.peopleLogin = res.data.data.login;
            this.dataForm.source = this.peopleDetail.source;
            var time  = this.peopleDetail.updateTime;
            this.dataForm.sl = this.peopleDetail.sl;
            this.dataForm.updateTime = new Date(+new Date(time ) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            if(this.peopleLogin == null || this.userName == null) {
              this.dataForm.userName = ""
            }else{
              this.dataForm.userName = this.peopleLogin.userName;
            }
          }
        })
      },
      //添加
      handleAdd(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '新增渠道缩量'
        this.dataForm.userName = ''
        this.dataForm.source = ''
        this.dataForm.sl = ''
        this.dataForm.updateTime = ''
        this.form.id = ''
      },
      //新增渠道缩量
      handleAddSubmit(option) {
        // console.log(this.form)
        //表单验证
        // this.$refs.dataForm.resetFields();
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            // this.$refs.dataForm.resetFields();
            //渠道缩量保存接口传值
            saveQdaoSlList({
              id: '',
              sl: this.dataForm.sl,
              updateTime: this.dataForm.updateTime,
              userName: this.dataForm.userName,
              userCode: this.dataForm.source,
            }).then(res => {
                if(res.data.code == 200) {
                  this.getList(this.pageSize,this.currentPage);
                  this.$refs.dataForm.resetFields();
                  this.$message.success(`${res.data.message}`)
                }else {
                  this.$message.error(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
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
      //保存渠道缩量
      handleSubmit(option) {
        // console.log(this.form)
        //表单验证
        // this.$refs.dataForm.resetFields();
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            // this.$refs.dataForm.resetFields();
            //渠道缩量保存接口传值
            saveQdaoSlList({
              id: this.form.id,
              sl: this.dataForm.sl,
              updateTime: this.dataForm.updateTime,
              userName: this.dataForm.userName,
              userCode: this.dataForm.source,
            }).then(res => {
                if(res.data.code == 200) {
                  this.getList(this.pageSize,this.currentPage);
                  this.$refs.dataForm.resetFields();
                  this.$message.success(`${res.data.message}`)
                }else {
                  this.$message.error(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
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
      //点击编辑弹出对话框dialog
      closeDiv(){
        this.dialogVisible = false;
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisible = false;
      },
      onDialogSubmit() {

      }
    },
    activated() {
      this.getList();
    },
    mounted () {
      // this.getList();
    },
    created(){
      // this.getList();
    },
    watch: {
      '$route' () {
        // this.getList();
      }
    }
  }
</script>
