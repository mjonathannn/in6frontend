import { ErrorDefaut, GrayLine, PrimaryColor } from 'assets/colors/palette';
import { InputHTMLAttributes } from 'react';
import { mask } from 'remask';
import { ReactInputState } from 'types/reactInputState';
import { InputErrorMessageStyle, InputNameStyle, InputStyle } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  states: ReactInputState;
  notHaveError?: boolean;
  valuePattern?: string[];
}

export const Input: React.FC<InputProps> = ({
  name,
  states: {
    mainState: { setFunction: mainFunction, value: mainValue },
    errorMessageState: { setFunction: errorFunction, value: errorValue },
  },
  disabled,
  style,
  onChange,
  valuePattern,
  notHaveError,
  ...props
}) => (
  <div style={{ maxWidth: style?.width ?? 400 }}>
    <InputNameStyle disabled={disabled}>{name}</InputNameStyle>
    <InputStyle
      borderColor={errorValue ? ErrorDefaut : GrayLine}
      hoverAndFocusColor={errorValue ? ErrorDefaut : PrimaryColor}
      autoComplete="off"
      onChange={event => {
        if (onChange) onChange(event);
        else {
          const {
            target: { value },
          } = event;
          mainFunction(valuePattern ? mask(value, valuePattern) : value);
        }

        if (errorValue) errorFunction('');
      }}
      value={mainValue as string}
      disabled={disabled}
      style={style}
      {...props}
    />

    {!notHaveError && (
      <InputErrorMessageStyle className="error-message">
        {errorValue}
      </InputErrorMessageStyle>
    )}
  </div>
);
