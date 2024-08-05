'use client';

import { FC, PropsWithChildren } from 'react';

import { AuthProvider } from '@/contexts/Auth.context';
import { CanvasProvider } from '@/contexts/Canvas.context';
import { ColorModeProvider } from '@/contexts/ColorModeContext';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <CanvasProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
      </CanvasProvider>
    </AuthProvider>
  );
};
