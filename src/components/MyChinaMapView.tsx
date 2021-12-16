import React, { Component } from 'react';
import * as echarts from 'echarts';
import axios, { AxiosResponse } from 'axios';

const chinaMapGeoJson = require("./china.geo.json")

var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
type EChartsOption = echarts.EChartsOption;

interface MyChinaMapShowProps {

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

    // $.get(ROOT_PATH + '/data/asset/geo/HK.json', function (geoJson) {
    
    // axios.get(`${ROOT_PATH}/data/asset/geo/HK.json`).then((res:AxiosResponse<any,any>) => {
      // console.log("geojson",res.data)

      const geoJson = chinaMapGeoJson

      myChart.hideLoading();

      echarts.registerMap('China', geoJson);

      myChart.setOption(
        (option = {
          title: {
            text: '中国各省市景点分布',
            // subtext: 'Data from Wikipedia',
            // sublink:
            //   'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
          },
          // toolbox: {
          //   show: true,
          //   orient: 'vertical',
          //   left: 'right',
          //   top: 'center',
          //   feature: {
          //     dataView: { readOnly: false },
          //     restore: {},
          //     saveAsImage: {}
          //   }
          // },
          visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          
          // bmap:{
          //   map:"China"
          //   center:[120.33852,32.241262],
          //   zoom:5,
          //   roam:true
          // },
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
              data: [
                // { name: '中西区', value: 20057.34 },
                // { name: '湾仔', value: 15477.48 },
                // { name: '东区', value: 31686.1 },
                // { name: '南区', value: 6992.6 },
                // { name: '油尖旺', value: 44045.49 },
                // { name: '深水埗', value: 40689.64 },
                // { name: '九龙城', value: 37659.78 },
                // { name: '黄大仙', value: 45180.97 },
                // { name: '观塘', value: 55204.26 },
                // { name: '葵青', value: 21900.9 },
                // { name: '荃湾', value: 4918.26 },
                // { name: '屯门', value: 5881.84 },
                // { name: '元朗', value: 4178.01 },
                // { name: '北区', value: 2227.92 },
                // { name: '大埔', value: 2180.98 },
                // { name: '沙田', value: 9172.94 },
                // { name: '西贡', value: 3368 },
                // { name: '离岛', value: 806.98 }
              ],
              // 自定义名称映射
              // nameMap: {
              //   'Central and Western': '中西区',
              //   Eastern: '东区',
              //   Islands: '离岛',
              //   'Kowloon City': '九龙城',
              //   'Kwai Tsing': '葵青',
              //   'Kwun Tong': '观塘',
              //   North: '北区',
              //   'Sai Kung': '西贡',
              //   'Sha Tin': '沙田',
              //   'Sham Shui Po': '深水埗',
              //   Southern: '南区',
              //   'Tai Po': '大埔',
              //   'Tsuen Wan': '荃湾',
              //   'Tuen Mun': '屯门',
              //   'Wan Chai': '湾仔',
              //   'Wong Tai Sin': '黄大仙',
              //   'Yau Tsim Mong': '油尖旺',
              //   'Yuen Long': '元朗'
              // }
            }
          ]
        })
      );
    

      // option && myChart.setOption(option);
    // })
      
  }

  public render(): JSX.Element {
    return (
      <div 
        id="my-chinaMap-canvas"
        style={{
          height:"100vh"
        }}  
      >

      </div>
    )
  }
}
export default MyChinaMapShow;