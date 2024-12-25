import * as fabric from 'fabric';
import React from 'react';

import NextImage from '@/components/NextImage';

import { useCanvasContext } from '@/contexts/Canvas.context';
// import { usePicture } from '@/contexts/Picture.context';

// eslint-disable-next-line no-useless-escape
const sampleSVG = `<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"57.08px\" height=\"74.223px\" viewBox=\"0 0 57.08 74.223\" enable-background=\"new 0 0 57.08 74.223\" xml:space=\"preserve\">\n<path d=\"M0,0l27.281,38.375L55.063,1.5L0,0z M15.156,8.063l26.281,1.531L27.281,26.25L15.156,8.063z\"/>\n<path d=\"M14.653,8.058L27.28,25.23l2.021,1.01L40.917,8.563L14.653,8.058z\"/>\n<path d=\"M6.572,43.413l0.505,7.576l50.003,0.505l-0.505-7.071L6.572,43.413z\"/>\n<path d=\"M7.077,54.02l0.505,7.576l49.498,1.01l-0.505-7.071L7.077,54.02z\"/>\n<path d=\"M7.582,65.131l0.505,8.586l48.993,0.505v-6.566L7.582,65.131z\"/>\n</svg>`;

const svgs = [
  `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2048" height="2048" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd"><defs><style>.fil1{fill:none}.fil3{fill:#29b6f6}.fil2{fill:#5d4037}</style></defs><g id="Layer_x0020_1"><path d="M1024 255.999c424.155 0 768.001 343.845 768.001 768.001 0 424.155-343.845 768.001-768.001 768.001-424.155 0-768.001-343.845-768.001-768.001 0-424.155 343.845-768.001 768.001-768.001z" style="fill:#ffd54f"/><path class="fil1" d="M0 0h2048v2048H0z"/><path class="fil1" d="M255.999 255.999h1536v1536h-1536z"/><path class="fil1" d="M0 0h2048v2048H0z"/><path class="fil1" d="M255.999 255.999h1536v1536h-1536z"/><path class="fil1" d="M0 0h2048v2048H0z"/><path class="fil1" d="M255.999 255.999h1536v1536h-1536z"/><path class="fil1" d="M0 0h2048v2048H0z"/><path class="fil1" d="M255.999 255.999h1536v1536h-1536z"/><path class="fil1" d="M0 0h2048v2048H0z"/><path class="fil1" d="M255.999 255.999h1536v1536h-1536z"/><path class="fil2" d="M671.773 1349.82c54.404-312.78 657.185-300.019 704.001 0-114.196-155.313-489.486-229.459-704.001 0z"/><g id="_395248416"><path id="_395248920" class="fil3" d="M808.218 1398.04c31.655-9.044 48.595-25.833 49.56 1.049l1.264 36.27 38.36 14.003 4.032 11.645-.296 67.815c-8.153 40.8-40.89-16.045-43.3 68.233l-9.371 6.529-67.16 22.288c-35.73 2.579 3.813-45.378-77.539-22.138-29.234-47.768 19.235-39.412-64.602-70.02-8.078-33.016-11.133-64.854 14.59-89.917l40.731-8.438c1.935-53.792-1.608-51.933 50.85-36.946 32.511-41.525 30.02-41.783 62.881-.373z"/><path id="_395248752" class="fil3" d="m858.618 1456.21-66.139-77.87L902.599 1088z"/><g><path id="_395248608" class="fil3" d="M1239.78 1398.04c-31.655-9.044-48.595-25.833-49.56 1.049l-1.264 36.27-38.36 14.003-4.032 11.645.296 67.815c8.153 40.8 40.89-16.045 43.3 68.233l9.371 6.529 67.16 22.288c35.73 2.579-3.813-45.378 77.539-22.138 29.234-47.768-19.235-39.412 64.602-70.02 8.078-33.016 11.133-64.854-14.59-89.917l-40.731-8.438c-1.935-53.792 1.608-51.933-50.85-36.946-32.511-41.525-30.02-41.783-62.881-.373z"/><path id="_395248536" class="fil3" d="m1189.38 1456.21 66.14-77.87L1145.4 1088z"/></g></g><g id="_395247600"><path id="_395248248" class="fil2" d="M1369.1 644.597c-470.274 209.804-4.352-125.178 0 0z"/><path id="_395248008" class="fil2" d="M1194.41 799.999c0 30.615 36.063 55.434 80.55 55.434 44.486 0 80.549-24.819 80.549-55.434-55.514 29.838-108.915 24.539-161.099 0z"/><g><path id="_395247864" class="fil2" d="M678.897 644.597c470.274 209.804 4.352-125.178 0 0z"/><path id="_395247696" class="fil2" d="M853.59 799.999c0 30.615-36.063 55.434-80.55 55.434-44.486 0-80.549-24.819-80.549-55.434 55.514 29.838 108.915 24.539 161.099 0z"/></g></g></g></svg>`,
];

const VectorGallery: React.FC = () => {
  const { state } = useCanvasContext();
  // const { pictures, fetchPictures } = usePicture();

  const addVectorToCanvas = async (svgString: string) => {
    const objs = await fabric.loadSVGFromString(svgString);

    const obj = fabric.util.groupSVGElements(objs.objects as fabric.Object[]);
    obj.set({ left: 10, top: 10 }).setCoords();
    obj.scaleToWidth(80);

    state.canvas?.add(obj);
    state.canvas?.renderAll();
  };

  // useEffect(() => {
  //   fetchPictures();

  //   return () => {
  //     fetchPictures();
  //   };
  // }, []);

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Image Gallery</h2>
      {/* <div className='grid grid-cols-8 gap-4'>
        {pictures.map((pic, index) => (
          <NextImage
            useSkeleton
            key={index}
            src={pic.url}
            alt={`Image ${index + 1}: ${pic.name}`}
            width={100}
            height={100}
            className='cursor-pointer p-1 border'
            onClick={() => addImageToCanvas(pic.url)}
          />
        ))}

      </div> */}
      <div className='grid grid-cols-8 gap-4'>
        <div
          className='cursor-pointer p-1 border'
          onClick={() => addVectorToCanvas(svgs[0])}
          title='Click to add SVG'
        >
          <NextImage
            useSkeleton
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgs[0])}`}
            alt='Sample SVG'
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default VectorGallery;
