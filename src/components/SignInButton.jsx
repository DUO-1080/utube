import styled from 'styled-components';
import { SignInIcon } from './Icons';

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  border: 1px solid #065fd4;
  cursor: pointer;

  span {
    color: #065fd4;
    margin-left: 8px;
    font-size: 14px;
    flex-grow: 1;
  }
`;

const SignInButton = (props) => (
  <Wrapper {...props}>
    <SignInIcon fillColor="#065fd4" />
    <span>SIGN IN</span>
  </Wrapper>
);

export default SignInButton;
