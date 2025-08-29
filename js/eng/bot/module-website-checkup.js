// IzaacWeb V5 - Bot Website Checkup Module  //

async function checkup() {
    typeText("Loading Website Checkup...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearText();
    typeText("Enter the website URL to check (e.g., https://www.example.com):");
    currentRPGState = 'websiteCheckup';
}

async function handleWebsiteCheckup(input) {
    let website = input.trim();
    if (!/^https?:\/\//i.test(website)) {
        website = 'https://' + website;
    }

    try {
        let response;
        try {
            response = await fetch(website, { method: 'GET' });
        } catch (e) {
            response = await fetch(website, { method: 'GET', mode: 'no-cors' });
        }
        if (!response || (response.type === 'opaque')) {
            typeText(`Received a response (restricted by the browser). The website ${website} seems to respond, but status can't be confirmed due to CORS.`);
        } else if (response.ok) {
            typeText(`The website ${website} is up (status ${response.status}).`);
        } else {
            typeText(`The website ${website} might be down. Status Code: ${response.status}`);
        }
    } catch (error) {
        typeText(`An error occurred while checking the website: ${error.message}. Note: Some websites block direct requests from the browser (CORS).`);
    }

    addCheckAnotherSiteButton();
}

function addCheckAnotherSiteButton() {
    if (!checkAnotherSiteButtonAdded) {
        const checkAnotherSiteButton = document.createElement("button");
        checkAnotherSiteButton.textContent = "Check Another Website";
        checkAnotherSiteButton.className = "bot-button";
        checkAnotherSiteButton.onclick = checkup;
        buttonContainer.appendChild(checkAnotherSiteButton);
        checkAnotherSiteButtonAdded = true;
    }
}