// IzaacWeb V5 - Bot Encryption/Decryption Module  //

function encryptText(texto, deslocamento) {
    return texto.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const codigo = char.charCodeAt(0);
            const base = codigo >= 65 && codigo <= 90 ? 65 : 97;
            return String.fromCharCode(((codigo - base + deslocamento) % 26) + base);
        }
        return char;
    }).join('');
}

function decryptText(texto, deslocamento) {
    return encryptText(texto, 26 - deslocamento);
}

function fileEncrypterDecrypter() {
    typeText("Encriptador/Decriptador de Texto\n\nDigite 'e' para encriptar ou 'd' para decriptar:\n\nModos disponíveis: cesar, base64\n\nEx.: após escolher, informe o texto e o deslocamento (no caso de césar).");
    currentRPGState = 'encrypterDecrypterAction';
}

async function handleEncrypterDecrypterAction(input) {
    const acao = input.toLowerCase().trim();
    if (acao !== 'e' && acao !== 'd') {
        typeText("Ação inválida. Por favor, digite 'e' para encriptar ou 'd' para decriptar.");
        currentRPGState = 'encrypterDecrypterAction';
        return;
    }

    const texto = prompt("Digite o texto:");
    if (!texto) {
        typeText("Por favor, digite um texto válido.");
        return;
    }

    const modo = prompt("Escolha o modo (cesar/base64):").toLowerCase().trim();
    let resultado;
    if (modo === 'base64') {
        try {
            if (acao === 'e') {
                resultado = btoa(unescape(encodeURIComponent(texto)));
                setTimeout(() => typeText(`Texto Encriptado (Base64): ${resultado}`), 500);
            } else {
                resultado = decodeURIComponent(escape(atob(texto)));
                setTimeout(() => typeText(`Texto Decriptado (Base64): ${resultado}`), 500);
            }
        } catch (e) {
            typeText('Erro ao processar Base64. Texto inválido para decodificação.');
        }
    } else {
        const deslocamento = prompt("Digite o valor do deslocamento (0-25):");
        const deslocamentoInt = parseInt(deslocamento, 10);
        if (isNaN(deslocamentoInt) || deslocamentoInt < 0 || deslocamentoInt > 25) {
            typeText("Valor de deslocamento inválido. Por favor, escolha um número entre 0 e 25.");
            return;
        }
        if (acao === 'e') {
            resultado = encryptText(texto, deslocamentoInt);
            setTimeout(() => typeText(`Texto Encriptado (César): ${resultado}`), 500);
        } else if (acao === 'd') {
            resultado = decryptText(texto, deslocamentoInt);
            setTimeout(() => typeText(`Texto Decriptado (César): ${resultado}`), 500);
        }
    }

    addEncryptDecryptButton();
}

function addEncryptDecryptButton() {
    if (!encryptDecryptButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Encriptar/Decriptar Outro Texto";
        button.onclick = fileEncrypterDecrypter;
        buttonContainer.appendChild(button);
        encryptDecryptButtonAdded = true;
    }
}