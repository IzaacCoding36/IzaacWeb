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
    typeText("Encriptador/Decriptador de Texto\nDigite 'e' para encriptar ou 'd' para decriptar:");
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

    const deslocamento = prompt("Digite o valor do deslocamento (0-25):");
    const deslocamentoInt = parseInt(deslocamento, 10);
    if (isNaN(deslocamentoInt) || deslocamentoInt < 0 || deslocamentoInt > 25) {
        typeText("Valor de deslocamento inválido. Por favor, escolha um número entre 0 e 25.");
        return;
    }

    let resultado;
    if (acao === 'e') {
        resultado = encryptText(texto, deslocamentoInt);
        setTimeout(() => typeText(`Texto Encriptado: ${resultado}`), 2000);
    } else if (acao === 'd') {
        resultado = decryptText(texto, deslocamentoInt);
        setTimeout(() => typeText(`Texto Decriptado: ${resultado}`), 2000);
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