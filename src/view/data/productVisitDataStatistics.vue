<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .search2 {
      float: left; 
      margin-left: 40px; 
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .ivu-row {
      margin-left: -40px;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        产品访问数据统计
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <!-- 商品名称： -->
          <div class="search2">
           <el-input placeholder="请输入商品名称" style="width: 180px" v-model="product_name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="search2roductName" @on-change="handlesearch2roductName" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
        	<!-- 请选择日期: -->
          <div class="search2">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </div>
          <div class="search2" style="float: right;margin-top: 20px;margin-top: 20px">
            <el-button @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="productVisitData1"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="product_name"
            sortable
						align="center"
            label="商品名称">
          </el-table-column>
					<el-table-column
            prop="count"
            label="访问次数"
            sortable
						align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination 
        background
        style="padding-top: 30px"
        class="pagination"
        @size-change="handleSizeChange1" 
        @current-change="handleCurrentChange1"
        :current-page.sync="currentPage1" 
        :page-sizes="[5,10,20,30,40]" 
        :page-size="pageSize1"
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total1">
      </el-pagination>
		</Card>
		<Card style="margin-top: 20px">
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        产品访问数据统计
      </p>
        <el-table
          v-loading="loading"
          :data="productVisitData2"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="product_name"
            sortable
						align="center"
            label="商品名称">
          </el-table-column>
					<el-table-column
            prop="count"
            label="访问次数"
            sortable
						align="center">
          </el-table-column>
        </el-table>
        <el-pagination 
          background
          style="padding-top: 30px"
          class="pagination"
          @size-change="handleSizeChange2" 
          @current-change="handleCurrentChange2"
          :current-page.sync="currentPage2" 
          :page-sizes="[5,10,20,30,40]" 
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total2">
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
import {qryDataProductListBy1,qryDataProductListBy2,exportDataProductList} from '../../api/dataSta';
import * as table from './data/table';
  export default {
      data () {
        return {
          loading: true,
          productVisitData1: [],
          productVisitData2: [],
          product_name_cnd: '',
          form:{
            product_name: '',
            count: '',
          },
          product_name: '',
          count: '',
          createTime: [timeStart,timeEnd],
          // 初始化信息总条数
          pageSize1:5,
          currentPage1: 1,
          pageSize2:5,
          currentPage2: 1,
          total1: 10,
          total2: 10,
        }
    },
    methods:{
      //产品访问数据统计
      getList1(){
        this.loading = true;
        if(!this.createTime) {
          qryDataProductListBy1({pageSize: this.pageSize1,pageNum: this.currentPage1,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd: "",visit_time_TO_cnd:""}).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
        }else{
          qryDataProductListBy1({pageSize: this.pageSize1,pageNum: this.currentPage1,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1]}).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //产品访问列表
      getList2(){
        this.loading = true;
        if(!this.createTime) {
          qryDataProductListBy2({pageSize: this.pageSize2,pageNum: this.currentPage2,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd: "",visit_time_TO_cnd:""}).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData2 = res.data.data.list;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }else{
          qryDataProductListBy2({pageSize: this.pageSize2,pageNum: this.currentPage2,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd:this.createTime[0] == undefined ? timeStart : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? timeEnd : this.createTime[1]}).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData2 = res.data.data.list;
              this.total2 = res.data.data.total;
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
          qryDataProductListBy1({pageSize: this.pageSize1,pageNum: this.currentPage1,product_name_cnd: this.product_name_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.productVisitData1 = res.data.data.list;
                this.total1 = res.data.data.total;
                this.loading = false;
              }
          })
          qryDataProductListBy2({pageSize: this.pageSize2,pageNum: this.currentPage2,product_name_cnd: this.product_name_cnd,
            visit_time_FROM_cnd: "",visit_time_TO_cnd:""}).then(res=>{
              if(res.data.code == 200) {
                this.productVisitData2 = res.data.data.list;
                this.total2 = res.data.data.total;
                this.loading = false;
              }
          })
        }else{
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          qryDataProductListBy1({pageSize: this.pageSize1,pageNum: this.currentPage1,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData1 = res.data.data.list;
              this.total1 = res.data.data.total;
              this.loading = false;
            }
          })
          qryDataProductListBy2({pageSize: this.pageSize2,pageNum: this.currentPage2,product_name_cnd: this.product_name_cnd,
          visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1]}).then(res=>{
            if(res.data.code == 200) {
              this.productVisitData2 = res.data.data.list;
              this.total2 = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //点击页码
      handleSizeChange1: function (val) {
        this.pageSize1 = val;
        this.getList1(val,this.currentPage1);
      },
      handleCurrentChange1: function (val) {
        this.currentPage1 = val;
        this.getList1(this.pageSize1,val);
      },
        //点击页码
      handleSizeChange2: function (val) {
        this.pageSize2 = val;
        this.getList2(val,this.currentPage2);
      },
      handleCurrentChange2: function (val) {
        this.currentPage2 = val;
        this.getList2(this.pageSize2,val);
      },
      //导出接口
      downloadExcel(){
        this.$alert('确定要导出该表格吗？','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const visit_time_FROM_cnd = this.createTime[0];
          const visit_time_TO_cnd = this.createTime[1];
          exportDataProductList({product_name_cnd: this.product_name_cnd,
        visit_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],visit_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1]}).then(res=>{
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
          const tHeader = ['商品名称','访问时间','访问次数'];
          const filterVal = ['product_name','visit_time','count'];
          const list = that.excelData;      
          const data = that.formatJson(filterVal,list);
          export_json_to_excel(tHeader,data,'产品访问数据统计');
        })
      },
      formatJson(filterVal,jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },
    activated() {
      this.createTime = [timeStart,timeEnd]
      this.getList1();
      this.getList2();
    },
    mounted () {
      // this.getList1();
      // this.getList2();
    },
    created(){
      // this.getList1();
      // this.getList2();
    },
    watch: {
      '$route' () {
        // this.getList1();
        // this.getList2();
        // console.log(this.$route.path);
      }
    }
  }
</script>
