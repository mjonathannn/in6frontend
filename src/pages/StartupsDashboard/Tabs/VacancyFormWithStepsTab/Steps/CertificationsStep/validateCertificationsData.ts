import * as yup from 'yup';
import { CertificationsStepData } from '.';

export const validateCertificationsData = async (
  certificationsData: CertificationsStepData,
): Promise<void> => {
  const schema = yup.object().shape({
    certifications: yup.array(yup.string()).optional(),
  });

  await schema.validate(certificationsData, { abortEarly: false });
};
