import plusImg from 'assets/img/plus.svg';
import { PrimaryButton, SecondaryButton } from 'components/Buttons';
import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorStyle?: 'fill' | 'outline';
}

export const PlusButton: React.FC<PlusButtonProps> = ({
  colorStyle = 'fill',
  children,
  ...props
}) => {
  return (
    <Container isOutlineStyle={colorStyle === 'outline'}>
      {colorStyle === 'fill' ? (
        <PrimaryButton type="button" {...props}>
          <img src={plusImg} alt="Símbolo de adição" />
          <span>{children}</span>
        </PrimaryButton>
      ) : (
        <SecondaryButton type="button" {...props}>
          <img src={plusImg} alt="Símbolo de adição" />
          <span>{children}</span>
        </SecondaryButton>
      )}
    </Container>
  );
};
