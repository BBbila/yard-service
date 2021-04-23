import React, { useState , useEffect} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button,Icon,SearchBar,Toast} from 'antd-mobile'
import { NotificationFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { options } from 'less';

function Index(props) {
  const BMap = window.BMap;
  // let [map,setMap] = useState(null);
  const [local,setLocal] = useState(null);
  const [onlineNum,setOnlineNum] = useState(23);
  const BMAP_STATUS_SUCCESS = 0; // BMAP_STATUS_SUCCESS 位置检索成功，数值为0
  const COORDINATES_BD09 = 5; //COORDINATES_BD09 百度的经纬度坐标
  const COORDINATES_WGS84 = 1; //WGS84坐标
  const [isHidden,setIsHiddenm] = useState(true); //是否隐藏通告栏
  const [searchValue,setSearchValue] = useState('百度科技园');
  const [isGetCorder,setIsGetCorder] = useState(false);
  const [isOpenPop,setIsOpenPop] = useState(false);
  
  useEffect(() => {
    var map = new BMap.Map("allmap");
    // setMap(map);
    let point = new BMap.Point(116.280190, 40.049191);
    let geolocation = new BMap.Geolocation();
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.setHeading(50);
    map.setTilt(45);
    //浏览器获取当前坐标
    let localgps = navigator.geolocation;
    let options = {
      enableHighAccuracy: true,
      timeout: 500000,
      maximumAge: 0
    };
    //成功获取坐标
    function showSuccess(position) {
      var x = position.coords.longitude;
      var y = position.coords.latitude;
      var ggPoint = new BMap.Point(x,y);
      //坐标转换完之后的回调函数
      var translateCallback = function (data){
        if(data.status === 0) {
          var marker = new BMap.Marker(data.points[0]);
          map.addOverlay(marker);
          var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(10, -10)});
          marker.setLabel(label); //添加百度label
          map.centerAndZoom(data.points[0], 20);
          map.panTo(data.points[0]); //移动地图
        }
      }
      setTimeout(function(){
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(ggPoint);
          convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, translateCallback)
      }, 1000);
    }
    //获取坐标失败
    function showErro(positionError) {
      Toast.info('获取坐标失败');
      console.log("浏览器获取坐标失败原因：",positionError);
    }
    localgps.getCurrentPosition(showSuccess,showErro,options);
    //获取当前位置
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //       //隐藏loading
    //       setIsGetCorder(true);
    //       //展示在线人数
    //         setIsHiddenm(false);
    //       //用所定位的经纬度查找所在地省市街道等信息
    //       let currentPoint = new BMap.Point(r.point.lng,r.point.lat);
    //       console.log("87989",r)
    //       let mk = new BMap.Marker(r.point);//创建标注

    //       // let convertor = new BMap.Convertor();
    //       // let pointArr = [];
    //       // pointArr.push(currentPoint);
    //       // convertor.translate(pointArr,1,5,data=> {
    //       //   if(data.status === 0) {
    //       //     console.log("24342",data);
    //       //     let mk = new BMap.Marker(data.points[0]);
    //       //     map.centerAndZoom(data.points[0], 20);
    //       //     map.addOverlay(mk);//将标注添加到地图中
    //       //     map.panTo(data.points[0]); //移动地图
    //       //   }
    //       // })

          
    //       let gc = new BMap.Geocoder();
    //       gc.getLocation(currentPoint, function(rs){
    //           if(rs.addressComponents.street && rs.addressComponents.streetNumber) {
    //             var adstr = rs.addressComponents.street + rs.addressComponents.streetNumber;
    //           }else {
    //             var adstr = '';
    //           }
    //           var currentAddress = rs.address;
    //           Toast.info("您所在的位置是：" + currentAddress);
    //           //将当前位置回显到搜索框
    //           setSearchValue(adstr);
    //       });
          


    //     }else {
    //         console.log("获取当前位置错误：",this.getStatus());
    //         Toast.info('暂时无法获取当前位置');
    //     }
    // },{enableHighAccuracy: true});
   
  },[])


  

  // 选择区域
  function handleOpenArea() {
    setIsOpenPop(!isOpenPop);
    alert('444')
  }

  // 搜索
  function handleSrearchKeyWords() {
    // map.clearOverlays(); //清除地图上所有覆盖物
    // local = new BMap.LocalSearch(map, { //智能搜索
    //     onSearchComplete: myFun
    // });
    // local.search(searchValue);
  }
  function myFun() {
    // var searchPt = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
    // map.centerAndZoom(searchPt, 18);
    // map.addOverlay(new BMap.Marker(searchPt)); //添加标注
  }


  return (
    <div className={styles.indexPageWrap}>
      <div id="allmap"></div>

      <Spin className={isGetCorder == true ? 'mainSpinHide' : 'mainSpin'} size="middle" tip="正在获取您的当前位置..."/>
      {/* 头部搜索栏 */}
      <Flex className="searchTopBar">
        <div className="areaText" style={{width:'20%',position:'relative'}}>
          <span style={{display:'inline-block', lineHeight:'45px'}}>成都市</span> 
          <Icon type={isOpenPop ? 'down' :'right'} onClick={() => handleOpenArea()}  style={{position:'absolute',right:'0',top:'11px'}}></Icon>
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