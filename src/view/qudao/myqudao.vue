<style lang="less">
    @import '../../styles/common.less';
    .main .single-page-con {
			background: #fff;
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
      width: 60%;
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
    .main .single-page-con {
			background: #fff;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        我的渠道
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div>
          <div class="search">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="用户注册时间"
              end-placeholder="用户注册时间"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </div>
          <div class="search" style="float: right">
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
				</div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="myChannel"
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
            label="来源">
          </el-table-column>
					<el-table-column
            prop="uv"
            label="实际uv数"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="dropUv"
            sortable
						align="center"
            label="缩量uv数">
          </el-table-column>
          <el-table-column
            prop="count"
            label="实际注册数"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="dropCount"
            sortable
						align="center"
            label="缩量注册数">
          </el-table-column>
          <el-table-column
            prop="cpaPay"
            label="CPA金额"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="withholdPay"
            sortable
						align="center"
            label="扣款金额">
          </el-table-column>
          <el-table-column
            prop="order"
            label="认证数"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="orderLead"
            sortable
						align="center"
            label="认证率（%）">
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
<script>
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
import {qryMyChannelList,qryMySourceAll,qrySourceAll} from '../../api/qudao.js';
  export default {
    data () {
      return {
        loading: true,
        myChannel: [],
        source: '',
        createTime: [timeStart,timeEnd],
        source_cnd: '',
        // 初始化信息总条数
        pageSize:10,
        currentPage: 1,
        total: 10,
      }
    },
    methods:{
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
        // const visit_time_FROM_cnd = this.createTime[0];
        // const visit_time_TO_cnd = this.createTime[1];
        this.loading = true;
        if(!this.createTime) {
        qryMyChannelList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
           if(res.data.code == 200) {
             this.myChannel = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }else{
          qryMyChannelList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.myChannel = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        if(!this.createTime){
          qryMyChannelList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.myChannel = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
            })
        }else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          qryMyChannelList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.myChannel = res.data.data.list;
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
    },
    activated() {
      this.createTime = [timeStart,timeEnd]
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
