import React, { useState, useEffect } from 'react';
import { TooltipProps } from './Tooltip.type'
import './Tooltip.scss';

const Tooltip: React.FC<TooltipProps> = ({ text, visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
    const timer = setTimeout(() => setIsVisible(false), 1000); // Hide the tooltip after 3 seconds
    return () => clearTimeout(timer);
  }, [visible]);

  return isVisible ? <div className="tooltip">{text}</div> : null;
};

export default Tooltip;
