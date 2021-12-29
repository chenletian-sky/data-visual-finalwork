import React, { Component } from 'react';
import * as echarts from 'echarts';
import axios, { AxiosResponse } from 'axios';

const chinaMapGeoJson = require("./data/china.geo.json")
const ChinaMap_data = require("./data/ChinaMap_data.json")

type EChartsOption = echarts.EChartsOption;

interface MyChinaMapShowProps {
  name: string;
  change_state:Function
}
interface MyChinaMapShowState {

}
class MyChinaMapShow extends Component<MyChinaMapShowProps, MyChinaMapShowState>{
  public constructor(props: MyChinaMapShowProps) {
    super(props)
  }

  componentDidMount(){
    var chartDom = document.getElementById('my-chinaMap-canvas')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    myChart.showLoading();

      const geoJson = chinaMapGeoJson

      myChart.hideLoading();

      echarts.registerMap('China', geoJson);

      myChart.setOption(
        (option = {
          title: {
            text: '全国各省市假期出行数据',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (人/次)'
          },
          visualMap: {
            min: 1000,
            max: 100000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          series: [
            {
              name: '中国',
              type: 'map',
              map: 'China',
              label: {
                show: true
              },
              roam:true,
              scaleLimit:{
                min:1,
                max:10
              },
              data:ChinaMap_data 
            }
          ]
        })
      );
    

      option && myChart.setOption(option);

      const _this = this;
      myChart.on('click', function (params) {
        // alert(params.name);

        console.log(params)
        if(_this.props.name==params.name) {
          _this.props.change_state('全国')
        }else{
          _this.props.change_state(params.name);
        }
      });
      
  }

  public render(): JSX.Element {
    return (
      <div 
        id="my-chinaMap-canvas"
        style={{
          top:"5vh",
          height:"90vh",
          width:"90vh"
        }}  
      >

      </div>
    )
  }
}
export default MyChinaMapShow;