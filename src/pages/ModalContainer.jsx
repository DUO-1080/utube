import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.modalBg};
`;

const ModalContainer = ({ children }) => <Wrapper>{children}</Wrapper>;
export default ModalContainer;
