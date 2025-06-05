import { createContext, useContext } from 'react';

export interface GlobalStateProps {
  name?: string;
  [key: string]: any;
}

export interface InitialStateContextProps {
  globalState: GlobalStateProps;
  setGlobalState: (state: GlobalStateProps) => void;
}

export const InitialStateContext = createContext<InitialStateContextProps>({
  globalState: {},
  setGlobalState: () => {},
});

export const useInitialState = () => useContext(InitialStateContext);
