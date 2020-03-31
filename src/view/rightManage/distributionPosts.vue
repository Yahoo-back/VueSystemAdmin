<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    .main .single-page-con {
			background: #fff;
    }
    .search {
      float: left; 
      margin-left: 40px; 
      margin-top: 15px;
    }
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        员工角色分配
      </p>
      <Row>
        <div class="demo-input-suffix">
          <!-- 角色ID： -->
          <el-input placeholder="请输入角色ID" style="width: 180px" v-model="roleId_cnd" suffix-icon="el-icon-search" clearable />
          <!-- 角色名称： -->
          <el-input placeholder="请输入角色名称" style="width: 180px" v-model="roleName_cnd" suffix-icon="el-icon-search" clearable />
					<el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
				</div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="roleData"
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
            prop="roleid"
            sortable
						align="center"
            label="角色ID">
          </el-table-column>
					<el-table-column
            prop="roleName"
            label="角色名称"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small">分配</el-button>
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
        :current-page.sync="currentPage" 
        :page-sizes="[5,7,10,20,30,40]" 
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
      </el-pagination>
			<!-- <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
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
import {qryRoles,qryUserRole,allocationRoles} from '../../api/right';
  export default {
      data () {
        return {
          roleData: [],
          roleId_cnd: '',
          roleName_cnd: '',
          roleCode_cnd: '',
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
        }
    },
    methods:{
       //获取员工列表
      getRoleList(){
        qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.roleData = res.data.data.list;
             this.total = res.data.data.total;
           }
        })
      },
      //查询
      handleSearch(){
        qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.roleData = res.data.data.list;
             this.total = res.data.data.total;
           }
        })
      },
		  //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getPeopleList(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getPeopleList(this.pageSize,val);
      },
     
      handleView(row) {
        this.$router.push({ path:'/serviceConfiguration/list/serviceInfo?id='+row.id  })
      }
    },
    activated() {
      this.getRoleList();
    },
    mounted () {
      // this.getRoleList();
    },
    created(){
      // this.getList();
    },
    watch: {
      '$route' () {
        // this.getRoleList();
        // console.log(this.$route.path);
      }
    }
  }
</script>
