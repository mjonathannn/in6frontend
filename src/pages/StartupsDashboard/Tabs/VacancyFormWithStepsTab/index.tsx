/* eslint-disable react-hooks/rules-of-hooks */
import { FormWithSteps } from 'components/FormWithSteps';
import { useStartup } from 'hooks/startup';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { routeStartups } from 'routes/routesAddresses';
import {
  routeEditVacancy,
  routeVacancyDetails,
} from 'routes/startupsRoutes/startupsRoutesAddresses';
import { createVacancy, updateVacancy } from 'services/vacancyServices';
import { IFindedVacancy, IVacancy, IVacancyStatus } from 'types/vacancy';
import { ValidationError } from 'yup';
import { VacancyFormWithStepsSuccessModal } from './VacancyFormWithStepsSuccessModal';
import {
  VacancyDefinitionStep,
  validateVacancyDefinitionData,
  WorkloadStep,
  RemunerationStep,
  CompetenciesStep,
  SkillsStep,
  LanguagesStep,
  CertificationsStep,
  OtherRequirementsStep,
  FinishStep,
  AllStepsDataKeyType,
  AllStepsData,
  InitialDataType,
  validateWorkloadData,
  validateRemunerationData,
  validateCompetenciesData,
  validateSkillsData,
  validateLanguagesData,
  validateCertificationsData,
  validateOtherRequirementsData,
} from './Steps';
import { Container } from './styles';

export const CREATE_VACANCY_STEPS = {
  vacancyDefinitionStep: {
    name: 'Definindo a vaga',
    ComponentFunction: VacancyDefinitionStep,
    validationFunction: validateVacancyDefinitionData,
  },
  workloadStep: {
    name: 'Jornada de trabalho',
    ComponentFunction: WorkloadStep,
    validationFunction: validateWorkloadData,
  },
  remunerationStep: {
    name: 'Remuneração',
    ComponentFunction: RemunerationStep,
    validationFunction: validateRemunerationData,
  },
  competenciesStep: {
    name: 'Competências (Opcional)',
    ComponentFunction: CompetenciesStep,
    validationFunction: validateCompetenciesData,
  },
  skillsStep: {
    name: 'Habilidades (Opcional)',
    ComponentFunction: SkillsStep,
    validationFunction: validateSkillsData,
  },
  languagesStep: {
    name: 'Idiomas (Opcional)',
    ComponentFunction: LanguagesStep,
    validationFunction: validateLanguagesData,
  },
  certificationsStep: {
    name: 'Certificações (Opcional)',
    ComponentFunction: CertificationsStep,
    validationFunction: validateCertificationsData,
  },
  otherRequirementsStep: {
    name: 'Outros requisitos (Opcional)',
    ComponentFunction: OtherRequirementsStep,
    validationFunction: validateOtherRequirementsData,
  },
  finishStep: {
    name: 'Finalizar',
    ComponentFunction: FinishStep,
  },
};

const STEPS_KEYS = Object.keys(CREATE_VACANCY_STEPS) as AllStepsDataKeyType[];

