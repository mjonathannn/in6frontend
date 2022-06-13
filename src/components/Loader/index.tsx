import { HTMLAttributes } from 'react';
import { MainContainer, LoaderComponent } from './styles';

type LoaderProps = HTMLAttributes<HTMLDivElement>;

export const Loader: React.FC<LoaderProps> = props => {
  return (
    <MainContainer {...props}>
      <LoaderComponent />
    </MainContainer>
  );
};
