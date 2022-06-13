import React, { createContext, useCallback, useContext, useState } from 'react';
import { ICompany } from 'types/company';

interface IStartupContext {
  startupData: ICompany;
  updateStartupState: (startup: ICompany) => void;
}

const startupContext = createContext<IStartupContext>({} as IStartupContext);

export const StartupContext: React.FC = ({ children }) => {
  const [startupData, setStartupData] = useState<ICompany>({} as ICompany);

  const updateStartupState = useCallback(
    (startup: ICompany) => setStartupData(startup),
    [],
  );

  return (
    <startupContext.Provider value={{ startupData, updateStartupState }}>
      {children}
    </startupContext.Provider>
  );
};

export const useStartup = (): IStartupContext => useContext(startupContext);
