import styled from 'styled-components';
import { PrimaryColor } from 'assets/colors/palette';

export const Container = styled.p`
  width: 400px;
  font-size: 14px;
  line-height: 24px;
  margin-top: 16px;
  letter-spacing: 0.75px;
`;

export const TermsButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: ${PrimaryColor};
  letter-spacing: 0.75px;
`;
