<style lang="less">
    @import '../../styles/common.less';
		.main .single-page-con {
			background: #fff;
    }
    .ivu-row {
      margin-left: -40px;
    }
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
</style>
<template>
  <div id="app">
		<Card>
			<!-- <p slot="title">
        <Icon type="help-buoy"></Icon>
        菜单项管理
      </p> -->
      <el-row>
        <el-col :span="1">
          <div class="mod-btnbox">
            <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="addModule">添加</el-button> -->
          </div>
        </el-col>
        <el-col :span="8">
          <!-- <div class="mod-btnbox">
            <el-button size="small" type="primary">全部展开</el-button>
            <el-button size="small" type="primary">全部压缩</el-button>
          </div> -->
          <!-- <el-tree
            class="treeclass"
            ref="tree"
            :data="menuTree"
            default-expand-all
            :props="defaultProps"
            @check-change="handleClick"
            node-key="id"
            highlight-current
            show-checkbox
            >
          </el-tree> -->
          <el-tree
            class="treeclass"
            ref="tree"
            :data="lastMenu"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="nodeclick"
            @check-change="handleClick"
            check-strictly
            node-key="id"
            highlight-current
            show-checkbox
            >
          </el-tree>
        </el-col>
        <el-col :span="3">
          <div class="mod-btnbox">
            <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="addModule">添加</el-button> -->
          </div>
        </el-col>
        <el-col :span="9">
          <div class="mod-btnbox">
            <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="addModule">添加</el-button> -->
          </div>
          <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="上级菜单名称" prop="pid">
              <el-select size="small" v-model="form.pid" placeholder="请选择" class="selectw">
                <el-option v-for="parm in this.menuTree" :key="parm.id" :label="parm.name" :value="parm.id" id="pid" :disabled="option"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="URL" prop="uri">
              <el-input size="small" v-model="form.uri"></el-input>
            </el-form-item>
            <el-form-item label="顺序" prop="xh">
              <el-input size="small" v-model="form.xh"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <!-- <el-input size="small" v-model="form.moduleOrder"></el-input> -->
              <el-select v-model="form.status" style="width:180px">
                <el-option label="即时启用" value="0">即时启用</el-option>
                <el-option label="禁用" value="1">禁用</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="handleSaveMenu('form')">新增</el-button>
              <el-button size="small" type="primary" @click="handleSaveMenu('form')">修改</el-button>
              <el-button size="small" type="primary" v-show="showdelete" @click="handleDeleteMenu">删除</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>
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
<style>
  .user-search {
    margin-top: 20px !important;
  }
  .user-search td {
    margin-top: 20px !important;
  }
  .userRole {
    width: 100%;
  }
  .el-table__expanded-cell {
    padding: 0px !important;
    margin: 0px !important;
  }
  .modt-box {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f0f2f5;
    text-align: center;
    color: #334157;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  .mod-btnbox {
    margin-bottom: 20px;
  }
  .treeclass {
    border: 1px solid #f3f3f3;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .selectw {
    width: 100%;
  }
