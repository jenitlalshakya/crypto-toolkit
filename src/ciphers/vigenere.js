// Check if character is in the alphabet
const isInAlphabet = (char, alphabet) => {
    return alphabet.toUpperCase().includes(char.toUpperCase());
};

// Format the key based on mode: repeat or autoKey
const formatKey = (text, key, keyMode = "repeat", alphabet = "abcdefghijklmnopqrstuvwxyz") => {
    if (!key) return "";
    const upperAlphabet = alphabet.toUpperCase();
    key = key.toUpperCase().replace(new RegExp(`[^${upperAlphabet}]`, "g"), "");

    let formattedKey = "";
    let keyIndex = 0;

    if (keyMode === "repeat") {
        // Repeat mode: cycle through key letters for letters in text
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isInAlphabet(char, alphabet)) {
                formattedKey += key[keyIndex % key.length];
                keyIndex++;
            } else {
                formattedKey += char; // keep punctuation/numbers
            }
        }
    } else if (keyMode === "autoKey") {
        // AutoKey mode
        let autoKey = key;
        let plainLetters = [];

        // Collect plaintext letters in alphabet only
        for (let i = 0; i < text.length; i++) {
            if (isInAlphabet(text[i], alphabet)) plainLetters.push(text[i].toUpperCase());
        }

        let autoKeyIndex = 0;
        let plainIndex = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isInAlphabet(char, alphabet)) {
                if (autoKeyIndex < autoKey.length) {
                    formattedKey += autoKey[autoKeyIndex];
                } else {
                    formattedKey += plainLetters[plainIndex];
                    plainIndex++;
                }
                autoKeyIndex++;
            } else {
                formattedKey += char; // keep numbers/punctuation
            }
        }
    }

    return formattedKey;
};

// Encode function
export const encodeVigenere = (text, key, keyMode = "repeat", alphabet = "abcdefghijklmnopqrstuvwxyz") => {
    if (!text || !key) return "";
    const formattedKey = formatKey(text, key, keyMode, alphabet);
    const upperAlphabet = alphabet.toUpperCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (isInAlphabet(char, alphabet)) {
            const isUpper = char === char.toUpperCase();
            const charIndex = upperAlphabet.indexOf(char.toUpperCase());
            const shift = upperAlphabet.indexOf(formattedKey[i].toUpperCase());
            const encodedChar = upperAlphabet[(charIndex + shift) % upperAlphabet.length];
            result += isUpper ? encodedChar : encodedChar.toLowerCase();
        } else {
            result += char;
        }
    }
    return result;
};

// Decode function
export const decodeVigenere = (text, key, keyMode = "repeat", alphabet = "abcdefghijklmnopqrstuvwxyz") => {
    if (!text || !key) return "";
    const formattedKey = formatKey(text, key, keyMode, alphabet);
    const upperAlphabet = alphabet.toUpperCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (isInAlphabet(char, alphabet)) {
            const isUpper = char === char.toUpperCase();
            const charIndex = upperAlphabet.indexOf(char.toUpperCase());
            const shift = upperAlphabet.indexOf(formattedKey[i].toUpperCase());
            const decodedChar = upperAlphabet[(charIndex - shift + upperAlphabet.length) % upperAlphabet.length];
            result += isUpper ? decodedChar : decodedChar.toLowerCase();
        } else {
            result += char;
        }
    }
    return result;
};
