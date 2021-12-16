import React, { Component } from 'react';
import * as echarts from 'echarts';

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
        // show:false,
        top:"left"
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [10, 50],
          center: ['50%', '50%'],
          roseType: 'area',
          // left:"10px",
          top:"100px",
          itemStyle: {
            borderRadius: 4
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
          ]
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
          height:"40vh"
          // height:"100%",
          // width:"100%"
        }}
      >

      </div>
    )
  }
}
export default MyNightingaleChart;