'use client';

import Head from 'next/head';
import * as React from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import Dialog from '@/components/Dialog';
import ExportModal from '@/components/ExportModal';
import FontGallery from '@/components/FontGallery';
import ImageGallery from '@/components/ImageGallery';
import ImageUploadInput from '@/components/ImageUploadInput';
import Header from '@/components/layout/Header';
import PropertiesPanel from '@/components/PropertyPanel';
import SaveConfirmationModal from '@/components/SaveConfirmationModal';
import Toolbar from '@/components/ToolBar';
import Typo from '@/components/typography/Typo';
import DesignCanvas from '@/components/UserCanvas';

import { useCanvasContext } from '@/contexts/Canvas.context';

// !INITIAL_CONFIG -> Select !INITIAL_CONFIG and CMD + SHIFT + F
// Before you begin editing, follow all comments with `INITIAL_CONFIG`,
// to customize the default configuration.

export default function HomePage() {
  const { state, dispatch } = useCanvasContext();
  const [showImageGalleryDialog, setShowImageGalleryDialog] =
    React.useState<boolean>(false);

  const [showImageUploadDialog, setShowImageUploadDialog] =
    React.useState<boolean>(false);

  const handleSave = () => {
    // Save logic here
  };

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <Header />
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='flex-grow container mx-auto p-4 flex'>
            <div className='w-[140px]'>
              <div className='flex-col'>
                <Button onClick={() => setShowImageGalleryDialog(true)}>
                  Show Gallery
                </Button>

                <Button onClick={() => setShowImageUploadDialog(true)}>
                  Upload Image
                </Button>
                <FontGallery />
                {/* <HistoryPanel /> */}
              </div>
            </div>

            <div className='flex-col'>
              <div className='overflow-x-scroll'>
                <Toolbar />
              </div>

              <DesignCanvas />
            </div>

            <div className='w-[240px]'>
              <PropertiesPanel />
            </div>
          </div>

          <ExportModal
            isOpen={state.isExportModalOpen}
            onClose={() => dispatch({ type: 'CLOSE_EXPORT_MODAL' })}
          />
          <SaveConfirmationModal
            isOpen={state.isSaveModalOpen}
            onClose={() => dispatch({ type: 'CLOSE_SAVE_MODAL' })}
            onSave={handleSave}
          />
          <Dialog
            isOpen={showImageGalleryDialog}
            hasCloseBtn
            onClose={() => setShowImageGalleryDialog(false)}
            classes={{ modal: cn('') }}
          >
            <div className='p-2'>
              <Typo>Image gallery</Typo>
            </div>
            <div className='p-2'>
              <ImageGallery />
            </div>
          </Dialog>

          <Dialog
            isOpen={showImageUploadDialog}
            hasCloseBtn
            onClose={() => setShowImageUploadDialog(false)}
            classes={{ modal: cn('') }}
          >
            <div className='p-2'>
              <Typo>Upload Image</Typo>
            </div>
            <div className='p-2'>
              <ImageUploadInput />
            </div>
          </Dialog>

          <footer className='absolute bottom-2 text-gray-700'></footer>
        </div>
      </section>
    </main>
  );
}
