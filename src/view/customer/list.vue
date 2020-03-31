
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        55
      </p> -->
      <Row style=" margin-left: -30px">
        <div class="demo-input-suffix">
          <div class="searchc">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="searchc">
            <el-input placeholder="请输入姓名" style="width: 180px" v-model="user_name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="user_name" icon="search" placeholder="请输入姓名" style="width: 180px" /> -->
          <div class="searchc">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="id_card" icon="search" placeholder="请输入身份证号" style="width: 180px" /> -->
          <div class="searchc">
            <el-input placeholder="请输入银行卡号" style="width: 180px" v-model="bank_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="bank_card" icon="search" placeholder="请输入银行卡号" style="width: 180px" /> -->
          <div class="searchc">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              align="right">
            </el-date-picker>
          </div>
          <div class="searchc">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <div class="searchc">
            <el-select v-model="status_cnd" placeholder="请选择状态" style="width:180px">
              <el-option  value="">请选择状态</el-option>
              <el-option label="正常" value="0">正常</el-option>
              <el-option label="禁用" value="1">禁用</el-option>
            </el-select>
          </div>
          <div class="searchc">
            <el-select v-model="user_auth_cnd" placeholder="请选择认证状态" style="width:180px">
              <el-option  value="">请选择认证状态</el-option>
              <el-option label="未认证" value="0">未认证</el-option>
              <el-option label="身份证" value="1">身份证</el-option>
              <el-option label="联系人" value="2">联系人</el-option>
              <el-option label="银行卡" value="3">银行卡</el-option>
              <el-option label="vip" value="4">vip</el-option>
            </el-select>
          </div>
           <div class="searchc">
            <el-select v-model="is_pay_cnd" placeholder="请选择支付状态" style="width:180px">
              <el-option  value="">请选择支付状态</el-option>
              <el-option label="未支付" value="0">未支付</el-option>
              <el-option label="已支付" value="4">已支付</el-option>
            </el-select>
          </div>
          <div class="searchc" style="float: right">
            <el-button @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button  @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
          <!-- <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增客户</el-button> -->
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="customerData"
          border
          style="width: 100%; align: center">
          <el-table-column
            fixed="left"
            label="序号"
            type="index"
						align="center"
            width="50">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="mobile"
            sortable
						align="center"
            label="手机号"
            width="150">
          </el-table-column>
					<el-table-column
            :formatter="dateFormat"
            prop="create_time"
            label="注册时间"
            sortable
						align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
						align="center"
            label="来源"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            sortable
						align="center"
            label="姓名"
            width="110">
          </el-table-column>
					<el-table-column
            prop="id_card"
            sortable
						align="center"
            label="身份证号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="bank_card"
            sortable
						align="center"
            label="银行卡号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
						align="center"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.row.user_auth == '身份认证' ? '身份认证' : scope.row.user_auth == '联系人' ? '联系人' :
              scope.row.user_auth == '银行卡' ? '银行卡' : scope.row.user_auth == 'vip' ? 'vip' : '未认证'}}
            </template>
          </el-table-column>
					<el-table-column
            prop="pay_amt"
            sortable
						align="center"
            label="已支付金额"
            width="120">
          </el-table-column>
          <el-table-column
            label="用户状态"
            sortable
            align="center"
            width="130">
            <template slot-scope="scope">
              <el-switch
                class="switchStyle"
                style="width: 80px"
                v-model="scope.row.status"
                inactive-text="禁用"
                inactive-value="1"
                active-text="启用"
                active-value="0"
                inactive-color="#e8e4f3"
                @change="changeSwitch(scope.row)"
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="订单状态"
            sortable
            align="center"
            width="130">
            <template slot-scope="scope" v-if="scope.row.user_auth == 'vip' && scope.row.orderStatus== '1' || scope.row.orderStatus== '5'">
              <el-switch
                class="switchStyle"
                style="width: 80px"
                v-model="scope.row.orderStatus"
                inactive-text="止付"
                inactive-value="5"
                active-text="续付"
                active-value="1"
                inactive-color="#e8e4f3"
                @change="changeOrderSwitch(scope.row)"
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
						align="center"
            sortable
            width="120">
          </el-table-column>

          <!-- <el-table-column
            label="状态"
						align="center"
            sortable
            width="110">
            <template slot-scope="scope">
              {{scope.row.status == '0' ? '正常' : scope.row.status == '1' ? '禁用' : '未知'}}
            </template>
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" size="mini"><router-link :to="{path:'/customer/list/customerInfo',query:{ id:scope.row.id,view: 1 }}" class="around">查看</router-link></el-button>
              <!-- <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button> -->
              <!-- <el-button @click="handleView(scope.row)" type="text" size="small">修改</el-button> -->
              <el-button @click="handleEdit(scope.row)" v-if="scope.row.user_auth != '未知'" size="mini"><router-link :to="{path:'/customer/list/customerInfo',query:{ id:scope.row.id,view: 2 }}" class="around">修改</router-link></el-button>
              <!-- <el-button type="danger" @click="handleDisabled(scope.row)" size="mini" v-if="scope.row.status == 0">禁用</el-button>
              <el-button @click="handleRecover(scope.row)" type="warning" size="mini" v-else>恢复</el-button> -->
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
        :current-page.sync="pageNum"
        :page-sizes="[5,10,20,30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </Card>
        <!-- <Card style="margin-top: 20px">
         	<p slot="title">
            <Icon type="help-buoy"></Icon>
              金额统计
          </p>
            <div style="margin-bottom: 10px">
              <span style="margin-right: 15px;color: #000">今日支付金额日期:</span><el-date-picker
                v-model="createTime1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="注册开始日期"
                end-placeholder="注册结束日期"
                align="right">
              </el-date-picker>
            </div>
            <el-table
              v-loading="loading"
              :data="customerMoney"
              border
              style="width: 100%">
                  <el-table-column
                    label="今日支付金额"
                    fixed
                    align="center"
                    prop="pay_time"
                    sortable>
                 
                  </el-table-column>
              <el-table-column
                prop="pay_amt"
                label="总支付金额"
                align="center"
                sortable>
              </el-table-column>
            </el-table>
        </Card> -->

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
    @import '../../styles/common.less';
    // @import './components/table.less';
    .main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .searchc {
      float: left;
      margin-left: 30px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    a{
      color: #606266;
      font-size: 12px;
    }
    a:hover{
      color: #409eff;
      font-size: 12px;
    }
    .switchStyle .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
    }
    .switchStyle .el-switch__label--left {
      z-index: 9 !important;
      left: 19px !important;
    }
    .switchStyle .el-switch__label--right {
      z-index: 9 !important;
      left: 1px !important;
    }
    .switchStyle .el-switch__label--left {
      z-index: 1 !important;
      right: 18px !important;
    }
    .switchStyle .el-switch__label--right {
      z-index: 1 !important;
      left: -1px !important;
    }
    .switchStyle .el-switch__label.is-active {
      display: block;
    }
   /* .el-switch__label{
      font-size: 13px;
    }
    .el-switch .is-checked .el-switch__core{
      border-color: #409EFF !important;
      background-color: #409EFF !important;
    }*/
    .switchStyle .el-switch__core {
      width: 60px !important;
    }
    .ivu-row {
      // margin-left: -30px;
    }
