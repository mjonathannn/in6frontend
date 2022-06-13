import { yupRequiredNumberField } from 'utils/validation';
import * as yup from 'yup';
import { WorkloadStepData } from '.';

export const validateWorkloadData = async (
  workloadData: WorkloadStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    typeOfWorkload: yupRequiredNumberField,
    workSchedule: yup.string().optional(),
  });

  await schema.validate(workloadData, { abortEarly: false });
};
