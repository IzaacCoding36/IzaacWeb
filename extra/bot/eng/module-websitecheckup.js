// IzaacWeb V4 - Bot Website Checkup Module  //

async function checkup() {
    typeText("Loading Website Checkup...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearText();
    typeText("Enter the website URL to check (e.g., https://www.example.com):");
    currentRPGState = 'websiteCheckup';
}

async function handleWebsiteCheckup(input) {
    const website = input.trim();

    if (!website.startsWith('http://') && !website.startsWith('https://')) {
        typeText("Invalid URL. Please make sure the URL starts with 'http://' or 'https://'.");
        return;
    }

    try {
        const response = await fetch(website);
        if (response.ok) {
            typeText(`The website ${website} is up and running.`);
        } else {
            typeText(`The website ${website} is down. Status Code: ${response.status}`);
        }
    } catch (error) {
        typeText(`An error occurred while checking the website: ${error.message}`);
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