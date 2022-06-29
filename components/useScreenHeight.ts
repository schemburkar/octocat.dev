import { useEffect, useState } from 'react';


export const useScreenHeight = (aspectRatio: number, maxHeight = 0.7, maxWidth = 0.8) => {
  const [size, setSize] = useState({ height: 1240 / aspectRatio, width: 1240 });
  useEffect(() => {

    if (!screen)
      return;

    const height = Math.min(screen.height * maxHeight, screen.width * maxWidth / aspectRatio);
    const width = height * aspectRatio;

    setSize({ height, width });
  }, [aspectRatio, maxHeight, maxWidth]);

  return size;
};
