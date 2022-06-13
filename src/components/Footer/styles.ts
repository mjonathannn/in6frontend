import styled from 'styled-components';
import {
  BackgroundColor,
  GrayLine,
  MediumEmphasis,
  PrimaryColor,
} from 'assets/colors/palette';
import { Medium14Styles } from 'assets/fonts/fontStyles';

interface Props {
  contentWidth?: string;
  position?: string;
}

export const MainContainer = styled.footer<Props>`
  position: ${props => props.position};
  bottom: 0;
  width: 100%;
  height: auto;
  background: ${BackgroundColor};
  border-top: solid 1px ${GrayLine};
  display: flex;
  justify-content: center;

  .content {
    width: ${({ contentWidth }) => contentWidth};
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 22px 0px;

    p {
      font-size: 14px;
      float: left;
      color: ${MediumEmphasis};
      cursor: default;
      letter-spacing: 0.75px;
    }
    ul {
      float: right;
    }
    li {
      float: left;
      list-style: none;
      margin-left: 50px;
      position: relative;

      a {
        ${Medium14Styles}

        text-decoration: none;
        cursor: pointer;
        transition: 0.2s;
        color: ${MediumEmphasis};

        :hover {
          color: ${PrimaryColor};
        }
      }

      & + li:after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${MediumEmphasis};
        opacity: 0.2;
        left: -25px;
        bottom: 38%;
      }
    }
  }
`;
