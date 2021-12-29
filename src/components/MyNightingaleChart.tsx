import React, { Component } from 'react';
import * as echarts from 'echarts';

// 南丁格尔玫瑰图

const Nightingale_data = require('./data/Nightingale_data.json')

type EChartsOption = echarts.EChartsOption;


interface MyNightingaleChartProps {

}
interface MyNightingaleChartState {

}
class MyNightingaleChart extends Component<MyNightingaleChartProps, MyNightingaleChartState>{
  public constructor(props: MyNightingaleChartProps) {
    super(props)
  }

  componentDidMount(){
    var chartDom = document.getElementById('my-canvas')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      title: {
        text: '中国各省市景点分布',
        left:'center',
      },
      legend: {//图例
        show:true,
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
      },
      tooltip: {//提示框
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      
      series: [//数据组织样式
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 225],
          center: ['50%', '50%'],
          roseType: 'area',
          top:"100px",
          itemStyle: {
            borderRadius: 4
          },
          label: {
            show: false
          },
          data:Nightingale_data 
        }
      ]
    };

    option && myChart.setOption(option);
  }

  public render(): JSX.Element {
    return (
      <div 
        id="my-canvas"
        style={{
          height:"60vh"
        }}
      >

      </div>
    )
  }
}
export default MyNightingaleChart;