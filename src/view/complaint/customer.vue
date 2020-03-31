<style lang="less">
    @import '../../styles/common.less';
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
    a {
      color: #606266;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        客户列表
      </p> -->
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="手机号:">
          <el-input v-model="formInline.mobile" placeholder="手机号" @change="handleInput()" style="width: 180px" suffix-icon="el-icon-search" clearable />
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input placeholder="请输入身份证号" style="width: 180px" v-model="formInline.id_card" suffix-icon="el-icon-search" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="isOk">查询</el-button>
          <el-button type="primary" v-if="!isOk">查6询</el-button>
        </el-form-item>
      </el-form> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <!-- 手机号： -->
          <div class="search">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 身份证号： -->
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 控制disabled -->
          <div>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
          <!-- 控制是否显示 -->
          <!-- <el-button v-if="isOk"  @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button> -->
        </div>
      </Row>
      <div style="margin-top: 20px" >
        <el-table
          v-loading="loading"
          :data="cData"
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
            width="180">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="create_time"
            sortable
            align="center"
            label="申请退款时间"
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
            width="190">
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
              {{scope.row.status == "0" ? '正常' : scope.row.status == "1" ? '禁用' : '未知'}}
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
            width="160">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" size="small"><router-link :to="{path:'/complaint/customer/customerInfo',query:{ id:scope.row.id,view: 1}}" class="around" style="color: #606266">查看</router-link></el-button>
              <el-button @click="followOrder(scope.row)" size="small">跟单</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
		</Card>
  </div>
</template>
<style scoped>
.el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
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
import {qryRefund,qryRefundAttachById,updateOrderAuditStatus} from '../../api/complaint';
import * as table from './data/table';
  export default {
    inject: ['reload'],
      data () {
        return {
          loading: true,
          mobile_cnd: '',
          id_card_cnd: '',
          cData: [],
          isShow: false,
          disabled: true,
          isOk: false,
          formInline: {
          mobile: '',
          id_card: '',
          },
          mobile: '',
          id_card: '',
          dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,

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
        qryRefund({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.cData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      handleSearch() {
        this.loading = true;
        this.isShow = true;
        this.currentPage = 1;
        qryRefund({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.cData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
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
      //跟单
      followOrder(row) {
        this.$alert('确定要跟单吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateOrderAuditStatus({id: row.id,status: "0"})
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleView(row) {
        //点击取消后列表页面刷新
        // window.location.href = '/complaint/customer/customerInfo?id='+row.id
        //点击取消后列表页面不刷新，且接口报undefined
        this.$router.push({ path:'/complaint/customer/customerInfo?id='+row.id+'&view='+1  })
      },
      //控制输入框内输入值才可以显示列表数据输入框内添加@change="handleInput()"，table外的div内添加v-show="isShow"search内:disabled="disabled"
      // handleInput(){
      //   //控制disabled
      //   this.mobile_cnd.length || this.id_card_cnd.length >=1 ? this.disabled=false : this.disabled = true;
      //   //控制是否显示
      //   this.mobile_cnd.length || this.id_card_cnd.length >=1 ? this.isOk=true : this.isOk = false;
      // }
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
      if(from.path == '/complaint/customer/customerInfo'){
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
