import { ValidationError } from 'yup';

export interface IFormStepProps<T> {
  initialData?: T;
  setStepDataFunction?: (stepData?: T) => void;
  errors?: Error | ValidationError;
}
