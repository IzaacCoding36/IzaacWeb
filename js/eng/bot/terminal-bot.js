// IzaacWeb V5 - Terminal Bot Base  //

const botContainer = document.getElementById('botContainer');
const botMessage = document.getElementById('botMessage');
const botInput = document.getElementById('botInput');
const buttonContainer = document.querySelector('.button-container');

let step = 0;
let userName = "user";
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

    // Button press animation if event provided
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
        showLoading('Processing your answer...');
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
            if (['yes', 'y'].includes(input.toLowerCase())) {
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
        greeting = "Good Morning";
        emoji = "🌅";
    } else if (hours < 17) {
        greeting = "Good Afternoon";
        emoji = "🌇";
    } else if (hours < 19) {
        greeting = "Good Evening";
        emoji = "🌆";
    } else {
        greeting = "Good Night";
        emoji = "🌌";
    }

    // Enhanced greeting with better formatting
    const greetingText = `${emoji} Hello ${userName}! ${greeting}! 

I'm a bot created by IzaacCoding36 to offer you some functionality in a very fast way!

✨ Do you want a brief explanation of my features?
📝 Type: (y/n)`;

    typeText(greetingText, 25); // Slower for greeting
    step = 1;
}

// Enhanced functionality explanation with better formatting
function explainFunctionalities() {
    const funcionalidades = `🎯 Perfect! Here are my top 4 features:

🔍 1. Website Checkup
   → Checks the status of websites in real-time
   → Just type the URL and I'll check it for you!
   → (Some websites may have restrictions)

🎮 2. Terminal RPG
   → An interactive game to pass the time
   → Venture into a textual world!

🔐 3. Password Generator
   → Creates super secure passwords
   → Customizable and cryptographically strong

🔒 4. Encryption/Decryption
   → Protects your texts with encryption
   → Useful for enhancing the security of your passwords

⚡ What would you like to do? Type the number (1-4):`;

    typeText(funcionalidades, 20);
}

// Enhanced action menu with better formatting
function askForAction() {
    const options = `🚀 Available options:

1️⃣ Website Checkup
2️⃣ Terminal RPG
3️⃣ Password Generator
4️⃣ Encryption/Decryption
5️⃣ Exit

💡 Type the number of the option:`;

    typeText(options, 25);
}

// Enhanced action handling with better feedback
function handleActions(input) {
    const option = input.trim();
    
    switch (option) {
        case '1':
            typeText("🔍 Starting Website Checkup...");
            setTimeout(() => checkup(), 1000);
            break;
        case '2':
            typeText("🎮 Loading Terminal RPG...");
            setTimeout(() => terminalRPG(), 1000);
            break;
        case '3':
            typeText("🔐 Starting Password Generator...");
            setTimeout(() => passwordGenerator(), 1000);
            break;
        case '4':
            typeText("🔒 Loading Encryption/Decryption...");
            setTimeout(() => fileEncrypterDecrypter(), 1000);
            break;
        case '5':
            typeText("👋 Thank you for using the Terminal Bot! See you next time! ✨");
            // Add restart button after exit (match pt-br behavior)
            setTimeout(() => {
                const restartBtn = createStyledButton('🔄 Restart Bot', resetPage, 'restart-btn');
                buttonContainer.appendChild(restartBtn);
            }, 2000);
            break;
        default:
            typeText(`❌ Option "${option}" not recognized.

Please choose one of the available options (1-5).
💡 Example: type "1" for Website Checkup`);
            step--;
            break;
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