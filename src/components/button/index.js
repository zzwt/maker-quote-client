import React, { memo } from 'react';
import { StyledButton } from './style.js';
export default memo(function Button({ title, color, active, onClick }) {
  return (
    <StyledButton color={color} active={active} onClick={(e) => onClick()}>
      {title}
    </StyledButton>
  );
});
