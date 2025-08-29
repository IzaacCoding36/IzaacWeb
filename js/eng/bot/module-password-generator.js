// IzaacWeb V5 - Bot Password Generator Module  //

function generatePassword(length, opts = { upper: true, lower: true, number: true, symbol: true }) {
    const pools = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        symbol: '!@#$%^&*()-_=+[]{};:,.<>/?'
    };
    let charset = '';
    Object.keys(opts).forEach(k => { if (opts[k]) charset += pools[k]; });
    if (!charset) charset = pools.lower;

    const required = [];
    Object.keys(opts).forEach(k => {
        if (opts[k]) required.push(pools[k].charAt(Math.floor(Math.random() * pools[k].length)));
    });

    const result = [];
    for (let i = 0; i < Math.max(0, length - required.length); i++) {
        result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    const full = result.concat(required);
    for (let i = full.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [full[i], full[j]] = [full[j], full[i]];
    }
    return full.join('');
}

function passwordGenerator() {
    typeText("Loading Password Generator...");
    setTimeout(() => {
        clearText();
        typeText("Please select the password length (0-100)\n\nQuick options: 12, 16, 24\n\nOptions: uppercase/lowercase/numbers/symbols (e.g., 16 symbols)");
        currentRPGState = 'passwordGenerator';
    }, 2000);
}

function handlePasswordGenerator(input) {
    const parts = input.trim().toLowerCase().split(/\s+/);
    const length = parseInt(parts[0], 10);
    if (isNaN(length) || length < 0 || length > 100) {
        typeText("Invalid length. Please choose a number between 0 and 100.");
        return;
    }

    const opts = { upper: true, lower: true, number: true, symbol: true };
    parts.slice(1).forEach(p => {
        if (p.includes('upper')) opts.upper = true;
        if (p.includes('lower')) opts.lower = true;
        if (p.includes('number')) opts.number = true;
        if (p.includes('symbol')) opts.symbol = true;
    });

    const password = generatePassword(length, opts);
    const passwordMessage = `Your password is: ${password}\n\nTip: use the button below to copy.`;
    setTimeout(() => {
        typeText(passwordMessage);
        addGenerateAnotherPasswordButton(password);
    }, 800);
}

function addGenerateAnotherPasswordButton(currentPassword = '') {
    if (!generateAnotherPasswordButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Generate Another Password";
        button.onclick = passwordGenerator;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'bot-button';
        copyBtn.textContent = 'Copy Password';
        copyBtn.onclick = async () => {
            try {
                const text = (currentPassword || (botMessage.textContent.match(/Your password is: (.*)/)?.[1] ?? '')).trim();
                if (!text) return;
                await navigator.clipboard.writeText(text);
                typeText('📋 Password copied to clipboard.');
            } catch (e) {
                typeText("⚠️ Couldn't copy. Please copy manually.");
            }
        };

        buttonContainer.appendChild(button);
        buttonContainer.appendChild(copyBtn);
        generateAnotherPasswordButtonAdded = true;
    }
}