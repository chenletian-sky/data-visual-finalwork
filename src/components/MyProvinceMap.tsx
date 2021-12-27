import React, { Component } from 'react';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
const provinceGeoJson = require("./Provinces_Map.json")
const ProvinceMap_data = require('./ProvincesMap_data.json')

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
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    myChart.showLoading();

    const provinces = Object.keys(ProvinceMap_data)

    var province=this.props.name
    var find_index = function (k: string){
      var i = 0;
      for (i=0;i<provinces.length;i++){
        if(provinces[i]==k)break;
      }
      return i;
    };
    var index = find_index(province)
    console.log(province)
    console.log(provinceGeoJson[province]['features'][0]['properties']['center'])

      const geoJson = provinceGeoJson[province]

      myChart.hideLoading();

      echarts.registerMap('Province', geoJson);

      myChart.setOption(
        (option = {
          title: {
            name: provinces[index],
            text: '各省景点l人数及价格分布'+'('+ provinces[index] +')',
          },
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            min: ProvinceMap_data[provinces[index]]['min'],
            max: ProvinceMap_data[provinces[index]]['max'],
            text: ['Price High(元)', 'Price Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          
          geo:{
            name:provinces[index],
            map:"Province",
            center:provinceGeoJson[province]['features'][0]['properties']['center'],
            // [120.33852,30.238361],
            // zoom:5,
            roam:true,
            tooltip: {
              // trigger: 'item',
              formatter: function (val) {
                // console.log(val)
                return val.name
              }
              // show: false
            },
          },
          // backgroundColor: '#404a59',
          series: [
            {
              name: provinces[index],
              type: 'scatter',
              coordinateSystem: 'geo',
              data:ProvinceMap_data[provinces[index]]['data'],
              symbolSize: function (val) {
                return val[2] / 60+6;
              },
              encode: {
                value: 2
              },
              tooltip: {
                trigger: 'item',
                formatter: function(val) {
                  // console.log(val["data"]);
                  
                  return val.name+"\n"+val.value.toString().split(',')[2]+ "人次 "+ val.value.toString().split(',')[3]+"元" ;
              }
              },
            }
          ]
        })
      );
    

      // option && myChart.setOption(option);
    // })
  }

  componentDidMount(){
    this.draw()
  }

  componentDidUpdate(){
    this.draw()
  }

  public render(): JSX.Element {
    return (
      <div id="my-province-canvas"
        style={{
          height:"42vh",
          width:"60vh"
        }}
      >

      </div>
    )
  }
}
export default MyProvinceMap;