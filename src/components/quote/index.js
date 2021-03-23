import React, { memo } from 'react';
import { StyledQuote } from './style.js';
import Logo from '../logo';
import Tag from '../tag';
// import convert from 'color-convert';
export default memo(function Quote({ quote, onClick, imageUrl, mt }) {
  return (
    <StyledQuote mt={mt}>
      <div className="card">
        <div className="quote-in"></div>
        <div className="content">{quote.content}</div>
        <div className="name">{quote.author.name}</div>
        <div className="title">{quote.author.title}</div>
        <div className="quote-out"></div>
        <div className="logos">
          <Logo color="#ffffff" />
        </div>

        {imageUrl && <img className="pic" src={imageUrl}></img>}
      </div>

      <div className="tags">
        {quote.tags.map((tag, index) => {
          return (
            <div className="tag" key={index}>
              <Tag
                tag={tag}
                onClick={onClick ? (e) => onClick(tag.id) : (e) => {}}
              />
            </div>
          );
        })}
      </div>
    </StyledQuote>
  );
});
