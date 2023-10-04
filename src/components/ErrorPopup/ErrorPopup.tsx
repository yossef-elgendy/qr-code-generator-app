import React from 'react';
import Popup from '../Popup';
import { ErrorPopupProps } from './ErrorPopup.type';
import './ErrorPopup.scss';

const ErrorPopup: React.FC<ErrorPopupProps> = ({ isOpen, onClose }) => {
  return (
    <Popup isOpen={ isOpen } onClose={ onClose }>
      <div className="ErrorWrapper">
        Please, enter a valid url
      </div>
    </Popup>
  );
};

export default ErrorPopup;
