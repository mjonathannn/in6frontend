import { HighGreen, HighRed, colorStatusItem } from 'assets/colors/palette';
import shareIcon from 'assets/img/shareIcon.svg';
import redirectIcon from 'assets/img/redirectIcon.svg';
import candidateIcon from 'assets/img/candidateIcon.svg';
import deleteIcon from 'assets/img/deleteIcon.svg';
import ajudaIcon from 'assets/img/ajudaIcon.svg';
import arrowRight from 'assets/img/arrowRight.svg';
import { developingAlert } from 'utils';
import { IVacancy, IVacancyStatus } from 'types/vacancy';
import { routeVacancyApply } from 'routes/routesAddresses';
import { convertCityDTOToCityAndStateString } from 'utils/conversion';
import {
  ItemMainContainer,
  ItemSideContainer,
  ItemSide2Container,
  ColorBar,
} from './styles';

interface VacancyItemProps {
  vacancy: IVacancy;
  handleOnClickOpenVacancy: (vacancy: IVacancy) => void;
}

export const VacancyItem: React.FC<VacancyItemProps> = ({
  vacancy,
  handleOnClickOpenVacancy,
}) => {
  const {
    name,
    typeOfWorkloadDTO: { type: typeOfWorkload },
    vacancyStatus,
  } = vacancy;

  // ACEITANDOCURRICULOS
  const Item1: React.FC = () => (
    <ItemMainContainer>
      <ColorBar style={{ backgroundColor: HighGreen }} />
      <ItemSideContainer>
        <p className="nomeDaVaga">{name}</p>
        <p className="localidade">
          {convertCityDTOToCityAndStateString(vacancy)}
        </p>
        <p className="cargaHoraria">{typeOfWorkload}</p>
      </ItemSideContainer>

      <ItemSide2Container>
        <button
          type="button"
          className="buttonOpenVacancyDetails"
          onClick={() => handleOnClickOpenVacancy(vacancy)}
        >
          <img src={arrowRight} alt="" />
        </button>
        <button type="button" className="buttonShare" onClick={developingAlert}>
          <img src={shareIcon} alt="" title="Compartilhar" />
        </button>
        <a
          href={`${routeVacancyApply}/${vacancy.id + 1000}`}
          target="_blank"
          rel="noreferrer"
          className="buttonVisualize"
        >
          <img src={redirectIcon} alt="" title="Visualizar" />
        </a>
        <div className="buttonCandidatesAndCloses">
          <img src={candidateIcon} alt="" />
          <p>9</p>
          <p className="separator" />
          <p>Encerra em 23 dias</p>
        </div>
      </ItemSide2Container>
    </ItemMainContainer>
  );

  // NAOACEITANDOCURRICULOS
  const Item2: React.FC = () => (
    <ItemMainContainer>
      <ColorBar style={{ backgroundColor: HighRed }} />
      <ItemSideContainer>
        <p className="nomeDaVaga">{name}</p>
        <p className="localidade">
          {convertCityDTOToCityAndStateString(vacancy)}
        </p>
        <p className="cargaHoraria">{typeOfWorkload}</p>
      </ItemSideContainer>

      <ItemSide2Container>
        <button
          type="button"
          className="buttonOpenVacancyDetails"
          onClick={() => handleOnClickOpenVacancy(vacancy)}
        >
          <img src={arrowRight} alt="" />
        </button>
        <button type="button" className="buttonShare" onClick={developingAlert}>
          <img src={shareIcon} alt="" title="Compartilhar" />
        </button>
        <a
          href={`${routeVacancyApply}/${vacancy.id + 1000}`}
          target="_blank"
          rel="noreferrer"
          className="buttonVisualize"
        >
          <img src={redirectIcon} alt="" title="Visualizar" />
        </a>
        <div className="buttonCandidatesAndCloses">
          <img src={candidateIcon} alt="" />
          <p>129</p>
          <p className="separator" />
          <p>Encerra em 23 dias</p>
        </div>
      </ItemSide2Container>
    </ItemMainContainer>
  );

  // VAGAENCERRADA
  const Item3: React.FC = () => (
    <ItemMainContainer>
      <ColorBar style={{ backgroundColor: colorStatusItem }} />
      <ItemSideContainer>
        <p className="nomeDaVaga">{name}</p>
        <p className="localidade">
          {convertCityDTOToCityAndStateString(vacancy)}
        </p>
        <p className="cargaHoraria">{typeOfWorkload}</p>
      </ItemSideContainer>

      <ItemSide2Container>
        <button
          type="button"
          className="buttonOpenVacancyDetails"
          onClick={() => handleOnClickOpenVacancy(vacancy)}
        >
          <img src={arrowRight} alt="" />
        </button>
        <button
          type="button"
          className="buttonDelete"
          onClick={developingAlert}
        >
          <img src={deleteIcon} alt="" />
        </button>
        <button type="button" className="buttonHelp" onClick={developingAlert}>
          <img src={ajudaIcon} alt="" />
        </button>
        <div className="buttonCandidatesAndCloses">
          <img src={candidateIcon} alt="" />
          <p>732</p>
          <p className="separator" />
          <p>Encerra em 23 dias</p>
        </div>
      </ItemSide2Container>
    </ItemMainContainer>
  );

  switch (vacancyStatus) {
    case IVacancyStatus.ACEITANDOCURRICULOS:
      return <Item1 />;
    case IVacancyStatus.NAOACEITANDOCURRICULOS:
      return <Item2 />;
    case IVacancyStatus.VAGAENCERRADA:
      return <Item3 />;
    default:
      return <></>;
  }
};
