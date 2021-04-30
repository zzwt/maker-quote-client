import React, { memo } from 'react';
import { StyledQuote } from './style.js';
import Logo from '../logo';
import Tag from '../tag';
// import convert from 'color-convert';
export default memo(function Quote({ quote, onClick, imageUrl, mt }) {
  let fontSize;
  if (quote.wc <= 6) {
    fontSize = '2.4rem';
  } else if (quote.wc > 6 && quote.wc <= 8) {
    fontSize = '1.9rem';
  } else if (quote.wc > 8 && quote.wc <= 10) {
    fontSize = '1.65rem';
  } else if (quote.wc > 10 && quote.wc <= 14) {
    fontSize = '1.5rem';
  } else if (quote.wc > 14 && quote.wc <= 20) {
    fontSize = '1.3rem';
  } else if (quote.wc > 20 && quote.wc <= 25) {
    fontSize = '1.2rem';
  } else if (quote.wc > 25 && quote.wc <= 30) {
    fontSize = '1.1rem';
  } else if (quote.wc > 30 && quote.wc <= 40) {
    fontSize = '1rem';
  } else if (quote.wc > 40 && quote.wc <= 50) {
    fontSize = '0.9rem';
  } else {
    fontSize = '0.8rem';
  }

  let scaledImage;
  if (imageUrl) {
    const index = imageUrl.indexOf('upload');
    scaledImage = [
      imageUrl.slice(0, index),
      'upload/',
      'w_250,h_250,c_fill/',
      imageUrl.slice(index + 7),
    ].join('');
  }
  return (
    <StyledQuote mt={mt} fontSize={fontSize}>
      <div className="card" style={{ background: quote.color || '#2e95bb' }}>
        <div className="quote-in"></div>
        <div className="content">{quote.content}</div>
        <div className="name">{quote.author.name}</div>
        <div className="title">{quote.author.title}</div>
        {/* <div className="quote-out"></div> */}
        <div className="logos">
          <Logo color="#ffffff" />
        </div>

        {imageUrl && <img className="pic" src={scaledImage}></img>}
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
