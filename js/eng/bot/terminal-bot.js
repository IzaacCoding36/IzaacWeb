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

function greetUser() {
    const hours = new Date().getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    typeText(`Hello ${userName}! ${greeting}! I am a bot made by IzaacCoding36 to offer some functionalities for you in a very quick way!\n\nDo you want a brief explanation of my functionalities? (y/n)`);
    step = 1;
}

function explainFunctionalities() {
    const functionalities = `Okay! So, at this moment I have 4 functionalities:\n\n1. Website Checkup: Checks the status of websites, just type the URL and I'll scan it for you! (Sometimes I can't execute checkups on certain websites).\n\n2. Terminal RPG: A small game to pass the time...\n\n3. Password Generator: Generates a secure password, you can use this to make a really strong and secure password.\n\n4. Text Encrypter/Decrypter: Encrypts and decrypts texts, it is super useful to make your passwords even more secure!.\n\nWhat do you want to do? (1-4)`;
    typeText(functionalities);
}

function askForAction() {
    const options = `Available options:\n1. Website Checkup\n2. Terminal RPG\n3. Password Generator\n4. Text Encrypter/Decrypter\n5. Nothing`;
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
            typeText("Ok. See you next time!");
            break;
        default:
            typeText("You haven't chosen any of the available options. [ex: (1) ]");
            step--;
            break;
    }
}

greetUser();