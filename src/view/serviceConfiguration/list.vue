<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
    .main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
    .searchqq {
      float: right;
      margin-left: 40px;
      margin-top: 15px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
    // .ivu-row {
    //   margin-left: -40px;
    // }
</style>
<template>
  <div id="app">
		<Card>
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <!-- <div class="search">
            <el-input placeholder="请输入条件名称" style="width: 180px" v-model="data_type" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入值1" style="width: 180px" v-model="itemValue" suffix-icon="el-icon-search" clearable />
          </div>
					<div class="search">
            <el-input placeholder="请输入值2" style="width: 180px" v-model="itemKey" suffix-icon="el-icon-search" clearable />
					</div> -->
          <div class="searchqq" style="float: right">
            <!-- <el-button @click="handleAdd" type="primary" size="small" style="margin-left: 20px">新增申请条件</el-button> -->
            <el-button  @click="downloadExcel" type="primary" size="small" style="margin-left: 20px">导出</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="dictData"
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
            prop="dictDesc"
            sortable
						align="center"
            label="条件名称">
          </el-table-column>
					<el-table-column
            prop="itemValue"
            label="值1"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="itemKey"
            sortable
						align="center"
            label="值2">
          </el-table-column>
          <el-table-column
            prop="xh"
            sortable
						align="center"
            label="排序">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
             <!-- <el-button size="small" @click="handleLook(scope.$index, scope.row)">查看</el-button> -->
              <el-button @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
              <!-- <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              <el-button  @click="handleView(scope.row)" type="text" size="small">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" :before-close="closeDiv"  @close="onDialogClose()" :close-on-click-modal='false'>
        <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="80px">
          <!-- <el-form-item label="条件名称:" prop="dictDesc">
            <template v-if="dialogTitle=='查看'">{{dataForm.dictDesc}}</template>
            <el-input v-else v-model="dataForm.dictDesc" placeholder="条件名称"></el-input>
          </el-form-item> -->
          <el-form-item label="值1:" prop="itemValue">
            <template v-if="dialogTitle=='查看'">{{this.itemValue}}</template>
            <el-input v-else v-model="dataForm.itemValue" placeholder="值1"></el-input>
          </el-form-item>
          <el-form-item label="值2:" prop="itemKey">
            <template v-if="dialogTitle=='查看'">{{this.itemKey}}</template>
            <el-input v-else v-model="dataForm.itemKey" placeholder="值2"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="xh">
            <template v-if="dialogTitle=='查看'">{{this.xh}}</template>
            <el-input v-else v-model="dataForm.xh" placeholder="排序"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='查看'"></span>
          <el-button type="primary" @click="handleSave('dataForm')" v-else>保存</el-button>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' title="新增" :visible.sync="dialogVisibleAdd" :before-close="closeDiv"  @close="onDialogClose()" :close-on-click-modal='false'>
        <el-form ref="addForm" :model="addForm" label-width="100px" :rules="rulesa">
          <el-form-item label="名称(区间):" prop="itemValue">
            <el-input v-model="addForm.itemValue" placeholder="名称(区间)"></el-input>
          </el-form-item>
          <el-form-item label="是否使用:" prop="isUse">
            <el-select v-model="addForm.isUse" placeholder="请选择状态" style="width:180px">
              <el-option  value="">请选择状态</el-option>
              <el-option label="不启用" value="0">不启用</el-option>
              <el-option label="启用" value="1">启用</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="xh">
            <el-input v-model="addForm.xh" placeholder="排序"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">关闭</el-button>
          <el-button type="primary" @click="handleSaveAdd('addForm')">保存</el-button>
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
import {qryDictByShow,dicInfo,saveConfig,exportConfig} from '../../api/serviceConfiguration.js';
import * as table from './data/table';
  export default {
      data () {
        return {
          loading: true,
          // 编辑对话框
          dictDesc: '',
          data_type: '',
          itemKey: '',
          itemValue: '',
          xh: '',
          dictData: [],
          //新增
          dialogVisibleAdd: false,
          //查看编辑
          dialogVisible: false,
          dialogTitle: '查看',
          dialogVisibleNo: false,
          dataForm: {
            itemKey: '',
            itemValue: '',
            xh: '',
            id: ''
          },
          addForm: {
            dictDesc: '',
            isUse: '',
            xh: '',
          },
          rules: {
            itemValue: [
              { required: true, message: '请输入值1', trigger: 'blur' },
            ],
            itemKey: [
              { required: true, message: '请输入值2', trigger: 'blur' }
            ],
            xh: [
              { required: true, message: '请输入排序', trigger: 'blur' }
            ]
         },
         rulesa: {
            itemValue: [
              { required: true, message: '请输入值1', trigger: 'blur' },
            ],
            isUse: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ],
            xh: [
              { required: true, message: '请输入排序', trigger: 'blur' }
            ]
         }
        }
      },
    methods:{
      //获取列表
      getList(){
        this.loading = true;
        qryDictByShow({}).then(res=>{
           if(res.data.code == 200) {
             this.dictData = res.data.data;
             this.loading = false;
            //  this.total = res.data.data.total;
           }
        })
      },
      handleAdd() {
        this.dialogVisibleAdd = true;
      },
      closeDiv(){
        this.dialogVisibleAdd = false;
        this.dialogVisible = false;
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogVisibleAdd = false;
        this.dialogVisible = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //点击编辑弹出对话框dialog
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '查看'
        dicInfo({id: row.id}).then(res => {
          if(res.data.code == 200) {
            this.itemKey = res.data.data.itemKey;
            this.itemValue = res.data.data.itemValue;
            this.xh = res.data.data.xh;
            this.id = res.data.data.id;
          }
        })
      },
      //编辑
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改业务配置'
        dicInfo({id: row.id}).then(res => {
          if(res.data.code == 200) {
            this.dataForm.itemKey = res.data.data.itemKey;
            this.dataForm.itemValue = res.data.data.itemValue;
            this.dataForm.xh = res.data.data.xh;
            this.dataForm.id = res.data.data.id;
          }
        })
      },
      //保存编辑
      handleSave(){
        // this.handleEdit(this.dataForm);
        // console.log(this.dataForm)
        saveConfig({
          id: this.dataForm.id,
          itemKey: this.dataForm.itemKey,
          itemValue: this.dataForm.itemValue,
          xh: this.dataForm.xh,
          }).then(res=>{
          if(res.data.code == 200){
            this.$message.success(`${res.data.message}`)
            this.dialogVisible = false
            this.getList();
          }else {
              this.$message.error(`${res.data.message}`)
              this.dialogVisible = false
              this.getList();
              return false;
            }
        })
      },
      //保存新增
      handleSaveAdd(){
        saveConfig({
          id: "",
          itemValue: this.addForm.itemValue,
          isUse: this.addForm.isUse,
          xh: this.addForm.xh,
          }).then(res=>{
          if(res.data.code == 200){
            this.$message.success(`${res.data.message}`)
            this.dialogVisibleAdd = false
            this.getList();
          }else {
              this.$message.error(`${res.data.message}`)
              this.dialogVisibleAdd = false
              this.getList();
              return false;
            }
        })
      },
      //导出接口
      downloadExcel(){
        this.$alert('确定要导出该表格吗？','提示',{
          showCancelButton: true,
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning'
        }).then(() => {
          exportConfig({data_type: "",data_type_cnd: "APPLY_REQUIRE",item_value_cnd: "",is_use_cnd: "" }).then(res=>{
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
          const tHeader = ['条件名称','值1','值2','排序'];
          const filterVal = ['dictDesc','itemValue','itemKey','xh'];
          const list = that.excelData;
          const data = that.formatJson(filterVal,list);
          export_json_to_excel(tHeader,data,'申请条件信息');
        })
      },
      formatJson(filterVal,jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },
    activated() {
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
