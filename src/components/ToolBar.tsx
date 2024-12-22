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
    <div className='flex space-x-4 p-4 bg-gray-200'>
      {/* <Button onClick={() => dispatch({ type: 'ADD_TEXT' })}>Text</Button> */}
      <IconButton
        icon={IconMap['text']}
        title='Add Text'
        variant='outline'
        onClick={() => dispatch({ type: 'ADD_TEXT' })}
      />

      <IconButton
        icon={IconMap['shapes']}
        title='Add Rectangle'
        variant='outline'
        onClick={() => dispatch({ type: 'ADD_RECTANGLE' })}
      />
      <IconButton
        icon={IconMap['export']}
        title='Export'
        variant='outline'
        onClick={() => dispatch({ type: 'OPEN_EXPORT_MODAL' })}
      />
      <IconButton
        icon={IconMap['save']}
        title='Save'
        variant='outline'
        onClick={() => dispatch({ type: 'OPEN_SAVE_MODAL' })}
      />
      <IconButton
        icon={IconMap['delete']}
        title='Delete'
        variant='outline'
        onClick={handleDelete}
      />
      <IconButton
        icon={IconMap['move-back']}
        title='Move to Back'
        variant='outline'
        onClick={handleMoveToBack}
      />
      <IconButton
        icon={IconMap['push-front']}
        title='Move to Front'
        variant='outline'
        onClick={handleMoveToFront}
      />
    </div>
  );
};

export default Toolbar;
