import styled from 'styled-components';
import {
  GrayLine,
  GrayBody,
  PrimaryColor,
  GrayBackground,
} from 'assets/colors/palette';

export const ItemMainContainer = styled.div`
  width: 952px;
  height: 110px;
  border: solid 2px ${GrayLine};
  border-radius: 8px;
  position: relative;
  padding: 9px 12px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  background: ${GrayBackground};

  :hover {
    border: solid 2px ${PrimaryColor};
    transition: 0.1s;
  }
`;

export const ColorBar = styled.div`
  width: 5px;
  height: 100%;
  float: left;
  border-radius: 12px;
  margin-right: 10px;
`;

export const ItemSideContainer = styled.div`
  width: auto;
  height: 100%;
  float: left;
  padding-top: 6px;

  .nomeDaVaga,
  .localidade,
  .cargaHoraria {
    color: ${GrayBody};
    letter-spacing: 0.75px;
    margin-bottom: 5px;
  }
  .nomeDaVaga {
    font-weight: bold;
    font-size: 18px;
  }
  .localidade,
  .cargaHoraria {
    font-size: 14px;
  }
`;

export const ItemSide2Container = styled.div`
  height: 100%;
  width: 600px;
  float: right;
  padding-top: 18px;
  padding-right: 20px;
  letter-spacing: 0.75px;

  .buttonShare,
  .buttonVisualize,
  .buttonHelp,
  .buttonDelete {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 50px;
    width: 50px;
    border-radius: 100px;
    border: solid 2px ${GrayLine};
    background: transparent;
    margin-left: 20px;
    outline: 0;

    img {
      width: 20px;
    }

    :hover {
      border: solid 2px ${PrimaryColor};
      cursor: pointer;
      transition: 0.1s;
    }
  }

  .buttonCandidatesAndCloses {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 50px;
    width: auto;
    min-width: 200px;
    margin-left: 20px;
    padding: 0px 20px;
    font-size: 14px;
    font-weight: 600;
    color: ${GrayBody};
    border-radius: 100px;
    border: solid 2px ${GrayLine};
    outline: 0;

    img {
      margin-right: 10px;
    }
    .separator {
      height: 20px;
      width: 2px;
      background-color: ${GrayLine};
      margin: 0px 10px;
    }
    .exclamation {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 1px;
      width: 20px;
      height: 20px;
      border: solid 2px ${GrayBody};
      border-radius: 100px;
      font-size: 18px;
      font-weight: bold;
      margin-right: 10px;
    }
    :hover {
      border: solid 2px ${PrimaryColor};
      cursor: pointer;
      transition: 0.1s;
    }
  }

  .buttonOpenVacancyDetails {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 50px;
    width: 50px;
    margin-left: 60px;
    border-radius: 100px;
    background: transparent;
    border: solid 1.5px ${GrayLine};
    outline: 0;
    cursor: pointer;

    :hover {
      border: solid 2px ${PrimaryColor};
      cursor: pointer;
      transition: 0.1s;
    }
  }
`;
