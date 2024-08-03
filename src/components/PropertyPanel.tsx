import * as fabric from 'fabric';
import React, { useEffect, useState } from 'react';

import { useCanvasContext } from '@/contexts/Canvas.context';

const PropertiesPanel: React.FC = () => {
  const { state } = useCanvasContext();
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null,
  );

  useEffect(() => {
    const canvas = state.canvas;
    if (!canvas) return;

    const updateSelectedObject = () => {
      const activeObject = canvas.getActiveObject();
      setSelectedObject(activeObject ?? null);
    };

    canvas.on('selection:created', updateSelectedObject);
    canvas.on('selection:updated', updateSelectedObject);
    canvas.on('selection:cleared', () => setSelectedObject(null));

    return () => {
      canvas.off('selection:created', updateSelectedObject);
      canvas.off('selection:updated', updateSelectedObject);
      canvas.off('selection:cleared', () => setSelectedObject(null));
    };
  }, [state.canvas]);

  if (!selectedObject) {
    return <div className='p-4'>No object selected</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (property: string, value: any) => {
    if (!selectedObject) return;
    selectedObject.set(property, value);
    state.canvas?.renderAll();
  };

  const isText = selectedObject instanceof fabric.Text;

  return (
    <div className='p-4 bg-gray-100 border-l'>
      <h2 className='text-lg font-bold mb-4'>Properties</h2>

      {/* Common Properties */}
      <div className='mb-4'>
        <h3 className='font-semibold'>Position</h3>
        <div>
          <label>Left:</label>
          <input
            type='number'
            value={selectedObject.left ?? 0}
            onChange={(e) => handleChange('left', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Top:</label>
          <input
            type='number'
            value={selectedObject.top ?? 0}
            onChange={(e) => handleChange('top', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='font-semibold'>Size</h3>
        <div>
          <label>Width:</label>
          <input
            type='number'
            value={selectedObject.width ?? 0}
            onChange={(e) => handleChange('width', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type='number'
            value={selectedObject.height ?? 0}
            onChange={(e) => handleChange('height', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='font-semibold'>Rotation</h3>
        <div>
          <label>Angle:</label>
          <input
            type='number'
            value={selectedObject.angle ?? 0}
            onChange={(e) => handleChange('angle', parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Text Properties */}
      {isText && (
        <>
          <div className='mb-4'>
            <h3 className='font-semibold'>Font</h3>
            <div>
              <label>Font Family:</label>
              <input
                type='text'
                value={(selectedObject as fabric.Text).fontFamily ?? ''}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
              />
            </div>
            <div>
              <label>Font Size:</label>
              <input
                type='number'
                value={(selectedObject as fabric.Text).fontSize ?? 0}
                onChange={(e) =>
                  handleChange('fontSize', parseFloat(e.target.value))
                }
              />
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold'>Text Style</h3>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={
                    (selectedObject as fabric.Text).fontWeight === 'bold'
                  }
                  onChange={(e) =>
                    handleChange(
                      'fontWeight',
                      e.target.checked ? 'bold' : 'normal',
                    )
                  }
                />
                Bold
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={
                    (selectedObject as fabric.Text).fontStyle === 'italic'
                  }
                  onChange={(e) =>
                    handleChange(
                      'fontStyle',
                      e.target.checked ? 'italic' : 'normal',
                    )
                  }
                />
                Italic
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={(selectedObject as fabric.Text).underline}
                  onChange={(e) => handleChange('underline', e.target.checked)}
                />
                Underline
              </label>
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold'>Color</h3>
            <div>
              <label>Text Color:</label>
              <input
                type='color'
                value={(selectedObject as fabric.Text).fill as string}
                onChange={(e) => handleChange('fill', e.target.value)}
              />
            </div>
            <div>
              <label>Background Color:</label>
              <input
                type='color'
                value={
                  (selectedObject as fabric.Text).backgroundColor as string
                }
                onChange={(e) =>
                  handleChange('backgroundColor', e.target.value)
                }
              />
            </div>
          </div>
        </>
      )}

      {/* Shape Properties */}
      {!isText && (
        <>
          <div className='mb-4'>
            <h3 className='font-semibold'>Fill</h3>
            <div>
              <label>Fill Color:</label>
              <input
                type='color'
                value={selectedObject.fill as string}
                onChange={(e) => handleChange('fill', e.target.value)}
              />
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold'>Stroke</h3>
            <div>
              <label>Stroke Color:</label>
              <input
                type='color'
                value={selectedObject.stroke as string}
                onChange={(e) => handleChange('stroke', e.target.value)}
              />
            </div>
            <div>
              <label>Stroke Width:</label>
              <input
                type='number'
                value={selectedObject.strokeWidth ?? 1}
                onChange={(e) =>
                  handleChange('strokeWidth', parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertiesPanel;
