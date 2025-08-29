// IzaacWeb V5 - Bot Password Generator Module  //

function generatePassword(comprimento, opts = { upper: true, lower: true, number: true, symbol: true }) {
    const pools = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        symbol: '!@#$%^&*()-_=+[]{};:,.<>/?'
    };
    let charset = '';
    Object.keys(opts).forEach(k => { if (opts[k]) charset += pools[k]; });
    if (!charset) charset = pools.lower; // fallback

    // Garantir ao menos um de cada tipo selecionado
    const required = [];
    Object.keys(opts).forEach(k => {
        if (opts[k]) required.push(pools[k].charAt(Math.floor(Math.random() * pools[k].length)));
    });

    const result = [];
    for (let i = 0; i < Math.max(0, comprimento - required.length); i++) {
        result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    // Inserir os obrigatórios e embaralhar
    const full = result.concat(required);
    for (let i = full.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [full[i], full[j]] = [full[j], full[i]];
    }
    return full.join('');
}

function passwordGenerator() {
    typeText("Carregando Gerador de Senhas...");
    setTimeout(() => {
        clearText();
        typeText("Por favor, selecione o tamanho da senha que você deseja (0-100)\n\nOpções rápidas: 12, 16, 24\n\nComandos: maiusculas/minusculas/numeros/simbolos (ex.: 16 simbolos)");
        currentRPGState = 'passwordGenerator';
    }, 2000);
}

function handlePasswordGenerator(input) {
    const parts = input.trim().toLowerCase().split(/\s+/);
    const comprimento = parseInt(parts[0], 10);
    if (isNaN(comprimento) || comprimento < 0 || comprimento > 100) {
        typeText("Comprimento inválido. Por favor, escolha um número entre 0 e 100.");
        return;
    }

    const opts = { upper: true, lower: true, number: true, symbol: true };
    parts.slice(1).forEach(p => {
        if (p.includes('maius')) opts.upper = true;
        if (p.includes('minus')) opts.lower = true;
        if (p.includes('numero') || p.includes('número')) opts.number = true;
        if (p.includes('simbol')) opts.symbol = true;
    });

    const senha = generatePassword(comprimento, opts);
    const mensagemSenha = `Sua senha é: ${senha}\n\nDica: use o botão abaixo para copiar.`;
    setTimeout(() => {
        typeText(mensagemSenha);
        addGenerateAnotherPasswordButton(senha);
    }, 800);
}

function addGenerateAnotherPasswordButton(senhaAtual = '') {
    if (!generateAnotherPasswordButtonAdded) {
        const button = document.createElement("button");
        button.className = "bot-button";
        button.textContent = "Gerar Outra Senha";
        button.onclick = passwordGenerator;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'bot-button';
        copyBtn.textContent = 'Copiar Senha';
        copyBtn.onclick = async () => {
            try {
                const text = (senhaAtual || (botMessage.textContent.match(/Sua senha é: (.*)/)?.[1] ?? '')).trim();
                if (!text) return;
                await navigator.clipboard.writeText(text);
                typeText('📋 Senha copiada para a área de transferência.');
            } catch (e) {
                typeText('⚠️ Não foi possível copiar. Copie manualmente.');
            }
        };

        buttonContainer.appendChild(button);
        buttonContainer.appendChild(copyBtn);
        generateAnotherPasswordButtonAdded = true;
    }
}