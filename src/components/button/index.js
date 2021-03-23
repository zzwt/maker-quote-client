import React, { memo } from 'react';
import { StyledButton } from './style.js';
export default memo(function Button({ title, color, active }) {
  return (
    <StyledButton color={color} active={active}>
      {title}
    </StyledButton>
  );
});
