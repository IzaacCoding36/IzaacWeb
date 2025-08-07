// IzaacWeb V4 - Módulo de Verificação de Sites do Bot  //

async function checkup() {
    typeText("Carregando Verificação de Site...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearText();
    typeText("Digite a URL do site para verificar (ex.: https://www.exemplo.com):");
    currentRPGState = 'websiteCheckup';
}

async function handleWebsiteCheckup(input) {
    const website = input.trim();

    if (!website.startsWith('http://') && !website.startsWith('https://')) {
        typeText("URL inválida. Por favor, certifique-se de que a URL começa com 'http://' ou 'https://'.");
        return;
    }

    try {
        const response = await fetch(website);
        if (response.ok) {
            typeText(`O site ${website} está funcionando.`);
        } else {
            typeText(`O site ${website} está fora do ar. Código de Status: ${response.status}`);
        }
    } catch (error) {
        typeText(`Ocorreu um erro ao verificar o site: ${error.message}`);
    }

    addCheckAnotherSiteButton();
}

function addCheckAnotherSiteButton() {
    if (!checkAnotherSiteButtonAdded) {
        const checkAnotherSiteButton = document.createElement("button");
        checkAnotherSiteButton.textContent = "Verificar Outro Site";
        checkAnotherSiteButton.className = "bot-button";
        checkAnotherSiteButton.onclick = checkup;
        buttonContainer.appendChild(checkAnotherSiteButton);
        checkAnotherSiteButtonAdded = true;
    }
}