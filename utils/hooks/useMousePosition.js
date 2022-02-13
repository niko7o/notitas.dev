import { useState, useEffect } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = mouseEvent => {
    setMousePosition({ 
      x: mouseEvent.clientX, 
      y: mouseEvent.clientY 
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    return () => document.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return { mousePosition };
};

export default useMousePosition;