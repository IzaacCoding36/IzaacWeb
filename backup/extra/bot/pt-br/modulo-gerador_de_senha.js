// IzaacWeb V4 - Módulo de Gerador de Senhas do Bot  //

function generatePassword(comprimento) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let senha = '';
    for (let i = 0; i < comprimento; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
}

function passwordGenerator() {
    typeText("Carregando Gerador de Senhas...");
    setTimeout(() => {
        clearText();
        typeText("Por favor, selecione o tamanho da senha que você deseja (0-100)");
        currentRPGState = 'passwordGenerator';
    }, 2000);
}

function handlePasswordGenerator(input) {
    const comprimento = parseInt(input.trim(), 10);
    if (isNaN(comprimento) || comprimento < 0 || comprimento > 100) {
        typeText("Comprimento inválido. Por favor, escolha um número entre 0 e 100.");
        return;
    }

    const senha = generatePassword(comprimento);
    const mensagemSenha = `Sua senha é: ${senha}`;
    setTimeout(() => {
        typeText(mensagemSenha);
        addGenerateAnotherPasswordButton();
    }, 2000);
}

function addGenerateAnotherPasswordButton() {
    if (!generateAnotherPasswordButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Gerar Outra Senha";
        button.onclick = passwordGenerator;
        buttonContainer.appendChild(button);
        generateAnotherPasswordButtonAdded = true;
    }
}