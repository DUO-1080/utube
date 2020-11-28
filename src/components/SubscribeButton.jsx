import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* button {
    width: 110px;
    height: 36px;
    text-align: center;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 450;
  } */
  .unsub {
    background-color: red;
    color: white;
  }

  .sub {
    background-color: #ececec;
    color: #606060;
  }
`;

const SubscribeButton = ({ subscribed, handleSubscribe }) => (
  <Wrapper>
    <button
      type="button"
      className={subscribed ? 'sub button' : 'unsub button'}
      onClick={handleSubscribe}
    >
      {subscribed ? 'SUBSCRIPTED' : 'SUBSCRIBE'}
    </button>
  </Wrapper>
);

export default SubscribeButton;
