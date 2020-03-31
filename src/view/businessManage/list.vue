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
    .search3 {
      float: left;
      margin-left: 30px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .ivu-row {
      // margin-left: -30px;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        商务合作列表
      </p> -->
      <Row style=" margin-left: -30px">
        <div class="demo-input-suffix">
          <!-- 联系人名称： -->
          <div class="search3">
				    <el-input placeholder="请输入联系人名称" style="width: 180px" v-model="name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 联系人手机号： -->
          <div class="search3">
				    <el-input placeholder="请输入联系人手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <!-- 创建时间: -->
          <div class="search3">
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
          <div class="search3" style="float: right">
            <el-button @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="businessData"
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
            prop="name"
            sortable
						align="center"
            label="联系人名称">
          </el-table-column>
					<el-table-column
            prop="mobile"
            label="联系人手机号"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="reason"
            sortable
						align="center"
            label="联系事由">
          </el-table-column>
					<el-table-column
            :formatter="dateFormat"
            prop="createTime"
            label="创建时间"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="remark"
            sortable
						align="center"
            label="备注">
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
			<!-- <Page :total="10" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
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
import * as table from './data/table';
import {businessList,exportBusiness} from '../../api/businessManage';
  export default {
      data () {
        return {
          loading: true,
          businessData:[],
          name_cnd: '',
          mobile_cnd: '',
          create_time_FROM_cnd: '',
          create_time_TO_cnd: '',
          dialogVisibleNo: false,
          createTime: '',
          city : [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            },
          ],
          pageResult: [],
          status: '',
          status1: '',
          searchProductName: '',
          // historyColumns: table.historyColumns,
          historyData: [],
          initialProduct: [],
          ajaxHistoryData:[],
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
          exportData: []
        }
    },
    mounted () {
      // businessList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,mobile_cnd: this.mobile_cnd,create_time_FROM_cnd: this.create_time_FROM_cnd,create_time_TO_cnd:this.create_time_TO_cnd}).then(res=>{
      //      if(res.data.code == 200) {
      //        console.log(res)
      //        this.businessData = res.data.data;
      //      }
      //   }) ;
    },
    methods:{
      //table内时间格式转换
      //  dateFormat (row, column) {
      //   if(row.createTime == null) {
      //   }else {
      //     var dateee = new Date(row.createTime).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      //   // var dateee = new Date(row.createTime).toJSON();
      //   // return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      // },
      dateFormat (row, column) {
        var date = new Date(row.createTime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.createTime == null) {
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
      //查询接口
      handleSearch(){
        this.loading = true;
        if(!this.createTime){
          businessList({pageSize: 10,pageNum: 1,name_cnd: this.name_cnd,mobile_cnd: this.mobile_cnd,
            create_time_FROM_cnd: "",create_time_TO_cnd:"" }).then(res=>{
              if(res.data.code == 200) {
                this.businessData = res.data.data.list;
                this.total = res.data.data.total;
                this.loading = false;
              }
          })
        }
        else{
          const create_time_FROM_cnd = this.createTime[0];
          const create_time_TO_cnd = this.createTime[1];
          businessList({pageSize: 10,pageNum: 1,name_cnd: this.name_cnd,mobile_cnd: this.mobile_cnd,
          create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.businessData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //获取列表
      getList(){
        this.loading = true;
        const create_time_FROM_cnd = this.createTime[0];
        const create_time_TO_cnd = this.createTime[1];
        businessList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,mobile_cnd: this.mobile_cnd,
        create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.businessData = res.data.data.list;
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
      //导出接口
      downloadExcel(){
        this.$alert('确定要导出该表格吗？','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const create_time_FROM_cnd = this.createTime[0];
          const create_time_TO_cnd = this.createTime[1];
          exportBusiness({name_cnd: this.name_cnd,mobile_cnd: this.mobile_cnd,
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
          const tHeader = ['联系人名称','联系人手机号','联系事由','创建时间','备注'];
          const filterVal = ['name','mobile','reason','createTime','remark'];
          const list = that.excelData;
          const data = that.formatJson(filterVal,list);
          export_json_to_excel(tHeader,data,'商务合作列表');
        })
      },
      formatJson(filterVal,jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
			init () {
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
      this.getList(this.pageSize,this.currentPage);
    },
    created(){
      
    }
  }
</script>
