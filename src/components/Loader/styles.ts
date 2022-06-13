import styled, { keyframes } from 'styled-components';
import {
  PrimaryColor,
  GrayLoader,
  BackgroundColor,
} from 'assets/colors/palette';

const LoaderAnimation = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const MainContainer = styled.div`
  min-height: 600px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BackgroundColor};
`;

export const LoaderComponent = styled.div`
  position: relative;
  animation: ${LoaderAnimation} 1s infinite;
  height: 50px;
  width: 50px;
  border: solid 6px ${GrayLoader};
  border-top-color: ${PrimaryColor};
  border-radius: 50%;
  margin-top: -100px;
`;
