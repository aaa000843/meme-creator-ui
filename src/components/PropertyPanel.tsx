import * as fabric from 'fabric';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react';

import logger from '@/lib/logger';

import { useCanvasContext } from '@/contexts/Canvas.context';

const propertyMap: { [key: string]: string } = {
  left: 'left',
  top: 'top',
  width: 'width',
  height: 'height',
  angle: 'angle',
  fill: 'fill',
  stroke: 'stroke',
  strokeWidth: 'strokeWidth',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  fontStyle: 'fontStyle',
  underline: 'underline',
  textFill: 'fill',
  backgroundColor: 'backgroundColor',
  shadowColor: 'shadow.color',
  shadowOffsetX: 'shadow.offsetX',
  shadowOffsetY: 'shadow.offsetY',
  shadowBlur: 'shadow.blur',
};

const PropertiesPanel: React.FC = () => {
  const { state } = useCanvasContext();
  const [selectedObject, setSelectedObject] = useState<
    fabric.Object | undefined
  >(undefined);

  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    angle: 0,
    fill: '',
    stroke: '',
    strokeWidth: 1,
    fontFamily: '',
    fontSize: 0,
    fontWeight: 'normal' as number | string,
    fontStyle: 'normal',
    underline: false,
    textFill: '',
    backgroundColor: '',
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
  });

  useEffect(() => {
    const canvas = state.canvas;
    if (!canvas) return;

    const updateSelectedObject = () => {
      const activeObject = canvas.getActiveObject();
      logger({ activeObject }, 'PropertyPanel.tsx line 63');
      if (activeObject) {
        setSelectedObject(activeObject);
        setProperties({
          left: activeObject.left ?? 0,
          top: activeObject.top ?? 0,
          width: activeObject.width ?? 0,
          height: activeObject.height ?? 0,
          angle: activeObject.angle ?? 0,
          fill: (activeObject.fill as string) ?? '',
          stroke: (activeObject.stroke as string) ?? '',
          strokeWidth: activeObject.strokeWidth ?? 1,
          fontFamily: (activeObject as fabric.Text).fontFamily ?? '',
          fontSize: (activeObject as fabric.Text).fontSize ?? 0,
          fontWeight: (activeObject as fabric.Text).fontWeight ?? 'normal',
          fontStyle: (activeObject as fabric.Text).fontStyle ?? 'normal',
          underline: (activeObject as fabric.Text).underline ?? false,
          textFill: ((activeObject as fabric.Text).fill as string) ?? '',
          backgroundColor:
            ((activeObject as fabric.Text).backgroundColor as string) ?? '',
          shadowColor: (activeObject.shadow?.color as string) ?? '#000000',
          shadowOffsetX: activeObject.shadow?.offsetX ?? 0,
          shadowOffsetY: activeObject.shadow?.offsetY ?? 0,
          shadowBlur: activeObject.shadow?.blur ?? 0,
        });
      }
    };

    canvas.on('selection:created', updateSelectedObject);
    canvas.on('selection:updated', updateSelectedObject);
    canvas.on('object:modified', updateSelectedObject);
    canvas.on('selection:cleared', () => setSelectedObject(undefined));

    return () => {
      canvas.off('selection:created', updateSelectedObject);
      canvas.off('selection:updated', updateSelectedObject);
      canvas.off('selection:cleared', () => setSelectedObject(undefined));
    };
  }, [state.canvas]);

  if (!selectedObject) {
    return <div className='p-4'>No object selected</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (property: string, value: any) => {
    const mappedProperty = propertyMap[property];
    setProperties((prevProperties) => ({
      ...prevProperties,
      [property]: value,
    }));

    if (selectedObject) {
      set(selectedObject, mappedProperty, value);
      state.canvas?.renderAll();
    }
  };

  const isText = selectedObject instanceof fabric.FabricText;

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
            value={properties.left ?? 0}
            onChange={(e) => handleChange('left', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Top:</label>
          <input
            type='number'
            value={properties.top ?? 0}
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
            value={properties.width ?? 0}
            onChange={(e) => handleChange('width', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type='number'
            value={properties.height ?? 0}
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
            value={properties.angle ?? 0}
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
                value={properties.fontFamily ?? ''}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
              />
            </div>
            <div>
              <label>Font Size:</label>
              <input
                type='number'
                value={properties.fontSize ?? 0}
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
                  checked={properties.fontWeight === 'bold'}
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
                  checked={properties.fontStyle === 'italic'}
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
                  checked={properties.underline}
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
                value={properties.fill as string}
                onChange={(e) => handleChange('fill', e.target.value)}
              />
            </div>
            <div>
              <label>Background Color:</label>
              <input
                type='color'
                value={properties.backgroundColor as string}
                onChange={(e) =>
                  handleChange('backgroundColor', e.target.value)
                }
              />
            </div>
            <div>
              <label>Shadow Color:</label>
              <input
                type='color'
                value={(properties.shadowColor as string) || '#000000'}
                onChange={(e) => handleChange('shadowColor', e.target.value)}
              />
            </div>
            <div>
              <label>Shadow Offset X:</label>
              <input
                type='number'
                value={(properties.shadowOffsetX as number) || 0}
                onChange={(e) =>
                  handleChange('shadowOffsetX', parseInt(e.target.value, 10))
                }
              />
            </div>
            <div>
              <label>Shadow Offset Y:</label>
              <input
                type='number'
                value={(properties.shadowOffsetY as number) || 0}
                onChange={(e) =>
                  handleChange('shadowOffsetY', parseInt(e.target.value, 10))
                }
              />
            </div>
            <div>
              <label>Shadow Blur:</label>
              <input
                type='number'
                value={(properties.shadowBlur as number) || 0}
                onChange={(e) =>
                  handleChange('shadowBlur', parseInt(e.target.value, 10))
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
