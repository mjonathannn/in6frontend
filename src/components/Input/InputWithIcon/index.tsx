import { ErrorDefaut, GrayLine, PrimaryColor } from 'assets/colors/palette';
import { InputHTMLAttributes, useRef } from 'react';
import { mask } from 'remask';
import { ReactInputState } from 'types/reactInputState';
import { InputErrorMessageStyle, InputNameStyle } from '../styles';
import { Container, InputContainer } from './styles';

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  states: ReactInputState;
  icon: string;
  notHaveError?: boolean;
  valuePattern?: string[];
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  name,
  icon,
  states: {
    mainState: { setFunction: mainFunction, value: mainValue },
    errorMessageState: { setFunction: errorFunction, value: errorValue },
  },
  style,
  disabled,
  onChange,
  valuePattern,
  notHaveError,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder } = props;
  const isFileType = typeof mainValue !== 'string';

  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    else {
      mainFunction(() => {
        const { target } = event;
        if (typeof mainValue === 'string') {
          const { value } = target;
          return valuePattern ? mask(value, valuePattern) : value;
        }

        const { files } = target;
        if (files && files[0].type === props.accept) return files[0];

        return {} as File;
      });
    }

    if (errorValue) errorFunction('');
  };

  return (
    <div>
      <InputNameStyle disabled={disabled}>{name}</InputNameStyle>

      <Container
        disabled={disabled}
        isFileInput={isFileType}
        borderColor={errorValue ? ErrorDefaut : GrayLine}
        hoverAndFocusColor={errorValue ? ErrorDefaut : PrimaryColor}
        style={style}
        onClick={() => {
          const inputCurrent = inputRef.current;
          if (inputCurrent) {
            if (isFileType) inputCurrent.click();
            else inputCurrent.focus();
          }
        }}
      >
        <img src={icon} alt="" />
        <InputContainer
          ref={inputRef}
          autoComplete="off"
          onChange={event => handleOnChangeEvent(event)}
          value={typeof mainValue === 'string' ? mainValue : ''}
          disabled={disabled}
          {...props}
        />
        {isFileType && (
          <p className="placeholder">
            {(mainValue as File).name ? 'currículo anexado' : placeholder}
          </p>
        )}
      </Container>

      {!notHaveError && (
        <InputErrorMessageStyle id="error-message">
          {errorValue}
        </InputErrorMessageStyle>
      )}
    </div>
  );
};
