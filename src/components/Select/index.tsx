import {
  BackgroundColor,
  ErrorDefaut,
  GrayLine,
  HighEmphasis,
  LowOrange,
  MediumEmphasis,
  OutlineColor,
  PrimaryColor,
} from 'assets/colors/palette';
import { SelectHTMLAttributes, useEffect } from 'react';
import ReactSelect, { OptionTypeBase, StylesConfig } from 'react-select';
import { ReactInputState } from 'types/reactInputState';
import {
  InputErrorMessageStyle,
  InputNameStyle,
} from 'components/Input/styles';
import { Depth8 } from 'assets/colors/boxShadows';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  states: ReactInputState;
  selectOptions: OptionTypeBase[];
  onChange?: () => void;
  loadingIndicatorDisabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  states: {
    mainState: { setFunction: mainFunction, value: mainValue },
    errorMessageState: { setFunction: errorFunction, value: errorValue },
  },
  selectOptions,
  onChange,
  placeholder,
  disabled,
  loadingIndicatorDisabled,
  style: receivedStyles,
}) => {
  const borderColor = errorValue ? ErrorDefaut : GrayLine;
  const hoverAndFocusColor = errorValue ? ErrorDefaut : PrimaryColor;

  const selectColorStyles: StylesConfig<OptionTypeBase, false> = {
    menuList: styles => ({
      ...styles,
      '::-webkit-scrollbar': {
        width: 4,
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: MediumEmphasis,
        borderRadius: 100,
      },
      boxShadow: Depth8,
      borderRadius: 8,
    }),
    control: ({ isDisabled, ...styles }) => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${borderColor}`,
      '&:hover': {
        border: `solid 2px ${hoverAndFocusColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: isDisabled ? '#f2f2f2' : BackgroundColor,
      ...receivedStyles,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: HighEmphasis,
      backgroundColor: isFocused ? OutlineColor : undefined,
      '&:active': {
        background: LowOrange,
      },
    }),
  };

  useEffect(() => {
    if (selectOptions.length && !mainValue) mainFunction(selectOptions[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainFunction, selectOptions]);

  return (
    <div style={{ maxWidth: receivedStyles?.width ?? 400 }}>
      <InputNameStyle disabled={disabled}>{name}</InputNameStyle>

      <ReactSelect
        components={loadingIndicatorDisabled ? { LoadingIndicator: null } : {}}
        value={selectOptions.find(option => option.id === Number(mainValue))}
        styles={selectColorStyles}
        options={selectOptions}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={disabled}
        onChange={async event => {
          mainFunction(event?.id.toString());

          if (onChange) onChange();
          if (errorValue) errorFunction('');
        }}
      />

      <InputErrorMessageStyle id="error-message">
        {errorValue}
      </InputErrorMessageStyle>
    </div>
  );
};
