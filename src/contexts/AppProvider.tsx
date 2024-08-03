'use client';

import { FC, PropsWithChildren } from 'react';

import { CanvasProvider } from '@/contexts/Canvas.context';
import { ColorModeProvider } from '@/contexts/ColorModeContext';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CanvasProvider>
      <ColorModeProvider>{children}</ColorModeProvider>
    </CanvasProvider>
  );
};
