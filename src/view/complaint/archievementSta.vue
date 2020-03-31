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
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        客服业绩统计
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
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
          <div class="search">
            <el-input placeholder="请输入姓名" style="width: 180px" v-model="user_name_cnd" suffix-icon="el-icon-search" clearable /> 
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
          :data="sData"
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
            prop="USER_NAME"
            sortable
            align="center"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="audit_new"
            sortable
            align="center"
            label="跟单量">
          </el-table-column>
          <el-table-column
            prop="new_pass_cnt"
            sortable
            align="center"
            label="退款量">
          </el-table-column>
          <el-table-column
            prop="new_pass_rate"
            label="退款率"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="new_reject_cnt"
            label="驳回量"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="new_reject_rate"
            label="驳回率"
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
import {listStatistics} from '../../api/complaint';
import * as table from './data/table';
  export default {
      data () {
        return {
          loading : true,
          user_name_cnd: '',
          createTime: [timeStart,timeEnd],
          sData: [],
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
        }
    },
    methods:{
      //获取列表
      getList(){
        this.loading = true;
        if(!this.createTime) {
        listStatistics({pageSize: this.pageSize,pageNum: this.currentPage,user_name_cnd: this.user_name_cnd,
        visit_time_FROM_cnd: "",visit_time_TO_cnd: "" }).then(res=>{
           if(res.data.code == 200) {
             this.sData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }else{
            listStatistics({pageSize: this.pageSize,pageNum: this.currentPage,user_name_cnd: this.user_name_cnd,
        visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd: this.createTime[1] == undefined ? timeEnd : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.sData = res.data.data.list;
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
          listStatistics({pageSize: this.pageSize,pageNum: this.currentPage,user_name_cnd: this.user_name_cnd,
          visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
            if(res.data.code == 200) {
              this.sData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
        }else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          listStatistics({pageSize: this.pageSize,pageNum: this.currentPage,user_name_cnd: this.user_name_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.sData = res.data.data.list;
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
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
        // console.log(this.$route.path);
      }
    }
  }
</script>
