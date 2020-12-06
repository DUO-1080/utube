import React from 'react';
import styled from 'styled-components';
import PageNotFountImg from '../assets/page_not_found.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
  }
`;

const PageNotFount = () => {
  document.title = 'Page Not Fount';
  return (
    <Wrapper>
      <img src={PageNotFountImg} alt="page not fount" />
      <p>This page isn't available. Sorry about that.</p>
    </Wrapper>
  );
};

export default PageNotFount;
