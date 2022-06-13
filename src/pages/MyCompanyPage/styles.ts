import styled from 'styled-components';
import { GrayBackground, GrayTitleActive } from 'assets/colors/palette';

interface Props {
  borderColor: string;
  hoverAndFocusColor: string;
}

export const MainContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${GrayBackground};
`;

export const SubContainer = styled.div`
  width: 1200px;
  height: auto;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

export const FormContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 412px;
  height: 940px;
  padding: 5px;
  letter-spacing: 0.75px;

  .buttonCancelar {
    float: left;
  }
  .buttonSalvar {
    float: right;
  }
`;

export const Title = styled.p`
  color: ${GrayTitleActive};
  margin-bottom: 20px;
  font-size: 24px;
`;

export const TextArea = styled.textarea<Props>`
  display: block;
  width: 400px;
  height: 120px;
  border-radius: 8px;
  border: solid 1px ${props => props.borderColor};
  padding: 10px 10px;
  margin-top: 10px;
  outline: none;
  background: ${GrayBackground};
  font-size: 14px;
  letter-spacing: 0.75px;
  resize: none;

  :hover,
  :focus {
    border: solid 2px ${props => props.hoverAndFocusColor};
    transition: 0.1s;
  }
`;
