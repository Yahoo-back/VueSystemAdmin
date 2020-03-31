<style lang="less">
    @import '../../styles/common.less';
    .el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
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
    .avatar-uploader-icon[data-v-68a20d26] {
      border: 1px dashed #DCDFE6;
    }
    a {
      color: #606266;
    }
</style>
<template>
  <div id="app">
		<Card>
      <Row style=" margin-left: -40px">
        <div class="demo-input-suffix">
          <div class="search">
            <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div class="search">
            <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card_cnd" suffix-icon="el-icon-search" clearable />
          </div>
          <div>
            <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px;float:right">查询</el-button>
          </div>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          v-loading="loading"
          :data="rebackData"
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
            prop="mobile"
            sortable
            align="center"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id_card"
            sortable
            align="center"
            label="身份证号"
            width="170">
          </el-table-column>
          <el-table-column
            :formatter="dateFormat"
            prop="create_time"
            sortable
            align="center"
            label="注册时间"
            width="240">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            sortable
            align="center"
            width="160">
          </el-table-column>
           <el-table-column
            prop="bank_card"
            label="银行卡号"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.user_auth == '身份认证' ? '身份认证' : scope.row.user_auth == '联系人' ? '联系人' : scope.row.user_auth == '银行卡' ? '银行卡' : scope.row.user_auth == 'vip' ? 'vip' : '未认证'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="pay_amt"
            label="已支付金额"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '正常' : scope.row.status == 1 ? '禁用' : '未知'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="remark"
            label="备注"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="160">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" size="small"><router-link :to="{path:'/complaint/reback/rebackInfo',query:{ id:scope.row.id,view: 1 }}" class="around"  style="color: #606266">查看</router-link></el-button>
							<el-button @click="handleReback(scope.row)" size="small" v-if="scope.row.refundStatus == 1 || scope.row.refundStatus == 4">退款</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-dialog title="退款" :visible.sync="dialogRebackVisible" :append-to-body='true' width="35%" :before-close="closeDiv"  @close="onDialogClose()"  :close-on-click-modal='false'>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="退款金额" props="money">
              <el-input v-model="form.money" :placeholder='"退款金额应小于"+form.pay_amt+"元"'></el-input>
              <!-- <el-upload
                class="avatar-uploader"
                action="http://localhost:8003/main/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload">
                <img v-model="form.file_uri" class="el-icon-plus avatar-uploader-icon"></img>
              </el-upload> -->
            </el-form-item>
            <!-- <el-form-item label="logo：" prop="file_uri">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8003/main/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload">
                <img v-model="form.file_uri" class="el-icon-plus avatar-uploader-icon"></img>
              </el-upload>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRebackVisible = false">关闭</el-button>
            <el-button type="primary" @click="handleSave('form')">保存</el-button>
          </div>
        </el-dialog>
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
<style lang="less">
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import {qryRefundList,thirdPay} from '../../api/complaint';
import * as table from './data/table';
  export default {
    inject: ['reload'],
      data () {
        return {
          loading: true,
          rebackData: [],
          mobile_cnd: '',
          id_card_cnd: '',
          // 初始化信息总条数
          pageSize:5,
          currentPage: 1,
          total: 10,
          dialogRebackVisible: false,
          form: {
            money: '',
            file_uri: ''
          }
        }
    },
    methods:{
      // dateFormat (row, column) {
      //   if(row.create_time == null) {
      //   }else {
      //     var dateee = new Date(row.create_time).toJSON();
      //     return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      //   }
      // },
      dateFormat (row, column) {
        var date = new Date(row.create_time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         if(row.create_time == null) {
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
      getList(){
        this.loading = true;
        qryRefundList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.rebackData = res.data.data.list;
             this.total = res.data.data.total;
             this.loading = false;
           }
        })
      },
      handleSearch() {
        this.loading = true;
        this.currentPage = 1;
        qryRefundList({pageSize: this.pageSize,pageNum: this.currentPage,mobile_cnd: this.mobile_cnd,id_card_cnd: this.id_card_cnd}).then(res=>{
           if(res.data.code == 200) {
             this.rebackData = res.data.data.list;
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
      //退款
      handleReback(row) {
        let _row = row;
        this.form = Object.assign({}, _row)
        this.dialogRebackVisible = true;
      },
      handleSave(option) {
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            this.dialogRebackVisible = false;
            this.$refs.form.resetFields();
            //退款接口传值
            thirdPay({
              id: this.form.id,
              money: this.form.money,
              status: "1",
              type: "0",
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.getList(this.pageSize,this.currentPage);
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
      },
      closeDiv(){
        this.dialogRebackVisible = false;
      },
      // 关闭dialog对话框
      onDialogClose() {
        this.dialogRebackVisible = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleView(row) {
        // window.location.href = '/complaint/reback/rebackInfo?id='+row.id
        this.$router.push({ path:'/complaint/reback/rebackInfo?id='+row.id+'&view='+1 })
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handlePictureCardPreview(file) {//预览图片时调用
        // console.log(file);
        this.form.file_uri = file.url;
        // this.dialogVisible = true;
      },
    },
    mounted () {
      // this.getList();
    },
    created(){
      // this.getList();
    },
    activated() {
      this.getList();
      if(!this.$route.meta.isBack){
      }
      if(this.$route.meta.isBack == false){
        this.currentPage = 1;
        this.pageSize = 5;
        this.mobile_cnd = '';
        this.id_card_cnd = '';
        // this.handleSearch();
        // this.getList();
      }
    },
    beforeRouteEnter (to, from, next) {
      if(from.path == '/complaint/reback/rebackInfo'){
        to.meta.keepAlive = true;
        to.meta.isBack = true;
      }else{
        to.meta.keepAlive = false;
        to.meta.isBack = false;
      }
      next();
    },
    watch: {
      '$route' () {
        // this.reload();
        // this.getList();
      }
    }
  }
</script>
