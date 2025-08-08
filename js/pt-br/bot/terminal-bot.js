// IzaacWeb V5 - Terminal Bot Base  //

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

// Enhanced keyboard handling with better responsiveness
function handleKeyPress(event) {
    if (event.key === 'Enter' && !isTyping) {
        event.preventDefault();
        const userInput = botInput.value.trim();
        
        if (userInput) {
            // Add user message to chat
            addUserMessage(userInput);
            botInput.value = '';
            
            // Add visual feedback
            botInput.style.transform = 'scale(0.98)';
            setTimeout(() => {
                botInput.style.transform = 'scale(1)';
            }, 100);
            
            // Process with slight delay for better UX
            setTimeout(() => {
                processInput(userInput);
            }, 200);
        }
    }
}

// Enhanced enter button handling
function handleEnterPress(evt) {
    if (isTyping) return;
    const userInput = botInput.value.trim();
    if (!userInput) return;

    addUserMessage(userInput);
    botInput.value = '';

    if (evt && evt.currentTarget) {
        const enterBtn = evt.currentTarget;
        enterBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            enterBtn.style.transform = 'scale(1)';
        }, 100);
    }

    setTimeout(() => {
        processInput(userInput);
    }, 200);
}

// Enhanced input processing with loading states
function processInput(input) {
    // Show loading for better UX
    if (step > 0) {
        showLoading('Processando sua resposta...');
        setTimeout(() => {
            hideLoading();
            processInputCore(input);
        }, 500);
    } else {
        processInputCore(input);
    }
}

function processInputCore(input) {
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

// Enhanced greeting with better timing
function greetUser() {
    const hours = new Date().getHours();
    let greeting;
    let emoji;

    if (hours < 12) {
        greeting = "Bom Dia";
        emoji = "🌅";
    } else if (hours < 19) {
        greeting = "Boa Tarde";
        emoji = "☀️";
    } else {
        greeting = "Boa Noite";
        emoji = "🌙";
    }

    // Enhanced greeting with better formatting
    const greetingText = `${emoji} Olá ${userName}! ${greeting}! 

Eu sou um bot criado por IzaacCoding36 para oferecer algumas funcionalidades para você de uma maneira muito rápida!

✨ Você quer uma breve explicação das minhas funcionalidades? 
📝 Digite: (s/n)`;

    typeText(greetingText, 25); // Slower for greeting
    step = 1;
}

// Enhanced functionality explanation with better formatting
function explainFunctionalities() {
    const funcionalidades = `🎯 Perfeito! Aqui estão minhas 4 funcionalidades principais:

🔍 1. Verificação de Site
   → Verifica o status de sites em tempo real
   → Basta digitar a URL e eu verifico para você!
   → (Alguns sites podem ter restrições)

🎮 2. Terminal RPG
   → Um jogo interativo para passar o tempo
   → Aventure-se em um mundo textual!

🔐 3. Gerador de Senhas
   → Cria senhas super seguras
   → Personalizável e criptograficamente forte

🔒 4. Encriptação/Decriptação
   → Protege seus textos com criptografia
   → Útil para aumentar a segurança das suas senhas

⚡ O que você gostaria de fazer? Digite o número (1-4):`;

    typeText(funcionalidades, 20);
}

// Enhanced action menu with better formatting
function askForAction() {
    const options = `🚀 Opções disponíveis:

1️⃣ Verificação de Site
2️⃣ Terminal RPG  
3️⃣ Gerador de Senhas
4️⃣ Encriptação/Decriptação de Texto
5️⃣ Sair

💡 Digite o número da opção desejada:`;

    typeText(options, 25);
}

// Enhanced action handling with better feedback
function handleActions(input) {
    const option = input.trim();
    
    switch (option) {
        case '1':
            typeText("🔍 Iniciando Verificação de Site...");
            setTimeout(() => checkup(), 1000);
            break;
        case '2':
            typeText("🎮 Carregando Terminal RPG...");
            setTimeout(() => terminalRPG(), 1000);
            break;
        case '3':
            typeText("🔐 Iniciando Gerador de Senhas...");
            setTimeout(() => passwordGenerator(), 1000);
            break;
        case '4':
            typeText("🔒 Carregando sistema de Encriptação...");
            setTimeout(() => fileEncrypterDecrypter(), 1000);
            break;
        case '5':
            typeText("👋 Obrigado por usar o Terminal Bot! Até a próxima! ✨");
            // Add restart button after exit
            setTimeout(() => {
                const restartBtn = createStyledButton('🔄 Reiniciar Bot', resetPage, 'restart-btn');
                buttonContainer.appendChild(restartBtn);
            }, 2000);
            break;
        default:
            typeText(`❌ Opção "${option}" não reconhecida. 

Por favor, escolha uma das opções disponíveis (1-5).
💡 Exemplo: digite "1" para Verificação de Site`);
            step--;
            break;
    }
}

// Enhanced input focus management
function focusInput() {
    if (botInput && !isTyping) {
        botInput.focus();
    }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', (event) => {
    // Add enhanced input handling
    if (botInput) {
        botInput.addEventListener('keypress', handleKeyPress);
        botInput.addEventListener('input', () => {
            // Visual feedback on typing
            botInput.style.borderColor = botInput.value.trim() ? '#00ff88' : '#66ff66';
        });
        
        // Auto-focus when not typing
        setInterval(focusInput, 1000);
    }
    // Enhanced container animations
    if (botContainer) {
        botContainer.style.transform = 'translateY(20px)';
        botContainer.style.opacity = '0';
        
        setTimeout(() => {
            botContainer.style.transition = 'all 1s ease';
            botContainer.style.transform = 'translateY(0)';
            botContainer.style.opacity = '1';
        }, 100);
    }
    
    // Start the bot after animations
    setTimeout(() => {
        greetUser();
    }, 1500);
});