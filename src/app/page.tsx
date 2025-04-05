'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import Dialog from '@/components/Dialog';
import FontGallery from '@/components/FontGallery';
import ImageUploadInput from '@/components/ImageUploadInput';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SaveConfirmationModal from '@/components/SaveConfirmationModal';
import Typo from '@/components/typography/Typo';
import ExportModal from '@/components/user-canvas/ExportModal';
import ImageGallery from '@/components/user-canvas/ImageGallery';
import PropertiesPanel from '@/components/user-canvas/PropertyPanel';
import Toolbar from '@/components/user-canvas/ToolBar';
import DesignCanvas from '@/components/user-canvas/UserCanvas';
import VectorGallery from '@/components/user-canvas/VectorGallery';

import { useCanvasContext } from '@/contexts/Canvas.context';

// !INITIAL_CONFIG -> Select !INITIAL_CONFIG and CMD + SHIFT + F
// Before you begin editing, follow all comments with `INITIAL_CONFIG`,
// to customize the default configuration.

export default function HomePage() {
  const { state, dispatch } = useCanvasContext();
  const [showImageGalleryDialog, setShowImageGalleryDialog] = React.useState<boolean>(false);
  const [showImageUploadDialog, setShowImageUploadDialog] = React.useState<boolean>(false);
  const [showVectorGalleryDialog, setShowVectorGalleryDialog] = React.useState<boolean>(false);

  const handleSave = () => {
    // Save logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-6">
        {/* Toolbar Section */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-2">
            <Toolbar />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="w-full lg:w-[240px] space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <h2 className="font-semibold text-lg text-gray-800 mb-2">Tools</h2>
                <Button 
                  onClick={() => setShowImageGalleryDialog(true)}
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white 
                    active:bg-blue-700 active:border-blue-700 transition-all duration-200"
                >
                  Image Gallery
                </Button>

                <Button 
                  onClick={() => setShowImageUploadDialog(true)}
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white 
                    active:bg-green-700 active:border-green-700 transition-all duration-200"
                >
                  Upload Image
                </Button>

                <Button 
                  onClick={() => setShowVectorGalleryDialog(true)}
                  className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white 
                    active:bg-purple-700 active:border-purple-700 transition-all duration-200"
                >
                  Vector Gallery
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Font Styles</h2>
                <FontGallery />
              </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg overflow-hidden">
                  <DesignCanvas />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[280px]">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Properties</h2>
                <PropertiesPanel />
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
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
          classes={{ modal: cn('max-w-4xl') }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Image Gallery</h2>
            <ImageGallery />
          </div>
        </Dialog>

        <Dialog
          isOpen={showVectorGalleryDialog}
          hasCloseBtn
          onClose={() => setShowVectorGalleryDialog(false)}
          classes={{ modal: cn('max-w-4xl') }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Vector Gallery</h2>
            <VectorGallery />
          </div>
        </Dialog>

        <Dialog
          isOpen={showImageUploadDialog}
          hasCloseBtn
          onClose={() => setShowImageUploadDialog(false)}
          classes={{ modal: cn('max-w-2xl') }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Upload Image</h2>
            <ImageUploadInput />
          </div>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
}