</style>
<script>
import {qryAllMeuns,deleteMuen,saveMuen,qryMeun} from '../../api/right';
export default {
  data () {
    return {
      option: false,
      showdelete: false,
      menuList: [],
      menuList1: [],
      abc: [],
      lastMenu: [],
      menuTree: [],
      // menuTree: JSON.parse(localStorage.getItem('menuTreeAll')),
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        option: false,
        pid: '',
        name: '',
        parentMuenId: '',
        muenName: '',
        xh: '',
        uri: '',
        status: '',

        addUser: '',
        editUser: '',
        addTime: '',
        editTime: '',
        moduleId: '',
        parentId: '',
        moduleLevel: '',
        systemNo: '',
        isLeaf: '',
        fullIndex: '',
        moduleIcon: '',
        moduleOrder: '',
        muenName: '',
        moduleNotes: '',
        moduleUrl: '',
      },
      // rules表单验证
      rules: {
        pid: [
          { required: true, message: '请选择父级菜单', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        uri: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ],
        xh: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择菜单状态', trigger: 'change' }
        ]
      },
      fmenu: []
    }
  },
  methods:{
    // 获取所有菜单
    getMenu() {
      qryAllMeuns().then(res => {
        if(res.data.code == 200) {
          this.menuList = res.data.data;
          this.menuList1 = JSON.stringify(res.data.data);
          var menuList = JSON.stringify(res.data.data);
          var menuLists = JSON.parse(menuList);
          function list(myId,pId,menuLists){
            function exists(menuLists, parentMuenId){
              for(var i=0; i<menuLists.length; i++){
                if (menuLists[i][myId] == parentMuenId) return true;
              }
              return false;
            }
            var nodes = [];
            // get the top level nodes
            for(var i=0; i<menuLists.length; i++){
              var row = menuLists[i];
              if (!exists(menuLists, row[pId])){
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
              for(var i=0; i<menuLists.length; i++){
              var row = menuLists[i];
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
          var allMenu = list("id","pid",menuLists);
          // console.log(allMenu)
          this.lastMenu = allMenu;
          localStorage.setItem('menuList',menuList);
        }else {
          this.$message.error(`${res.data.message}`)
          return false;
        }
      })
    },
    // //树形控件
		handleClick(data, checked, node) {
      if (checked) {
        // console.log(data)
        //  const option = document.querySelector(".pid option");
         //设置input的属性为false
         this.form.option = true;
         this.option = true;
        //父级id
        this.form.pid = data.pid;
        //二级菜单id
        this.form.id = data.id;
        //父级name
        this.form.pname = data.pname;
        //二级name
        this.form.name = data.name;
        //链接地址
        this.form.uri = data.uri;
        //序号
        this.form.xh = data.xh;
        //状态
        this.form.status = data.status;
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.showdelete = true
      } else {
      }
    },
    // 点击节点
    nodeclick(arr, node, self) {
      // console.log(node)
    },
    // 保存菜单
      handleSaveMenu(option){
        // console.log(this.dataForm.roleName)
        //表单验证
        this.$refs[option].validate((valid) => {
          // console.log(this.form)
          if (valid) {
            // this.dialogVisible = false;
            // this.$refs.dataForm.resetFields();
            //登录接口传值
            saveMuen({
              parentMuenId: this.form.pid,
              muenid: this.form.id,
              uri: this.form.uri,
              muenName: this.form.name,
              xh: this.form.xh,
              status: this.form.status,
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.getMenu();
                  this.form.pid = '';
                  this.form.xh = '',
                  this.form.status = '',
                  this.form.name = '',
                  this.form.uri = ''
                  this.$message.success(`${res.data.message}`)
                }else {
                  this.getMenu();
                  this.form.pid = '';
                  this.form.xh = '',
                  this.form.status = '',
                  this.form.name = '',
                  this.form.uri = ''
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
      //删除菜单
      handleDeleteMenu(){
         this.$confirm('确定删除该菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteMuen({meunId: this.form.id})
              .then(res => {
              if(res.data.code == 200) {
                this.form.pid = '';
                this.form.xh = '',
                this.form.status = '',
                this.form.name = '',
                this.form.uri = ''
                this.$message.success(`${res.data.message}`)
                this.getMenu();
            }else {
              this.$message.error(`${res.data.message}`)
              this.form.pid = '';
              this.form.xh = '',
              this.form.status = '',
              this.form.name = '',
              this.form.uri = ''
              return false;
            }
              })
          }).catch(() => {

        });
      },
  },
  created() {
    // this.getMenu();
  },
  mounted () {
    // this.getMenu();
    // console.log(this.menuList1)
    var menuLists = JSON.parse(localStorage.getItem('menuList'));
    //myId,pId为随机定义的主键（muenId）; 父级（parentMuenId）；menu：后端返回的菜单数组链式
      //parentMuenId：后端返回数组的主键，
      //注意：myId和pId为随机定义的
      function list(myId,pId,menuLists){
        function exists(menuLists, parentMuenId){
          for(var i=0; i<menuLists.length; i++){
          if (menuLists[i][myId] == parentMuenId) return true;
          }
          return false;
        }

        var nodes = [];
        // get the top level nodes
        for(var i=0; i<menuLists.length; i++){
          var row = menuLists[i];
          if (!exists(menuLists, row[pId])){
          nodes.push(row);
          // console.log(nodes)
          }
        }
        var toDo = [];
        for(var i=0; i<nodes.length; i++){
          toDo.push(nodes[i]);
        }
        while(toDo.length){
          var node = toDo.shift(); // the parent node
          // get the children nodes
          for(var i=0; i<menuLists.length; i++){
          var row = menuLists[i];
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
      var allMenu = list("id","pid",menuLists);
      // console.log(allMenu)
      this.menuTree = allMenu;
      var m = JSON.stringify(allMenu)
      // console.log(m)
      localStorage.setItem('menuTreeAll',m);
      //将菜单存储至本地
      var menuTreeAll = JSON.parse(localStorage.getItem('menuTreeAll'))
      // console.log(menuTreeAll)
  },
  activated() {
    this.getMenu();
  },
  watch: {
    '$route' () {
      // this.getMenu();
    }
  }
}
</script>
