import React, {useState} from 'react';
import styles from './receive.module.less';
import { CONTEXT } from '../../config/index';
import TopNavBar from '../../components/topNavBar/topNavBar';
function Receive(props) {
    //状态
    
    return (
        <div className={styles.receivePageWrap}>
            <TopNavBar title="我要收"/>
        </div>
       
    )
}

export default Receive;