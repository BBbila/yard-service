import React, {useState} from 'react';
import styles from './bottomNav.module.less';
import { NavLink } from 'react-router-dom';
import { CONTEXT } from '../../config/index';

function BottomNav() {
    //状态
    


    return (
        <div className={styles.bottomNavWrap}>
        <NavLink
          to={`${CONTEXT}/index`}
          className="noselected"
          activeClassName="selected"
        >
          <i className="iconfire iconfont iconredu"></i>
          <span className="tit">热度推荐</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/treasure`}
          className="noselected"
          activeClassName="selected"
        >
          <i className="icon iconfont iconbaoxiang"></i>
          <span className="tit">变废为宝</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/food`}
          className="noselected"
          activeClassName="selected"
        >
          <i className="icon iconfont iconshiwumiantiao"></i>
          <span className="tit">食材烹饪</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/drink`}
          className="noselected"
          activeClassName="selected"
        >
          <i className="icon iconfont iconzhenzhunaicha"></i>
          <span className="tit">奶茶攻略</span>
        </NavLink>
        
      </div>
    )
}

export default BottomNav;