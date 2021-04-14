import React, { useState , useEffect} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button} from 'antd-mobile'


function Index(props) {
  const [onlineNum,setOnlineNum] = useState(23);
  const [isHidden,setIsHiddenm] = useState(false);
  const BMap = window.BMap;
  
  useEffect(() => {
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.280190, 40.049191), 19);
    map.enableScrollWheelZoom(true);
    map.setHeading(50);
    map.setTilt(45);
  },[])

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