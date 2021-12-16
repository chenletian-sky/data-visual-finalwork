import React, { Component } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface MyRankingHistogramProps {

}
interface MyRankingHistogramState {

}
class MyRankingHistogram extends Component<MyRankingHistogramProps, MyRankingHistogramState>{
  public constructor(props: MyRankingHistogramProps) {
    super(props)
  }

  componentDidMount(){

    var chartDom = document.getElementById('my-rankingHistogram-canvas')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      title: {
        text: '景点排名'
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow'
      //   }
      // },
      legend: {},
      grid: {
        left: '0%',
        // right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World',"jfdkslf",'fdjslkfjkds','fdjsklfj','fdjsklfj','fdjsklfj','fdjsklfj','fdjsklfj']
      },
      series: [
        {
          // name: '2011',
          // left:"-10px",
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]

        },
        // {
        //   name: '2012',
        //   type: 'bar',
        //   data: [19325, 23438, 31000, 121594, 134141, 681807]
        // }
      ]
    };

    option && myChart.setOption(option);

  }

  public render(): JSX.Element {
    return (
      <div id="my-rankingHistogram-canvas"
        style={{
          height:"50vh"
        }}
      >

      </div>
    )
  }
}
export default MyRankingHistogram;