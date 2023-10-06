import React, { useRef, useState } from 'react';
import './QrPopup.scss'; // Import your CSS file for styling
import { QrPopupProps } from './QrPopup.type';
import QRCode from 'react-qr-code';
import Popup from '../Popup';
import domtoimage from 'dom-to-image';
import Tooltip from '../Tooltip/Tooltip';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const QrPopup: React.FC<QrPopupProps> = ({ isOpen, onClose, url }) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [color, setColor] = useColor("#111729");

  const downloadQRCodeAsImage = () => {
    if (qrCodeRef.current) {
      domtoimage.toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'qrcode.png';
          downloadLink.click();
          onClose();
        })
        .catch((error) => {
          console.error('Error converting to image:', error);
        });
    }
  };

  const copyDataURLToClipboard = () => {
    if (qrCodeRef.current) {
      domtoimage.toPng(qrCodeRef.current)
        .then((dataUrl) => {
          navigator.clipboard.writeText(dataUrl)
            .then(() => {
              setShowTooltip(true); // Show the tooltip
              setTimeout(() => setShowTooltip(false), 3000);
              onClose(); // Hide the tooltip after 3 seconds
            })
            .catch((error) => {
              console.error('Error copying data URL to clipboard:', error);
            });
        })
        .catch((error) => {
          console.error('Error converting to image:', error);
        });
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className='QrContainer'>
        <div className='QrLeftSide'>
          <div className="QrWrapper" style={ { backgroundColor: color.hex } } ref={ qrCodeRef }>
            <QRCode fgColor={ color.hex } value={url} />
          </div>
          <div className="QrActions">
            <button onClick={ downloadQRCodeAsImage }>Download</button>
            <button onClick={ copyDataURLToClipboard }>Share</button>
            <Tooltip text="Copied url!!" visible={showTooltip} />
          </div>
        </div>
        <div className='QrRightSide'>
          <div className="card">
            <ColorPicker color={ color } onChange={ setColor } />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default QrPopup;
