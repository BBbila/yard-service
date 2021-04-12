import React, { useState } from 'react';
import styles from  './mine.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'
import {Button} from 'antd-mobile'

function Mine() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.minePageWrap}>
      <BottomNav />
      <div>999</div>
    </div>
  );
}

export default Mine;