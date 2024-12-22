'use client';

import { FC, PropsWithChildren } from 'react';

import { AuthProvider } from '@/contexts/Auth.context';
import { CanvasProvider } from '@/contexts/Canvas.context';
import { ColorModeProvider } from '@/contexts/ColorModeContext';
import { PictureProvider } from '@/contexts/Picture.context';
import { TagProvider } from '@/contexts/Tag.context';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <CanvasProvider>
        <TagProvider>
          <PictureProvider>
            <ColorModeProvider>{children}</ColorModeProvider>
          </PictureProvider>
        </TagProvider>
      </CanvasProvider>
    </AuthProvider>
  );
};
