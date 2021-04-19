import React, { useState , useEffect} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button,Icon,SearchBar,Toast} from 'antd-mobile'
import { NotificationFilled } from '@ant-design/icons';
import { Spin } from 'antd';

function Index(props) {
  const BMap = window.BMap;
  let [map,setMap] = useState(null);
  const [local,setLocal] = useState(null);
  const [onlineNum,setOnlineNum] = useState(23);
  const BMAP_STATUS_SUCCESS = 0; // BMAP_STATUS_SUCCESS 位置检索成功，数值为0
  const [isHidden,setIsHiddenm] = useState(false); //是否隐藏通告栏
  const [searchValue,setSearchValue] = useState('百度科技园');
  const [isGetCorder,setIsGetCorder] = useState(false);
  const [isOpenPop,setIsOpenPop] = useState(false);


 
  
  useEffect(() => {
    map = new BMap.Map("allmap");
    setMap(map);
    let point = new BMap.Point(116.280190, 40.049191);
    let geolocation = new BMap.Geolocation();
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.setHeading(50);
    map.setTilt(45);
    //获取当前位置
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          //隐藏loading
          setIsGetCorder(true);
          let currentPoint = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
          let mk = new BMap.Marker(r.point);//创建标注
          map.centerAndZoom(currentPoint, 20);
          map.addOverlay(mk);//将标注添加到地图中
          map.panTo(r.point); //移动地图
          let gc = new BMap.Geocoder();
          gc.getLocation(currentPoint, function(rs){
              if(rs.addressComponents.street && rs.addressComponents.streetNumber) {
                var adstr = rs.addressComponents.street + rs.addressComponents.streetNumber;
              }else {
                var adstr = '';
              }
              var currentAddress = rs.address;
              Toast.info("您所在的位置是：" + currentAddress);
              setSearchValue(adstr);
          });
        }else {
            console.log("获取当前位置错误：",this.getStatus());
            Toast.info('暂时无法获取当前位置');
        }
    },{enableHighAccuracy: true});
   
  },[])

  // 选择区域
  function handleOpenArea() {
    alert('444')
  }

  // 搜索
  function handleSrearchKeyWords() {
    map.clearOverlays(); //清除地图上所有覆盖物
    local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(searchValue);
  }
  function myFun() {
    var searchPt = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
    map.centerAndZoom(searchPt, 18);
    map.addOverlay(new BMap.Marker(searchPt)); //添加标注
  }


  return (
    <div className={styles.indexPageWrap}>
      <div id="allmap"></div>

      <Spin className={isGetCorder == true ? 'mainSpinHide' : 'mainSpin'} size="middle" tip="正在获取您的当前位置..."/>
      {/* 头部搜索栏 */}
      <Flex className="searchTopBar">
        <div className="areaText" style={{width:'20%',position:'relative'}}>
          <span style={{display:'inline-block', lineHeight:'45px'}}>成都市</span> 
          <Icon type="right"onClick={() => handleOpenArea()}  style={{position:'absolute',right:'0',top:'11px'}}></Icon>
        </div>
        <SearchBar
          value={searchValue}
          style={{flex:1}}
          placeholder="请输入地点名称"
          onClear={() => setSearchValue('')}
          onChange = {(value) => setSearchValue(value)}
          onSubmit = {() => handleSrearchKeyWords()}
        />
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