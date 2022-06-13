import { string, number } from 'yup';

const requiredMessage = 'Campo obrigatório';

export const yupRequiredStringField = string().required(requiredMessage);
export const yupRequiredNumberField = number().required(requiredMessage);
