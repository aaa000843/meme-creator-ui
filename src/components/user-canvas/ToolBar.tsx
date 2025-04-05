import React from 'react';

import IconButton from '@/components/buttons/IconButton';
import { IconMap } from '@/components/icons/Icon';

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
    <div className='p-2 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center'>
        {/* Content Creation Group */}
        <div className='flex gap-1 pr-2 border-r border-gray-200'>
          <IconButton
            icon={IconMap['text']}
            title='Add Text'
            variant='outline'
            className='toolbar-btn text-blue-600 hover:bg-blue-50 active:bg-blue-100 border-blue-200'
            onClick={() => dispatch({ type: 'ADD_TEXT' })}
          />
          <IconButton
            icon={IconMap['shapes']}
            title='Add Shape'
            variant='outline'
            className='toolbar-btn text-purple-600 hover:bg-purple-50 active:bg-purple-100 border-purple-200'
            onClick={() => dispatch({ type: 'ADD_RECTANGLE' })}
          />
        </div>

        {/* Object Manipulation Group */}
        <div className='flex gap-1 px-2 border-r border-gray-200'>
          <IconButton
            icon={IconMap['delete']}
            title='Delete'
            variant='outline'
            className='toolbar-btn text-red-600 hover:bg-red-50 active:bg-red-100 border-red-200'
            onClick={handleDelete}
          />
          <IconButton
            icon={IconMap['move-back']}
            title='Send Backward'
            variant='outline'
            className='toolbar-btn text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 border-indigo-200'
            onClick={handleMoveToBack}
          />
          <IconButton
            icon={IconMap['push-front']}
            title='Bring Forward'
            variant='outline'
            className='toolbar-btn text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 border-indigo-200'
            onClick={handleMoveToFront}
          />
        </div>

        {/* Project Actions Group */}
        <div className='flex gap-1 pl-2'>
          <IconButton
            icon={IconMap['export']}
            title='Export'
            variant='outline'
            className='toolbar-btn text-green-600 hover:bg-green-50 active:bg-green-100 border-green-200'
            onClick={() => dispatch({ type: 'OPEN_EXPORT_MODAL' })}
          />
          <IconButton
            icon={IconMap['save']}
            title='Save'
            variant='outline'
            className='toolbar-btn text-amber-600 hover:bg-amber-50 active:bg-amber-100 border-amber-200'
            onClick={() => dispatch({ type: 'OPEN_SAVE_MODAL' })}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
