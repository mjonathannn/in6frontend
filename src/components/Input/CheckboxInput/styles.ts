import {
  BackgroundColor,
  GradientPrimary,
  GrayBody,
  HighEmphasis,
} from 'assets/colors/palette';
import styled from 'styled-components';

export const Checkmark = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  height: 18px;
  width: 18px;

  background: ${BackgroundColor};
  border: 2px solid ${HighEmphasis};
  border-radius: 4px;

  &:after {
    content: '';
    position: absolute;
    transition: 0.2s;
    opacity: 0;

    left: 5px;
    bottom: 4px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const OptionInput = styled.input`
  display: none;
`;

export const Container = styled.label`
  display: block;
  width: fit-content;
  position: relative;
  padding-left: 26px;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: ${GrayBody};

  & + & {
    margin-top: 4px;
  }

  & ${OptionInput}:checked ~ ${Checkmark} {
    background: ${GradientPrimary};
    border: none;
  }

  & ${OptionInput}:checked ~ ${Checkmark}:after {
    opacity: 1;
  }
`;
