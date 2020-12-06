import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  background-color: transparent;
  border-top: 1px solid ${(props) => props.theme.divider};
  position: fixed;
  top: 56px;
  left: 240px;
  overflow: auto;
  width: calc(100% - 240px);
  height: calc(100% - 56px);
`;

const MainContainer = ({ children }) => <Wrapper>{children}</Wrapper>;

export default MainContainer;
