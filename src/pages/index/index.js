import React, { useState} from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Flex,NoticeBar,Button} from 'antd-mobile'

function Index(props) {
  const [onlineNum,setOnlineNum] = useState(23);
  const [isHidden,setIsHiddenm] = useState(false);


  return (
    <div className={styles.indexPageWrap}>
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