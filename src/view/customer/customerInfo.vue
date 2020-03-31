<template>
	<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">{{this.$route.query.view == 1 ? "客户详情" : this.$route.query.view == 2 ? "修改客户" : ""}}</span>
      <!-- <span class="title">客户详情</span> -->
      <div class="operation">
        <!-- <el-button @click="reback">取消</el-button>  -->
      </div>
    </div>
    <template v-if="this.$route.query.view==1">
      <el-form label-width="150px">
				<el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="手机号：" prop="mobile">
              {{this.mobile}}
          	</el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="注册时间：">
              {{this.time}}
          	</el-form-item>
          </el-col>
        </el-row>
				<!-- <el-row>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="性别：">
              {{this.sex}}
						</el-form-item>
					</el-col>
				</el-row> -->
				<!-- <el-row>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="职业：">
              {{this.job}}
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
          <!-- <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="芝麻分：">
              {{this.zhima_score}}
          	</el-form-item>
          </el-col> -->
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="认证状态：">
              {{this.mobile_auth}}
              <!-- <el-input v-model="form.mobile_auth"></el-input> -->
          	</el-form-item>
          </el-col>
        </el-row>
				<el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="银行卡号：">
              {{this.bank_card}}
              <!-- <el-input v-model="form.bank_card"></el-input> -->
          	</el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="银行卡开户行：">
              {{this.bank_open}}
              <!-- <el-input v-model="form.bank_open"></el-input> -->
          	</el-form-item>
          </el-col>
        </el-row>
				<el-row>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="状态：">
              {{this.status}}
							<!-- <el-input v-model="form.status"></el-input> -->
						</el-form-item>
					</el-col>
				</el-row>
        <!-- <el-row> -->
					<!-- <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"> -->
						<el-form-item label="身份证信息：" v-if="attach.length > 0">
              <!-- {{this.attach}} -->
              <div class="demo-image">
              <div v-for="(item,index) in attach">
                <span class="demonstration" >{{ item.type == "0" ? "身份证人像" : item.type == "1" ? "身份证国徽面" : item.type == "2" ? "手持身份证" : ""}}</span>
                <el-image
                  style="width: 400px; height: 300px"
                  :src="'http://localhost:7001'+item.path"
                  :fit="item.type"></el-image>
              </div>
              </div>
						</el-form-item>
            <el-form-item  v-else>
						</el-form-item>
					<!-- </el-col> -->
				<!-- </el-row> -->
        <div style="float: right; margin-top: 25px; margin-bottom: 20px">
          <el-button style="float: right; margin-bottom: 20px" @click="reback">关闭</el-button>
        </div>
      </el-form>
    </template>
    <template v-if="this.$route.query.view==2">
      <el-form ref="form" :model="form" label-width="150px">
				<el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="姓名：" prop="user_name">
              <el-input  v-model="form.user_name"></el-input>
          	</el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="身份证号：" prop="id_card">
              <el-input v-model="form.id_card"></el-input>
          	</el-form-item>
          </el-col>
        </el-row>
        <div style="float: right; margin-top: 25px; margin-bottom: 20px">
          <el-button @click="reback">关闭</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>

        </div>
      </el-form>
    </template>
  </el-card>
</template>

<style scoped>
  .el-form-item__label{
    font-size: 14px;
    color: #606266;
  }
  .title{
    font-size:20px;
	}
  .operation{
    float: right;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="less">
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import {qryCustomerById,saveCustomer} from '../../api/customer';
  export default {
    inject: ['reload'],
      data () {
        return {
          user_name: '',
          id_card: '',
          time: '',
          mobile: '',
          create_time: '',
          sex: '',
          job: '',
          zhima_score: '',
          mobile_auth: '',
          bank_card: '',
          bank_open: '',
          status: '',
          attach: '',
          form: {
          user_name: '',
          id_card: '',
          mobile: '',
          create_time: '',
          sex: '',
          job: '',
          zhima_score: '',
          mobile_auth: '',
          bank_card: '',
          bank_open: '',
          status: '',
          attach: []
        },
        customerInfo: '',
          imageUrl: '',
          activeNames: ['1'],
          context: '',
        }
		},
		methods: {
      //  dateFormat (row, column) {
      //   var dateee = new Date(row.createTime).toJSON();
      //   return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
      //查看顾客详情
      handleQry(){
        var view = this.$route.query.view;
        if(view == 1 || view == 2) {
          qryCustomerById({id: this.$route.query.id}).then(res=>{
            if(res.data.code == 200) {
              this.customerInfo = res.data.data;
              if(!this.customerInfo) {
                return
              }else {
                this.create_time = this.customerInfo.create_time;
                var dateee = new Date(this.create_time).toJSON();
                this.time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                this.sex = this.customerInfo.sex;
                this.mobile = this.customerInfo.mobile;
                this.job =  this.customerInfo.job;
                this.zhima_score = this.customerInfo.zhima_score;
                this.mobile_auth = this.customerInfo.mobile_auth;
                this.bank_card = this.customerInfo.bank_card;
                this.bank_open = this.customerInfo.bank_open;
                this.status = this.customerInfo.status;
                this.user_name = this.customerInfo.user_name;
                this.id_card = this.customerInfo.id_card;
                this.attach = this.customerInfo.attach;
                var attach = this.attach;
                this.form.user_name = this.customerInfo.user_name;
                this.form.id_card = this.customerInfo.id_card;
              }
            }
          })
        }else {
        }
      },
       //保存
      handleSubmit(option) {
        //表单验证
        var id = this.$route.query.id;
        // console.log(id)
        this.$refs.form.validate((valid) => {
          if (valid) {
            //登录接口传值
            saveCustomer({
              id: id,
              user_name: this.form.user_name,
              id_card: this.form.id_card,
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$router.push("/customer/list");
                  // this.reload();
                }else {
                  this.$message.error(`${res.data.message}`)
                  return false;
                  this.$router.push("/customer/list");
                  // this.reload();
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
      //返回上一界面
			reback(){
        // window.location.href = '/customer/list/'
        this.$router.go(-1);
        // this.reload();
      },
      //保存
      onSubmit() {
        // console.log('submit!');
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
      }
    },
    created(){
      // this.handleQry(this.$route.params.id);
    },
    beforeRouteLeave (to, from, next) {
      // console.log(to)
      if(to.path == '/customer/list/customerInfo'){
        to.meta.keepAlive = true;
      }else {
        to.meta.keepAlive = false;
      }
      next();
    },
    activated() {
      this.handleQry(this.$route.params.id);
    },
    mounted () {
      // this.handleQry(this.$route.params.id)
    },
    watch: {
      '$route' () {
        // this.handleQry(this.$route.params.id);
      }
    }
  }
</script>
