/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';

const Avatar = styled.img`
  /* width: ${(props) => (props.large ? '80px' : '32px')};
  height: ${(props) => (props.large ? '80px' : '32px')};
  border-radius: ${(props) => (props.large ? '40px' : '16px')}; */
  object-fit: cover;

  ${(props) =>
    props.mini
      ? css`
          width: 24px;
          height: 24px;
          border-radius: 12px;
        `
      : props.medium
      ? css`
          width: 40px;
          height: 40px;
          border-radius: 20px;
        `
      : props.large
      ? css`
          width: 80px;
          height: 80px;
          border-radius: 40px;
        `
      : props.huge
      ? css`
          width: 100px;
          height: 100px;
          border-radius: 50px;
        `
      : css`
          width: 32px;
          height: 32px;
          border-radius: 16px;
        `}
`;

export default Avatar;
