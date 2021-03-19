import React from 'react';
import styled from 'styled-components';
import SignInButton from './SignInButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;

  .info {
    margin: 24px auto;
    text-align: center;
  }

  .title {
    font-size: 24px;
  }

  .msg {
    font-size: 14px;
  }
`;

const SignInRequire = ({ Icon, text, title }) => (
  <Wrapper>
    <Icon size="120px" />
    <div className="info">
      <p className="title">{title}</p>
      <p className="msg">{text}</p>
    </div>
    <SignInButton />
  </Wrapper>
);

export default SignInRequire;
