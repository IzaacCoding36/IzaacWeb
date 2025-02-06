// IzaacWeb V4 - Terminal Bot //

const botContainer = document.getElementById('botContainer');
const botMessage = document.getElementById('botMessage');
const botInput = document.getElementById('botInput');
const buttonContainer = document.querySelector('.button-container');

let step = 0;
let userName = "usuário";
let isTyping = false;
let checkAnotherSiteButtonAdded = false;
let generateAnotherPasswordButtonAdded = false;
let tryAgainButtonAdded = false;
let encryptDecryptButtonAdded = false;
let currentRPGState = '';
let attack = 0;
let weapon = '';
let hp = 0;

function handleKeyPress(event) {
    if (event.key === 'Enter' && !isTyping) {
        const userInput = botInput.value.trim();
        botInput.value = '';
        processInput(userInput);
    }
}

function handleEnterPress() {
    if (!isTyping) {
        const userInput = botInput.value.trim();
        botInput.value = '';
        processInput(userInput);
    }
}

function processInput(input) {
    if (currentRPGState) {
        switch (currentRPGState) {
            case 'encrypterDecrypterAction':
                handleEncrypterDecrypterAction(input);
                break;
            case 'websiteCheckup':
                handleWebsiteCheckup(input);
                break;
            case 'passwordGenerator':
                handlePasswordGenerator(input);
                break;
            default:
                handleRPG(input);
                break;
        }
        return;
    }

    switch (step) {
        case 1:
            if (['sim', 's'].includes(input.toLowerCase())) {
                explainFunctionalities();
            } else {
                askForAction();
            }
            break;
        default:
            handleActions(input);
            break;
    }
    step++;
}

function greetUser() {
    const hours = new Date().getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Bom Dia";
    } else if (hours < 19) {
        greeting = "Boa Tarde";
    } else {
        greeting = "Boa Noite";
    }

    typeText(`Olá ${userName}! ${greeting}! Eu sou um bot criado por IzaacCoding36 para oferecer algumas funcionalidades para você de uma maneira muito rápida!\n\nVocê quer uma breve explicação das minhas funcionalidades? (s/n)`);
    step = 1;
}

function explainFunctionalities() {
    const funcionalidades = `Certo! Neste momento, eu tenho 4 funcionalidades:\n\n1. Verificação de Site: Verifica o status de sites, basta digitar a URL e eu vou verificar para você! (Às vezes não consigo executar verificações em certos sites).\n\n2. Terminal RPG: Um pequeno jogo para passar o tempo...\n\n3. Gerador de Senhas: Gera uma senha segura, você pode usar isso para criar uma senha realmente forte e segura.\n\n4. Encriptação/Decriptação de Texto: Encripta e decripta textos, é super útil para tornar suas senhas ainda mais seguras!.\n\nO que você quer fazer? (1-4)`;
    typeText(funcionalidades);
}

function askForAction() {
    const options = `Opções disponíveis:\n1. Verificação de Site\n2. Terminal RPG\n3. Gerador de Senhas\n4. Encriptação/Decriptação de Texto\n5. Nada`;
    typeText(options);
}

function handleActions(input) {
    switch (input) {
        case '1':
            checkup();
            break;
        case '2':
            terminalRPG();
            break;
        case '3':
            passwordGenerator();
            break;
        case '4':
            fileEncrypterDecrypter();
            break;
        case '5':
            typeText("Ok. Até a próxima!");
            break;
        default:
            typeText("Você não escolheu nenhuma das opções disponíveis. [ex: (1) ]");
            step--;
            break;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    greetUser();
});