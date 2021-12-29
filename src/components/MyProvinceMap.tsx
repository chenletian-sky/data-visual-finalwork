import React, { Component } from 'react';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
const provinceGeoJson = require("./data/Provinces_Map.json")
const ProvinceMap_data = require('./data/ProvincesMap_data.json')

var myChart:any

interface MyProvinceMapProps {
  name:string
}
interface MyProvinceMapState {

}
class MyProvinceMap extends Component<MyProvinceMapProps, MyProvinceMapState>{
  public constructor(props: MyProvinceMapProps) {
    super(props)
  }

  draw = () => {
    var chartDom = document.getElementById('my-province-canvas')!;
    myChart = echarts.init(chartDom);
    var option: EChartsOption;
    myChart.showLoading();

    var province=this.props.name
    if(province=='全国'){
      province='浙江'
    }
    console.log(province)
    console.log(provinceGeoJson[province]['features'][0]['properties']['center'])

      const geoJson = provinceGeoJson[province]

      myChart.hideLoading();

      echarts.registerMap('Province', geoJson);

      myChart.setOption(
        (option = {
          title: {
            name: province,
            text: '各省景点人数及价格分布'+'('+ province +')',
          },
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            min: ProvinceMap_data[province]['min_price'],
            max: ProvinceMap_data[province]['max_price'],
            text: ['Price High(元)', 'Price Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          
          geo:{
            name:province,
            map:"Province",
            center:provinceGeoJson[province]['features'][0]['properties']['center'],
            // [120.33852,30.238361],
            zoom:1,
            roam:true,
            tooltip: {
              // trigger: 'item',
              formatter: function (val) {
                return val.name
              }
            },
          },
          series: [
            {
              name: province,
              type: 'scatter',
              coordinateSystem: 'geo',
              data:ProvinceMap_data[province]['data'],
              symbolSize: function (val) {
                return (val[2]/ProvinceMap_data[province]['max_people'])*50+10;
              },
              encode: {
                value: 2
              },
              tooltip: {
                trigger: 'item',
                formatter: function(val) {
                  return val.name+"\n"+val.value.toString().split(',')[2]+ "人次 "+ val.value.toString().split(',')[3]+"元" ;
              }
              },
            }
          ]
        })
      );
    

      option && myChart.setOption(option);
  }

  componentDidMount(){
    this.draw()
  }

  componentDidUpdate(){
    if (myChart != null && myChart !== "" && myChart !== undefined) {
        myChart.dispose();//销毁
    }
    this.draw()
  }

  public render(): JSX.Element {
    return (
      <div id="my-province-canvas"
        style={{
          height:"45vh",
          width:"60vh"
        }}
      >

      </div>
    )
  }
}
export default MyProvinceMap;