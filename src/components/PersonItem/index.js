import React, { memo } from 'react';
import { StyledPersonItem } from './style.js';
import { history } from 'umi';
export default memo(function PersonItem({ person }) {
  const onClick = () => {
    history.push(`/people/${person.id}`);
  };

  return (
    <StyledPersonItem>
      <div className="container" onClick={onClick}>
        <img src={person.pic.url} />
        <div className="name">{person.name}</div>
        <div className="title">{person.title}</div>
      </div>
    </StyledPersonItem>
  );
});
