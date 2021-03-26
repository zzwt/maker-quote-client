import React, { memo } from 'react';
import { history } from 'umi';
import Logo from '@/components/logo';
import { StyledFooter } from './style.js';
export default memo(function Footer() {
  return (
    <StyledFooter className="wrapper">
      <div className="footer-left ">
        <span>&copy;2021-2025. All rights reserved.</span>
      </div>
      <div className="footer-middle ">
        <Logo color="#fdb035" onClick={(e) => history.push('/')} />
      </div>
      <div className="footer-right">
        <div className="space">About Us</div>
        <div className="space">Contact Us</div>
      </div>
    </StyledFooter>
  );
});
