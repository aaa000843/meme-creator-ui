import React from 'react';

import { useCanvasContext } from '@/contexts/Canvas.context';

const HistoryPanel: React.FC = () => {
  const { state, dispatch } = useCanvasContext();

  const handleUndo = () => {
    // state.canvas?.undo();
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    // state.canvas?.redo();
    dispatch({ type: 'REDO' });
  };

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>History</h2>
      <div className='mb-4 flex flex-col gap-1'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleUndo}
          disabled={!state.history.canUndo}
        >
          Undo
        </button>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleRedo}
          disabled={!state.history.canRedo}
        >
          Redo
        </button>
      </div>
      <ul className='flex flex-col gap-y-1'>
        {state.history.actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
