import React from 'react';

type SaveConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded shadow-md'>
        <h2 className='text-lg font-bold mb-4'>Save Design</h2>
        <p>Are you sure you want to save the current design?</p>
        <div className='flex justify-end mt-4'>
          <button className='mr-2 px-4 py-2 bg-gray-200' onClick={onClose}>
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-blue-600 text-white'
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmationModal;
