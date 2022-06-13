import {
  BackgroundColor,
  GradientPrimary,
  GrayLine,
} from 'assets/colors/palette';
import styled from 'styled-components';

interface ContainerProps {
  barPercentage: number;
}

export const Container = styled.footer<ContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100px;
  background: ${BackgroundColor};
  border-top: solid 1px ${GrayLine};

  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    transition: 0.5s;
    position: absolute;
    left: 0;
    top: -1px;

    width: ${({ barPercentage }) => barPercentage}%;
    height: 2px;

    background: ${GradientPrimary};
  }
`;

export const SubContainer = styled.div`
  width: 1246px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
