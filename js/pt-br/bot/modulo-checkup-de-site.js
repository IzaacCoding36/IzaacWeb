// IzaacWeb V5 - Bot Website Checkup Module  //

async function checkup() {
    typeText("Carregando Verificação de Site...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearText();
    typeText("Digite a URL do site para verificar (ex.: https://www.exemplo.com):");
    currentRPGState = 'websiteCheckup';
}

async function handleWebsiteCheckup(input) {
    let website = input.trim();
    if (!/^https?:\/\//i.test(website)) {
        website = 'https://' + website;
    }

    try {
        // Tenta um fetch simples; em caso de CORS, usa no-cors
        let response;
        try {
            response = await fetch(website, { method: 'GET' });
        } catch (e) {
            response = await fetch(website, { method: 'GET', mode: 'no-cors' });
        }
        // Com no-cors o status pode ser 0; assumimos que respondeu
        if (!response || (response.type === 'opaque')) {
            typeText(`Recebida resposta do site (modo restrito pelo navegador). O site ${website} parece responder, mas não é possível confirmar o status por CORS.`);
        } else if (response.ok) {
            typeText(`O site ${website} está funcionando (status ${response.status}).`);
        } else {
            typeText(`O site ${website} pode estar fora do ar. Código de Status: ${response.status}`);
        }
    } catch (error) {
        typeText(`Ocorreu um erro ao verificar o site: ${error.message}. Observação: Alguns sites bloqueiam solicitações diretas do navegador (CORS).`);
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