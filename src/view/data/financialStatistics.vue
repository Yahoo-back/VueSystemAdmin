<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
    }
    .ivu-row {
      // margin-left: -30px;
    }
    .search1 {
      float: left;
      margin-left: 30px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        财务统计
      </p> -->
      <Row style=" margin-left: -30px">
        <div class="demo-input-suffix">
           <div class="search1">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <div class="search1">
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
          <div>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="financeData"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
						align="center"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="cpaPay"
            sortable
						align="center"
            label="CPA金额（缩量后注册人数 x 渠道CPA）">
          </el-table-column>
          <el-table-column
            prop="uvPay"
            sortable
						align="center"
            label="uvCPA金额（缩量后uv人数 x 渠道CPA）">
          </el-table-column>
          <el-table-column
            prop="withholdPay"
            sortable
						align="center"
            label="已扣款金额">
          </el-table-column>
          <el-table-column
            prop="clickPay"
            sortable
						align="center"
            label="点击CPA金额（点击次数 x 商品CPA）">
          </el-table-column>
          <el-table-column
            prop="payPercent"
            sortable
						align="center"
            label="扣款转化率（已扣款金额 / 应扣款金额）">
          </el-table-column>
          <el-table-column
            prop="cpaPercent"
            sortable
						align="center"
            label="CPA转化率（CPA金额 或 uvCPA金额 / 已扣款金额）">
          </el-table-column>
          <el-table-column
            prop="profit"
            sortable
						align="center"
            label="利润（点击CPA金额 + 已扣款金额 - CPA金额）">
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
import {formatDate} from '../../utils/index.js';
import {qrySourceAll,qryDataFinanceReportList} from '../../api/dataSta';
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
var now = new Date();
var timeStart = now.format('yyyy-MM-dd 00:00:00');
var tomorrow = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
var timeEnd = tomorrow.format("yyyy-MM-dd 00:00:00");
  export default {
      data () {
        return {
          loading: true,
          source_cnd: '',
          createTime: [timeStart,timeEnd],
          source: '',
          financeData: [],
          // 初始化信息总条数
          pageSize:10,
          pageNum: 1,
          total: 10,
          today: '',
          tomorrow: '',
        }
    },
    methods:{
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
      //财务统计列表
      getFList(){
        this.loading = true;
        if(!this.createTime) {
        qryDataFinanceReportList({pageSize: this.pageSize,pageNum: this.pageNum,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
           if(res.data.code == 200) {
             this.financeData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }else{
          qryDataFinanceReportList({pageSize: this.pageSize,pageNum: this.pageNum,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.financeData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }
      },
      //查询
      handleSearch() {
        this.loading = true;
        this.pageNum = 1;
        if(!this.createTime){
          qryDataFinanceReportList({pageSize: this.pageSize,pageNum: this.pageNum,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.financeData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
          })
        }else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          qryDataFinanceReportList({pageSize: this.pageSize,pageNum: this.pageNum,source_cnd: this.source_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.financeData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
       //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getFList(val,this.pageNum);
      },
      handleCurrentChange: function (val) {
        this.pageNum = val;
        this.getFList(this.pageSize,val);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    computed: {
    },
    activated() {
      this.createTime = [timeStart,timeEnd]
      this.getFList();
    },
    mounted () {
      // this.getFList();
    },
    created(){
      // this.getFList();
    },
    watch: {
      '$route' () {
        // this.getFList()
      }
    }
  }
</script>
