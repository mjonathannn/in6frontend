import { IReactState } from './IReactState';

export interface ReactInputState {
  name: string;
  mainState: IReactState<string | File>;
  errorMessageState: IReactState<string>;
}
