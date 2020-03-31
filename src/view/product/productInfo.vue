
<template>

	<el-card class="box-card">
    <div slot="header" class="clearfix">
        <span class="title">{{this.$route.query.view == 1 ? "商品详情" : this.$route.query.view == 2 ? "修改商品" : this.$route.query.view == 3 ? "新增商品" : ""}}</span>
    </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="180px">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="商品名称：" prop="name">
                  <template v-if="this.$route.query.view==1">{{this.form.name}}</template>
                  <el-input v-else-if="this.$route.query.view==2" v-model="form.name"></el-input>
                  <el-input v-else="this.$route.query.view==3" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="logo：" prop="logo" v-if="this.$route.query.view==1">
            <img :src="'http://localhost:7001'+form.logo" class="avatar">
          </el-form-item>
          <el-form-item label="logo：" prop="logo" v-else>
            <image-upload data-type="string" :num-limit="1" :size-limit="2*1024*1024" v-model="form.logo"></image-upload>
          </el-form-item>
          <el-form-item label="分类：" prop="classifyId">
            <template v-if="this.$route.query.view==1">{{this.form.classifyId}}</template>
            <el-select v-else-if="this.$route.query.view==2" @click.native="qryClassify" v-model="form.classifyId" placeholder="请选择" >
              <el-option  value="">请选择</el-option>
              <el-option v-for="item in classify" :label="item.name" :value="item.id" :key="item.name">{{ item.name }}</el-option>
            </el-select>
            <el-select v-else="this.$route.query.view==3" @click.native="qryClassify" v-model="form.classifyId" placeholder="请选择" >
              <el-option  value="">请选择</el-option>
              <el-option v-for="item in classify" :label="item.name" :value="item.id" :key="item.name">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
            <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="利息：" prop="interest">
                <template v-if="this.$route.query.view==1">{{this.form.interest}}%</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.interest" placeholder="请输入小数或者整数">
                  <template slot="append">%</template>
                </el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.interest" placeholder="请输入小数或者整数">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="可授信额度：" prop="money">
                 <template v-if="this.$route.query.view==1">{{this.form.money}}</template>
                <el-select v-else-if="this.$route.query.view==2" @click.native="qryMoney" v-model="form.money" placeholder="请选择">
                  <el-option  value="">请选择</el-option>
                  <el-option v-for="item in money" value="item.itemValue" :label="item.itemValue" :value="item.id" :key="item.itemKey">{{ item.itemValue }}</el-option>
                </el-select>
                <el-select v-else="this.$route.query.view==3" @click.native="qryMoney" v-model="form.money" placeholder="请选择">
                  <el-option  value="">请选择</el-option>
                  <el-option v-for="item in money" value="item.itemValue" :label="item.itemValue" :value="item.id" :key="item.itemKey">{{ item.itemValue }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="分期方式：" prop="perioWay">
                <el-radio-group v-if="this.$route.query.view==1" v-model="form.perioWay" >
                  <el-radio :label="0" disabled>按天</el-radio>
                  <el-radio :label="1" disabled>按月</el-radio>
                </el-radio-group>
                <el-radio-group v-else-if="this.$route.query.view==2" v-model="form.perioWay">
                  <el-radio :label="0">按天</el-radio>
                  <el-radio :label="1">按月</el-radio>
                </el-radio-group>
                <el-radio-group v-else="this.$route.query.view==3" v-model="form.perioWay">
                  <el-radio :label="0">按天</el-radio>
                  <el-radio :label="1">按月</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="可分期期数：" prop="periodization">
                <template v-if="this.$route.query.view==1">{{this.form.periodization}}天/月</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.periodization">
                  <template slot="append">天/月（多个请用逗号隔开）</template>
                </el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.periodization">
                  <template slot="append">天/月（多个请用逗号隔开）</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="链接：" prop="link">
                  <template v-if="this.$route.query.view==1">{{this.form.link}}</template>
                  <el-input v-else-if="this.$route.query.view==2" v-model="form.link"></el-input>
                  <el-input v-else="this.$route.query.view==3" v-model="form.link"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-form-item label="结算方式：" prop="settle_cpa">
                <el-checkbox v-if="this.$route.query.view==1 " v-model="form.settle_cpa" :label="0" disabled>CPA</el-checkbox>
                <el-checkbox v-else-if="this.$route.query.view==2" v-model="form.settle_cpa" :label="0">CPA</el-checkbox>
                <el-checkbox v-else="this.$route.query.view==3" v-model="form.settle_cpa" :label="0">CPA</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
              <el-form-item prop="settleWayCpa">
                <template v-if="this.$route.query.view==1">{{this.form.settleWayCpa}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.settleWayCpa"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.settleWayCpa"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="结算周期：" prop="settleCycle">
                  <template v-if="this.$route.query.view==1">{{this.form.settleCycle}}</template>
                  <el-input v-else-if="this.$route.query.view==2" v-model="form.settleCycle" placeholder="请填写结算周期，如日结、周结、每周五结算等"></el-input>
                  <el-input v-else="this.$route.query.view==3" v-model="form.settleCycle" placeholder="请填写结算周期，如日结、周结、每周五结算等"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="申请条件：" prop="requires" v-if="this.$route.query.view==1">
            <el-checkbox-group v-model="form.requires">
              <el-checkbox  v-for="item in apply_require" :label="item.id" :key="item.id" disabled>{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请条件：" prop="requires" v-else-if="this.$route.query.view==2">
           <el-checkbox-group v-model="form.requires">
              <el-checkbox  v-for="item in apply_require" :label="item.id" :key="item.id" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请条件：" prop="requiress" v-else="this.$route.query.view==3">
            <el-checkbox-group v-model="form.requiress">
              <el-checkbox @change="changeCheckr(item)" v-for="item in apply_require" :label="item.id" :key="item.id" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="申请资料：" prop="datas" v-if="this.$route.query.view==1">
            <el-checkbox-group v-model="form.datas">
              <el-checkbox  v-for="item in apply_data" :label="item.id" :key="item.id" disabled>{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请资料：" prop="datas" v-else-if="this.$route.query.view==2">
            <el-checkbox-group v-model="form.datas">
              <el-checkbox  v-for="item in apply_data" :label="item.id" :key="item.id" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请资料：" prop="datass" v-else="this.$route.query.view==3">
             <el-checkbox-group v-model="form.datass">
              <el-checkbox @change="changeCheckd(item)" v-for="item in apply_data" :label="item.id" :key="item.id" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="费用说明：">
                <template v-if="this.$route.query.view==1">{{this.form.ktxDesc}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.ktxDesc"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.ktxDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="状态：" prop="status">
                <template v-if="this.$route.query.view==1">{{this.form.status}}</template>
                <el-select v-else-if="this.$route.query.view==2" v-model="form.status" placeholder="请选择">
                  <el-option label="上架" value="1"></el-option>
                  <el-option label="下架" value="0"></el-option>
                </el-select>
                <el-select v-else="this.$route.query.view==3" v-model="form.status" placeholder="请选择">
                  <el-option label="上架" value="1"></el-option>
                  <el-option label="下架" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="排序：" prop="sort">
                <template v-if="this.$route.query.view==1">{{this.form.sort}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.sort"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="首页热门：" prop="isHot">
                <template v-if="this.$route.query.view==1">{{this.form.isHot}}</template>
                <el-select v-else-if="this.$route.query.view==2" v-model="form.isHot" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
                <el-select v-else="this.$route.query.view==3" v-model="form.isHot" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="热门排序：" >
                <template v-if="this.$route.query.view==1">{{this.form.hotSort}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.hotSort"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.hotSort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="后台链接：" >
                  <template v-if="this.$route.query.view==1">{{this.form.managerUrl}}</template>
                  <el-input v-else-if="this.$route.query.view==2" v-model="form.managerUrl"></el-input>
                  <el-input v-else="this.$route.query.view==3" v-model="form.managerUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="后台登陆用户名：">
                <template v-if="this.$route.query.view==1">{{this.form.managerUser}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.managerUser"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.managerUser"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="后台登陆用户密码：">
                <template v-if="this.$route.query.view==1">{{this.form.managerPassword}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.managerPassword"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.managerPassword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="所属公司：" prop="company">
                  <template v-if="this.$route.query.view==1">{{this.form.company}}</template>
                  <el-input v-else-if="this.$route.query.view==2" v-model="form.company"></el-input>
                  <el-input v-else="this.$route.query.view==3" v-model="form.company"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="产品联系人：">
                <template v-if="this.$route.query.view==1">{{this.form.contact}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.contact"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.contact"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="产品联系人联系方式：">
                <template v-if="this.$route.query.view==1">{{this.form.contactInfo}}</template>
                <el-input v-else-if="this.$route.query.view==2" v-model="form.contactInfo"></el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.contactInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="商品描述（申请攻略）:" prop="description">
                <template v-if="this.$route.query.view==1">{{this.form.description}}</template>
                <el-input  v-else-if="this.$route.query.view==2" v-model="form.description" minlength="3" maxlength="15"
                  show-word-limit>
                </el-input>
                <el-input v-else="this.$route.query.view==3" v-model="form.description" minlength="3" maxlength="15"
                  show-word-limit></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    <div style="float: right; margin-top: 25px; margin-bottom: 20px">
      <el-button @click="reback('form')">关闭</el-button>
      <el-button type="primary" @click="handleSubmit('form')" v-if="this.$route.query.view==2">保存</el-button>
      <el-button type="primary" @click="handleSubmitAdd('form')" v-else-if="this.$route.query.view==3">保存</el-button>

    </div>
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

</style>
<style lang="less">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
		background: #fff;
  }
  // .avatar-uploader-icon[data-v-68a20d26] {
  //   border: 1px dashed #DCDFE6;
  // }
</style>
<script>
  import ImageUpload from "./components/uploadImg"
import {qryProductById,saveProduct,qryProductClassifyAll,qryDictByDataType,upload} from '../../api/productManage';
  export default {
    inject: ['reload'],
    components: {ImageUpload},
      data () {
        return {
          dialogVisible: false,
          fileList: [],
          param: {},
          // uploadAction: "/img/xxx.json?accountNo=xxx&password=xxx",
          // uploadAction: "upload",
          //分类接口
          classify: [],
          //可授信额度
          money: [],
          //申请条件
          requires: [],
          requiress: [],
          //申请资料
          datas: [],
          datass: [],
          apply_require: [],
          //s申请资料
          apply_data: [],
          name: '',
          logo: '',
          classifyId:'',
          interest: '',
          money: '',
          perioWay: '',
          periodization: '',
          link: '',
          settle_cpa: '',
          settleWayCpa: '',
          settleCycle: '',
          conditionList: '',
          dataList: '',
          ktxDesc: '',
          status: '',
          sort: '',
          isHot: '',
          hotSort: '',
          managerUrl: '',
          managerUser: '',
          managerPassword: '',
          company: '',
          contact: '',
          contactInfo: '',
          description: '',
          form: {
            name: '',
            logo: '',
            classifyId:'',
            interest: '',
            money: '',
            perioWay: '',
            periodization: '',
            link: '',
            settle_cpa: '',
            settleWayCpa: '',
            settleCycle: '',
            conditionList: '',
            dataList: '',
            ktxDesc: '',
            status: '',
            sort: '',
            isHot: '',
            hotSort: '',
            managerUrl: '',
            managerUser: '',
            managerPassword: '',
            company: '',
            contact: '',
            contactInfo: '',
            description: '',
            //申请条件
            requires: [],
            requiress: [],
            //申请资料
            datas: [],
            datass: []
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          logo: [
            { required: true, message: '最多上传一张logo', trigger: 'blur' }
          ],
          classifyId: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          interest: [
            { required: true, message: '请输入利息', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '请选择可授信额度', trigger: 'change' }
          ],
          perioWay: [
            { required: true, message: '请选择分期方式', trigger: 'change' }
          ],
          periodization: [
            { required: true, message: '请输入可分期期数', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入链接', trigger: 'blur' }
          ],
          settle_cpa: [
            { required: true, message: '*', trigger: 'change' }
          ],
          settleWayCpa: [
            { required: true, message: '请输入结算金额', trigger: 'blur' }
          ],
          settleCycle: [
            { required: true, message: '请输入结算周期', trigger: 'blur' }
          ],
          requires: [
            { required: true, message: '请选择申请条件', trigger: 'blur' }
          ],
           requiress: [
            { required: true, message: '请选择申请条件', trigger: 'blur' }
          ],
          datas: [
            { required: true, message: '请选择申请材料', trigger: 'blur' }
          ],
          datass: [
            { required: true, message: '请选择申请材料', trigger: 'blur' }
          ],
          conditionList: [
            { type: 'array', required: true, message: '请选择申请条件', trigger: 'blur' }
          ],
          dataList: [
            { type: 'array', required: true, message: '请选择申请材料', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          sort: [
             { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          isHot: [
            { required: true, message: '请选择热门状态', trigger: 'change' }
          ],
          company: [
             { required: true, message: '请输入公司名称', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
        },
        title: '',
        view:this.$route.query.view,
        //分类
        productInfo: '',
          imageUrl: '',
          activeNames: ['1'],
          // toolbars: {
          //   bold: true, // 粗体
          //   italic: true, // 斜体
          //   header: true, // 标题
          //   underline: true, // 下划线
          //   strikethrough: true, // 中划线
          //   mark: true, // 标记
          //   superscript: true, // 上角标
          //   subscript: true, // 下角标
          //   quote: true, // 引用
          //   ol: true, // 有序列表
          //   ul: true, // 无序列表
          //   link: true, // 链接
          //   imagelink: true, // 图片链接
          //   code: true, // code
          //   table: true, // 表格
          //   fullscreen: true, // 全屏编辑
          //   readmodel: true, // 沉浸式阅读
          //   htmlcode: true, // 展示html源码
          //   help: true, // 帮助
          //   /* 1.3.5 */
          //   undo: true, // 上一步
          //   redo: true, // 下一步
          //   trash: true, // 清空
          //   save: true, // 保存（触发events中的save事件）
          //   /* 1.4.2 */
          //   navigation: true, // 导航目录
          //   /* 2.1.8 */
          //   alignleft: true, // 左对齐
          //   aligncenter: true, // 居中
          //   alignright: true, // 右对齐
          //   /* 2.2.1 */
          //   subfield: true, // 单双栏模式
          //   preview: true, // 预览
          // }
        }
		},
		methods: {
       //点击角色分配复选框
      changeCheckr(item) {
        // console.log(item)
      },
      changeCheckd(item) {
		  },
      //查看商品详情
      handleQry(){
        var view = this.$route.query.view;
        if(view == 1 || view == 2 ) {
          qryProductById({id: this.$route.query.id}).then(res=>{
            if(res.data.code == 200) {
              this.productInfo = res.data.data;
              if(!this.productInfo) {
                return
              }else {
              this.form.name = this.productInfo.name;
              this.form.logo = this.productInfo.logo;
              this.form.classifyId =  this.productInfo.classifyId == 1 ? "现金贷" : this.productInfo.classifyId == 2 ? "借条" : '';
              this.form.money =  this.productInfo.money == "572" ? "500-2000" : this.productInfo.money == "573" ? "2000-5000" :
              this.productInfo.money == "574" ? "5000-8000" : this.productInfo.money == "577" ? "8000-10000" : this.productInfo.money == "578" ? "10000-20000" : "";
              this.form.interest = this.productInfo.interest;
              var p = parseInt(this.productInfo.perioWay);
              this.perioWay = p;
              this.form.perioWay = p;
              this.form.periodization = this.productInfo.periodization;
              this.form.link = this.productInfo.link;
              this.form.settleWayCpa = this.productInfo.settleWayCpa;
              this.form.settle_cpa = this.form.settleWayCpa.length > 0 ? true : false
              // console.log(this.form.settle_cpa)
              this.form.settleCycle = this.productInfo.settleCycle;
              this.form.status = this.productInfo.status == "0" ? "下架" : this.productInfo.status == "1" ? "上架": "";
              // this.form.status = this.productInfo.status;
              this.form.sort = this.productInfo.sort;
              this.form.isHot = this.productInfo.isHot == "0" ? "否" : this.productInfo.isHot == "1" ? "是": "";
              /////申请条件
              var require = [];
              var a = this.productInfo.conditionList;
              require=a.split(",");
              var r = []
              for(let i = 0;i < require.length; i++){
                r.push(require[i])
                let ab = [];
                for(let i = 0; i< r.length; i++) {
                  r[i] = r[i].replace('"', '')
                  var cc = Number(r[i])
                  ab.push(cc);
                  // this.requires = ab;
                  this.form.requires = ab;
                  // console.log(ab)
                }
              }
              //////
              /////申请资料
              var data = [];
              var a = this.productInfo.dataList;
              data=a.split(",");
              var r = []
              for(let i = 0;i < data.length; i++){
                r.push(data[i])
                let ab = [];
                for(let i = 0; i< r.length; i++) {
                  r[i] = r[i].replace('"', '')
                  var cc = Number(r[i])
                  ab.push(cc);
                  // this.datas = ab;
                  this.form.datas = ab;
                  // console.log(ab)
                }
              }
              //////
              //申请条件
              this.form.conditionList = this.productInfo.conditionList;
              //申请资料
              this.form.dataList = this.productInfo.dataList;
              this.form.hotSort = this.productInfo.hotSort;
              this.form.managerUrl = this.productInfo.managerUrl;
              this.form.managerUser = this.productInfo.managerUser;
              this.form.managerPassword = this.productInfo.managerPassword;
              this.form.company = this.productInfo.company;
              this.form.contact = this.productInfo.contact;
              this.form.contactInfo = this.productInfo.contactInfo;
              this.form.description = this.productInfo.description;
              this.classifyId =  this.productInfo.classifyId;
            }
            }
          })
        }else {
          this.form.name = '';
          this.form.logo = '';
          this.form.classifyId =  '';
          this.form.interest = '';
          // var p = parseInt(this.productInfo.perioWay);
          // this.perioWay = p;
          this.form.perioWay = '';
          this.form.periodization = '';
          this.form.link = '';
          this.form.settleWayCpa = '';
          this.form.settleCycle = '';
          this.form.status = '';
          this.form.sort = '';
          this.form.isHot = '';
          this.form.hotSort = '';
          this.form.conditionList = '';
          this.form.dataList = '';
          this.form.managerUrl = '';
          this.form.managerUser = '';
          this.form.managerPassword = '';
          this.form.company = '';
          this.form.contact = '';
          this.form.contactInfo = '';
          this.form.description = '';
           this.form.money = '';
          // this.form.requires = '';
          // this.form.datas = '';
          // this.form.requiress = '';
          // this.form.datass = '';
          this.form.settle_cpa = false;
        }
      },
      //商品分类
      qryClassify() {
        qryProductClassifyAll({}).then(res => {
          if(res.data.code == 200){
            this.classify = res.data.data;
          }
        })
      },
      //商品可授信额度
      qryMoney() {
        qryDictByDataType({data_type : "PRICE_INTERVAL"}).then(res => {
          if(res.data.code == 200){
            this.money = res.data.data;
          }
        })
      },
      //商品申请条件
      getApplyRequire() {
        qryDictByDataType({data_type : "APPLY_REQUIRE"}).then(res => {
          if(res.data.code == 200){
            this.apply_require = res.data.data;
          }
        })
      },
      //商品申请资料
      getApplyData() {
        qryDictByDataType({data_type : "APPLY_DATA"}).then(res => {
          if(res.data.code == 200){
            this.apply_data = res.data.data;
          }
        })
      },
      //上传图片
      // uploadImg(file) {
      //  var param = new FormData();
      //   param.append("file", file.name);
      //   // this.fileList.forEach((file) => {
      //   // formData.append("logoFile", file.file);
      //   // // console.log(file.file)
      //   // console.log(logoFile)
      //   // });
      //   // var formData = this.param
      //   //  console.log(formData)
      //   // console.log(file.file.name)
      //   upload({
      //       param// 选择FormData方式传参
      //   })
      //   .then((data) => {
      //     console.log(data)
      //   })
      //   .catch((err) => {
      //     console.log(err, 'error');
      //   });
      // },
      uploadImg(item) {
        let formData = new FormData();
        formData.append("file", item.file);
        // console.log(item.file)
        upload(formData)
        .then(res=> {
          if(res.data.code == 200) {
            this.$message.success(`${res.data.message}`)
            this.logo = res.data.data.picPath
            this.logo =  this.logo.indexOf("http://") >= 0 ?  this.logo :  this.logo;
            // console.log(this.logo)
          }else {
            this.$message.error(`${res.data.message}`)
            return false;
          }
        })
        .catch((err) => {
          console.log(err, 'error');
        });
      },
        //上传图片
      handleAvatarSuccess(res, file) {
        this.logo = URL.createObjectURL(file.raw);
        // console.log(this.logo)
      },
      beforeAvatarUpload(file) {
      },
      handlePictureCardPreview(file) {//预览图片时调用
        // console.log(file);
        this.logo = file.url;
        // console.log(this.logo)
        this.dialogVisible = true;
      },
      handlePreview(file) {//预览图片时调用
        // console.log(file);
      },
      handleRemove(file,fileList) {

      },
      //Collapse折叠面板
      handleChange(val) {
      },
      //富文本编辑器html代码转换
      changeData(value, render) {
        this.contentHtml = render;
        },
      //返回上一界面
			reback(option){
        // this.$router.push({ path:'/product/list/'})
        // window.location.href = '/product/list/'
        this.$router.go(-1);
        // this.reload();
        this.$refs.form.resetFields();
      },
      //保存
      handleSubmit(option) {
        // console.log(this.form.logo)
        this.handleQry(this.form)
        var conditionList = JSON.parse(JSON.stringify(this.requires));
        var dataList = JSON.parse(JSON.stringify(this.datas));
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            var conditionList = JSON.parse(JSON.stringify(this.form.requires));
            var dataList = JSON.parse(JSON.stringify(this.form.datas));
            var testc = [];
            var testd= [];
            testc = conditionList.join(',')
            testd = dataList.join(',')
            saveProduct({
              name: this.form.name,
              logo: this.form.logo,
              classifyId: this.form.classifyId == "现金贷" ? 1 : this.form.classifyId == "借条" ? 0 : this.form.classifyId,
              // classifyId: this.form.classifyId,
              interest: this.form.interest,
              money: this.form.money == "500-2000" ? "572" : this.form.money == "2000-5000" ? "573" : this.form.money == "5000-8000" ? "574" :
              this.form.money == "8000-10000" ? "577" : this.form.money == "10000-20000" ? "578" : this.form.money,
              perioWay: this.form.perioWay,
              periodization: this.form.periodization,
              link: this.form.link,
              settle_cpa: this.form.settle_cpa == true ? "0" : "",
              settleWayCpa: this.form.settleWayCpa,
              settleCycle: this.form.settleCycle,
              conditionList: testc,
              dataList: testd,
              ktxDesc: this.form.ktxDesc,
              status: this.form.status == "下架" ? "0" : this.form.status == "上架" ? "1": this.form.status,
              sort: this.form.sort,
              isHot: this.form.isHot == "否" ? "0" : this.form.isHot == "是" ? "1" : this.form.isHot,
              hotSort: this.form.hotSort,
              managerUrl: this.form.managerUrl,
              managerUser: this.form.managerUser,
              managerPassword: this.form.managerPassword,
              company: this.form.company,
              contact: this.form.contact,
              contactInfo: this.form.contactInfo,
              description: this.form.description,
              id: this.$route.query.id
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$router.go(-1);
                  // this.reload();
                  this.$refs.form.resetFields();
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
       //保存
      handleSubmitAdd(option) {
        // console.log(this.form.logo)
        // var conditionList = JSON.parse(JSON.stringify(this.requires));
        // var dataList = JSON.parse(JSON.stringify(this.datas));
        //表单验证
        this.$refs[option].validate((valid) => {
          if (valid) {
            // console.log(this.form)
            var conditionList = JSON.parse(JSON.stringify(this.form.requiress));
            var dataList = JSON.parse(JSON.stringify(this.form.datass));
            // console.log(conditionList)
            var testc = [];
            var testd= [];
            testc = conditionList.join(',')
            testd = dataList.join(',')
            saveProduct({
              id: "",
              name: this.form.name,
              logo: this.form.logo,
              classifyId: this.form.classifyId == "现金贷" ? 1 : this.form.classifyId == "借条" ? 0 : this.form.classifyId,
              // classifyId: this.form.classifyId,
              interest: this.form.interest,
              money: this.form.money,
              perioWay: this.form.perioWay,
              periodization: this.form.periodization,
              link: this.form.link,
              settle_cpa: this.form.settle_cpa == true ? "0" : "",
              settleWayCpa: this.form.settleWayCpa,
              settleCycle: this.form.settleCycle,
              conditionList: testc,
              dataList: testd,
              ktxDesc: this.form.ktxDesc,
              status: this.form.status,
              sort: this.form.sort,
              isHot: this.form.isHot,
              hotSort: this.form.hotSort,
              managerUrl: this.form.managerUrl,
              managerUser: this.form.managerUser,
              managerPassword: this.form.managerPassword,
              company: this.form.company,
              contact: this.form.contact,
              contactInfo: this.form.contactInfo,
              description: this.form.description,
              })
              .then(res => {
                if(res.data.code == 200) {
                  this.$message.success(`${res.data.message}`)
                  this.$router.go(-1);
                  // this.reload();
                  this.$refs.form.resetFields();
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
    },
    created(){
      // this.handleQry(this.$route.params.id);
      // this.getApplyData(this.$route.params.id);
      // this.getApplyRequire(this.$route.params.id);
    },
    beforeRouteLeave (to, from, next) {
      if(to.path == '/product/list/productInfo'){
        to.meta.keepAlive = true;
      }else {
        to.meta.keepAlive = false;
      }
      next();
    },
    activated() {
      this.getApplyData(this.$route.params.id);
      this.getApplyRequire(this.$route.params.id);
      this.handleQry(this.$route.params.id);
    },
    mounted () {
      // this.handleQry(this.$route.params.id)
    },
    watch: {
      '$route' () {
        // this.handleQry(this.$route.params.id);
        // this.getApplyData();
        // this.getApplyRequire();
        // console.log(this.$route.path);
      }
    }
  }
</script>
