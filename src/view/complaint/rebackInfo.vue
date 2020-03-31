<template>
	<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">客户详情</span>
      <div class="operation">
        <!-- <el-button @click="reback">取消</el-button>  -->
      </div>
    </div>
      <el-form label-width="150px">
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="手机号:">
              {{this.mobile}}
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="注册时间:">
              {{this.time}}
          	</el-form-item>
          </el-col>
        </el-row>
				<!-- <el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="性别:">
							{{this.sex}}
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="认证状态:">
              {{this.mobile_auth}}
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="状态:">
							{{this.status}}
						</el-form-item>
          </el-col>
					<!-- <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="职业">
							<el-input v-model="form.job"></el-input>
						</el-form-item>
					</el-col> -->
				</el-row>
				<!-- <el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="芝麻分">
              <el-input v-model="form.zhima_score"></el-input>
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="认证状态">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
        </el-row>   -->
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="银行卡号:">
              {{this.bank_card}}
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="银行卡开户行:">
              {{this.bank_open}}
          	</el-form-item>
          </el-col>
        </el-row>
				<!-- <el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="状态:">
							{{this.status}}
						</el-form-item>
					</el-col>
				</el-row> -->
        <el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="身份证信息:" v-if="attach.length > 0">
							<div v-for="(item,index) in attach">
                <span class="demonstration" >{{ item.type == "0" ? "身份证人像" : item.type == "1" ? "身份证国徽面" : item.type == "2" ? "手持身份证" : ""}}</span>
                <el-image
                  style="width: 400px; height: 300px"
                  :src="'http://localhost:7001'+item.path"
                  :fit="item.type"></el-image>
              </div>
						</el-form-item>
            <el-form-item v-else>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="凭证:" v-if="refund.length > 0">
							<div v-for="(item,index) in refund">
                <span class="demonstration" >
                  {{ item.type == "0" ? "身份证人像" : item.type == "1" ? "身份证国徽面" : item.type == "2" ? "手持身份证" :
                  item.type == "3" ? "银行卡正面" : item.type == "4" ? "银行卡反面" : item.type == "5" ? "app失败" :
                  item.type == "6" ? "app失败" : item.type == "7" ? "app失败" : "" }}
                </span>
                <el-image
                  v-if="item.type == 0 || item.type == 1 || item.type == 2 || item.type == 3 || item.type == 4 || item.type == 5 || item.type == 6 || item.type == 7"
                  style="width: 400px; height: 300px"
                  :src="'http://localhost:7001'+item.path"
                  :fit="item.type"></el-image>
              </div>
						</el-form-item>
            <el-form-item v-else>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="退款/驳回:" v-if="refund.length > 8">
							<div v-for="(item,index) in refund">
                <span class="demonstration" >
                  {{ item.type == "8" ? "退款" : item.type == "9" ? "驳回截图" : "" }}
                </span>
                <el-image
                v-if="item.type == 8 || item.type == 9"
                  style="width: 400px; height: 300px"
                  :src="'http://localhost:7001'+item.path"
                  :fit="item.type"></el-image>
              </div>
						</el-form-item>
            <el-form-item v-else>
						</el-form-item>
					</el-col>
				</el-row>
        <div style="float: right; margin-top: 25px; margin-bottom: 20px">
				  <el-button style="float: right; margin-bottom: 20px" @click="reback">关闭</el-button>
        </div>
      </el-form>
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
import {qryRefundAttachById} from '../../api/complaint';
  export default {
      data () {
        return {
          time: '',
          bank_card: '',
          user_name: '',
          sex: '',
          mobile: '',
          bank_open: '',
          mobile_auth: '',
          status: '',
          attach: [],
          refund: []
        }
		},
		methods: {
      //查看客户详情
      handleQry(){
        // console.log(this.$route.query.id)
         var view = this.$route.query.view;
        if(view == 1) {
          qryRefundAttachById({id: this.$route.query.id}).then(res=>{
            if(res.data.code == 200) {
              this.customerInfo = res.data.data;
              if(!this.customerInfo) {
                return
              }else {
                this.create_time = this.customerInfo.create_time;
                var dateee = new Date(this.create_time).toJSON();
                this.time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                this.bank_card = this.customerInfo.bank_card;
                this.user_name = this.customerInfo.user_name;
                this.sex = this.customerInfo.sex;
                this.mobile = this.customerInfo.mobile;
                this.bank_open = this.customerInfo.bank_open;
                this.mobile_auth = this.customerInfo.mobile_auth;
                this.status = this.customerInfo.status;
                this.attach = this.customerInfo.attach;
                var attach = this.attach;
                this.refund = this.customerInfo.refund;
                var refund = this.refund;
              }
            }
          })
             }else {
        }
      },
      //返回上一界面
			reback(){
				this.$router.go(-1);
      },
    },
    created(){
      // this.handleQry(this.$route.params.id);
    },
    mounted () {
      // this.handleQry(this.$route.params.id)
    },
    beforeRouteLeave (to, from, next) {
      if(to.path == '/complaint/reback/rebackInfo'){
        to.meta.keepAlive = true;
      }else {
        to.meta.keepAlive = false;
      }
      next();
    },
    activated() {
      this.handleQry(this.$route.params.id);
    },
    watch: {
      '$route' () {
        // this.handleQry(this.$route.params.id);
      }
    }
  }
</script>
