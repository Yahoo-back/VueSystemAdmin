<style rel="stylesheet/less" lang="less">
	.el-form-item__label{
		font-size: 16px;
		color: #000;
	}
	.main .single-page-con {
		background: #fff;
	}
	.el-table th {
		background:#f0f2f5;
	}
	.ivu-row {
    //   margin-left: 0px ;
    }
	@import "../../styles/common.less";
</style>
<template>
	<div>
		<Card>
			<!-- <p slot="title">
				<Icon type="help-buoy"></Icon>
				产品访问统计图
			</p> -->
			 <Row style=" margin-left: 0px">
        <div class="demo-input-suffix">
					<!-- <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button> -->
				<!-- <el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px; float: right;margin-top: 20px">查询</el-button> -->
				<!-- <el-button type="primary" size="small" style="margin-left: 20px; float: right">查询</el-button> -->
          <!-- <span >请选择日期：</span> -->
          <el-date-picker
						style="margin-left: 10px"
            v-model="createTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH" format="yyyy-MM-dd HH"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
		  <el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px; float: right;margin-top: 20px">查询</el-button>
        </div>
				<div id="products" style="margin-top: 30px; margin-left: 10px"></div>
				<!-- <el-form ref="form" :model="form" >
				<el-form-item label="产品类别" style="font-size: 14px, color: #495060, line-height: 1.5">
					<div class="searchp">
            <el-checkbox-group v-model="form.a" >
							<div id="product" style="margin-top: 30px"></div>
              <el-checkbox @change="changeCheck(item)" v-for="item in productAll" :v-model="item.id"  :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
					</div>
          </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px; float: right;margin-top: 20px">查询</el-button>
					</el-form-item>
			</el-form> -->
      </Row>
			<!-- <el-button type="primary" @click="handleSearch" size="small" style="margin-left: 20px; float: right;margin-top: 20px">查询</el-button> -->
			<div id="visitChart" ref="chart" style="margin-top: 50px;width:100%;height:400px;"></div>
			<!-- <div id="visitChart1" style="margin-top: 50px;width:100%;height:300px;"></div> -->
		</Card>
	</div>
