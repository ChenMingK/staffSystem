<template>
  <div class="welcome">
    <div id="lineGraph" style="width: 500px; height: 500px;"></div>
    <div id="pieGraph" style="width: 500px; height: 500px;"></div>

  </div>
</template>
<script>
  export default {
    methods: {
      initEchart1() {
        var myChart = this.$echarts.init(document.getElementById('lineGraph'))
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '公司员工人数趋势图',
            subtext: '纯属虚构',
            x: 'center'
          },
          // 提示框
          tooltip: {
            trigger: 'axis', // 触发类型(坐标轴触发)
            alwaysShowContent: false, // 是否永远显示提示框的内容
            backgroundColor: 'rgba(32, 174, 252, 0.7)', // 提示框的背景颜色
            textStyle: {} // 提示框浮层的文本样式
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              name: '(月)', // X轴名称单位
              nameLocation: 'end', // 名称的位置
              nameTextStyle: { // 名称的样式
                color: '#999',
                fontSize: '12px'
              },
              nameGap: 0, // 名称与X轴的距离
              boundaryGap: true, // 坐标的刻度是否在中间
              min: '3', // 坐标轴刻度最小值
              max: 'dataMax', // 坐标轴刻度最大值
              axisLine: { // 坐标轴线条相关设置(颜色等)
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisTick: { // 坐标轴刻度相关设置
                length: '0' // 长度设置为0
              },
              axisLabel: { // 坐标轴刻度标签
                margin: 7, // 刻度标签与轴线之间的距离
                textStyle: {
                  color: '#999', // 坐标轴刻度文字的颜色
                  fontSize: '12px' // 坐标轴刻度文字的大小
                }
              },
              data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
            }
          ],
          yAxis: [
            {
              type: 'value', // 类型数值轴
              name: '(人)',
              nameTextStyle: {
                color: '#999',
                fontSize: '12px'
              },
              nameGap: 3, // 名称与Y轴的距离
              axisTick: {
                length: '0'
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                margin: 7,
                // formatter:'{value} °C',//标签内容内置的格式转化器比如这个表示在后面加一个c
                textStyle: {
                  color: '#999',
                  fontSize: '12px'
                }
              },
              splitLine: { // 坐标轴的分割线，默认数值轴显示，类目轴不显示
                show: false
              }
            }
          ],
          grid: { // 直角坐标系内绘图网格
            // left: 36 // 类似于paddingLeft的效果
            left: 36
          },
          series: [ // 系列列表
            {
              name: '员工人数', // 系列名称 用于tooltip的显示
              type: 'line',
              data: [1000, 3000, 5000, 4500, 4000, 3000, 5000, 10000],
              itemStyle: {  // 折线拐点的样式
                  normal: {
                      color: '#20aefc'  // 折线拐点的颜色
                  }
              },
              lineStyle: {  // 线条的样式
                  normal: {
                      color: '#20aefc'  // 折线颜色
                  }
              },
              areaStyle: { // 区域填充样式
                normal: {
                  // 线性渐变
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0, color: '#b1e3fe' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#fff' // 100% 处的颜色
                  }], false)
                }
              },
              markPoint: { // 图标标注
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      },
      initEchart2() {
          let dom = document.getElementById('pieGraph')
          let myChart = this.$echarts.init(dom)
          let option = {
              title: {
                text: '站点用户访问来源',
                subtext: '纯属虚构',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
          }
          if (option && typeof option === 'object') {
              myChart.setOption(option, true)
          }
      }
    },
    mounted() {
      this.initEchart1()
      this.initEchart2()
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global.scss';
  .welcome {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
  }

</style>
