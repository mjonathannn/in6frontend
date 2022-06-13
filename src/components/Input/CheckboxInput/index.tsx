import { LabelHTMLAttributes } from 'react';
import { Checkmark, Container, OptionInput } from './styles';

interface SearchFilterOptionProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  handleCheckboxUpdate: (checked: boolean) => void;
  defaultChecked?: boolean;
}

export const CheckboxInput: React.FC<SearchFilterOptionProps> = ({
  label,
  handleCheckboxUpdate,
  defaultChecked,
  ...props
}) => {
  return (
    <Container {...props}>
      {label}
      <OptionInput
        defaultChecked={defaultChecked}
        onChange={({ target: { checked } }) => {
          handleCheckboxUpdate(checked);
        }}
        type="checkbox"
      />
      <Checkmark />
    </Container>
  );
};
