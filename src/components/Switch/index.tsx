import ReactSwitch from 'react-switch';
import { GrayLine, PrimaryColor } from 'assets/colors/palette';
import { Container } from './styles';

interface SwitchProps {
  name: string;
  state: [boolean, (updatedState: boolean) => void];
  onColor?: string;
  offColor?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  state: [value, setValue],
  onColor,
  offColor,
}) => (
  <Container checked={value} className="switch">
    <p>{name}</p>

    <ReactSwitch
      checked={value}
      checkedIcon={false}
      uncheckedIcon={false}
      onColor={onColor ?? PrimaryColor}
      offColor={offColor ?? GrayLine}
      onChange={checked => setValue(checked)}
      width={56}
      height={32}
    />
  </Container>
);
