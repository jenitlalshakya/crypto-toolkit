import React from 'react';
import CipherForm from '../components/CipherForm';
import { encodeVigenere, decodeVigenere } from '../ciphers/vigenere';

const VigenerePage = () => {
  return (
      <div className="container my-4">
          <CipherForm cipherName="Vigenère Cipher" encodeFunc={encodeVigenere} decodeFunc={decodeVigenere} />
    </div>
  )
}

export default VigenerePage;
