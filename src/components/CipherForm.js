import React, { useState, useEffect } from 'react';
import { encodeVigenere, decodeVigenere } from '../ciphers/vigenere';

const CipherForm = (props) => {
    // States
    const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");
    const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
    const [key, setKey] = useState("cipher");
    const [keyMode, setKeyMode] = useState("repeat"); // repeat or autoKey
    const [mode, setMode] = useState("encode"); // encode or decode
    const [result, setResult] = useState("");
    const [prevResult, setPrevResult] = useState(""); // previous result for invalid alphabet

    // Helper: check for duplicate characters (case-insensitive)
    const hasDuplicates = (str) => {
        const chars = str.toUpperCase().split("");
        return new Set(chars).size !== chars.length;
    };

    // Live calculation effect
    useEffect(() => {
        if (!alphabet || hasDuplicates(alphabet)) {
            // Stop calculation if duplicates exist
            setResult(prevResult);
            return;
        }

        if (!text || !key) {
            setResult("");
            setPrevResult("");
            return;
        }

        let newResult = mode === "encode"
            ? encodeVigenere(text, key, keyMode, alphabet)
            : decodeVigenere(text, key, keyMode, alphabet);

        setResult(newResult);
        setPrevResult(newResult);

    }, [text, key, mode, keyMode, alphabet, prevResult]);

    // Copy result
    const handleCopy = () => { navigator.clipboard.writeText(result); alert("Copied to clipboard!"); };

    return (
        <div className="container my-4">
            <h3 className="mb-4 text-center">{props.cipherName}</h3>
            <div className="row">
                {/* Input Section */}
                <div className="col-md-4 mb-3">
                    <label className="form-label fs-4">{mode === 'encode' ? 'Plain Text' : 'Cipher Text'}</label>
                    <textarea className="form-control" rows="8" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text here..."></textarea>
                </div>

                {/* Key / Mode / Alphabet Section */}
                <div className="col-md-4 mb-3 d-flex flex-column justify-content-between">
                    <div>
                        <label className="form-label fs-4">Key</label>
                        <input type="text" className="form-control mb-3" value={key} onChange={e => setKey(e.target.value)} placeholder="Enter key..."></input>

                        <label className="form-label">Key Mode</label>
                        <div className="d-flex mb-3">
                            <button className={`btn me-2 rounded-pill ${keyMode === 'repeat' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setKeyMode('repeat')}>Repeat</button>
                            <button className={`btn rounded-pill ${keyMode === 'autoKey' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setKeyMode('autoKey')}>AutoKey</button>
                        </div>

                        <label className="form-label">Alphabet</label>
                        <input type="text" className="form-control" value={alphabet} onChange={e => setAlphabet(e.target.value)}></input>
                        {hasDuplicates(alphabet) && <small className="text-danger">Alphabet contains duplicate letters. Fix to continue calculation.</small>}
                    </div>

                    <div className="d-flex mt-3">
                        <button className={`btn me-2 rounded-pill ${mode === 'encode' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('encode')}>Encode</button>
                        <button className={`btn rounded-pill ${mode === 'decode' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('decode')}>Decode</button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="col-md-4 mb-3">
                    <label className="form-label fs-4">{mode === 'encode' ? 'Cipher Text' : 'Plain Text'}</label>
                    <textarea className="form-control" rows="8" value={result} readOnly placeholder="Result will appear here..."></textarea>
                    <div className="text-end mt-2"><button className="btn btn-primary" onClick={handleCopy}>Copy</button></div>
                </div>
            </div>
        </div>
    );
};

export default CipherForm;
