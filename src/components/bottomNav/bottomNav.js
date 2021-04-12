import React, {useState} from 'react';
import styles from './bottomNav.module.less';
import { NavLink } from 'react-router-dom';
import { CONTEXT } from '../../config/index';
import {HomeOutlined,RedditOutlined,ProfileOutlined,UserOutlined} from '@ant-design/icons';

function BottomNav() {
    //状态
    
    return (
        <div className={styles.bottomNavWrap}>
        <NavLink
          to={`${CONTEXT}/index`}
          className="noselected"
          activeClassName="selected"
        >
          <HomeOutlined className="icon homeIcon" /><br></br>
          <span className="tit">首页</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/square`}
          className="noselected"
          activeClassName="selected"
        >
          <RedditOutlined className="icon squareIcon"/><br></br>
          <span className="tit">广场</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/order`}
          className="noselected"
          activeClassName="selected"
        >
          <ProfileOutlined className="icon orderIcon"/><br></br>
          <span className="tit">订单</span>
        </NavLink>
        <NavLink
          to={`${CONTEXT}/mine`}
          className="noselected"
          activeClassName="selected"
        >
          <UserOutlined className="icon mineIcon"/><br></br>
          <span className="tit">我的</span>
        </NavLink>
      </div>
    )
}

export default BottomNav;