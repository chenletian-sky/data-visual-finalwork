import React, { Component } from 'react';
import * as echarts from 'echarts';


const Nightingale_data = require('./Nightingale_data.json')

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
      legend: {
        show:true,
        // top:"left",
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
        // height:"100%",
        // width:"100%"
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 225],
          center: ['50%', '50%'],
          roseType: 'area',
          // left:"10px",
          top:"100px",
          itemStyle: {
            borderRadius: 4
          },
          label: {
            show: false
          },
          data:Nightingale_data 
          // [
          //   { value: 40, name: 'rose 1' },
          //   { value: 38, name: 'rose 2' },
          //   { value: 32, name: 'rose 3' },
          //   { value: 30, name: 'rose 4' },
          //   { value: 28, name: 'rose 5' },
          //   { value: 26, name: 'rose 6' },
          //   { value: 22, name: 'rose 7' },
          //   { value: 18, name: 'rose 8' }
          // ]
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
          height:"47vh"
          // height:"100%",
          // width:"100%"
        }}
      >

      </div>
    )
  }
}
export default MyNightingaleChart;