import * as fabric from 'fabric';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface CanvasState {
  canvas: fabric.Canvas | null;
  history: {
    actions: string[];
    canUndo: boolean;
    canRedo: boolean;
  };
  isExportModalOpen: boolean;
  isSaveModalOpen: boolean;
}

const initialState: CanvasState = {
  canvas: null as fabric.Canvas | null,
  history: {
    actions: [] as string[],
    canUndo: false,
    canRedo: false,
  },
  isExportModalOpen: false,
  isSaveModalOpen: false,
};

type Action =
  | { type: 'SET_CANVAS'; canvas: fabric.Canvas }
  | { type: 'ADD_TEXT' }
  | { type: 'ADD_RECTANGLE' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'OPEN_EXPORT_MODAL' }
  | { type: 'CLOSE_EXPORT_MODAL' }
  | { type: 'OPEN_SAVE_MODAL' }
  | { type: 'CLOSE_SAVE_MODAL' };

const CanvasContext = createContext<{
  state: CanvasState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const canvasReducer = (state: CanvasState, action: Action): CanvasState => {
  switch (action.type) {
    case 'SET_CANVAS':
      return { ...state, canvas: action.canvas };
    case 'ADD_TEXT':
      if (state.canvas) {
        const text = new fabric.IText('New Text', {
          left: 50,
          top: 50,
          fontSize: 20,
          fill: 'black',
        });
        state.canvas.add(text);
      }
      return {
        ...state,
        history: {
          ...state.history,
          actions: [...state.history.actions, action.type],
          canUndo: true,
        },
      };
    case 'ADD_RECTANGLE':
      if (state.canvas) {
        const rect = new fabric.Rect({
          left: 50,
          top: 50,
          fill: 'blue',
          width: 100,
          height: 100,
        });
        state.canvas.add(rect);
      }
      return {
        ...state,
        history: {
          ...state.history,
          actions: [...state.history.actions, action.type],
          canUndo: true,
        },
      };
    case 'UNDO':
      return {
        ...state,
        history: {
          ...state.history,
          canUndo: false,
          canRedo: true,
        },
      };
    case 'REDO':
      return {
        ...state,
        history: {
          ...state.history,
          canUndo: true,
          canRedo: false,
        },
      };
    case 'OPEN_EXPORT_MODAL':
      return { ...state, isExportModalOpen: true };
    case 'CLOSE_EXPORT_MODAL':
      return { ...state, isExportModalOpen: false };
    case 'OPEN_SAVE_MODAL':
      return { ...state, isSaveModalOpen: true };
    case 'CLOSE_SAVE_MODAL':
      return { ...state, isSaveModalOpen: false };
    default:
      return state;
  }
};

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);
  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
