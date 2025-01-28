// IzaacWeb V4 - Módulo de RPG do Terminal Bot  //

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
        typeText("Bem-vindo ao Terminal RPG! Por favor, selecione sua classe inicial:\n(1) Cavaleiro - 100 HP | 20 DAN\n(2) Arqueiro - 80 HP | 15 DAN\n(3) Mago - 60 HP | 25 DAN");
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
            typeText("Você não escolheu nenhuma opção válida, então você decide sair do jogo...");
            currentRPGState = '';
            return;
    }

    playMusic('audios/Wolf-Encounter.mp3');
    clearText();
    typeText(`Você escolheu a classe ${type}.\n\nSua aventura começa em um mundo onde maravilhas e caos coexistem.\n\nVocê é o único que pode sobreviver e experimentar tudo isso.\n\nEnquanto você explora a floresta, você ouve ruídos ao seu redor.\n\nPreparado para qualquer ameaça, você vê seu primeiro inimigo se aproximando.\n\nUm lobo selvagem corre na sua direção. Prepare-se para a batalha. Digite 'a' para atacar.`);
    currentRPGState = 'battleBeast';
}

function getArticleAndPronoun(weapon) {
    if (weapon === "Espada") {
        return { article: "uma", pronoun: "sua" };
    } else {
        return { article: "um", pronoun: "seu" };
    }
}

function battleBeast(input) {
    if (input === '/kill') {
        hp -= 5;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(90deg)');
        document.querySelector('html').style.setProperty('background-color', '#01488a');
        playMusic('audios/Wolf-Victory.mp3');
        clearText();
        typeText(`O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, e conseguiu. Você matou o lobo selvagem, mas sofreu alguns cortes nas pernas.\n\nVocê perdeu 5 HP. Agora você tem apenas ${hp} HP.\n\nEssa luta foi intensa.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nApós a batalha, você vê uma luz azul estranha brilhando em um caminho à sua frente. Você quer investigar? (s/n)`);
        currentRPGState = 'findShinyWeapon';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        if (hitChance <= 0.5) {
            hp -= 5;
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(90deg)');
            document.querySelector('html').style.setProperty('background-color', '#01488a');
            playMusic('audios/Wolf-Victory.mp3');
            clearText();
            typeText(`O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, e conseguiu. Você matou o lobo selvagem, mas sofreu alguns cortes nas pernas.\n\nVocê perdeu 5 HP. Agora você tem apenas ${hp} HP.\n\nEssa luta foi intensa.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nApós a batalha, você vê uma luz azul estranha brilhando em um caminho à sua frente. Você quer investigar? (s/n)`);
            currentRPGState = 'findShinyWeapon';
        } else {
            hp -= 10;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Wolf-Death.mp3');
                clearText();
                typeText("O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, mas falhou. Você atacou o lobo, mas ele desviou do ataque e pulou no seu pescoço, mordendo e cortando sua garganta, deixando você sem ar e tempo para reagir.\n\nVocê morreu.");
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e o lobo selvagem te mordeu. Você perdeu 10 HP. Agora você tem ${hp} HP.\n\nDigite 'a' para atacar novamente.`);
            }
        }
    } else {
        typeText("Entrada inválida. Digite 'a' para atacar.");
    }
}

function findShinyWeapon(input) {
    const { article, pronoun } = getArticleAndPronoun(weapon);
    if (input.toLowerCase() === 's' || input.toLowerCase() === 'sim' || input.toLowerCase() === 'claro' || input.toLowerCase() === 'com certeza' || input.toLowerCase() === 'óbvio' || input.toLowerCase() === 'óbvio que sim' || input.toLowerCase() === 'claro que sim' || input.toLowerCase() === 'yes') {
        attack += 15;
        weapon = weapon + " Brilhante"
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(130deg)');
        document.querySelector('html').style.setProperty('background-color', '#01158a');
        playMusic('audios/Final-Boss-Encounter1.mp3');
        clearText();
        typeText(`Você seguiu a luz estranha e então...\n\nUau!\n\nVocê encontrou ${article} ${weapon}! + 15 DAN\n\nSeu dano aumentou para ${attack}.\n\nAssim, você continua explorando mais fundo na floresta, e tudo começa a escurecer.\n\nVocê se pergunta: Já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande cair à distância. Você decide investigar.\n\nVocê olha para a árvore caída e uma enorme abominação escura emerge à sua frente. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} emite a luz que você viu antes, enfraquecendo a abominação\n\n|| !! BATALHA DE CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar.`);
        currentRPGState = 'battleBoss';
    } else {
        ignoreLight(input);
    }
}

function ignoreLight(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(180deg)');
    document.querySelector('html').style.setProperty('background-color', '#67018a');
    playMusic('audios/Final-Boss-Encounter2.mp3');
    clearText();
    typeText(`Você decide ignorá-la e continuar sua aventura.\n\nVocê continua mais fundo na floresta, e começa a escurecer.\n\nVocê se pergunta: Já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande cair à distância. Você decide investigar.\n\nVocê olha para a árvore caída e uma enorme abominação escura emerge à sua frente.\n\n|| !! BATALHA DE CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar.`);
    currentRPGState = 'battleBoss2';
}

function battleBoss(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        document.querySelector('html').style.setProperty('background-color', '#8a6101');
        playMusic('audios/Final-Boss-Victory1.mp3');
        clearText();
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, mas de alguma forma, ${pronoun} ${weapon} liberou um poder mágico que fez a abominação escura tremer e cair no chão. Você se aproximou dela e finalmente eliminou a abominação escura com ${pronoun} ${weapon}, fazendo-a desaparecer para sempre.\n\nEssa luta fez você entender do que realmente é capaz, enchendo-o de determinação e felicidade.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nDepois de uma aventura difícil, exaustiva e ameaçadora, você trouxe paz à floresta e a si mesmo, sendo reconhecido como um herói em todos os lugares além da floresta.\n\nFIM`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Brilhante') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
            document.querySelector('html').style.setProperty('background-color', '#8a6101');
            playMusic('audios/Final-Boss-Victory1.mp3');
            clearText();
            typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, mas de alguma forma, ${pronoun} ${weapon} liberou um poder mágico que fez a abominação escura tremer e cair no chão. Você se aproximou dela e finalmente eliminou a abominação escura com ${pronoun} ${weapon}, fazendo-a desaparecer para sempre.\n\nEssa luta fez você entender do que realmente é capaz, enchendo-o de determinação e felicidade.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nDepois de uma aventura difícil, exaustiva e ameaçadora, você trouxe paz à floresta e a si mesmo, sendo reconhecido como um herói em todos os lugares além da floresta.\n\nFIM`);
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Final-Boss-Death1.mp3');
                clearText();
                typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu, incluindo ${pronoun} ${weapon}.\n\nVocê morreu.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e a abominação escura te atingiu. Você perdeu 25 HP. Agora você tem ${hp} HP.\n\nDigite 'a' para atacar novamente.`);
            }
        }
    } else {
        typeText("Entrada inválida. Digite 'a' para atacar.");
    }
}

