import styled from 'styled-components';
import { GrayBackground, GrayLine } from 'assets/colors/palette';

export const MainContainer = styled.div`
  height: 64px;
  width: 100%;
  background: ${GrayBackground};
  border-bottom: solid 1px ${GrayLine};

  .subContainer {
    width: 1200px;
    height: 100%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    button {
      border: 0;
      outline: 0;
      background: transparent;
      margin-top: 16px;
      cursor: pointer;
    }
  }
`;
