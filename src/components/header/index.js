import React, { memo } from 'react';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { StyledHeader } from './style.js';
import { NavLink } from 'umi';

export default memo(function Header() {
  return (
    <StyledHeader className="wrapper">
      <div className="header-left">
        <Logo color="#f9735b" />
      </div>

      <div className="header-right">
        <NavLink
          to="/"
          activeClassName="link-active"
          className="link-style"
          exact
        >
          Quotes
        </NavLink>
        <NavLink
          to="/people"
          activeClassName="link-active"
          className="link-style"
        >
          People
        </NavLink>
      </div>
    </StyledHeader>
  );
});
