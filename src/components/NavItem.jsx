import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 0 24px;
  font-size: 14px;
  justify-content: center;

  img {
    margin-right: 24px;
  }

  span {
    width: 100%;
  }

  .icon {
    margin-right: 24px;
    height: 24px;
  }
`;

const NavItem = ({ Icon, text, classes, ...restProps }) => (
  <Wrapper>
    <Icon classes={classes} {...restProps} />
    <span>{text}</span>
  </Wrapper>
);
export default NavItem;
