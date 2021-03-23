import React, { memo } from 'react';
import { StyledTag } from './style.js';
export default memo(function Tag({ tag, onClick }) {
  const { id, name, color } = tag;

  return (
    <StyledTag color={color} onClick={onClick ? (e) => onClick(id) : (e) => {}}>
      {name}
    </StyledTag>
  );
});
