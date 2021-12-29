import { Col, Row, Select, Space } from 'antd';
import React, { Component } from 'react';
// 引入样式
import './App.css'
import "antd/dist/antd.css"
import '@ant-design/pro-card/dist/card.css';
// import '@ant-design/pro-layout/dist/layout.css';

import ProCard from '@ant-design/pro-card';
import WordsCloud from './components/WordsCloud';
import MyNightingaleChart from './components/MyNightingaleChart';
import MyChinaMapShow from './components/MyChinaMapView';
import MyRankingHistogram from './components/MyRankingHistogram';
import MyProvinceMap from './components/MyProvinceMap';
const {Option } = Select

interface AppProps {

}
interface AppState {
  windowHeight:number,
  windowWidth:number,
  name:string
}
class App extends Component<AppProps, AppState>{
  public constructor(props: AppProps) {
    super(props)
    this.state = {
      windowHeight:0,
      windowWidth:0,
      name:"全国"
    }
  }
  change_state = (name:string) => {
    // 修改组件状态函数
    this.setState({name:name})
  }
// 初始化
  componentDidMount(){
    let width = window.innerWidth
    let height = window.innerHeight
    console.log(width,height)
    this.setState({
      windowHeight:height,
      windowWidth:width,
    })
  }

  public render(): JSX.Element {
    const { windowHeight,windowWidth} = this.state
    return (
      <div
        className='main-container'
        style={{
          width:"100%",
          height:"100%",
          display:"flex",
          flexDirection:"row",
          flexWrap:"nowrap",
          justifyContent:"space-around",
        }}
      >
        <div 
          className='left-container'
          style={{
            width:"25%"
          }}
        >
          
          

          <ProCard
            bordered
            split="horizontal"
            style={{
              height:"100%"
            }}
          >
            <ProCard
              className='left-wordCloud'
              style={{
              }}
            >
              <WordsCloud></WordsCloud>
            </ProCard>
            <ProCard
              className='left-NightingaleRoseChart'
              style={{
                height:"45%"
              }}
            >
              <MyNightingaleChart></MyNightingaleChart>
            </ProCard>
          </ProCard>
          
          
        </div>
        <div
          className='map-container'
          style={{
            width:"41%",
          }}
        >
        <MyChinaMapShow change_state={this.change_state} name={this.state.name}></MyChinaMapShow>

        </div>
        <div
          className='right-container'
          style={{
            width:"33%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-around"
          }}
        >
          <div
            className='right-top-display'
            style={{
              width:"100%",
              height:"48%",
            }}
          >
          <MyRankingHistogram name={this.state.name}></MyRankingHistogram>
          </div>
          <div
            className='right-buttom-display'
            style={{
              width:"100%",
              height:"48%",
            }}
          >
            <MyProvinceMap name={this.state.name}></MyProvinceMap>
          </div>
        </div>
      </div>
    )
  }
}
export default App;