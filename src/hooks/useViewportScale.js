import { useState, useEffect } from 'react';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 925;

export const useViewportScale = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate scale based on both width and height
      const scaleX = windowWidth / DESIGN_WIDTH;
      const scaleY = windowHeight / DESIGN_HEIGHT;

      // Use the smaller scale to ensure content fits in both dimensions
      // Only scale down, never scale up (max scale is 1)
      const newScale = Math.min(scaleX, scaleY, 1);

      setScale(newScale);
    };

    // Calculate on mount
    calculateScale();

    // Recalculate on resize
    window.addEventListener('resize', calculateScale);

    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return scale;
};

export default useViewportScale;
