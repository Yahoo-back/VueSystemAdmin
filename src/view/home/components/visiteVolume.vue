<template>
  <div style="width:100%;height:100%;" id="visite_volume_con" ref="chart"></div>
</template>

<script>
  import {homeChart} from '../../../api/login';
  import echarts from 'echarts';

  export default {
    name: 'visiteVolume',
    data() {
      return {
        bar: [],
        count: [],
        date: [],
      };
    },
    mounted() {
      this.$nextTick(() => {
        var visiteVolumes = this.$refs.chart;
				let visiteVolume = this.$echarts.init(visiteVolumes);
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        var date = [];
        var count = [];
        homeChart().then(res=>{
          if(res.data.code == 200){
            this.bar = res.data.data;
            for(var j = 0; j < this.bar.length;j++){
              date.push(this.bar[j].login_date)
              count.push(this.bar[j].count)
            }
          }
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '6%',
              left: '2%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: date,
              nameTextStyle: {
                color: '#c3c3c3'
              }
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            series: [
              {
                name: '访问量',
                type: 'bar',
                data: count,
                itemStyle: {
                  normal: {
        　　　　　　//这里是重点
                    color: function(params) {
                      //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                      var colorList = ['#2d8cf0'];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }
            ]
          };
          visiteVolume.setOption(option);
        })
        window.addEventListener('resize', function () {
          visiteVolume.resize();
        });
      });
    }
  };
</script>
