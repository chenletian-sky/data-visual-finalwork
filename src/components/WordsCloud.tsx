import React, { Component } from 'react'
import * as echarts from 'echarts';
import 'echarts-wordcloud';

// import "./1"
import { WordCloudImage } from "../types/propsTypes"
// import axios from 'axios';
// import { PATH } from '../../../types/actionTypes';
import { Spin } from 'antd';
// import {image} from "../../image"   //词云图形状的编码
// 导入json文件数据的方式  所有类词云图的数据接口
const WordsCloudData = require("./10class_word_cloud_data.json")

interface WordCloudDataType{
    [classId:string]:Array<{
        name:string,
        value:number
    }>
} 

// 需要全局声明方便后面的删除 
var myCharts:any


interface Props {
    // isComplete:boolean,
    // wordCloudClass:string
}

interface State {
    classId: string,
    // WordsCloudData: WordCloudDataType
}

export default class WordsCloud extends Component<Props, State> {
    constructor(props:any){
        super(props);
        this.state = {
            classId: "0",   //用于调节绘制哪个类的词云图
        }
    }
    
    createWordCloud = ()=>{
        // const {WordsCloudData} = this.state
        myCharts = echarts.init(document.querySelector(".WordsCloud") as HTMLDivElement);
        let {classId} = this.state;
        // jsonList 用于绘制对应类词云图的数据
        var jsonList:Array<{
            name: string;
            value: Number;
        }> = WordsCloudData[classId];

        var maskResource = new Image()
        maskResource.src = WordCloudImage;
        var option ={
            //设置标题，居中显示
            title:{
                text: "第" + classId + "类的情况",
                left:'center',
                top:"0px",
                fill: "red",
            },
            //数据可以点击
            tooltip:{
            },
            series:[
                {
                    maskImage:maskResource,
                    //词的类型
                    type: 'wordCloud',
                    //设置字符大小范围
                    shape: 'circle',
                    sizeRange:[6,78],
                    rotationRange:[-45,90],
                    width: '100%',
                    height: '100%',
                    textStyle: {             //设置随机的字体颜色
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    //不要忘记调用数据
                    data:jsonList
                }
            ]
        };

        //加载图像，将数据放在图像中

        maskResource.onload = function():void{
        
            myCharts.setOption(option)
            };
        // maskResource.onload()
    }
    componentDidMount(){
        
        this.createWordCloud();
    }

    
    componentDidUpdate(){
        //每次重绘需要删除原图元
        if (myCharts != null && myCharts !== "" && myCharts !== undefined) {
            myCharts.dispose();//销毁
        }
        
        this.createWordCloud()
    }

    handleChange = ()=>{
        let { classId } = this.state
        let changeId:number = (Number(classId) + 1)%9 === 0 ? 1 : (Number(classId) + 1)%9
        this.setState(({
            classId:  String(changeId)
        }))
    }

    render() {
        return (
            <>
                {/* <button onClick={this.handleChange}>改变</button> */}
                {
                    (<div className="WordsCloud"
                    style={{
                        height:"30vh",
                        // width:"100%"
                    }}
                    >
                        WordsCloud....
                    </div>)
                }
                

            </>
        )
    }
}
