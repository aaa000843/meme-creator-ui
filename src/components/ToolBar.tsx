import React from 'react';

import logger from '@/lib/logger';

import { useCanvasContext } from '@/contexts/Canvas.context';

const Toolbar: React.FC = () => {
  const { state, dispatch } = useCanvasContext();

  const handleDelete = () => {
    const activeObject = state.canvas?.getActiveObject();
    if (activeObject) {
      state.canvas?.remove(activeObject);
      state.canvas?.discardActiveObject();
      state.canvas?.renderAll();
    }
  };
  const handleMoveToBack = () => {
    const activeObject = state.canvas?.getActiveObject();
    if (activeObject) {
      state.canvas?.sendObjectToBack(activeObject);
      state.canvas?.renderAll();
    }
  };

  const handleMoveToFront = () => {
    const activeObject = state.canvas?.getActiveObject();
    if (activeObject) {
      state.canvas?.bringObjectToFront(activeObject);
      state.canvas?.renderAll();
    }
  };

  return (
    <div className='flex space-x-4 p-4 bg-gray-200'>
      <button
        onClick={() => {
          dispatch({ type: 'ADD_TEXT' });
          logger({ dispatch: 1 }, 'ToolBar.tsx line 20');
        }}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Text
      </button>
      <button
        onClick={() => dispatch({ type: 'ADD_RECTANGLE' })}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Rect
      </button>
      <button
        onClick={() => dispatch({ type: 'UNDO' })}
        className='bg-gray-500 text-white px-4 py-2 rounded'
      >
        Undo
      </button>
      <button
        onClick={() => dispatch({ type: 'REDO' })}
        className='bg-gray-500 text-white px-4 py-2 rounded'
      >
        Redo
      </button>

      <button
        className='px-4 py-2 bg-blue-600 text-white rounded'
        onClick={() => dispatch({ type: 'OPEN_EXPORT_MODAL' })}
      >
        Export
      </button>
      <button
        className='px-4 py-2 bg-green-600 text-white rounded'
        onClick={() => dispatch({ type: 'OPEN_SAVE_MODAL' })}
      >
        Save
      </button>
      <button
        className='px-4 py-2 bg-red-600 text-white'
        onClick={handleDelete}
      >
        Delete
      </button>

      <button
        className='px-4 py-2 bg-gray-600 text-white'
        onClick={handleMoveToBack}
      >
        Move Back
      </button>
      <button
        className='px-4 py-2 bg-gray-800 text-white'
        onClick={handleMoveToFront}
      >
        Push Front
      </button>
    </div>
  );
};

export default Toolbar;
