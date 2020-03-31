<style lang="less">
    @import '../../styles/common.less';
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
    .ivu-row {
      // margin-left: -40px;
    }
    .el-form-item__label {
      color: #606266;
    }
    a {
      color: #606266;
    }
    .el-dialog {
      width: 40%;
      -webkit-box-shadow: none;
      box-shadow: none;
    //  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
    //  box-shadow: 0 1px 1px rgba(0,0,0,.3);
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        我的客户列表
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="MyCData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            align="center"
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            prop="mobile"
            sortable
            align="center"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id_card"
            sortable
            align="center"
            label="身份证号"
            width="170">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="create_time"
            sortable
            align="center"
            label="注册时间"
            width="240">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            sortable
            align="center"
            width="160">
          </el-table-column>
           <el-table-column
            prop="bank_card"
            label="银行卡号"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.user_auth == '身份认证' ? '身份认证' : scope.row.user_auth == '联系人' ? '联系人' : scope.row.user_auth == '银行卡' ? '银行卡' : scope.row.user_auth == 'vip' ? 'vip' : '未认证'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="pay_amt"
            label="已支付金额"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '正常' : scope.row.status == 1 ? '禁用' : '未知'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="remark"
            label="备注"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="320">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" size="small"><router-link :to="{path:'/complaint/myCustomer/myCustomerInfo',query:{ id:scope.row.id,view: 1 }}" class="around"  style="color: #606266">查看</router-link></el-button>
              <el-button @click="cancleOrder(scope.row)" size="small" v-if="scope.row.refundStatus == '5'">取消跟单</el-button>
              <el-button @click="handleRebacks(scope.row)" size="small" v-if="scope.row.refundStatus == '5'">退款</el-button>
              <el-button @click="handleRefuses(scope.row)" size="small" v-if="scope.row.refundStatus == '5'">驳回</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleSale"
                :append-to-body='true'
                width="30%"
                :close-on-click-modal='false'
                :before-close="handleClose">
                <span>确定要取消跟单吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleSale = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleSale = false">确 定</el-button>
                </span>
              </el-dialog>
							<!-- <el-button @click="handleReback(scope.row)" type="text" size="small" v-if="scope.row.refundStatus == '5'">退款</el-button>
							<el-button @click="handleRefuse(scope.row)" type="text" size="small" v-if="scope.row.refundStatus == '5'">驳回</el-button> -->
              
              <el-dialog :append-to-body='true' title="退款" :visible.sync="dialogVisibles" :before-close="closeDiv"  @close="onDialogClose()" :close-on-click-modal='false' >
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                  <el-form-item label="退款金额：" prop="money">
                    <el-col :span="16">
                      <el-input v-model="form.money" :placeholder="holder"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="退款凭证：" prop="file_url">
                    <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.file_url"></image-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleCancle()">关闭</el-button>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                  
                </div>
              </el-dialog>
							
               <el-dialog :append-to-body='true' title="驳回" :visible.sync="dialogVisibless" :before-close="closeDiv"  @close="onDialogClose()" :close-on-click-modal='false'>
                <el-form ref="forms" :model="forms" :rules="ruless" label-width="120px">
                  <el-form-item label="驳回凭证：" prop="file_url">
                    <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="forms.file_url"></image-upload>
                  </el-form-item>
              </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleCancles()">关闭</el-button>
                  <el-button type="primary" @click="onSubmits">保存</el-button>
                  
                </div>
              </el-dialog>
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
<style lang="less">
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import ImageUpload from "../product/components/uploadImg"
import {upload} from '../../api/productManage';
import {saveRefund} from '../../api/complaint';
import {qryMyRefund,updateOrderAuditStatus} from '../../api/complaint';
import * as table from './data/table';
  export default {
    inject: ['reload'],
    components: {ImageUpload},
      data () {
        return {
          loading: true,
          holder: '',
          MyCData: [],
          mobile_cnd: '',
          id_card_cnd: '',
          dialogVisibles: false,
          dialogVisibless: false,
          dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
          createTime: '',
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
          pay: '',
          form: {
            money: '',
            file_url: ''
          },
          file_url: '',
          rules: {
            money: [
              { required: true, message: '请输入退款金额应小于已支付金额', trigger: 'blur' },
            ],
            file_url: [
              { required: true, message: '最多可上传一张退款凭证', trigger: 'blur' }
            ],
          },
          forms: {
            file_url: ''
          },
           ruless: {
            file_url: [
              { required: true, message: '最多可上传一张驳回凭证', trigger: 'blur' }
            ],
          }
        }
    },
    methods:{
      // dateFormat (row, column) {
      //   if(row.create_time == null) {
      //   }else {
      //     var dateee = new Date(row.create_time).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      // },
      dateFormat (row, column) {
        var date = new Date(row.create_time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.create_time == null) {
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
      //获取列表
      getList(){
        this.loading = true;
        qryMyRefund({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.MyCData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      handleSearch() {
        this.loading = true;
        this.currentPage = 1;
        qryMyRefund({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.cData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //取消跟单
      cancleOrder(row) {
        this.$alert('确定要取消跟单吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateOrderAuditStatus({id: row.id,status: "1"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getList(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
       //退款
      handleRebacks(row) {
        let _row = row;
        this.forms = Object.assign({}, _row)
        // this.form.money = this.forms.pay_amt;
        this.holder = "请输入退款金额应小于已支付金额"+this.forms.pay_amt+"元";
        this.dialogVisibles = true
        this.dialogTitle = '退款'
      },
      //保存
      onSubmit() {
        this.handleRebacks(this.forms)
         this.holder = "请输入退款金额应小于已支付金额"+this.forms.pay_amt+"元";
        //  console.log(this.forms.id)
        this.$refs.form.validate((valid) => {
          if (valid) {
            saveRefund({
              id:this.forms.id,
              money: this.form.money,
              file_url: this.form.file_url
            })
            .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$refs.form.resetFields();
                  this.dialogVisibles = false;
                  this.getList();
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
      },
      //驳回
      handleRefuses(row) {
        let _row = row;
        this.forms = Object.assign({}, _row)
        this.dialogVisibless = true
        this.dialogTitle = '驳回'
      },
      onSubmits() {
        this.handleRefuses(this.forms)
        //  console.log(this.forms.id)
        this.$refs.forms.validate((valid) => {
          // console.log(this.forms)
          if (valid) {
            saveRefund({
              id:this.forms.id,
              file_url: this.forms.file_url
            })
            .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$refs.forms.resetFields();
                  this.dialogVisibless = false;
                  this.getList();
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
      closeDiv(){
        this.dialogVisibles = false;
        this.dialogVisibless = false;
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisibles = false;
        this.dialogVisibless = false;
      },
       //取消按钮
      handleCancle () {
        this.dialogVisibles= false;
        this.$refs.form.resetFields();
      },
      handleCancles () {
        this.dialogVisibless= false;
        this.$refs.forms.resetFields();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleView(row) {
        //点击取消后列表页面刷新
        // window.location.href = '/complaint/myCustomer/myCustomerInfo?id='+row.id
        //点击取消后列表页面不刷新，且接口报undefined
        this.$router.push({ path:'/complaint/myCustomer/myCustomerInfo?id='+row.id+'&view='+1 })
      },
      // handleReback(row) {
      //   this.$router.push({ path:'/complaint/myCustomer/myReback?id='+row.id  })
      // },
      // handleRefuse(row) {
      //   this.$router.push({ path:'/complaint/myCustomer/myRefuse?id='+row.id })
      // }
    },
    computed: {
      vpcPlaceholder() {
        return this.form.money
      }
    },
    mounted () {
      // this.getList();
    },
    created(){
      // this.getList();
    },
    activated() {
      this.getList();
      if(!this.$route.meta.isBack){
      }
      if(this.$route.meta.isBack == false){
        this.currentPage = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.id_card_cnd = '';
        // this.handleSearch();
        // this.getList();
      }
    },
    beforeRouteEnter (to, from, next) {
      if(from.path == '/complaint/myCustomer/myCustomerInfo'){
        to.meta.keepAlive = true;
        to.meta.isBack = true;
      }else{
        to.meta.keepAlive = false;
        to.meta.isBack = false;
      }
      next();
    },
    watch: {
      '$route' () {
        // this.reload();
        // this.getList();
      }
    }
  }
</script>
