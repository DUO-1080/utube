import React from 'react';
import Icon from '../assets/youtube.svg';
import ModalContainer from './ModalContainer';

const Splash = () => (
  <ModalContainer>
    <img width="86px" src={Icon} alt="loading" />
  </ModalContainer>
);

export default Splash;
