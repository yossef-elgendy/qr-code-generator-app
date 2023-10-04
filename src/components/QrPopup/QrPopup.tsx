import React, { useRef, useState } from 'react';
import './QrPopup.scss'; // Import your CSS file for styling
import { QrPopupProps } from './QrPopup.type';
import QRCode from 'react-qr-code';
import Popup from '../Popup';
import domtoimage from 'dom-to-image';
import Tooltip from '../Tooltip/Tooltip';

const QrPopup: React.FC<QrPopupProps> = ({ isOpen, onClose, url }) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

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
      <div className="QrWrapper" ref={ qrCodeRef }>
        <QRCode fgColor="#111729" value={url} />
      </div>
      <div className="QrActions">
        <button onClick={ downloadQRCodeAsImage }>Download</button>
        <button onClick={ copyDataURLToClipboard }>Share</button>
        <Tooltip text="Copied url!!" visible={showTooltip} />
      </div>
    </Popup>
  );
};

export default QrPopup;