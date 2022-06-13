import {
  InputNameStyle,
  InputStyle,
  InputErrorMessageStyle,
} from 'components/Input/styles';
import {
  ErrorDefaut,
  GrayBackground,
  GrayLine,
  PrimaryColor,
} from 'assets/colors/palette';
import Select, { OptionTypeBase, StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import { mask, unMask } from 'remask';
import { Loader } from 'components/Loader';
import { cnpjIsValid, phoneIsValid } from 'utils/validation';

import { stateOptions } from 'utils/typeOptions';
import { findAllCitiesByState } from 'services/cityServices';
import { PrimaryButton, SecondaryButton } from 'components/Buttons';

import { ICompany } from 'types/company';
import { findAllBusinessSector } from 'services/businessSectorServices';
import { updateCompany } from 'services/companyServices';
import { Footer } from 'components/Footer';
import {
  MainContainer,
  SubContainer,
  FormContainer,
  Title,
  TextArea,
} from './styles';

interface MyCompanyPageProps {
  companyData: ICompany;
  cancel: () => void;
}

export const MyCompanyPage: React.FC<MyCompanyPageProps> = ({
  companyData,
  cancel,
}) => {
  const [name, setName] = useState(companyData.name);
  const [cnpj, setCnpj] = useState(companyData.cnpj);
  const [sector, setSector] = useState(companyData.businessSectorDTO.id);
  const [state, setState] = useState(companyData.cityDTO.stateDTO.id);
  const [city, setCity] = useState(companyData.cityDTO.id);
  const [phone, setPhone] = useState(companyData.phone);
  const [about, setAbout] = useState(companyData.about);

  const [nameInputBorderColor, setNameInputBorderColor] = useState(GrayLine);
  const [cnpjInputBorderColor, setCnpjInputBorderColor] = useState(GrayLine);
  const [cityInputBorderColor, setCityInputBorderColor] = useState(GrayLine);
  const [sectorInputBorderColor, setSectorInputBorderColor] =
    useState(GrayLine);
  const [stateInputBorderColor, setStateInputBorderColor] = useState(GrayLine);
  const [phoneInputBorderColor, setPhoneInputBorderColor] = useState(GrayLine);
  const [aboutInputBorderColor, setAboutInputBorderColor] = useState(GrayLine);

  const [nameInputHoverColor, setNameInputHoverColor] = useState(PrimaryColor);
  const [cnpjInputHoverColor, setCnpjInputHoverColor] = useState(PrimaryColor);
  const [sectorInputHoverColor, setSectorInputHoverColor] =
    useState(PrimaryColor);
  const [stateInputHoverColor, setStateInputHoverColor] =
    useState(PrimaryColor);
  const [cityInputHoverColor, setCityInputHoverColor] = useState(PrimaryColor);
  const [phoneInputHoverColor, setPhoneInputHoverColor] =
    useState(PrimaryColor);
  const [aboutInputHoverColor, setAboutInputHoverColor] =
    useState(PrimaryColor);

  const [nameErrorLabelVisible, setNameErrorLabelVisible] = useState(false);
  const [cnpjErrorLabelVisible, setCnpjErrorLabelVisible] = useState(false);
  const [sectorErrorLabelVisible, setSectorErrorLabelVisible] = useState(false);
  const [stateErrorLabelVisible, setStateErrorLabelVisible] = useState(false);
  const [cityErrorLabelVisible, setCityErrorLabelVisible] = useState(false);
  const [aboutErrorLabelVisible, setAboutErrorLabelVisible] = useState(false);
  const [phoneErrorLabelVisible, setPhoneErrorLabelVisible] = useState(false);

  const [nameErrorLabelText, setNameErrorLabelText] = useState('');
  const [cnpjErrorLabelText, setCnpjErrorLabelText] = useState('');
  const [sectorErrorLabelText, setSectorErrorLabelText] = useState('');
  const [stateErrorLabelText, setStateErrorLabelText] = useState('');
  const [cityErrorLabelText, setCityErrorLabelText] = useState('');
  const [phoneErrorLabelText, setPhoneErrorLabelText] = useState('');
  const [aboutErrorLabelText, setAboutErrorLabelText] = useState('');

  const [citiesList, setCitiesList] = useState<OptionTypeBase[]>([]);
  const [sectorsList, setSectorsList] = useState<OptionTypeBase[]>([]);

  const [cityInputDisabled, setCityInputDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const stateColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: styles => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${stateInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${stateInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };
  const cityColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: (styles, { isDisabled }) => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${cityInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${cityInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: isDisabled ? '#f2f2f2' : GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };
  const sectorColourStyles: StylesConfig<OptionTypeBase, false> = {
    control: styles => ({
      ...styles,
      width: 400,
      height: 40,
      borderRadius: 8,
      boxShadow: 'none',
      border: `solid 1px ${sectorInputBorderColor}`,
      '&:hover': {
        border: `solid 2px ${sectorInputHoverColor}`,
      },
      letterSpacing: 0.75,
      fontSize: 14,
      backgroundColor: GrayBackground,
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? '#ffb685' : undefined,
    }),
  };

  const allInputsIsFilled = () => {
    return (
      name.length &&
      cnpjIsValid(cnpj) &&
      sector !== 0 &&
      state !== 0 &&
      city !== 0 &&
      phoneIsValid(phone) &&
      about.length
    );
  };

  const handleOnClickSalvar = async () => {
    if (allInputsIsFilled()) {
      const status = await updateCompany({
        id: companyData.id,
        name,
        cnpj,
        email: localStorage.getItem('email') ?? '',
        phone,
        about,
        desktopNotifications: companyData.desktopNotifications,
        emailNotifications: companyData.emailNotifications,
        whatsappNotifications: companyData.whatsappNotifications,
        businessSectorDTO: {
          id: sector,
        },
        cityDTO: {
          id: city,
          stateDTO: {
            id: state,
          },
        },
      });

      if (status === 200) {
        alert('Dados atualizados com sucesso!');
        window.location.reload();
      }
    } else {
      if (!name.length) {
        setNameErrorLabelVisible(true);
        setNameErrorLabelText('Campo obrigatório');
        setNameInputBorderColor(ErrorDefaut);
        setNameInputHoverColor(ErrorDefaut);
      }
      if (!cnpj.length) {
        setCnpjErrorLabelVisible(true);
        setCnpjErrorLabelText('Campo obrigatório');
        setCnpjInputBorderColor(ErrorDefaut);
        setCnpjInputHoverColor(ErrorDefaut);
      } else if (!cnpjIsValid(cnpj)) {
        setCnpjErrorLabelText('Insira um CPNJ válido');
        setCnpjErrorLabelVisible(true);
        setCnpjInputBorderColor(ErrorDefaut);
        setCnpjInputHoverColor(ErrorDefaut);
      }
      if (sector === 0) {
        setSectorErrorLabelVisible(true);
        setSectorErrorLabelText('Campo obrigatório');
        setSectorInputBorderColor(ErrorDefaut);
        setSectorInputHoverColor(ErrorDefaut);
      }
      if (state === 0) {
        setStateErrorLabelVisible(true);
        setStateErrorLabelText('Campo obrigatório');
        setStateInputBorderColor(ErrorDefaut);
        setStateInputHoverColor(ErrorDefaut);
      }
      if (city === 0) {
        setCityErrorLabelVisible(true);
        setCityErrorLabelText('Campo obrigatório');
        setCityInputBorderColor(ErrorDefaut);
        setCityInputHoverColor(ErrorDefaut);
      }
      if (!phone.length) {
        setPhoneErrorLabelVisible(true);
        setPhoneErrorLabelText('Campo obrigatório');
        setPhoneInputBorderColor(ErrorDefaut);
        setPhoneInputHoverColor(ErrorDefaut);
      } else if (!phoneIsValid(phone)) {
        setPhoneErrorLabelVisible(true);
        setPhoneErrorLabelText('Insira um número válido');
        setPhoneInputBorderColor(ErrorDefaut);
        setPhoneInputHoverColor(ErrorDefaut);
      }
      if (!about.length) {
        setAboutErrorLabelVisible(true);
        setAboutErrorLabelText('Campo obrigatório');
        setAboutInputBorderColor(ErrorDefaut);
        setAboutInputHoverColor(ErrorDefaut);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const sectors = await findAllBusinessSector();

      setSectorsList(
        sectors.map(({ id, sector: label }) => ({
          id,
          label,
        })),
      );
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <MainContainer>
          <SubContainer>
            <FormContainer>
              <Title>Identificação da empresa</Title>
              <InputNameStyle>Nome da empresa</InputNameStyle>
              <InputStyle
                borderColor={nameInputBorderColor}
                hoverAndFocusColor={nameInputHoverColor}
                placeholder="Inserir nome da empresa"
                autoComplete="off"
                value={name}
                autoFocus
                onChange={ev => {
                  setName(ev.target.value);
                  setNameErrorLabelVisible(false);
                  setNameInputBorderColor(GrayLine);
                  setNameInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {nameErrorLabelVisible && nameErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Número do CNPJ</InputNameStyle>
              <InputStyle
                borderColor={cnpjInputBorderColor}
                hoverAndFocusColor={cnpjInputHoverColor}
                placeholder="Ex: 99.999.999/9999-99"
                autoComplete="off"
                value={cnpj}
                onChange={ev => {
                  const originalValue = unMask(ev.target.value);
                  const maskedValue = mask(originalValue, [
                    '99.999.999/9999-99',
                  ]);

                  setCnpj(maskedValue);
                  setCnpjErrorLabelVisible(false);
                  setCnpjInputBorderColor(GrayLine);
                  setCnpjInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {cnpjErrorLabelVisible && cnpjErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Sector de atuação</InputNameStyle>
              <Select
                styles={sectorColourStyles}
                options={sectorsList}
                placeholder="Selecionar setor de atuação"
                defaultValue={{
                  id: sector,
                  label: companyData.businessSectorDTO.sector,
                }}
                onChange={ev => {
                  setSector(ev?.id);
                  setSectorErrorLabelVisible(false);
                  setSectorInputBorderColor(GrayLine);
                  setSectorInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {sectorErrorLabelVisible && sectorErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Estado</InputNameStyle>
              <Select
                styles={stateColourStyles}
                options={stateOptions}
                placeholder="Inserir estado"
                onFocus={() => setCity(0)}
                defaultValue={{
                  id: state,
                  label: companyData.cityDTO.stateDTO.name,
                }}
                onChange={async ev => {
                  setState(ev?.id);
                  setStateErrorLabelVisible(false);
                  setStateInputBorderColor(GrayLine);
                  setStateInputHoverColor(PrimaryColor);

                  const cities = await findAllCitiesByState(ev?.id);

                  setCitiesList(
                    cities.map(({ id, name: label }) => ({ id, label })),
                  );
                  setCityInputDisabled(false);
                }}
              />
              <InputErrorMessageStyle>
                {stateErrorLabelVisible && stateErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Cidade</InputNameStyle>
              <Select
                styles={cityColourStyles}
                options={citiesList}
                placeholder="Inserir cidade"
                isDisabled={cityInputDisabled}
                defaultValue={{
                  id: city,
                  label: companyData.cityDTO.name,
                }}
                onChange={ev => {
                  setCity(ev?.id);
                  setCityErrorLabelVisible(false);
                  setCityInputBorderColor(GrayLine);
                  setCityInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {cityErrorLabelVisible && cityErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Telefone</InputNameStyle>
              <InputStyle
                borderColor={phoneInputBorderColor}
                hoverAndFocusColor={phoneInputHoverColor}
                placeholder="Ex: 88 9 9999-9999"
                autoComplete="off"
                value={phone}
                onChange={ev => {
                  const originalValue = unMask(ev.target.value);
                  const maskedValue = mask(originalValue, ['(99) 9 9999-9999']);

                  setPhone(maskedValue);
                  setPhoneErrorLabelVisible(false);
                  setPhoneInputBorderColor(GrayLine);
                  setPhoneInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {phoneErrorLabelVisible && phoneErrorLabelText}
              </InputErrorMessageStyle>
              <InputNameStyle>Sobre sua empresa</InputNameStyle>
              <TextArea
                borderColor={aboutInputBorderColor}
                hoverAndFocusColor={aboutInputHoverColor}
                placeholder="Escreva um pouco sobre sua empresa"
                autoComplete="off"
                value={about}
                onChange={ev => {
                  setAbout(ev.target.value);
                  setAboutErrorLabelVisible(false);
                  setAboutInputBorderColor(GrayLine);
                  setAboutInputHoverColor(PrimaryColor);
                }}
              />
              <InputErrorMessageStyle>
                {aboutErrorLabelVisible && aboutErrorLabelText}
              </InputErrorMessageStyle>

              <SecondaryButton
                type="button"
                className="buttonCancelar"
                onClick={cancel}
              >
                Cancelar
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                className="buttonSalvar"
                onClick={handleOnClickSalvar}
              >
                Salvar alterações
              </PrimaryButton>
            </FormContainer>
          </SubContainer>

          <Footer />
        </MainContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
