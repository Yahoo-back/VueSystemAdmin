<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    // 产品访问数据统计
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
		.main .single-page-con {
			background: #fff;
    }
    .search {
      float: left;
      margin-left: 40px;
      margin-top: 15px;
    }
    .el-dialog {
      width: 40%;
      -webkit-box-shadow: none;
      box-shadow: none;
    //  -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.3);
    //  box-shadow: 0 1px 1px rgba(0,0,0,.3);
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
        角色列表
      </p> -->
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
					<!-- 角色ID： -->
          <div class="search">
            <el-input placeholder="请输入角色ID" style="width: 180px" v-model="roleId_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
          <!-- 角色代码： -->
          <div class="search">
            <el-input placeholder="请输入角色代码" style="width: 180px" v-model="roleCode_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
					<!-- 角色名称： -->
          <div class="search">
            <el-input placeholder="请输入角色名称" style="width: 180px" v-model="roleName_cnd" suffix-icon="el-icon-search" clearable />
          </div>
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入手机号" style="width: 180px" /> -->
          <div class="search" style="float: right; margin-top: 20px">
            <el-button  @click="handleAdd()"  type="primary" size="small" style="margin-left: 20px">新增</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="roleData"
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
            prop="roleid"
            sortable
						align="center"
            label="角色ID">
          </el-table-column>
					<el-table-column
            prop="roleCode"
            label="角色代码"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="roleName"
            sortable
						align="center"
            label="角色名称">
          </el-table-column>
					<el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="320">
            <template slot-scope="scope">
              <el-button  @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
							<el-button @click="handleGiveMenu(scope.row)" size="small">分配菜单</el-button>
              <el-button  @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
              <el-dialog append-to-body title="分配菜单" :visible.sync="dialogGiveMenu" width="800px" :close-on-click-modal='false'>
                <el-form ref="dataForm" :model="dataForm" label-width="100px">
                  <el-form-item label="当前角色名称:" props="roleName">
                    <!-- <template v-if="dialogTitle=='分配角色'" v-model="dataForm.roleName">{{this.dataForm.roleName}}</template> -->
                    <!-- <div v-model="currentName">{{this.currentName}}</div> -->
                    <el-input style="width: 200px" v-model="dataForm.roleName" :disabled="true"></el-input>
                  </el-form-item>

                 <el-tree
                    class="treeclass"
                    ref="tree"
                    :data="roleGiveMenu"
                    default-expand-all
                    :props="defaultProps"
                    check-strictly
                    node-key="id"
                    show-checkbox
                    :default-checked-keys="checkedKeys"
                  >
                  </el-tree>
                  <!-- <el-tree
                    class="treeclass"
                    ref="tree"
                    :data="roleGiveMenu"
                    default-expand-all
                    :props="defaultProps"
                    check-strictly
                    check-on-click-node
                    node-key="id"
                    highlight-current
                    show-checkbox
                    :default-checked-keys="checkedKeys"
                  >
                  </el-tree> -->
              </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button  @click="dialogGiveMenu = false">关闭</el-button>
                  <el-button type="primary" @click="getCheckedNodes" >保存</el-button>
                 
                </div>
              </el-dialog>

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
        :page-sizes="[5,10,20,30,40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<!-- <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()" :close-on-click-modal='false'>
        <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="100px">
          <el-form-item label="角色代码:" prop="roleCode">
            <el-input v-model="dataForm.roleCode" placeholder="角色代码"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" prop="roleName">
            <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <span v-if="dialogTitle=='查看'"></span>
          <el-button type="primary" @click="handleSaveRole('dataForm')" v-else>保存</el-button>
        </div>
      </el-dialog>
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
import {qryRoles,deleteRoles,saveRoles,allocationMeuns,qryRoleMenu} from '../../api/right';
import * as table from './data/table';
  export default {
      data () {
        return {
          loading: true,
          //树形菜单
          roleGiveMenu: [],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          checkedKeys: [],
          pId: '',
          id: '',
          name: '',
          roleMenu: [],
          roleId_cnd: '',
          roleCode_cnd: '',
          roleName_cnd: '',
          dialogVisible: false,
          dialogTitle: '修改角色',
          // 分配菜单
          dialogGiveMenu: false,
          // 当前角色
          currentName: '',
					roleid: '',
          dataForm: {
            roleid: '',
            roleCode: '',
            roleName: '',
          },
          status: '',
          // 初始化信息总条数
          pageSize:10,
          currentPage: 1,
          total: 10,
          roleData: [],
          //角色菜单
          roleMenu: [],
          roleMenu1: [],
          rules: {
            roleName: [
              // {validator:validateName, trigger: 'blur'}
              { required: true, message: '请输角色名称', trigger: 'blur' },
            ],
            roleCode: [
              { required: true, message: '请输入角色代码', trigger: 'blur' }
            ]
          }
        }
    },
    methods:{
       //获取员工列表
      getRoleList(){
        this.loading = true;
        qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.roleData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
			//点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getRoleList(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getRoleList(this.pageSize,val);
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
         qryRoles({pageSize: this.pageSize,pageNum: this.currentPage,roleId_cnd: this.roleId_cnd,roleName_cnd: this.roleName_cnd,roleCode_cnd: this.roleCode_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.roleData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //删除
      handleDelete(row) {
        this.$alert('确定删除该角色吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteRoles({id: row.roleid})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getRoleList(this.pageSize,this.currentPage);
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
      //分配菜单
      handleGiveMenu(row) {
        let _row = row;
        this.dataForm = Object.assign({}, _row)
        this.dialogGiveMenu = true;
        this.dialogTitle = '分配菜单';
        this.currentName = row.roleName
        this.dataForm.roleName = row.roleName
        qryRoleMenu({roleId: row.roleid}).then(res=>{
          if(res.data.code == 200) {
            this.roleMenu = res.data.data;
            this.roleMenu1 = JSON.stringify(res.data.data);
            var roleMenu2 = JSON.stringify(res.data.data);
            var roleMenus = JSON.parse(roleMenu2);
            var roleMenut = res.data.data;
            var a = [];
            for (let i = 0;i< roleMenut.length; i++) {
              var checked = "true";
              if(roleMenut[i].checked) {
                var b = roleMenut[i].id;
                var c = Number(b)
                a.push(c);
                var d = JSON.parse(JSON.stringify(a));
                this.checkedKeys = JSON.parse(JSON.stringify(d));
              }
            }
            function list(myId,pId,roleMenus){
              function exists(roleMenus, parentMuenId){
                for(var i=0; i<roleMenus.length; i++){
                  if (roleMenus[i][myId] == parentMuenId) return true;
                }
                return false;
              }
              var nodes = [];
              // get the top level nodes
              for(var i=0; i<roleMenus.length; i++){
                var row = roleMenus[i];
                if (!exists(roleMenus, row[pId])){
                nodes.push(row);
                }
              }
              var toDo = [];
              for(var i=0; i<nodes.length; i++){
                toDo.push(nodes[i]);
              }
              while(toDo.length){
                var node = toDo.shift(); // the parent node
                // get the children nodes
                for(var i=0; i<roleMenus.length; i++){
                var row = roleMenus[i];
                if (row[pId] == node[myId]){
                  //var child = {id:row.id,text:row.name};
                  if (node.children){
                  node.children.push(row);
                  } else {
                  node.children = [row];
                  }
                  toDo.push(row);
                }
                }
              }
              return nodes;
          }
          var allMenu = list("id","pId",roleMenus);
          this.roleGiveMenu = allMenu;
          }
        })
      },
      //保存分配菜单
      getCheckedNodes() {
        var rad=''
        var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        ridsb.forEach(ids=>{//获取选中的所有的父级id
          rad+=','+ids.pId
        })
        rad=rad.substr(1) // 删除字符串前面的','
        var rids=rad+','+ridsa
        var arr=rids.split(',')//  把字符串转换成数组
        arr=[...new Set(arr)]; // 数组去重
        rids=arr.join(',')// 把数组转换成字符串
        // console.log(rids)
        this.handleGiveMenu(this.dataForm);
        var roleId = this.dataForm.roleid;
        allocationMeuns({roleId: roleId, meunId: rids}).then(res => {
          if(res.data.code == 200) {
            this.dialogGiveMenu = false;
             this.$message.success(`${res.data.message}`)
            this.getRoleList()
          }else {
            this.$message.error(`${res.data.message}`)
            return false;
                }
        })
      },
      //保存角色
      handleSaveRole(option){
        // console.log(this.dataForm.roleName)
        //表单验证
        this.$refs[option].validate((valid) => {
          // console.log(this.dataForm)
          if (valid) {
            this.dialogVisible = false;
            //登录接口传值
            saveRoles({
              roleid: this.dataForm.roleid,
              roleName: this.dataForm.roleName,
              roleCode: this.dataForm.roleCode,
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.getRoleList(this.pageSize,this.currentPage);
                  this.$message.success(`${res.data.message}`)
                  this.$refs.dataForm.resetFields();
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`, 'ERROR!')
              })
          }else{
            return false;
          }
        });
        // console.log('submit!');
      },
      handleView() {
        this.$router.push({ path:'/rightManage/role/roleInfo'})
      },
       //点击编辑弹出对话框dialog
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改角色'

        this.dataForm.roleCode = row.roleCode
        this.dataForm.roleid = row.roleid
        this.dataForm.roleName = row.roleName
        // console.log(this.dataForm.roleCode)
      },
      handleAdd(index){
        this.dialogVisible = true
        this.dialogTitle = '新增角色'
        this.dataForm.roleid = ''
        this.dataForm.roleCode = ''
        this.dataForm.roleName = ''
      },
      onDialogSubmit() {

      }
    },
    computed: {

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


