import React, { useState , useEffect} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button} from 'antd-mobile'

function Index(props) {
  const [onlineNum,setOnlineNum] = useState(23);
  const [isHidden,setIsHiddenm] = useState(false);
  const BMap = window.BMap;
  
  useEffect(() => {
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  })

  return (
    <div className={styles.indexPageWrap}>
      <div id="allmap"></div>
      <BottomNav />
      <Flex className="functionalBtnCon">
        <Flex.Item><Button type="primary">我要收</Button></Flex.Item>
        <Flex.Item><Button type="primary">我要取</Button></Flex.Item>
      </Flex>
      <NoticeBar className={isHidden == false ? 'onlineBar' : 'onlineBarHidden'} onClick={() => setIsHiddenm(!isHidden)}>
        附近有{onlineNum}人在线~
        <span style={{ color: '#a1a1a1', marginLeft: '130%',fontSize:'12px' }} onClick={() => setIsHiddenm(true)}>隐藏</span>
      </NoticeBar>
    </div>
  );
}

export default Index;