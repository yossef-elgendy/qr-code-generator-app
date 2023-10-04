import { useRef, useState } from 'react';
import './App.scss';
import QrPopup from './components/QrPopup';
import ErrorPopup from './components/ErrorPopup/ErrorPopup';

function App() {
  const urlRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateUrl = () => {
    if (urlRef.current) {
      const url: string = urlRef.current.value;

      const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

      if (urlRegex.test(url)) {
        setIsOpen(true);
      } else {
        setIsValid(false);
        console.log('Invalid URL:', url);
      }
    }
  }

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <div className='App'>
      <div className="card">
        <input ref={ urlRef } placeholder="Enter an url" type="text" name="url" required/>
        <button onClick={ validateUrl }>
          QR Code
        </button>
      </div>
      <QrPopup isOpen={ isOpen } onClose={ onClose } url={ urlRef.current?.value ?? '' } />
      <ErrorPopup isOpen={ !isValid } onClose={ () => setIsValid(true) } />
    </div>
  )
}

export default App