</style>
<script>
import * as table from './data/table';
import {customerList,qrySourceAll,qryCustomerMoneyAll,updateCustomer,exportCustomer,updateCustomerOrder} from '../../api/customer';
  export default {
    inject: ['reload'],
      data () {
        return {
          loading: true,
          mobile_cnd: '',
          user_name_cnd: '',
          id_card_cnd: '',
          user_auth_cnd: '',
          is_pay_cnd: '',
          bank_card_cnd: '',
          source_cnd: '',
          status_cnd: '',
          status: [],
          customerData: [],
          mobile: '',
          source: '',
          user_name: '',
          id_card: '',
          bank_card: '',
          user_auth: '',
          dialogVisibleYes: false,
          dialogVisibleNo: false,
          createTime: '',
          createTime1: '',
          create_time: '',
          mobile: '',
          status: '',
          user_auth: '',
          customerMoney: [],
          pay_amt: '',
          pay_time: '',
          status: '',
          status1: '',
          searchProductName: '',
          // 初始化信息总条数
         // 初始化信息总条数
          pageSize:5,
          pageNum: 1,
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
      //   // var dateee = new Date(row.create_time).toJSON();
      //   // return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
      //客户来源
      qrySource() {
        this.loading = true;
        qrySourceAll({}).then(res => {
          if(res.data.code == 200){
            this.source = res.data.data;
            this.loading = false;
          }
        })
      },
      //客户汇总列表
      // getMoney(){
      //   this.loading = true;
      //   if(this.createTime && this.createTime1) {
      //     qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
      //     bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
      //     pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
      //     create_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],create_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] }).then(res=>{
      //       if(res.data.code == 200) {
      //         this.customerMoney = res.data.data;
      //         this.loading = false;
      //       }
      //     })
      //   }else if(this.createTime && !this.createTime1){
      //       qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
      //         bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
      //         pay_time_FROM_cnd: "",pay_time_TO_cnd:"",
      //         create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
      //         if(res.data.code == 200) {
      //         this.customerMoney = res.data.data;
      //         this.loading = false;
      //       }
      //     })
      //   }else if(!this.createTime && this.createTime1){
      //     qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
      //         bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
      //         pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
      //         create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
      //         if(res.data.code == 200) {
      //         this.customerMoney = res.data.data;
      //         this.loading = false;
      //       }
      //     })
      //   }else{
      //     qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
      //         bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
      //         pay_time_FROM_cnd: "",pay_time_TO_cnd:"",
      //         create_time_FROM_cnd: "",create_time_TO_cnd:""}).then(res=>{
      //         if(res.data.code == 200) {
      //         this.customerMoney = res.data.data;
      //         this.loading = false;
      //       }
      //     })
      //   }
      // },
      //获取客户列表
      getCList(){
        this.loading = true;
        if(this.createTime && this.createTime1) {
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
              bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
              pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
              create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
              if(res.data.code == 200) {
                this.customerData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
                      
              }
          })
        }else if(this.createTime && !this.createTime1){
            customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
              bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
              pay_time_FROM_cnd: "",pay_time_TO_cnd:"",
              create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
              if(res.data.code == 200) {
                this.customerData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
                      
              }
          })
        }else if(!this.createTime && this.createTime1){
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
              bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
              pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
              create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.customerData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
                      
              }
          })
        }else{
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
              bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
              pay_time_FROM_cnd: "",pay_time_TO_cnd:"",
              create_time_FROM_cnd: "",create_time_TO_cnd:""}).then(res=>{
              if(res.data.code == 200) {
                this.customerData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;  
              }
          })
        }
       
        
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.pageNum = 1;
        if(!this.createTime && this.createTime1) {
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
           pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
          create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.customerData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          // qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          // bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          // pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
          // create_time_FROM_cnd: "",create_time_TO_cnd:""}).then(res=>{
          //   if(res.data.code == 200) {
          //     this.customerMoney = res.data.data;
          //     this.loading = false;
          //   }
          // })
        }
        else if(!this.createTime1 && this.createTime) {
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          pay_time_FROM_cnd: "",pay_time_TO_cnd:"" ,
          create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.customerData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          // qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          // bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          // pay_time_FROM_cnd: "",pay_time_TO_cnd:"" ,
          // create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
          //   if(res.data.code == 200) {
          //     this.customerMoney = res.data.data;
          //     this.loading = false;
          //   }
          // })
        }
        else if(!this.createTime1 && !this.createTime) {
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          pay_time_FROM_cnd: "",pay_time_TO_cnd:"" ,
          create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.customerData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          // qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          // bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          // pay_time_FROM_cnd: "",pay_time_TO_cnd:"" ,
          // create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
          //   if(res.data.code == 200) {
          //     this.customerMoney = res.data.data;
          //     this.loading = false;
          //   }
          // })
        }
        else{
          customerList({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
          create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.customerData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          // qryCustomerMoneyAll({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
          // bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
          // pay_time_FROM_cnd: this.createTime1[0] == undefined ? "" : this.createTime1[0],pay_time_TO_cnd:this.createTime1[1] == undefined ? "" : this.createTime1[1] ,
          // create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
          //   if(res.data.code == 200) {
          //     this.customerMoney = res.data.data;
          //     this.loading = false;
          //   }
          // })
        }
      },
      //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getCList(val,this.pageNum);
      },
      handleCurrentChange: function (val) {
        this.pageNum = val;
        this.getCList(this.pageSize,val);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //导出接口
      downloadExcel(){
        this.$alert('确定要导出该表格吗？','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() => {
          exportCustomer({pageSize: this.pageSize,pageNum: this.pageNum,mobile_cnd: this.mobile_cnd,user_name_cnd: this.user_name_cnd,id_card_cnd: this.id_card_cnd,
        bank_card_cnd: this.bank_card_cnd,user_auth_cnd: this.user_auth_cnd,is_pay_cnd:this.is_pay_cnd,status_cnd:this.status_cnd,source_cnd: this.source_cnd,
        pay_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],pay_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] ,
        create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.exportData = res.data.data;
              this.excelData = this.exportData;
              this.export2Excel();
            }
        })
        }).catch(() => {

        });
      },
      export2Excel(){
        var that = this;
        require.ensure([],() => {
          const {export_json_to_excel } = require('../../excel/export2Excel');
          const tHeader = ['手机号','注册时间','来源','姓名','身份证号','银行卡号','认证状态','已支付金额','状态','备注'];
          const filterVal = ['mobile','create_time','source','user_name','id_card','bank_card','user_auth','pay_amt','status','remark'];
          const list = that.excelData;
          const data = that.formatJson(filterVal,list);
          export_json_to_excel(tHeader,data,'客户列表');
        })
      },
      formatJson(filterVal,jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //禁用/恢复
      changeSwitch(row,d) {
        updateCustomer({id: row.id,status: row.status == 0 ? "0" : row.status == 1 ? "1" : ""})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getCList(this.pageSize,this.pageNum);
            }else if(res.data.code == 401){
              this.$message.error(`${res.data.message}`)
              this.$router.push("/login");
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
            })
      },
       //止付/续付
      changeOrderSwitch(row,d) {
        updateCustomerOrder({id: row.id,orderStatus: row.orderStatus == "1" ? "1" : row.orderStatus == "5" ? "5" : ""})
          .then(res => {
            if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getCList(this.pageSize,this.pageNum);
            }else if(res.data.code == 401){
              this.$message.error(`${res.data.message}`)
              this.$router.push("/login");
            }
            else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
            })
      },
      //禁用
       handleDisabled(row) {
        this.$confirm('确定要禁用该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateCustomer({id: row.id,status: "1"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getCList(this.pageSize,this.pageNum);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          })
      },
      //恢复
      handleRecover(row) {
        this.$confirm('确定要恢复该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateCustomer({id: row.id,status: "0"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getCList(this.pageSize,this.pageNum);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          })
      },

      handleView(row) {
        // this.reload();
        this.$router.push({ path:'/customer/list/customerInfo?id='+row.id+'&view='+1  })
      },
      handleEdit(row) {
        // this.reload();
        this.$router.push({ path:'/customer/list/customerInfo?id='+row.id+'&view='+2  })
      }
    },
    mounted () {
      // this.getCList();
      // this.getMoney();
    },
    created(){
      // this.getCList();
      // this.getMoney();
    },
    activated() {
      this.getCList();
      if(!this.$route.meta.isBack){
      }
      if(this.$route.meta.isBack == false && this.createTime && this.createTime1){
        this.pageNum = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.user_name_cnd = '',
        this.id_card_cnd = '',
        this.bank_card_cnd = '',
        this.user_auth_cnd = '',
        this.is_pay_cnd = '',
        this.status_cnd = '';
        this.source_cnd = '';
        this.createTime = [];
        this.createTime1 = [];
        this.createTime[0] = '';
        this.createTime[1] = '';
        this.createTime1[0] = '';
        this.createTime1[1] = '';
        // this.handleSearch();
        // this.getCList();
        // this.getMoney();
      }
      if(this.$route.meta.isBack == false && this.createTime && !this.createTime1){
        this.pageNum = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.user_name_cnd = '',
        this.id_card_cnd = '',
        this.bank_card_cnd = '',
        this.user_auth_cnd = '',
         this.is_pay_cnd = '',
        this.status_cnd = '';
        this.source_cnd = '';
        this.createTime = [];
        this.createTime1 = [];
        this.createTime[0] = '';
        this.createTime[1] = '';
        this.createTime1[0] = '';
        this.createTime1[1] = '';
        // this.handleSearch();
        // this.getCList();
        // this.getMoney();
      }
      if(this.$route.meta.isBack == false && this.createTime1  && !this.createTime){
        this.pageNum = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.user_name_cnd = '',
        this.id_card_cnd = '',
        this.bank_card_cnd = '',
        this.user_auth_cnd = '',
         this.is_pay_cnd = '',
        this.status_cnd = '';
        this.source_cnd = '';
         this.createTime = [];
        this.createTime1 = [];
        this.createTime[0] = '';
        this.createTime[1] = '';
        this.createTime1[0] = '';
        this.createTime1[1] = '';
        // this.handleSearch();
        // this.getCList();
        // this.getMoney();
      }
      if(this.$route.meta.isBack == false && !this.createTime1 && !this.createTime){
        this.pageNum = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.user_name_cnd = '',
        this.id_card_cnd = '',
        this.bank_card_cnd = '',
        this.user_auth_cnd = '',
         this.is_pay_cnd = '',
        this.status_cnd = '';
        this.source_cnd = '';
        // this.handleSearch();
        // this.getCList();
        // this.getMoney();
      }
      
      // this.$route.meta.isBack = false;
    },
    beforeRouteEnter (to, from, next) {
      if(from.path == '/customer/list/customerInfo'){
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
        // location.reload();
        // this.reload();
        // this.getCList();
        // this.getMoney();
      }
    }
  }
</script>







