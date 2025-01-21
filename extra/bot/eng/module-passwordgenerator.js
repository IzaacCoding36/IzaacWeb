// IzaacWeb V4 - Bot Password Generator Module  //

function generatePassword(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function passwordGenerator() {
    typeText("Loading Password Generator...");
    setTimeout(() => {
        clearText();
        typeText("Please select how large you want your password to be so I can create it. (0-100)");
        currentRPGState = 'passwordGenerator';
    }, 2000);
}

function handlePasswordGenerator(input) {
    const length = parseInt(input.trim(), 10);
    if (isNaN(length) || length < 0 || length > 100) {
        typeText("Invalid length. Please choose a number between 0 and 100.");
        return;
    }

    const password = generatePassword(length);
    const passwordMessage = `Your password is: ${password}`;
    setTimeout(() => {
        typeText(passwordMessage);
        addGenerateAnotherPasswordButton();
    }, 2000);
}

function addGenerateAnotherPasswordButton() {
    if (!generateAnotherPasswordButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Generate Another Password";
        button.onclick = passwordGenerator;
        buttonContainer.appendChild(button);
        generateAnotherPasswordButtonAdded = true;
    }
}