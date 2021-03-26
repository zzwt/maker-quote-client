import React, { memo } from 'react';
import { StyledLogo } from './style.js';
export default memo(function Logo({ color, onClick = (e) => {} }) {
  return (
    <StyledLogo color={color} onClick={onClick}>
      <div className="container">MAKERQUOTE.COM</div>
    </StyledLogo>
  );
});
