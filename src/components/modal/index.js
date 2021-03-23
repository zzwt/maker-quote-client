import React, { memo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StyledModal } from './style.js';

const modalRoot = document.getElementById('modal-root');

export default memo(function Modal({ children, active }) {
  const el = document.createElement('div');
  useEffect(() => {
    if (active) modalRoot.appendChild(el);
    return () => {
      if (modalRoot.hasChildNodes(el)) modalRoot.removeChild(el);
    };
  }, [active]);

  return ReactDOM.createPortal(
    <StyledModal>
      <div className="child">{children}</div>
    </StyledModal>,
    el,
  );
});
