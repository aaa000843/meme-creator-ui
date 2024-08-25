'use client';

import { FC, PropsWithChildren } from 'react';

import { AuthProvider } from '@/contexts/Auth.context';
import { CanvasProvider } from '@/contexts/Canvas.context';
import { ColorModeProvider } from '@/contexts/ColorModeContext';
import { PictureProvider } from '@/contexts/Picture.context';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <CanvasProvider>
        <PictureProvider>
          <ColorModeProvider>{children}</ColorModeProvider>
        </PictureProvider>
      </CanvasProvider>
    </AuthProvider>
  );
};
