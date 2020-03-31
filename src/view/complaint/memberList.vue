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
</style>
<template>
  <div id="app">
		<Card>
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable /> 
          </div>
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable /> 
          </div>
          <div class="search">
            <el-input placeholder="请输入银行卡号" style="width: 180px" v-model="bank_card_cnd" suffix-icon="el-icon-search" clearable /> 
          </div>
          <div class="search">
            <el-input placeholder="请输入会员订单号" style="width: 180px" v-model="vip_card_cnd" suffix-icon="el-icon-search" clearable /> 
          </div>
          <div>
            <el-button  @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
          <!-- <el-button  @click="handleView" type="primary" size="small" style="margin-left: 20px">新增商品</el-button> -->
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="vipData"
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
            prop="user_name"
            sortable
            align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            sortable
            align="center"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="id_card"
            sortable
            align="center"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="bank_card"
            label="银行卡号"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="pay_amt"
            label="支付金额"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
						:formatter="dateFormat"
            prop="pay_time"
            label="支付时间"
            sortable
            align="center">
          </el-table-column>
           <el-table-column
            prop="orderId"
            label="会员订单号"
            sortable
            align="center">
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
import {qryVipUserList} from '../../api/complaint';
import * as table from './data/table';
  export default {
      data () {
        return {
          loading : true,
          mobile_cnd: '',
          id_card_cnd: '',
          bank_card_cnd: '',
          vip_card_cnd: '',
          vipData: [],
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
        }
    },
    methods:{
    dateFormat (row, column) {
        var date = new Date(row.pay_time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.pay_time == null) {
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
        qryVipUserList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,
        id_card_cnd: this.id_card_cnd,bank_card_cnd: this.bank_card_cnd, vip_card_cnd: this.vip_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.vipData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
          qryVipUserList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,
        id_card_cnd: this.id_card_cnd,bank_card_cnd: this.bank_card_cnd, vip_card_cnd: this.vip_card_cnd}).then(res=>{
            if(res.data.code == 200) {
              this.vipData = res.data.data.list;
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
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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
        // console.log(this.$route.path);
      }
    }
  }
</script>
