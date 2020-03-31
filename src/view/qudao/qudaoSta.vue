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
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <!-- <div class="search">
            <el-select @click.native="qrySource" v-model="source_cnd" placeholder="请选择来源" style="width:180px">
              <el-option  value="">请选择来源</el-option>
              <el-option v-for="item in source" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
            </el-select>
          </div> -->
          <div class="search">
            <el-date-picker
              v-model="visit_time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              value-format="yyyy-MM-dd 00:00:00" format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </div>
          <div class="search" style="float: right">
            <el-button type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px">查询</el-button>
          </div>
				</div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="qdList"
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
            prop="visit_time"
            label="访问时间"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="uv"
            sortable
						align="center"
            label="点击">
          </el-table-column>
          <el-table-column
            prop="count"
            label="验证码注册"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="none"
            sortable
						align="center"
            label="未认证">
          </el-table-column>
          	<el-table-column
            prop="face"
            label="身份证"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="per"
            label="联系人"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="bank"
            sortable
						align="center"
            label="银行卡">
          </el-table-column>
          <el-table-column
            prop="concat"
            sortable
						align="center"
            label="运营商">
          </el-table-column>
          <!-- <el-table-column
            prop="yun"
            label="运营商"
            sortable
						align="center">
          </el-table-column> -->
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
     <Card style="margin-top: 20px">
      <p slot="title">
        <Icon type="help-buoy"></Icon>
        金额统计
      </p>
      <el-table
        v-loading="loading"
        :data="qdSum"
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
          prop="uv"
          sortable
					align="center"
          label="点击总数">
        </el-table-column>
				<el-table-column
          prop="count"
          label="验证码注册总数"
          sortable
					align="center">
        </el-table-column>
        <el-table-column
          prop="none"
          sortable
					align="center"
          label="未认证">
        </el-table-column>
        <el-table-column
          prop="face"
          label="身份证"
          sortable
					align="center">
        </el-table-column>
        <el-table-column
          prop="bank"
          sortable
					align="center"
          label="银行卡">
        </el-table-column>
        <el-table-column
          prop="per"
          label="联系人"
          sortable
					align="center">
        </el-table-column>
        <el-table-column
          prop="concat"
          sortable
					align="center"
          label="运营商">
        </el-table-column>
        <el-table-column
          prop="yun"
          label="放款"
          sortable
					align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="pay"
          label="放款"
          sortable
					align="center">
        </el-table-column> -->
      </el-table>
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
import {qryQuDaoDataSourceList,qryMySourceAll,qryQuDaoDataSourceSum} from '../../api/qudao.js';
  export default {
      data () {
        return {
          loading: true,
           visit_time: [timeStart,timeEnd],
          // visit_time: '',
          source_cnd: '',
          qdList: [],
          qdSum: [],
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
        }
    },
    methods:{
      // dateFormat (row, column) {
      //   if(row.visit_time == null) {
      //   }else {
      //     var dateee = new Date(row.visit_time).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      // },
      dateFormat (row, column) {
        var date = new Date(row.visit_time+'+08:00') //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.visit_time == null) {
        }else {
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = (date.getDate()< 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours()< 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
        // var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
        // var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds())
        return Y+M+D+h
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
      //获取列表
      getList(){
        this.loading = true;
        const visit_time_FROM_cnd = this.visit_time[0];
        const visit_time_TO_cnd = this.visit_time[1];
        qryQuDaoDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.visit_time[0] == undefined ? "" : this.visit_time[0],visit_time_TO_cnd:this.visit_time[1] == undefined ? "" : this.visit_time[1] }).then(res=>{
           if(res.data.code == 200) {
             this.qdList = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //获取列表
      getSumList(){
        this.loading = true;
        const visit_time_FROM_cnd = this.visit_time[0];
        const visit_time_TO_cnd = this.visit_time[1];
        qryQuDaoDataSourceSum({source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.visit_time[0] == undefined ? "" : this.visit_time[0],visit_time_TO_cnd:this.visit_time[1] == undefined ? "" : this.visit_time[1] }).then(res=>{
           if(res.data.code == 200) {
             this.qdSum = res.data.data;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        if(!this.visit_time){
          qryQuDaoDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
          visit_time_FROM_cnd: "",visit_time_TO_cnd:""}).then(res=>{
            if(res.data.code == 200) {
              this.qdList = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          qryQuDaoDataSourceSum({source_cnd: this.source_cnd,
        visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
           if(res.data.code == 200) {
             this.qdSum = res.data.data;
             this.loading = false;
           }
        })
        }else{
          qryQuDaoDataSourceList({pageSize: this.pageSize,pageNum: this.currentPage,source_cnd: this.source_cnd,
          visit_time_FROM_cnd: this.visit_time[0] == undefined ? "" : this.visit_time[0],visit_time_TO_cnd:this.visit_time[1] == undefined ? "" : this.visit_time[1] }).then(res=>{
            if(res.data.code == 200) {
              this.qdList = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
          qryQuDaoDataSourceSum({source_cnd: this.source_cnd,
        visit_time_FROM_cnd: this.visit_time[0] == undefined ? "" : this.visit_time[0],visit_time_TO_cnd:this.visit_time[1] == undefined ? "" : this.visit_time[1] }).then(res=>{
           if(res.data.code == 200) {
             this.qdSum = res.data.data;
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
        this.visit_time = [timeStart,timeEnd]
      this.getList();
      this.getSumList();
    },
    mounted () {
      // this.getList();
      // this.getSumList();
    },
    created(){
      // this.getList();
      // this.getSumList();
    },
    watch: {
      '$route' () {
        // this.getList();
        // this.getSumList();
      }
    }
  }
</script>
