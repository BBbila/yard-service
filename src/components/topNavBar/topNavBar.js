import React, {useState} from 'react';
import styles from './topNavBar.module.less';
import { CONTEXT } from '../../config/index';
import {NavBar,Icon} from 'antd-mobile'
function TopNavBar(props) {
    
    function handleClickBack() {
        //重定向页面
        // window.location.href= `${CONTEXT}/index`
        //返回上一页
        window.history.back();
    }
    
    return (
        <div className={styles.indexPageWrap}>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => handleClickBack()}
        >
            {props.title}
        </NavBar>
      </div>
       
    )
}

export default TopNavBar;