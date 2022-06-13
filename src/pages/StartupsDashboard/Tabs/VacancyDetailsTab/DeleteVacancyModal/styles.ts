import {
  GrayBackground,
  HighEmphasis,
  MediumEmphasis,
} from 'assets/colors/palette';
import styled from 'styled-components';

export const Container = styled.div`
  height: 330px;
  width: 327px;
  background-color: ${GrayBackground};
  border-radius: 8px;
  padding-inline: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  text-align: center;
  letter-spacing: 0.75px;

  .primaryButton {
    width: 279px;
  }
  .simpleButton {
    margin-top: 10px;
  }
`;

export const Title = styled.p`
  color: ${HighEmphasis};
  font-weight: 700;
  font-size: 24px;
`;

export const Description = styled.p`
  color: ${MediumEmphasis};
  font-size: 14px;
  margin-block: 15px;
`;
