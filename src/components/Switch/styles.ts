import { GrayBody } from 'assets/colors/palette';
import styled from 'styled-components';

interface ContainerProps {
  checked: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .react-switch-handle {
    top: 2px !important;
    width: 28px !important;
    height: 28px !important;

    transform: ${({ checked }) =>
      checked ? 'translateX(calc(100% - 2px))' : 'translateX(2px)'} !important;
  }

  p {
    line-height: 16px;
    color: ${GrayBody};
  }
`;
