<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
    .el-form-item__label{
      font-size: 14px;
      color: #606266;
    }
    .main .single-page-con {
			background: #fff;
    }
    .searchv {
      float: left;
      margin-left: 40px;
      margin-top: 15px;
    }
    .ivu-row {
      // margin-left: -40px;
    }
    .el-table th {
      background:#f0f2f5;
    }
    // .el-input__inner {
    //   height: 40px;
    //   line-height: 40px;
    // }
</style>
<template>
  <div id="app">
		<Card>
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
            <!-- 商品名称： -->
          <div class="searchv">
            <el-input placeholder="请输入商品名称" style="width: 180px" v-model="name_cnd" suffix-icon="el-icon-search" clearable />
          </div>
           <!-- 创建时间: -->
          <div class="searchv">
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
          <div class="searchv" style="float:right">
            <el-button @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">新增</el-button>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="visitData"
          border
          style="width: 100%">
          <el-table-column
            fixed="left"
            align="center"
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="name"
            sortable
            align="center"
            label="商品名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="money"
            sortable
            align="center"
            label="预付款"
            width="200">
          </el-table-column>
          <el-table-column
            prop="count"
            sortable
            align="center"
            label="访问次数"
            width="200">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            align="center"
            width="280">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '开启' : scope.row.status == 1 ? '关闭' : scope.row.status == 2 ? '失效' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="createTime"
            label="创建时间"
            sortable
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="200">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 1"  @click="openProducts(scope.row)" size="small">开启</el-button>
              <el-button v-else="scope.row.status == 0" @click="closeProducts(scope.row)" size="small">关闭</el-button>
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
      <!-- 新增商品弹框 -->
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()" :close-on-click-modal='false'>
        <el-form ref="visitForm" :model="visitForm" :rules="rules" label-width="100px">
          <el-form-item label="商品:" prop="classify_id">
            <el-select name="sel" id="sel" @click.native="qryClassify" v-model="visitForm.classify_id" placeholder="请选择分类" style="width:180px" @change="changeProduct" >
              <el-option  value="">请选择分类</el-option>
              <el-option v-for="item in classify" :label="item.name" :value="item.id" :key="item.name" ref="option">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预付款:" prop="money">
            <el-input v-model="visitForm.money" min="0"></el-input>
          </el-form-item>
          <el-form-item label="访问次数:" prop="count">
            <el-input v-model="visitForm.count"></el-input>
          </el-form-item>
          <div v-show="showdelete">该商品今日已访问次数:<span style="margin-left: 10px;">{{this.tcount}}</span></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <span v-if="dialogTitle=='查看'"></span>
          <el-button type="primary" @click="handleSave('visitForm')" v-else>保存</el-button>
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
<style lang="less">
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import * as table from './data/table';
import {qryProductVisitManageList,updateProductVisitManage,saveProductVisitManage,qryVisitProductListAll,qryProductVisitCount} from '../../api/productManage';
  export default {
      data () {
        var moneyControl = (rule, value, callback) => {
          if (value <= 0 || !value) {
            callback(new Error('预付款请输入0以上的数字!'));
          } else {
            callback();
          }
      };
        return {
          loading: true,
          name_cnd: '',
          createTime: '',
          //访问列表
          visitData: [],
          classify: [],
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
          create_time_FROM_cnd: '',
          create_time_TO_cnd: '',
          dialogVisible: false,
          dialogTitle: '新增访问商品',
          classify_id: '',
          money: '',
          count: '',
          visitForm: {
            classify_id: '',
            money: '',
            count: '',
          },
          //新增今日已访问次数
          showdelete: false,
          tcount: '',
          tCountId: '',
          rules: {
            classify_id: [
              { required: true, message: '请选择商品分类', trigger: 'change' },
            ],
            money: [
               {validator:moneyControl, trigger: 'blur'}
              // { required: true, message: '请输入预付款,预付款请输入0以上的数字!', trigger: 'blur' }
            ],
            count: [
              { required: true, message: '请输入访问次数', trigger: 'blur' }
            ],
          }
        }
    },
    methods:{
      onDialogClose() {
        this.visitForm.tempRoleIds = []
        this.$refs.visitForm.resetFields()
      },
      // dateFormat (row, column) {
      //   if(row.createTime == null) {
      //   }else {
      //     var dateee = new Date(row.createTime).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
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
      //获取列表
      getVisit(){
        this.loading = true;
        const create_time_FROM_cnd = this.createTime[0];
        const create_time_TO_cnd = this.createTime[1];
        qryProductVisitManageList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
           if(res.data.code == 200) {
             this.visitData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      //查询
      handleSearch(){
        this.loading = true;
        this.currentPage = 1;
        if(!this.createTime){
          qryProductVisitManageList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,create_time_FROM_cnd: "",create_time_TO_cnd: "" }).then(res=>{
           if(res.data.code == 200) {
             this.visitData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
        }
        else{
          const create_time_FROM_cnd = this.createTime[0];
          const create_time_TO_cnd = this.createTime[1];
          qryProductVisitManageList({pageSize: this.pageSize,pageNum: this.currentPage,name_cnd: this.name_cnd,create_time_FROM_cnd: this.createTime[0] == undefined ? "" : this.createTime[0],create_time_TO_cnd:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
            if(res.data.code == 200) {
              this.visitData = res.data.data.list;
              this.total = res.data.data.total;
              this.loading = false;
            }
          })
        }
      },
      //点击页码
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getVisit(val,this.currentPage);
      },
      handleCurrentChange: function (val) {
        this.currentPage = val;
        this.getVisit(this.pageSize,val);
      },
      //开启
      openProducts(row) {
        // console.log(row)
        this.$alert('确定要开启该商品吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateProductVisitManage({id: row.id,status: "0"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getVisit(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
      //关闭
      closeProducts(row) {
        // console.log(row)
        this.$alert('确定要关闭该商品吗?', '提示', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            updateProductVisitManage({id: row.id,status: "1"})
              .then(res => {
              if(res.data.code == 200) {
              this.$message.success(`${res.data.message}`)
              this.getVisit(this.pageSize,this.currentPage);
            }else if(res.data.code == 401){
              this.$router.push("/login");
            }else {
              this.$message.error(`${res.data.message}`)
              return false;
            }
              })
          }).catch(() => {

        });
      },
      handleAdd(index){
        this.dialogVisible = true
        this.dialogTitle = '新增访问商品'
        this.visitForm.classify_id = ''
        this.visitForm.money = ''
        this.visitForm.count = ''
        this.tcount = ''
      },
      //商品分类
      qryClassify() {
        qryVisitProductListAll({}).then(res => {
          if(res.data.code == 200){
            this.classify = res.data.data;
          }
        })
        this.showdelete = true
      },
      //商品今日访问量
      changeProduct(id){
        let self = this;
        // var cid = self.$refs.option[self.visitForm.classify_id-1].value;
        qryProductVisitCount({id: id}).then(res=>{
           if(res.data.code == 200) {
             this.tcount = res.data.data.count;
           }
        })
      },
      //保存角色
      handleSave(option){
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            this.$refs.visitForm.resetFields();
            //登录接口传值
            saveProductVisitManage({
              // id: "",
              productId: this.visitForm.classify_id,
              money: this.visitForm.money,
              count: this.visitForm.count,
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.getVisit(this.pageSize,this.currentPage);
                  this.$message.success(`${res.data.message}`)
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    activated() {
      this.getVisit();
    },
    mounted () {
      // this.getVisit();
    },
    created(){
      // this.getVisit();
    },
    watch: {
      '$route' () {
        // this.getVisit();
      }
    }
  }
</script>
