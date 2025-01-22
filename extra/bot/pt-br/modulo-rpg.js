// IzaacWeb V4 - Módulo de Terminal RPG do Bot 

let currentMusic;

function playMusic(src) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }
    currentMusic = new Audio(src);
    currentMusic.loop = true;
    currentMusic.play();
}

function terminalRPG() {
    playMusic('audios/Starting-Song.mp3');
    typeText("Carregando Terminal RPG...");
    setTimeout(() => {
        clearText();
        typeText("Bem-vindo ao Terminal RPG! Por favor, selecione sua classe inicial:\n(1) Cavaleiro\n(2) Arqueiro\n(3) Mago");
        currentRPGState = 'chooseClass';
    }, 2000);
}

function handleRPG(input) {
    switch (currentRPGState) {
        case 'chooseClass':
            chooseClass(input);
            break;
        case 'battleBeast':
            battleBeast(input);
            break;
        case 'findShinyWeapon':
            findShinyWeapon(input);
            break;
        case 'ignoreLight':
            ignoreLight(input);
            break;
        case 'battleBoss':
            battleBoss(input);
            break;
        case 'battleBoss2':
            battleBoss2(input);
            break;
    }
}

function chooseClass(input) {
    let type;
    switch (input) {
        case '1':
            type = "Cavaleiro";
            weapon = "Espada";
            hp = 100;
            attack = 20;
            break;
        case '2':
            type = "Arqueiro";
            weapon = "Arco";
            hp = 80;
            attack = 15;
            break;
        case '3':
            type = "Mago";
            weapon = "Cajado";
            hp = 60;
            attack = 25;
            break;
        default:
            typeText("Você não escolheu nenhuma opção válida, então decidiu sair do jogo...");
            currentRPGState = '';
            return;
    }

    playMusic('audios/Wolf-Encounter.mp3');
    clearText();
    typeText(`Sua aventura começa em um mundo onde maravilhas e caos coexistem.\n\nVocê é o único que pode sobreviver e experimentar tudo isso.\n\nVocê escolheu a classe ${type}. Seu HP é ${hp} e seu DAN é ${attack}.\n\nEnquanto você explora a floresta, você ouve ruídos ao seu redor.\n\nPreparado para qualquer ameaça, você vê seu primeiro inimigo se aproximando.\n\nUm lobo selvagem corre na sua direção. Prepare-se para a batalha. Escolha um número entre 0-1`);
    currentRPGState = 'battleBeast';
}

function battleBeast(input) {
    const move = Math.floor(Math.random() * 2);

    if (input === '/kill' || move == input) {
        hp -= 5;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(90deg)');
        playMusic('audios/Wolf-Victory.mp3');
        clearText();
        typeText(`O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, e conseguiu. Você matou o lobo selvagem, mas sofreu alguns cortes nas pernas.\n\nVocê perdeu 5 HP. Agora você tem apenas ${hp} HP.\n\nEssa luta foi intensa.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nApós a batalha, você vê uma luz azul estranha brilhando em um caminho à sua frente. Você quer investigar? (s/n)`);
        currentRPGState = 'findShinyWeapon';
    } else {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
        playMusic('audios/Wolf-Death.mp3');
        typeText("O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, mas falhou. Você atacou o lobo, mas ele desviou do ataque e pulou no seu pescoço, mordendo e cortando sua garganta, deixando você sem ar e tempo para reagir.\n\nVocê morreu.");
        showTryAgainButton();
        currentRPGState = '';
    }
}

function findShinyWeapon(input) {
    if (input.toLowerCase() === 's' || input.toLowerCase() === 'sim') {
        attack += 15;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(130deg)');
        playMusic('audios/Final-Boss-Encounter1.mp3');
        clearText();
        typeText(`Você seguiu a luz estranha e então...\n\nUau!\n\nVocê encontrou ${weapon} Brilhante! + 15 DAN\n\nSeu dano aumentou para ${attack}.\n\nAssim, você continua explorando mais fundo na floresta, e tudo começa a escurecer.\n\nVocê se pergunta: Já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande cair à distância. Você decide investigar.\n\nVocê olha para a árvore caída e uma enorme abominação escura emerge à sua frente. Sua arma brilhante emite a luz que você viu antes, enfraquecendo a abominação\n\n|| !! BATALHA DE CHEFE !! ||\n\nPrepare-se para lutar e escolha um número entre 0-5.`);
        currentRPGState = 'battleBoss';
    } else {
        ignoreLight();
    }
}