export const VacancyFormWithStepsTab: React.FC = () => {
  const history = useHistory();
  const isEditRoute = history.location.pathname === routeEditVacancy;

  const { state: vacancyToEdit } = useLocation() as {
    state: IFindedVacancy;
  };
  if (isEditRoute && !vacancyToEdit) return <Redirect to={routeStartups} />;

  const {
    startupData: {
      id: startupId,
      businessSectorDTO: { id: businessSectorId },
      cityDTO: {
        id: cityId,
        stateDTO: { id: stateId },
      },
    },
  } = useStartup();

  const [stepsData, setStepsData] = useState<AllStepsData>({} as AllStepsData);
  const [selectedStep, setSelectedStep] = useState<AllStepsDataKeyType | null>(
    null,
  );
  const [formVacancy, setFormVacancy] = useState<IFindedVacancy | null>(null);
  const [isShowingSuccessModal, setIsShowingSuccessModal] = useState(false);
  const [SelectedComponent, setSelectedComponent] =
    useState<ReactElement | null>(null);

  const convertVacancyToStepsData = useCallback(() => {
    const {
      name,
      description,
      disabledPeople,
      forStudents,
      immediateHiring,
      needExperience,
      cityDTO: {
        id: city,
        stateDTO: { id: state },
      },
      typeJobDTO: { id: typeJob },
      typeOfWorkloadDTO: { id: typeOfWorkload },
      workSchedule,
      salary,
      salaryToNegotiate,
      benefits,
      typeOfPayDTO: { id: typeOfPay },
      competencies,
      skills,
      languages,
      certifications,
      otherRequirements,
    } = vacancyToEdit;

    const vacancyDefinitionStep = {
      name,
      description,
      disabledPeople,
      forStudents,
      immediateHiring,
      needExperience,
      city,
      state,
      typeJob,
    };

    const workloadStep = {
      typeOfWorkload,
      workSchedule,
    };

    const remunerationStep = {
      salary,
      salaryToNegotiate,
      benefits,
      typeOfPay,
    };

    return {
      vacancyDefinitionStep,
      workloadStep,
      remunerationStep,
      competenciesStep: {
        competencies,
      },
      skillsStep: {
        skills,
      },
      languagesStep: {
        languages,
      },
      certificationsStep: {
        certifications,
      },
      otherRequirementsStep: {
        otherRequirements,
      },
    } as AllStepsData;
  }, [vacancyToEdit]);

  useEffect(() => {
    if (!isEditRoute) {
      setSelectedStep('vacancyDefinitionStep');
      return;
    }

    const parsedStepsData = convertVacancyToStepsData();
    setStepsData(parsedStepsData);
    setSelectedStep('finishStep');
  }, [convertVacancyToStepsData, isEditRoute]);

  const updateStepData = useCallback(
    stepData => {
      if (selectedStep === null) return;

      setStepsData(previousStepsData => ({
        ...previousStepsData,
        [selectedStep]: stepData,
      }));
    },
    [selectedStep],
  );

  const convertStepsDataToVacancy = useCallback(() => {
    const {
      vacancyDefinitionStep,
      workloadStep,
      remunerationStep,
      competenciesStep,
      skillsStep,
      languagesStep,
      certificationsStep,
      otherRequirementsStep,
    } = stepsData;

    const {
      name,
      description,
      disabledPeople,
      forStudents,
      immediateHiring,
      needExperience,
      city,
      state,
      typeJob,
    } = vacancyDefinitionStep;
    const parsedVacancyDefinitionStepData = {
      name,
      description,
      disabledPeople,
      forStudents,
      immediateHiring,
      needExperience,
      cityDTO: {
        id: Number(city),
        stateDTO: {
          id: Number(state),
        },
      },
      typeJobDTO: {
        id: Number(typeJob),
      },
    };

    const { typeOfWorkload, workSchedule } = workloadStep;
    const parsedWorkloadStep = {
      typeOfWorkloadDTO: {
        id: Number(typeOfWorkload),
      },
      workSchedule,
    };

    const { salary, salaryToNegotiate, benefits, typeOfPay } = remunerationStep;
    const parsedRemunerationStep = {
      salary,
      salaryToNegotiate,
      benefits,
      typeOfPayDTO: {
        id: Number(typeOfPay),
      },
    };

    const { competencies } = competenciesStep;
    const { skills } = skillsStep;
    const { languages } = languagesStep;
    const { certifications } = certificationsStep;
    const { otherRequirements } = otherRequirementsStep;

    return {
      ...parsedVacancyDefinitionStepData,
      ...parsedWorkloadStep,
      ...parsedRemunerationStep,
      competencies,
      skills,
      languages,
      certifications,
      otherRequirements,
      companyDTOInput: {
        id: startupId,
        businessSectorDTO: {
          id: businessSectorId,
        },
        cityDTO: {
          id: cityId,
          stateDTO: {
            id: stateId,
          },
        },
      },
    } as IVacancy;
  }, [businessSectorId, cityId, startupId, stateId, stepsData]);

  const handleUpdateVacancy = useCallback(async () => {
    try {
      const vacancyOriginalStatus = vacancyToEdit.vacancyStatus;

      const vacancyFromSteps = convertStepsDataToVacancy();
      const updatedVacancy: IVacancy = {
        ...vacancyFromSteps,
        id: vacancyToEdit.id,
        vacancyStatus: IVacancyStatus[vacancyOriginalStatus],
      };

      await updateVacancy(updatedVacancy);
      setFormVacancy({
        ...updatedVacancy,
        vacancyStatus: vacancyOriginalStatus,
      });
      setIsShowingSuccessModal(true);
    } catch (err) {
      alert('Erro ao atualizar a vaga, por favor, tente novamente mais tarde.');
    }
  }, [convertStepsDataToVacancy, vacancyToEdit]);

  const handlePublishVacancy = useCallback(async () => {
    try {
      const vacancy = await createVacancy(convertStepsDataToVacancy());
      setFormVacancy(vacancy);
      setIsShowingSuccessModal(true);
    } catch (err) {
      alert('Erro ao criar a vaga, por favor, tente novamente mais tarde.');
    }
  }, [convertStepsDataToVacancy]);

  const handleRedirectToVacancy = useCallback(
    () => history.push(routeVacancyDetails, formVacancy),
    [formVacancy, history],
  );

  const handleUpdateSelectedStep = useCallback(
    async (
      updateType: 'throwback' | 'advance',
      selectedStepIndex: number,
      throwbackStepsQuantity = 1,
    ) => {
      if (updateType === 'throwback') {
        if (selectedStepIndex === 0) history.push(routeStartups);
        else {
          setSelectedStep(
            STEPS_KEYS[selectedStepIndex - throwbackStepsQuantity],
          );
        }

        return;
      }

      if (selectedStep === 'finishStep') {
        await (isEditRoute ? handleUpdateVacancy : handlePublishVacancy)();
        return;
      }
      if (selectedStep === null) return;

      const { validationFunction, ComponentFunction } =
        CREATE_VACANCY_STEPS[selectedStep];
      const parsedStepData = stepsData[selectedStep] as InitialDataType;

      try {
        await validationFunction(parsedStepData);
        setSelectedStep(STEPS_KEYS[selectedStepIndex + 1]);
      } catch (error) {
        setSelectedComponent(
          <ComponentFunction
            initialData={parsedStepData}
            setStepDataFunction={updateStepData}
            errors={error as Error | ValidationError}
          />,
        );
      }
    },
    [
      handlePublishVacancy,
      handleUpdateVacancy,
      history,
      isEditRoute,
      selectedStep,
      stepsData,
      updateStepData,
    ],
  );

  useEffect(() => {
    if (selectedStep === null) return;

    const { ComponentFunction } = CREATE_VACANCY_STEPS[selectedStep];
    const isFinishStep = selectedStep === 'finishStep';
    const initialData = isFinishStep ? stepsData : stepsData[selectedStep];

    setSelectedComponent(
      <ComponentFunction
        initialData={initialData as InitialDataType}
        setStepDataFunction={isFinishStep ? undefined : updateStepData}
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStep, updateStepData]);

  return (
    <Container>
      <VacancyFormWithStepsSuccessModal
        handleRedirectToVacancy={handleRedirectToVacancy}
        isVisible={isShowingSuccessModal}
        isEditFormSuccessModal={isEditRoute}
      />

      {selectedStep !== null && (
        <FormWithSteps
          STEPS={CREATE_VACANCY_STEPS}
          handleUpdateSelectedStep={handleUpdateSelectedStep}
          headerTitle={isEditRoute ? 'Editar vaga' : 'Criar nova vaga'}
          selectedStep={selectedStep}
          lastStepAdvanceButtonText={
            isEditRoute ? 'Salvar alterações' : 'Publicar vaga'
          }
        >
          {SelectedComponent}
        </FormWithSteps>
      )}
    </Container>
  );
};
