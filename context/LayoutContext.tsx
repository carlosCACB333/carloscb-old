import { useCallback } from "react";
import { createContext, FC, PropsWithChildren, useState } from "react";

interface LayoutContextProps {
  Sidebar?: React.ReactNode;
  Rightbar?: React.ReactNode;
  setLayouts: (SideMeu?: React.ReactNode, Rightbar?: React.ReactNode) => void;
}

export interface LayoutState {
  Sidebar?: React.ReactNode;
  Rightbar?: React.ReactNode;
}

export const LayoutContext = createContext<LayoutContextProps>(
  {} as LayoutContextProps
);

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<LayoutState>({});

  const setLayouts = useCallback(
    (SideMeu?: React.ReactNode, Rightbar?: React.ReactNode) => {
      setState({ Sidebar: SideMeu, Rightbar });
    },
    []
  );

  return (
    <LayoutContext.Provider value={{ ...state, setLayouts }}>
      {children}
    </LayoutContext.Provider>
  );
};
