// IzaacWeb V5 - Bot Encryption/Decryption Module  //

let encryptDecryptButtonAdded = false;

function encryptText(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function decryptText(text, shift) {
    return encryptText(text, 26 - shift);
}

function fileEncrypterDecrypter() {
    typeText("Text Encrypter/Decrypter\nType 'e' to encrypt or 'd' to decrypt:");
    currentRPGState = 'encrypterDecrypterAction';
}

async function handleEncrypterDecrypterAction(input) {
    const action = input.toLowerCase().trim();
    if (action !== 'e' && action !== 'd') {
        typeText("Invalid action. Please type 'e' for encrypt or 'd' for decrypt.");
        currentRPGState = 'encrypterDecrypterAction';
        return;
    }

    const text = prompt("Enter the text:");
    if (!text) {
        typeText("Please enter a valid text.");
        return;
    }

    const shift = prompt("Enter the shift value (0-25):");
    const shiftInt = parseInt(shift, 10);
    if (isNaN(shiftInt) || shiftInt < 0 || shiftInt > 25) {
        typeText("Invalid shift value. Please choose a number between 0 and 25.");
        return;
    }

    let result;
    if (action === 'e') {
        result = encryptText(text, shiftInt);
        setTimeout(() => typeText(`Encrypted Text: ${result}`), 2000);
    } else if (action === 'd') {
        result = decryptText(text, shiftInt);
        setTimeout(() => typeText(`Decrypted Text: ${result}`), 2000);
    }

    addEncryptDecryptButton();
}

function addEncryptDecryptButton() {
    if (!encryptDecryptButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Encrypt/Decrypt Another Text";
        button.onclick = fileEncrypterDecrypter;
        buttonContainer.appendChild(button);
        encryptDecryptButtonAdded = true;
    }
}