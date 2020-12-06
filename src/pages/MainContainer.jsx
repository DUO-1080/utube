import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  background-color: transparent;
  border-top: 1px solid ${(props) => props.theme.divider};
  margin-top: 56px;
  margin-left: 240px;
  overflow: auto;
  width: calc(100vw - 240px);
  height: calc(100vh - 56px);
`;

const MainContainer = ({ children }) => <Wrapper>{children}</Wrapper>;

export default MainContainer;
