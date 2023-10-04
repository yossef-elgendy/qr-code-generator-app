import React, { useEffect, useRef } from 'react';
import './Popup.scss'; // Import your CSS file for styling
import { PopupProps } from './Popup.type';

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup" ref={popupRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
