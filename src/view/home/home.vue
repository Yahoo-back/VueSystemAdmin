<style rel="stylesheet/less" lang="less">
  @import "./home.less";
  @import "../../styles/common.less";
  .main .single-page-con {
		background: #fff;
	}
  .clock-container {
    display: flex;
    align-items: center;
  }
  .ivu-row {
    margin-left: 0;
  }
  .colon {
    height: 50px;
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    &::after,
    &::before {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 50%;
    }
  }
</style>
<template>
  <div class="home-main">
    <Row style="margin-top: 10px; margin-left: 40px">
      <Col :md="24" :lg="24">
        <Row class-name="home-page-row1" style="margin-top: 40px">
          <!--用户-->
          <!-- <Col :md="1" :lg="1" :style="{marginBottom: '10px'}"/> -->
          <Col :md="23" :lg="23" :style="{marginBottom: '10px'}">
            <Card>
              <Row type="flex" class="user-infor">
                <Col span="3">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <img class="avator-img" :src="avatorPath" style="margin-left: 10px;"/>
                  </Row>
                </Col>
                <Col span="3" style="padding-left:20px">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <div>
                      <b class="card-user-infor-name">{{this.user}}</b>
                    </div>
                  </Row>
                </Col>
                <Col span="16" style="padding-left:20px">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <div>
                      <b class="card-user-infor-role">
                        <img :src="rolePath" style="margin-left: 10px;margin-top: -10px"/>
                        <p style="float: right">{{this.role}}</p>
                      </b>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row class="margin-top-8" style="margin-top: 2px; margin-left: 13%" class-name="made-child-con-middle" type="flex" align="middle">
                <Col span="6"><p class="notwrap" style="font-size: 15px; font-weight: bold">上次登录时间:<span style="margin-left: 20px">{{this.time}}</span></p></Col>
                <Col span="6" style="padding-left: 5px;font-size: 15px; font-weight: bold">上次登录地点:<span style="margin-left: 20px">{{this.loginAddress}}</span></Col>
              </Row>
            </Card>
          </Col>
          <!-- <Col :md="1" :lg="1" :style="{marginBottom: '10px'}"/> -->
        </Row>
      </Col>
    </Row>
    
    <Row class="margin-top-10" style="margin-top: 40px">
      <!-- <Col :md="1" :lg="1" :style="{marginBottom: '10px'}"/> -->
      <Col :md="11" :lg="11" :style="{marginBottom: '10px',marginLeft: '40px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="stats-bars"></Icon>
            最近七天每天用户访问量
          </p>
          <div class="data-source-row">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col :md="1" :lg="1" :style="{marginBottom: '10px'}"/>
      <Col :md="11" :lg="11" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="linechart">
            <Icon type="ios-pulse-strong"></Icon>
            最近七天用户访问趋势
          </p>
          <div class="data-source-row">
            <service-requests></service-requests>
          </div>
        </Card>
      </Col>
      <Col :md="1" :lg="1" :style="{marginBottom: '10px'}"/>
    </Row>
  </div>
</template>

<script>
  import {homePage,homeChart} from '../../api/login';
  import { getTimeArr } from './components/utils.js'
  import clockItem from './components/clockItem.vue'
  import role from '@/assets/role.png';
  import avator from '@/assets/avators.png';
  import zx from '@/assets/zx.png';
  import toDoListItem from './components/toDoListItem.vue';//待办事项
  import visiteVolume from './components/visiteVolume.vue';//上周每日来访量统计
  import dataSourcePie from './components/dataSourcePie.vue';// 数据来源统计
  import serviceRequests from './components/serviceRequests.vue';//上周每日服务调用量
  import echarts from 'echarts'
  export default {
    name: 'home',
    components: {
      clockItem,
      toDoListItem,
      visiteVolume,
      dataSourcePie,
      serviceRequests
    },
    data() {
      return {
        timeArr: getTimeArr(),
        avatorPath: avator,
        rolePath: role,
        role: '',
        loginAddress: '',
        loginTime: '',
        time: '',
        user: '',
        before: '',
        zxPath: zx,
      };
    },
    mounted() {
      this.startTimer()
      this.before = this.timeBefore;
    },
    beforeDestroy() {
      this.stopTimer()
    },
    activated() {
      this.getUserInfo();
    },
    created () {
      // this.getUserInfo();
    },
    computed: {
      timeBefore() {
        var date = new Date();
        var s2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
        return s2;
		  },
      name() {
        return this.$route.path
      },
    },
    methods: {
      getUserInfo() {
        homePage().then(res=>{
          if(res.data.code == 200){
            this.role = res.data.data.role;
            this.loginAddress = res.data.data.loginAddress;
            this.user = res.data.data.user;
            this.loginTime = res.data.data.loginTime;
            var dateee = new Date(this.loginTime).toJSON();
            this.time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          }
        })
      },
      startTimer() {
        this.stopTimer()
        this.timer = setTimeout(() => {
          this.timeArr = getTimeArr()
          this.startTimer()
        }, 1000)
      },
      stopTimer() {
        clearTimeout(this.timer)
      },
      	//获取数据
      getData() {
        const userId = localStorage.getItem('userId')
        adminPermission({userId: userId}).then(res=>{
        })
      },
      addNewToDoItem() {
        this.showAddNewTodo = true;
      },
      addNew() {
        if (this.newToDoItemValue.length !== 0) {
          this.toDoList.unshift({
            title: this.newToDoItemValue
          });
          setTimeout(() => {
            this.newToDoItemValue = '';
          }, 200);
          this.showAddNewTodo = false;
        } else {
          this.$Message.error('请输入待办事项内容');
        }
      },
      cancelAdd() {
        this.showAddNewTodo = false;
        this.newToDoItemValue = '';
      }
    }
  }
</script>