function ignoreLight(input) {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(180deg)');
    playMusic('audios/Final-Boss-Encounter2.mp3');
    clearText();
    typeText(`Você decide ignorá-la e continuar sua aventura.\n\nVocê continua mais fundo na floresta, e começa a escurecer.\n\nVocê se pergunta: Já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande cair à distância. Você decide investigar.\n\nVocê olha para a árvore caída e uma enorme abominação escura emerge à sua frente.\n\n|| !! BATALHA DE CHEFE !! ||\n\nPrepare-se para lutar e escolha um número entre 0-9.`);
    currentRPGState = 'battleBoss2';
}

function battleBoss(input) {
    const move = Math.floor(Math.random() * 6);

    if (input === '/nuke' || move == input) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        playMusic('audios/Final-Boss-Victory1.mp3');
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa sua arma para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, mas de alguma forma, sua arma brilhante liberou um poder mágico que fez a abominação escura tremer e cair no chão. Você se aproximou dela e finalmente eliminou a abominação escura com sua arma brilhante, fazendo-a desaparecer para sempre.\n\nEssa luta fez você entender do que realmente é capaz, enchendo-o de determinação e felicidade.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nDepois de uma aventura difícil, exaustiva e ameaçadora, você trouxe paz à floresta e a si mesmo, sendo reconhecido como um herói em todos os lugares além da floresta.\n\nFIM`);
    } else {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
        playMusic('audios/Final-Boss-Death1.mp3');
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu, incluindo sua arma brilhante.\n\nVocê morreu.`);
        showTryAgainButton();
    }
    currentRPGState = '';
}

function battleBoss2(input) {
    const move = Math.floor(Math.random() * 10);

    if (input === '/nuke' || move == input) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        playMusic('audios/Final-Boss-Victory2.mp3');
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa sua arma para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, então você esperou por uma oportunidade para atacar a abominação escura.\n\nAssim você decidiu correr para atrair a abominação escura para mais perto de você, e a abominação realmente seguiu você e se aproximou. Enquanto corria, você aproveitou a oportunidade para se virar e atacar a abominação escura com sua arma.\n\nVocê finalmente a atacou, seu ataque a perfurou, mas não teve efeito, era como atacar um fantasma.\n\nMas de alguma forma, sua arma absorveu seu inimigo, como se fosse energia. A princípio, você não tinha ideia do que estava acontecendo, mas logo entendeu o que aconteceu. A abominação estava dentro da sua arma, então você basicamente tinha controle sobre ela e sua energia agora.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nSua arma se tornou ${weapon} das Sombras!\n\nDepois de algum tempo explorando a floresta, você se deu um tempo para construir um lugar para chamar de "lar", e agora você vive pacificamente na floresta, com tudo o que conquistou até agora, você está feliz e em paz.\n\nFIM`);
    } else {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
        playMusic('audios/Final-Boss-Death2.mp3');
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu.\n\nVocê morreu.`);
        showTryAgainButton();
    }
    currentRPGState = '';
}

function showTryAgainButton() {
    if (!tryAgainButtonAdded) {
        const tryAgainButton = document.createElement("button");
        tryAgainButton.textContent = "Tentar Novamente";
        tryAgainButton.className = "bot-button";
        tryAgainButton.onclick = function() {
            resetRPG();
            buttonContainer.removeChild(tryAgainButton);
            tryAgainButtonAdded = false;
        };
        buttonContainer.appendChild(tryAgainButton);
        tryAgainButtonAdded = true;
    }
}

function resetRPG() {
    document.querySelector('html').style.setProperty('filter', 'none');
    clearText();
    attack = 0;
    weapon = '';
    hp = 0;
    currentRPGState = '';
    step = 0;
    terminalRPG();
}