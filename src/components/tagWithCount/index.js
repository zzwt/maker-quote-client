import React, { memo } from 'react';
import { StyledTag, StyledTagLeft } from './style.js';
// import Tag from '../tag';
export default memo(function TagWithCount({ tag, count = 0, active, onClick }) {
  // return tag.name === 'All Tags' ? (
  //   <StyledTag active={active} color="#666666">
  //     <div className="container" onClick={(e) => onClick(id)}>
  //       <div className="first">{tag.name}</div>
  //     </div>
  //   </StyledTag>
  // ) : (
  //   <StyledTag color={tag.color} active={active}>
  //     <div className="container" onClick={(e) => onClick(tag.id)}>
  //       {/* <div className="left"> */}
  //       <Tag tag={tag} onClick={onClick} />
  //       {/* </div> */}
  //       {/* <div className="right"> */}
  //       <div className="count">{count}</div>
  //       {/* </div> */}
  //     </div>
  //   </StyledTag>
  // );

  return (
    <StyledTag color={tag.color} active={active}>
      <div
        className="container"
        onClick={onClick ? (e) => onClick(tag.id) : (e) => {}}
      >
        {/* <div className="left"> */}

        <StyledTagLeft color={tag.color}>{tag.name}</StyledTagLeft>

        {/* <Tag tag={tag} onClick={onClick} /> */}
        {/* </div> */}
        {/* <div className="right"> */}
        <div className="count">{count}</div>
        {/* </div> */}
      </div>
    </StyledTag>
  );
});
