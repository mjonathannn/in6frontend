import { ErrorDefaut, GrayLine, PrimaryColor } from 'assets/colors/palette';
import { TextareaHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import { ReactInputState } from 'types/reactInputState';
import { InputErrorMessageStyle, InputNameStyle } from '../styles';
import { TextArea, TextAreaDescription } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  states: ReactInputState;
  charactersLimitLength: number;
  descriptionText?: string;
}

export const TextAreaInput: React.FC<TextAreaProps> = ({
  name,
  states: {
    mainState: { setFunction: mainFunction, value: mainValue },
    errorMessageState: { setFunction: errorFunction, value: errorValue },
  },
  onChange,
  disabled,
  descriptionText,
  charactersLimitLength,
  style,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleResize = useCallback(() => {
    const { current } = textAreaRef;
    if (!current) return;

    current.style.setProperty('height', 'auto');
    current.style.setProperty('height', `${current.scrollHeight}px`);
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div>
      <InputNameStyle disabled={disabled}>{name}</InputNameStyle>
      <TextArea
        ref={textAreaRef}
        borderColor={errorValue ? ErrorDefaut : GrayLine}
        hoverAndFocusColor={errorValue ? ErrorDefaut : PrimaryColor}
        autoComplete="off"
        onInput={handleResize}
        onChange={event => {
          if (onChange) onChange(event);
          else mainFunction(event.target.value);

          if (errorValue) errorFunction('');
        }}
        value={mainValue as string}
        disabled={disabled}
        maxLength={charactersLimitLength}
        style={style}
        {...props}
      />
      <TextAreaDescription style={{ width: style?.width ?? 400 }}>
        <span className="input-description">{descriptionText}</span>
        <span className="characters-counter">{`${
          (mainValue as string).length
        } / ${charactersLimitLength}`}</span>
      </TextAreaDescription>
      <InputErrorMessageStyle className="error-message">
        {errorValue}
      </InputErrorMessageStyle>
    </div>
  );
};
