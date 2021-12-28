import React, { Component } from 'react';
import * as echarts from 'echarts';

const rank_data=require('./ranking_data.json')

type EChartsOption = echarts.EChartsOption;

interface MyRankingHistogramProps {
  name: string;
}
interface MyRankingHistogramState {

}
class MyRankingHistogram extends Component<MyRankingHistogramProps, MyRankingHistogramState>{
  public constructor(props: MyRankingHistogramProps) {
    super(props)
  }

  draw = ()=>{
    var chartDom = document.getElementById('my-rankingHistogram-canvas')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    var province=this.props.name
    option = {
      title: {
        text: province+'景点排名(top20)'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
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
        data:rank_data[province][0]
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#009ad6' },
              // { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#ed1941' }
            ])
          },
          data:rank_data[province][1]
        },
      ]
    };

    option && myChart.setOption(option);
  }

  componentDidMount(){
    this.draw()
  }
  componentDidUpdate(){
    this.draw()
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