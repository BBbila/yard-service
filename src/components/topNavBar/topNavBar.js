import React, {useState} from 'react';
import styles from './topNavBar.module.less';
import { CONTEXT } from '../../config/index';
import {NavBar,Icon} from 'antd-mobile'
function TopNavBar(props) {
    //状态
    
    return (
        <div className={styles.indexPageWrap}>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => alert('onLeftClick')}
        >
            {props.title}
        </NavBar>
      </div>
       
    )
}

export default TopNavBar;