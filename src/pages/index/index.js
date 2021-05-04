import React, { useState , useEffect} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button,Icon,SearchBar,Toast} from 'antd-mobile'
import { NotificationFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { options } from 'less';
import AutoComplete from 'react-bmapgl/Services/AutoComplete'

function Index(props) {
  const BMap = window.BMap;
  let [map,setMap] = useState(null);
  let [local,setLocal] = useState(null);
  const [onlineNum,setOnlineNum] = useState(23);
  const COORDINATES_BD09 = 5; //COORDINATES_BD09 百度的经纬度坐标
  const COORDINATES_WGS84 = 1; //WGS84坐标
  const [isHidden,setIsHiddenm] = useState(true); //是否隐藏通告栏
  const [isGetCorder,setIsGetCorder] = useState(false);
  const [isOpenPop,setIsOpenPop] = useState(false);
  
  useEffect(() => {
    map = new BMap.Map("allmap");
    setMap(map);
    let point = new BMap.Point(116.280190, 40.049191);
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.setHeading(40);
	  map.setTilt(60);

    //浏览器获取当前坐标
    let localgps = navigator.geolocation;
    let options = {
      enableHighAccuracy: true,
      timeout: 500000,
      maximumAge: 0
    };
    localgps.getCurrentPosition(showSuccess,showErro,options);
   
  },[])

  //成功获取坐标
  function showSuccess(position) {
    var x = position.coords.longitude;
    var y = position.coords.latitude;
    var ggPoint = new BMap.Point(x,y);
    //坐标转换完之后的回调函数
    var translateCallback = function (data){
      console.log("8989",data);
      if(data.status === 0) {
        var marker = new BMap.Marker(data.points[0]);
        map.addOverlay(marker);
        map.centerAndZoom(data.points[0], 18);
        map.panTo(data.points[0]); //移动地图
      }
    }
    setTimeout(function(){
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, translateCallback);
        //隐藏loading
        setIsGetCorder(true);
        //展示在线人数
        setIsHiddenm(false);
    }, 1000);
  }

  //获取坐标失败
  function showErro(positionError) {
    Toast.info('获取坐标失败');
    console.log("浏览器获取坐标失败原因：",positionError);
  }

  

  // 选择区域
  function handleOpenArea() {
    setIsOpenPop(!isOpenPop);
    alert('444')
  }

  // 搜索
  function handleSrearchKeyWords(e) {
    let keyValue = e.keyword;
    map.clearOverlays(); //清除地图上所有覆盖物
    function myFun() {
      let searchPt = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
      map.centerAndZoom(searchPt, 18);
      map.addOverlay(new BMap.Marker(searchPt)); //添加标注
    }
    local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(keyValue);
  }
  


  return (
    <div className={styles.indexPageWrap}>
      <div id="allmap"></div>

      <Spin className={isGetCorder == true ? 'mainSpinHide' : 'mainSpin'} size="middle" tip="正在获取您的当前位置..."/>
      {/* 头部搜索栏 */}
      <Flex className="searchTopBar">
        <div className="areaText" style={{flex:1,position:'relative'}}>
          <span style={{display:'inline-block', lineHeight:'45px'}}>成都市</span> 
          <Icon type={isOpenPop ? 'down' :'right'} onClick={() => handleOpenArea()}  style={{position:'absolute',right:'8px',top:'11px'}}></Icon>
        </div>
        <AutoComplete
          style={{flex:2,borderRadius:'20px',height:'30px',border:'1px solid gray',padding:'0px 10px'}}
          location = "成都市"
          onHighlight={e => {console.log("3333")}}
          onConfirm={e => {console.log("2222",e)}}
          onSearchComplete={e => {handleSrearchKeyWords(e)}}
        />
        {/* <SearchBar
          value={searchValue}
          style={{flex:1}}
          placeholder="请输入地点名称"
          onClear={() => setSearchValue('')}
          onChange = {(value) => setSearchValue(value)}
          onSubmit = {() => handleSrearchKeyWords()}
        /> */}
      </Flex>

      <BottomNav />
      <Flex className="functionalBtnCon">
        <Flex.Item><Button type="primary">我要收</Button></Flex.Item>
        <Flex.Item><Button type="primary">我要取</Button></Flex.Item>
      </Flex>
      <NotificationFilled  className="noticeIcon" onClick={() => setIsHiddenm(!onlineNum)}/>
      <NoticeBar className={isHidden == false ? 'onlineBar' : 'onlineBarHidden'} >
        附近有{onlineNum}人在线~
        <span style={{ color: '#a1a1a1', marginLeft: '130%',fontSize:'12px' }} onClick={() => setIsHiddenm(true)}>隐藏</span>
      </NoticeBar>
    </div>
  );
}

export default Index;