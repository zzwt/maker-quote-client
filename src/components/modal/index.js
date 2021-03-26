import React, { memo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StyledModal } from './style.js';

const modalRoot = document.getElementById('modal-root');

export default memo(function Modal({ children, active = false }) {
  // const el = document.createElement('div');
  // useEffect(() => {
  //   // console.log('in rendinrg modal useEffect');
  //   if (active) modalRoot.appendChild(el);
  //   return () => {
  //     // console.log('in rendinrg modal return');
  //     if (modalRoot.hasChildNodes(el)) modalRoot.removeChild(el);
  //   };
  // }, [active]);
  // console.log('rendering modal', children);
  if (!active) return null;
  return ReactDOM.createPortal(
    <StyledModal>
      <div className="child">{children}</div>
    </StyledModal>,
    modalRoot,
  );
});
