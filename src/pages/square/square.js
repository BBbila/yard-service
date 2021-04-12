import React, { useState } from 'react';
import styles from  './square.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Button} from 'antd-mobile'

function Square() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.squarePageWrap}>
      <BottomNav />
      <div>22222222222223333333333</div>
    </div>
  );
}

export default Square;