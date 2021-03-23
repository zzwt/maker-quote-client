import React, { memo } from 'react';
import { StyledLogo } from './style.js';
export default memo(function Logo({ color }) {
  return (
    <StyledLogo color={color}>
      <div className="container">MAKERQUOTE.COM</div>
    </StyledLogo>
  );
});