function battleBoss2(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        document.querySelector('html').style.setProperty('background-color', '#8a6101');
        playMusic('audios/Final-Boss-Victory2.mp3');
        clearText();
        typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, então você esperou por uma oportunidade para atacar a abominação escura.\n\nAssim você decidiu correr para atrair a abominação escura para mais perto de você, e a abominação realmente seguiu você e se aproximou. Enquanto corria, você aproveitou a oportunidade para se virar e atacar a abominação escura com ${pronoun} ${weapon}.\n\nVocê finalmente a atacou, seu ataque a perfurou, mas não teve efeito, era como atacar um fantasma.\n\nMas de alguma forma, ${pronoun} ${weapon} absorveu seu inimigo, como se fosse energia. A princípio, você não tinha ideia do que estava acontecendo, mas logo entendeu o que aconteceu. A abominação estava dentro da ${pronoun} ${weapon}, então você basicamente tinha controle sobre ela e sua energia agora.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\n${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} se tornou ${weapon} das Sombras!\n\nDepois de algum tempo explorando a floresta, você se deu um tempo para construir um lugar para chamar de "lar", e agora você vive pacificamente na floresta, com tudo o que conquistou até agora, você está feliz e em paz.\n\nFIM`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Brilhante') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
            document.querySelector('html').style.setProperty('background-color', '#8a6101');
            playMusic('audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`Inseguro sobre o que poderia acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou para o ar e desviou do seu ataque. Você só poderia matá-la estando próximo dela, então você esperou por uma oportunidade para atacar a abominação escura.\n\nAssim você decidiu correr para atrair a abominação escura para mais perto de você, e a abominação realmente seguiu você e se aproximou. Enquanto corria, você aproveitou a oportunidade para se virar e atacar a abominação escura com ${pronoun} ${weapon}.\n\nVocê finalmente a atacou, seu ataque a perfurou, mas não teve efeito, era como atacar um fantasma.\n\nMas de alguma forma, ${pronoun} ${weapon} absorveu seu inimigo, como se fosse energia. A princípio, você não tinha ideia do que estava acontecendo, mas logo entendeu o que aconteceu. A abominação estava dentro da ${pronoun} ${weapon}, então você basicamente tinha controle sobre ela e sua energia agora.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\n${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} se tornou ${weapon} das Sombras!\n\nDepois de algum tempo explorando a floresta, você se deu um tempo para construir um lugar para chamar de "lar", e agora você vive pacificamente na floresta, com tudo o que conquistou até agora, você está feliz e em paz.\n\nFIM`);
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Final-Boss-Death2.mp3');
                clearText();
                typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu.\n\nVocê morreu.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e a abominação escura te atingiu. Você perdeu 25 HP. Agora você tem ${hp} HP.\n\nDigite 'a' para atacar novamente.`);
            }
        }
    } else {
        typeText("Entrada inválida. Digite 'a' para atacar.");
    }
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
    document.querySelector('html').style.setProperty('background-color', '#001403');
    clearText();
    attack = 0;
    weapon = '';
    hp = 0;
    currentRPGState = '';
    terminalRPG();
}