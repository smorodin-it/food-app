import { useEffect, useState } from 'react';
import { ScreenSizeState, UseWindowsSizeHook } from './types';

export const useWindowSize: UseWindowsSizeHook = () => {
  const [screenSize, setScreenSize] = useState<ScreenSizeState>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateScreenSize = (): void => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  return screenSize;
};
