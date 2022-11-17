import { useRef, useState, useEffect } from 'react';

export const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    getWidth();
    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return { ref, width };
};
