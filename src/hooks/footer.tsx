import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';

interface IFooterContext {
  // Information that footer will receive when the contents of the page change,
  // in order to update it's position and fit the updated content.
  footerUpdateData: unknown;
  changeFooterUpdateData: (updateData: unknown) => void;
  alternativeFooterComponent: ReactElement | null;
  updateAlternativeFooterComponent: (
    footerComponent: ReactElement | null,
  ) => void;
  isFooterVisible: boolean;
  updateIsFooterVisible: (isFooterVisible: boolean) => void;
}

const footerContext = createContext<IFooterContext>({} as IFooterContext);

export const FooterContext: React.FC = ({ children }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [alternativeFooterComponent, setAlternativeFooterComponent] =
    useState<ReactElement | null>(null);
  const [footerUpdateData, setFooterUpdateData] = useState<unknown>(null);

  const updateAlternativeFooterComponent = useCallback(
    (footerComponent: ReactElement | null) =>
      setAlternativeFooterComponent(footerComponent),
    [],
  );

  const updateIsFooterVisible = useCallback(
    (updatedIsFooterVisible: boolean) =>
      setIsFooterVisible(updatedIsFooterVisible),
    [],
  );

  const changeFooterUpdateData = useCallback(
    (updateData: unknown) => setFooterUpdateData(updateData),
    [],
  );

  return (
    <footerContext.Provider
      value={{
        footerUpdateData,
        changeFooterUpdateData,
        alternativeFooterComponent,
        updateAlternativeFooterComponent,
        isFooterVisible,
        updateIsFooterVisible,
      }}
    >
      {children}
    </footerContext.Provider>
  );
};

export const useFooter = (): IFooterContext => useContext(footerContext);
