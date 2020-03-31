<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
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
    .ivu-row {
      margin-left: -30px;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
</style>
<template>
  <div id="app">
		<Card>
      <Row>
        <div class="demo-input-suffix">
          <div class="searchc">
           <el-input placeholder="请输入商品名称" style="width: 180px" v-model="mobile" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="searchc">
          <el-date-picker
            v-model="create_time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          </div>
          <div class="searchc">
          <el-select v-model="source" placeholder="所属公司" style="width:150px">
            <el-option  value="">所属公司</el-option>
            <el-option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
          </el-select>
          </div>
          <div class="searchc">
          <el-select v-model="status" placeholder="结算状态" style="width:150px">
            <el-option  value="">结算状态</el-option>
            <el-option label="已结算" value="0">已结算</el-option>
            <el-option label="未结算" value="1">未结算</el-option>
          </el-select>
          </div>
          <div class="searchc">
          <el-button type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%; align: center">
          <el-table-column
            fixed="left"
            label="序号"
            type="index"
						align="center"
            width="80">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="mobile"
            sortable
						align="center"
            label="商品名称"
            width="130">
          </el-table-column>
					<el-table-column
            prop="create_time"
            label="所属公司"
            sortable
						align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
						align="center"
            label="访问时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            sortable
						align="center"
            label="点击次数"
            width="150">
          </el-table-column>
					<el-table-column
            prop="id_card"
            sortable
						align="center"
            label="注册次数"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bank_card"
            sortable
						align="center"
            label="转化率"
            width="110">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="放款个数"
						align="center"
            sortable
            width="150">
            <template slot-scope="scope">
              {{scope.row.user_auth == '活体' ? '身份证' : scope.row.user_auth == '借款信息' ? '借款信息' : scope.row.user_auth == '联系人' ? '联系人' : scope.row.user_auth == '银行卡' ? '银行卡' : '未认证'}}
            </template>
          </el-table-column>
					<el-table-column
            prop="pay_amt"
            sortable
						align="center"
            label="结算金额"
            width="150">
          </el-table-column>
          <el-table-column
            label="合作方式"
						align="center"
            sortable
            width="150">
            <template slot-scope="scope">
              {{scope.status == 0 ? '正常' : scope.status == 1 ? '禁用' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="结算状态"
						align="center"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
						align="center"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center"
            width="100">
            <template slot-scope="scope">
              <!-- <el-button @click="handleView(scope.row)" size="small">查看</el-button>
              <el-button @click="dialogVisibleNo = true" size="small" v-if="scope.row.status == 0">禁用</el-button> -->
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleNo"
                :append-to-body='true'
                width="30%"
                :close-on-click-modal='false'
                :before-close="handleClose">
                <span>确定要禁用该用户吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleNo = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleNo = false">确 定</el-button>
                </span>
              </el-dialog>
              <!-- <el-button @click="dialogVisibleYes = true" type="text" size="small" v-if="scope.row.status != 0">恢复</el-button> -->
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleYes"
                :append-to-body='true'
                width="30%"
                :close-on-click-modal='false'
                :before-close="handleClose">
                <span>确定要恢复该用户吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleYes = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleYes = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" ></Page>
			 <div style="margin-top: 200px">
         	<p slot="title">
            <Icon type="help-buoy"></Icon>
              统计
          </p>
          <el-table
            :data="money"
            border
            style="width: 100%">
            <el-table-column
              fixed
              align="center"
              prop="pay_amt"
              sortable
              label="点击次数">
            </el-table-column>
            <el-table-column
              prop="pay_time"
              label="注册个数"
              align="center"
              sortable>
            </el-table-column>
             <el-table-column
              fixed
              align="center"
              prop="pay_amt"
              sortable
              label="待结算金额">
            </el-table-column>
            <el-table-column
              prop="pay_time"
              label="总结算金额"
              align="center"
              sortable>
            </el-table-column>
          </el-table>
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
</style>
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          status: '',
          mobile: '',
          create_time: '',
          source: '',
          user_name: '',
          id_card: '',
          bank_card: '',
          user_auth: '',
          dialogVisibleYes: false,
          dialogVisibleNo: false,
          createTime: '',
          rows: [],
          money: [],
          status: '',
          status1: '',
          searchProductName: '',
          // historyColumns: table.historyColumns,
          historyData: [],
          initialProduct: [],
          ajaxHistoryData:[],
          // 初始化信息总条数
          dataCount:0,
          // 每页显示多少条
          pageSize:10,
        }
    },
    methods:{
    }
  }
</script>
