import React, { useState } from 'react';
import styles from  './order.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Button} from 'antd-mobile'

function Order() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.orderPageWrap}>
      <BottomNav />
      <div>222222222222</div>
    </div>
  );
}

export default Order;