</template>
<script>
import {qryDataEchartsSourceBySource,qrySourceAll} from '../../api/dataSta';
import echarts from 'echarts'
export default {
	name: "clickResourceStatisticsChart",
	data(){
		return {
			createTime: '',
			before: '',
			after: '',
			productId: '',
			id: '',
			i: '',
			item: '',
			productAll: [],
			productName: [],
			a: [],
			n: [],
			s: '',
			productEcharts: [],
			productEchart: [],
			form: {
        a: [],
			},
		}
	},
	methods: {
		//产品来源
		getAllPro() {
      qrySourceAll({}).then(res => {
        if(res.data.code == 200){
					this.productAll = res.data.data;
					var temps = "";
					for(var i = 1;i <= this.productAll.length;i++){
						temps += "<input type='checkbox' name='product_chose' value='"+ this.productAll[i-1].id +"'><span>" + this.productAll[i-1].name + "</span>";
						$("#product").html(temps);
					}
        }
      })
		},
		changeCheck(item) {
			let i = item.id;
		},
		//产品访问数据统计图
		getClickChart() {
			var names = [];
			var series = [];
			var dates = [];
			var tempNum = 0;
			const daysFrom = this.createTime[0];
			const daysTo = this.createTime[1];
			qrySourceAll({}).then(res => {
        if(res.data.code == 200){
					var resource = res.data.data;
					var temp = "";
					for(var i = 1;i <= resource.length;i++){
						// temp += "<el-checkbox :key='"+ products[i-1].id +"' :label='"+ products[i-1].name +"'></el-checkbox>";
					 	temp += "<input type='checkbox' name='product_chose' value='"+ resource[i-1].source +"'><span>" + resource[i-1].source + "</span>";
						// $("#product").html(temp);
						$("#products").html(temp);
						names.push(resource[i-1].source);
						qryDataEchartsSourceBySource({source: resource[i-1].source,
						daysFrom: this.before,daysTo: this.after}).then(res=>{
							if(res.data.code == 200) {
								tempNum++;
								var nums = [];
								this.productEcharts = res.data.data;
								for(var j = 0;j < this.productEcharts.length;j++){
									nums.push(this.productEcharts[j].count);
									if(tempNum == 1){
										dates.push(this.productEcharts[j].click_date);
									}
									if(j == this.productEcharts.length - 1) {
										series.push({
											name: this.productEcharts[j].source,
											type: 'line',
											label:{
												normal:{
													show: true,
													position: 'insideRight'
												}
											},
											stack: this.productEcharts[j].source,
											data: nums
										})
									}
								}
								var visitChart = this.$refs.chart;
								let vChart = this.$echarts.init(visitChart);
								// let vChart = this.$echarts.init(document.getElementById("visitChart"));
								vChart.setOption({
									title: {
										text: '近7小时点击来源统计'
									},
									tooltip: {
										trigger: 'axis'
									},
									legend: {
										data: names,
										width: '93%',
										height: '100px',
										left: '4%',
										right: '3%',
										top: '10%',
										bottom: '90%',
									},
									grid: {
										left: '3%',
										right: '4%',
										bottom: '3%',
										top: '30%',
										containLabel: true
									},
									toolbox: {
										feature: {
											mark : {show: true},
											dataView : {show: true, readOnly: true,lang:['','关闭'],
												optionToContent: function (opt) {
												let axisData = opt.xAxis[0].data; //坐标数据
												let series = opt.series; //折线图数据
												let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
												let tdBodys = ''; //数据
												series.forEach(function (item) {
													//组装表头
													tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
												});
												let table = `<table border="1" class="table-echarts" style="width: 98%; margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
												for (let i = 0, l = axisData.length; i < l; i++) {
													for (let j = 0; j < series.length; j++) {
														//组装表数据
														tdBodys += `<td>${ series[j].data[i]}</td>`;
													}
													table += `<tr><td style="padding: 0 34px !important;">${axisData[i]}</td>${tdBodys}</tr>`;
													tdBodys = '';
												}
												table += '</tbody></table>';
												return table;
											}
										},
										magicType : {show: true, type: ['line', 'bar']},
										restore : {show: true},
										saveAsImage: {}
									}
								},
								xAxis: {
									type: 'category',
									boundaryGap: false,
									data: dates
								},
								yAxis: {
									type: 'value'
								},
								series: series
							})
							}
						})
						 if(i%20 == 0) {
                    temp += "<br>";
                }
					}
        }
      })
		},

	handleSearch(){
		var temp = $("input[name='product_chose']:checked");
		var names1 = [];
		var series1 = [];
		var dates1 = [];
		var tempNum = 0;
		if(temp.length == 0) {
			temp = $("input[name='product_chose");
		}
		for(var i =0; i < temp.length;i++){
			var counts = temp[i].value;
			if(!this.createTime){
			qryDataEchartsSourceBySource({source: counts,
				daysFrom: this.before,daysTo:this.after }).then(res=>{
					if(res.data.code == 200) {
						tempNum++;
						var nums1 = [];
						this.productEchart = res.data.data;
						for(var j = 0; j < this.productEchart.length;j++){
							nums1.push(this.productEchart[j].count);
		
							if(tempNum == 1) {
								dates1.push(this.productEchart[j].click_date)
							}
							if(j == this.productEchart.length - 1) {
								names1.push(this.productEchart[j].source)
								series1.push({
									name: this.productEchart[j].source,
                  type:'line',
                  label: {
                  	normal: {
                    	show: true,
                      position: 'insideRight'
                    }
                  },
                  stack: this.productEchart[j].source,
                  data: nums1,
								})
							}
						}
						var visitChart = this.$refs.chart;
								let vChart = this.$echarts.init(visitChart);
							// let vChart = this.$echarts.init(document.getElementById("visitChart"));
								vChart.setOption({
									title: {
										text: '近7小时点击来源统计'
									},
									tooltip: {
										trigger: 'axis'
									},
									legend: {
										width: '93%',
										height: '100px',
										left: '4%',
										right: '3%',
										bottom: '80%',
										data: names1
									},
									grid: {
										left: '3%',
										right: '4%',
										bottom: '3%',
										top: '30%',
										containLabel: true
									},
									toolbox: {
										feature: {
											mark : {show: true},
											dataView : {show: true, readOnly: true,lang:['','关闭'],
												optionToContent: function (opt) {
												let axisData = opt.xAxis[0].data; //坐标数据
												let series = opt.series; //折线图数据
												let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
												let tdBodys = ''; //数据
												series.forEach(function (item) {
													//组装表头
													tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
												});
												let table = `<table border="1" class="table-echarts" style="width: 98%; margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
												for (let i = 0, l = axisData.length; i < l; i++) {
													for (let j = 0; j < series.length; j++) {
														//组装表数据
														tdBodys += `<td>${ series[j].data[i]}</td>`;
													}
													table += `<tr><td style="padding: 0 34px !important;">${axisData[i]}</td>${tdBodys}</tr>`;
													tdBodys = '';
												}
												table += '</tbody></table>';
												return table;
											}
										},
										magicType : {show: true, type: ['line', 'bar']},
										restore : {show: true},
										saveAsImage: {}
									}
								},
								xAxis: {
									type: 'category',
									boundaryGap: false,
									data: dates1
								},
								yAxis: {
									type: 'value'
								},
								series: series1
							},true)
					}
				})
			}
			else{
					qryDataEchartsSourceBySource({source: counts,
				daysFrom: this.createTime[0] == undefined ? "" : this.createTime[0],daysTo:this.createTime[1] == undefined ? "" : this.createTime[1] }).then(res=>{
					if(res.data.code == 200) {
						tempNum++;
						var nums1 = [];
						this.productEchart = res.data.data;
						for(var j = 0; j < this.productEchart.length;j++){
							nums1.push(this.productEchart[j].count);
		
							if(tempNum == 1) {
								dates1.push(this.productEchart[j].click_date)
							}
							if(j == this.productEchart.length - 1) {
								names1.push(this.productEchart[j].source)
								series1.push({
									name: this.productEchart[j].source,
                  type:'line',
                  label: {
                  	normal: {
                    	show: true,
                      position: 'insideRight'
                    }
                  },
                  stack: this.productEchart[j].source,
                  data: nums1,
								})
							}
						}
						var visitChart = this.$refs.chart;
								let vChart = this.$echarts.init(visitChart);
							// let vChart = this.$echarts.init(document.getElementById("visitChart"));
								vChart.setOption({
									title: {
										text: '近7小时点击来源统计'
									},
									tooltip: {
										trigger: 'axis'
									},
									legend: {
										width: '93%',
										height: '100px',
										left: '4%',
										right: '3%',
										bottom: '80%',
										data: names1
									},
									grid: {
										left: '3%',
										right: '4%',
										bottom: '3%',
										top: '30%',
										containLabel: true
									},
									toolbox: {
										feature: {
											mark : {show: true},
											dataView : {show: true, readOnly: true,lang:['','关闭'],
												optionToContent: function (opt) {
												let axisData = opt.xAxis[0].data; //坐标数据
												let series = opt.series; //折线图数据
												let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
												let tdBodys = ''; //数据
												series.forEach(function (item) {
													//组装表头
													tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
												});
												let table = `<table border="1" class="table-echarts" style="width: 98%; margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
												for (let i = 0, l = axisData.length; i < l; i++) {
													for (let j = 0; j < series.length; j++) {
														//组装表数据
														tdBodys += `<td>${ series[j].data[i]}</td>`;
													}
													table += `<tr><td style="padding: 0 34px !important;">${axisData[i]}</td>${tdBodys}</tr>`;
													tdBodys = '';
												}
												table += '</tbody></table>';
												return table;
											}
										},
										magicType : {show: true, type: ['line', 'bar']},
										restore : {show: true},
										saveAsImage: {}
									}
								},
								xAxis: {
									type: 'category',
									boundaryGap: false,
									data: dates1
								},
								yAxis: {
									type: 'value'
								},
								series: series1
							},true)
					}
				})
			}
		}
	}
			
	},
	computed: {
		timeAfter() {
      var date = new Date();
			var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())+ " "+date.getHours();
			return s1;
		 },
		 timeBefore() {
      var date = new Date();
			var s2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())+ " "+(date.getHours()-7);
			return s2;
		 }
	},
	mounted () {
		this.after = this.timeAfter;
		this.before = this.timeBefore;
		// this.getClickChart();
		// this.getAllPro(this.productAll);
	},
	activated() {
		this.getClickChart();
		this.getAllPro();
	},
  created(){
		// this.getClickChart();
		// this.getAllPro();
  },
  watch: {
    '$route' () {
			// this.getClickChart();
			// this.getAllPro();
    }
  }
}
</script>

<!--<style rel="stylesheet/less" lang="less">
	.main .single-page-con {
		background: #fff;
	}
	.el-form-item__label{
		font-size: 16px;
		color: #000;
	}
	.searchp {
		float: left;
		margin-left: 10px; 
		margin-top: 15px;
	}
	.el-table th {
		background:#f0f2f5;
	}
	@import "../../styles/common.less";
</style>
<!-- <template>
	<!-- <div> -->
		<!-- <Card> -->
			<!-- <p slot="title">
				<Icon type="help-buoy"></Icon>
				点击来源统计图
			</p> -->
			 <!-- <Row> -->
        <!-- <div class="demo-input-suffix"> -->
				<!-- <el-button type="primary" size="small" style="margin-left: 20px; float: right;margin-top: 10px">查询</el-button> -->
          <!-- <span class="el-form-item__label">创建时间:</span> -->
          <!-- <el-date-picker
						style="margin-left: 10px"
            v-model="createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker> -->
        <!-- </div> -->
				<!-- <div class="searchp"> 
					产品类别：
            <el-checkbox-group v-model="a" >
              <el-checkbox v-for="item in productAll"  :label="item.source" :key="item.source"></el-checkbox>
            </el-checkbox-group>
				</div> -->
      <!-- </Row> -->
			<!-- <div id="clickChart" style="margin-top: 50px;width:100%;height:300px;"></div> -->
		<!-- </Card> -->
	<!-- </div> -->
<!-- </template>
// <script>
// import echarts from 'echarts'
// import {qrySourceAll} from '../../api/dataSta';
// export default {
// 	name: "clickResourceChart",
// 	data(){
// 		return {
// 			productAll: [],
// 			a: [],
// 			createTime: '',
// 			form: {
//         type: [],
//       },
// 		}
// 	},
// 	methods: {
// 			//产品来源
// 		getAllPro() {
//         qrySourceAll({}).then(res => {
//           if(res.data.code == 200){
// 						this.productAll = res.data.data;
//           }
//         })
//       },
// 	},
// 	mounted () {
// 		this.getAllPro();
// 		const options = {
// 			title: {
// 				text: '近7小时点击来源统计'
// 			},
// 			tooltip: {
// 				trigger: 'axis'
// 			},
// 			legend: {
// 				data:["邮件营销","联盟广告","视频广告","直接访问","搜索引擎"]
// 			},
// 			grid: {
// 				left: '3%',
// 				right: '4%',
// 				bottom: '3%',
// 				containLabel: true
// 			},
// 			toolbox: {
// 				feature: {
// 					saveAsImage: {}
// 				}
// 			},
// 			xAxis: {
// 				type: 'category',
// 				boundaryGap: false,
// 				data: ['周一','周二','周三','周四','周五','周六','周日']
// 			},
// 			yAxis: {
// 				type: 'value'
// 			},
// 			series: [
// 				{
// 			  	name:'邮件营销',
// 					type:'line',
// 					stack: '总量',
// 					data:[120, 132, 101, 134, 90, 230, 210]
// 				},
// 				{
// 					name:'联盟广告',
// 					type:'line',
// 					stack: '总量',
// 					data:[220, 182, 191, 234, 290, 330, 310]
// 				},
// 				{
// 					name:'视频广告',
// 					type:'line',
// 					stack: '总量',
// 					data:[150, 232, 201, 154, 190, 330, 410]
// 				},
// 				{
// 					name:'直接访问',
// 					type:'line',
// 					stack: '总量',
// 					data:[320, 332, 301, 334, 390, 330, 320]
// 				},
// 				{
// 					name:'搜索引擎',
// 					type:'line',
// 					stack: '总量',
// 					data:[820, 932, 901, 934, 1290, 1330, 1320]
// 				}
// 			]
// 		};
// 		const clickChart = echarts.init(document.getElementById('clickChart'));
// 		clickChart.setOption(options);
// 		window.addEventListener('resize', function () {
//      	clickChart.resize();
//     });
// 	},
// 	created(){
// 		this.getAllPro();
//   },
//   watch: {
//     '$route' () {
// 			this.getAllPro();
//       // console.log(this.$route.path);
//     }
//   }
// }
// </script>