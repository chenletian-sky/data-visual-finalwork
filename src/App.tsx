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
      name:"浙江"
    }
  }
  change_state = (name:string) => {
    this.setState({name:name})
    // console.log(name)
  }

  componentDidMount(){
    let width = window.innerWidth
    let height = window.innerHeight
    console.log(width,height)
    this.setState({
      windowHeight:height,
      windowWidth:width,
      // name:'浙江'
    })
  }

  public render(): JSX.Element {
    // const { Sider ,Header,Content} = Layout
    const { windowHeight,windowWidth} = this.state
    return (
      <div
        className='main-container'
        style={{
          // backgroundColor:"red"
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
            width:"25%",
            // width:`${windowWidth/3}`,
            // height:`${windowHeight}`,
            // backgroundColor:"red"
            
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
              style={{
                height:"10%"
              }}
            >
              <Row
                justify='space-around'
                style={{
                  margin:"2%"
                }}
              >
                <Col 
                  // span={12} 
                >
                  <Select defaultValue={'test1'}>
                    <Option value={'test1'}>test1</Option>
                    <Option value={'test2'}>test2</Option>
                  </Select>
                </Col>
                <Col 
                  // span={12}
                >
                  <Select defaultValue={"test1"}>
                    <Option value={'test1'}>test1</Option>
                    <Option value={'test2'}>test2</Option>
                  </Select>
                </Col>
              </Row>
            </ProCard>
            <ProCard
              className='left-wordCloud'
              // colSpan={"100%"}
              style={{
                // height:"100%"
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
            // width:`${windowWidth/3}`,
            // height:`${windowHeight}`,
            // backgroundColor:"blue"
          }}
        >
        <MyChinaMapShow change_state={this.change_state}></MyChinaMapShow>

        </div>
        <div
          className='right-container'
          style={{
            width:"33%",
            // width:`${windowWidth/3}`,
            // height:`${windowHeight}`,
            // backgroundColor:"black",
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
              // backgroundColor:"pink"
            }}
          >
          <MyRankingHistogram name={this.state.name}></MyRankingHistogram>
          </div>
          <div
            className='right-buttom-display'
            style={{
              width:"100%",
              height:"48%",
              // backgroundColor:"rgb(0, 122, 204)"
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