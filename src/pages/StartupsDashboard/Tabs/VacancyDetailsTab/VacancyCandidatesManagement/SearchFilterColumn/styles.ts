import { GrayBody } from 'assets/colors/palette';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ColumnTitle = styled.span`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: ${GrayBody};
`;
