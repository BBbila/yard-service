import React, { useState } from 'react';
import styles from  './index.module.less';
import BottomNav from '../../components/bottomNav/bottomNav'

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.indexPageWrap}>
      <BottomNav />
    </div>
  );
}

export default Example;