'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useMedia } from 'react-use';

type MatchMediaBreakpoint = 'isXs' | 'isSm' | 'isMd' | 'isLg' | 'isXl' | 'is2Xl';
type MatchMediaContext = Record<MatchMediaBreakpoint, boolean>;

const MatchMediaContext = createContext<MatchMediaContext>({
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false,
  is2Xl: false
});

export const MatchMediaContextProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const isSm = useMedia('(min-width: 640px)', true);
  const isMd = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const isXl = useMedia('(min-width: 1280px)', false);
  const is2Xl = useMedia('(min-width: 1536px)', false);
  const isXs = !isSm;

  return (
    <MatchMediaContext.Provider
      value={{
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        is2Xl
      }}
    >
      {children}
    </MatchMediaContext.Provider>
  );
};

export const useMatchMediaContext = (): MatchMediaContext => useContext(MatchMediaContext);
