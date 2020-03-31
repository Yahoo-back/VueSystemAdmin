
<template>
  <div id="app" class="bgColor">
    <Card class="bgFont">
      <el-row :gutter="24">
        <el-col :span="12" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="leftTitle">今日注册人数</span>
              <span class="topTitle">{{this.todayRegisterCount}}</span>
            </div>
            <div class="text item">
              <span class="dTitle">总注册人数：</span><span class="dNum">{{this.sumRegisterCount}}</span>
            </div>
            <div class="text item">
             <span class="dTitle"> 今日uv：</span><span class="dNum">{{this.todayUvCount}}</span>
            </div>
            <div class="text item">
               <span class="dTitle"> 总uv：</span><span class="dNum">{{this.sumUvCount}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="leftTitle">今日VIP人数</span>
               <span class="topTitle">{{this.todayVIPCount}}</span>
            </div>
           <div class="text item">
              <span class="dTitle">今日收款金额：</span><span class="dNum">{{this.todayVIPMoney}}</span>
            </div>
            <div class="text item">
              <span class="dTitle">总VIP人数：</span><span class="dNum">{{this.sumVIPCount}}</span>
            </div>
            <div class="text item">
              <span class="dTitle">总收款金额：</span><span class="dNum">{{this.sumVIPMoney}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="staBottom"> 
            <el-row :gutter="24">
        <el-col :span="8" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="leftTitle">今日申请退款笔数</span>
              <span class="topTitle">{{this.todayApplyRefundCount}}</span>
            </div>
            <div class="text item">
              <span class="dTitle">今日申请退款金额：</span><span class="dNum">{{this.todayApplyRefundMoney}}</span>
            </div>
          </el-card>
        </el-col>
         <el-col :span="8" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="leftTitle">今日退款笔数</span>
              <span class="topTitle">{{this.todayRefundCount}}</span>
            </div>
            <div class="text item">
              <span class="dTitle">今日退款金额：</span><span class="dNum">{{this.todayRefundMoney}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="leftTitle">今日退款失败笔数</span>
                <span class="topTitle">{{this.todayRefundFailedCount}}</span>
            </div>
            <div class="text item">
              <span class="dTitle"> 今日退款失败金额：</span><span class="dNum">{{this.todayRefundFailedMoney}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
  .topTitle{
    font-weight: bold;
    font-size: 25px;
    color: #2d8cf0;
    margin-left: 20px;
  }
  .bgColor{
    /* background: #e9eaec; */
  }
  .bgFont{
    font-size: 16px;
    padding: 30px;
  }
  .box-card{
    background: #f8f8f8;
  }
  .dbTitle{
    font-size: 15px;
    font-weight: bold;
  }
  .leftTitle{
    font-size: 20px;
    color: #646567;
  }
  .dTitle{
    font-size: 18px;
    color: #646567;
  }
  .dNum{
    font-size: 20px;
    font-weight: bold;
    color: #2d8cf0;
    margin-left: 20px;
  }
</style>
<style lang="less">
    @import '../../styles/common.less';
    .main .single-page-con {
		background: #fff;
    }
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
    .switchStyle .el-switch__core {
      width: 60px !important;
    }
    .staBottom{
      margin-top: 50px;
    }
    .ivu-row {
      // margin-left: -30px;
    }
</style>
<script>
import * as table from './data/table';
import {qryBusinessStatistics} from '../../api/customer';
  export default {
    inject: ['reload'],
      data () {
        return {
          loading: true,
          todayRegisterCount: '',
          sumRegisterCount: '',
          todayUvCount: '',
          sumUvCount: '',
          todayVIPCount: '',
          todayVIPMoney: '',
          sumVIPCount:'',
          sumVIPMoney: '',
          todayApplyRefundCount: '',
          todayApplyRefundMoney: '',
          todayRefundCount: '',
          todayRefundMoney: '',
          todayRefundFailedCount: '',
          todayRefundFailedMoney: ''
        }
    },
    mounted () {
    },
    methods: {
      qryStatistics() {
        qryBusinessStatistics({}).then(res => {
          if(res.data.code == 200){
            this.todayRegisterCount = res.data.data.todayRegisterCount;
            this.sumRegisterCount = res.data.data.sumRegisterCount;
            this.todayUvCount = res.data.data.todayUvCount;
            this.sumUvCount = res.data.data.sumUvCount;
            this.todayVIPCount = res.data.data.todayVIPCount;
            this.todayVIPMoney = res.data.data.todayVIPMoney;
            this.sumVIPCount = res.data.data.sumVIPCount;
            this.sumVIPMoney = res.data.data.sumVIPMoney;
            this.todayApplyRefundCount = res.data.data.todayApplyRefundCount;
            this.todayApplyRefundMoney = res.data.data.todayApplyRefundMoney;
            this.todayRefundCount = res.data.data.todayRefundCount;
            this.todayRefundMoney = res.data.data.todayRefundMoney;
            this.todayRefundFailedCount = res.data.data.todayRefundFailedCount;
            this.todayRefundFailedMoney = res.data.data.todayRefundFailedMoney;
          }
        })
      },
    },
    activated() {
      this.qryStatistics()

     }
  }
  
</script>







