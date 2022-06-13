/* eslint-disable react-hooks/rules-of-hooks */
import editIcon from 'assets/img/editIcon.svg';
import redirectIcon from 'assets/img/redirectIcon.svg';
import shareIcon from 'assets/img/shareIcon.svg';
import deleteIcon from 'assets/img/deleteIcon.svg';

import { Link, Redirect, useLocation } from 'react-router-dom';
import { IFindedVacancy } from 'types/vacancy';
import { routeStartups, routeVacancyApply } from 'routes/routesAddresses';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Depth4 } from 'assets/colors/boxShadows';
import { Modal } from 'components/Modal';
import { deleteVacancy } from 'services/vacancyServices';
import { authenticateCompany } from 'services/companyServices';
import { useStartup } from 'hooks/startup';
import { routeEditVacancy } from 'routes/startupsRoutes/startupsRoutesAddresses';
import {
  Header,
  AccessContainer,
  AccessButton,
  VacancyName,
  VacancyActionsContainer,
  SelectedSubtabContainer,
} from './styles';
import { VacancyInformation } from './VacancyInformation';
import { VacancyCandidatesManagement } from './VacancyCandidatesManagement';
import { DeleteVacancyModal } from './DeleteVacancyModal';

const VACANCY_DETAILS_SUBTABS = {
  vacancyInformation: {
    name: 'Detalhes da vaga',
    Component: VacancyInformation,
  },
  vacancyCandidatesManagement: {
    name: 'Gerenciamento dos candidatos',
    Component: VacancyCandidatesManagement,
  },
};

type VacancyDetailsSubtabsType = keyof typeof VACANCY_DETAILS_SUBTABS;

export const VacancyDetailsTab: React.FC = () => {
  const { state: vacancy } = useLocation() as {
    state: IFindedVacancy;
  };
  if (!vacancy) return <Redirect to={routeStartups} />;

  const {
    startupData: { email },
  } = useStartup();
  const headerRef = useRef<HTMLHeadElement>(null);

  const [isShowingDeleteVacancyModal, setIsShowingDeleteVacancyModal] =
    useState(false);
  const [selectedSubtab, setSelectedSubtab] =
    useState<VacancyDetailsSubtabsType>('vacancyInformation');

  const parsedVacancyName = useMemo(() => {
    if (vacancy.name.length <= 38) return vacancy.name;

    const reducedName = vacancy.name.substring(0, 35);
    return `${reducedName}...`;
  }, [vacancy.name]);

  const SelectedSubtabComponent = useMemo(
    () => VACANCY_DETAILS_SUBTABS[selectedSubtab].Component,
    [selectedSubtab],
  );

  useLayoutEffect(() => {
    const toggleHeaderShadow = () => {
      const { current } = headerRef;
      if (!current) return;

      const boxShadow = current.style.getPropertyValue('box-shadow');
      const offsetTop = window.scrollY;

      if (!boxShadow && offsetTop > 64) {
        current.style.setProperty('box-shadow', Depth4);
        current.style.setProperty('position', 'sticky');
      } else if (boxShadow && offsetTop <= 64) {
        current.style.removeProperty('box-shadow');
        current.style.setProperty('position', 'static');
      }
    };

    window.addEventListener('scroll', toggleHeaderShadow);
    return () => window.removeEventListener('scroll', toggleHeaderShadow);
  }, []);

  const handleDeleteVacancy = useCallback(
    async (password: string) => {
      await authenticateCompany({
        email,
        password,
      });

      await deleteVacancy(vacancy.id);
    },
    [email, vacancy.id],
  );

  return (
    <>
      <Modal isVisible={isShowingDeleteVacancyModal}>
        <DeleteVacancyModal
          handleDeleteVacancy={handleDeleteVacancy}
          handleCloseModal={() => setIsShowingDeleteVacancyModal(false)}
        />
      </Modal>

      <Header ref={headerRef}>
        <div>
          <AccessContainer>
            <VacancyName>{parsedVacancyName}</VacancyName>

            {Object.entries(VACANCY_DETAILS_SUBTABS).map(([key, { name }]) => (
              <AccessButton
                key={key}
                isOfSelectedTab={key === selectedSubtab}
                type="button"
                onClick={() =>
                  setSelectedSubtab(key as VacancyDetailsSubtabsType)
                }
              >
                {name}
              </AccessButton>
            ))}
          </AccessContainer>

          <VacancyActionsContainer>
            <Link
              to={{ pathname: routeEditVacancy, state: vacancy }}
              className="action-button"
            >
              <img src={editIcon} alt="Editar" />
            </Link>

            <Link
              to={`${routeVacancyApply}/${1000 + vacancy.id}`}
              target="_blank"
              className="action-button"
            >
              <img src={redirectIcon} alt="Redirecionar" />
            </Link>

            <button type="button" className="action-button">
              <img src={shareIcon} alt="Compartilhar" />
            </button>

            <button
              type="button"
              onClick={() => setIsShowingDeleteVacancyModal(true)}
              className="action-button"
            >
              <img src={deleteIcon} alt="Deletar" />
            </button>
          </VacancyActionsContainer>
        </div>
      </Header>

      <SelectedSubtabContainer>
        <SelectedSubtabComponent vacancy={vacancy} />
      </SelectedSubtabContainer>
    </>
  );
};
