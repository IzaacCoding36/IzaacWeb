// IzaacWeb V5 - Terminal rpg module //

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
    playMusic('/extra/audios/Starting-Song.mp3');
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
        case 'investigateTree':
            investigateTree(input);
            break;
        case 'exploreLake':
            exploreLake(input);
            break;
        case 'battleBoss':
            battleBoss(input);
            break;
        case 'battleBoss2':
            battleBoss2(input);
            break;
        case 'battleGolem':
            battleGolem(input);
            break;
        case 'battleGolem2':
            battleGolem2(input);
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
    playMusic('/extra/audios/Wolf-Encounter.mp3');
    clearText();
    typeText(`Você escolheu a classe ${type}.\n\nSua aventura começa em um mundo onde maravilhas e caos coexistem.\n\nVocê é o único que pode sobreviver e experimentar tudo isso.\n\nEnquanto você explora a floresta, você ouve ruídos ao seu redor.\n\nPreparado para qualquer ameaça, você vê seu primeiro inimigo se aproximando.\n\nUm lobo selvagem corre na sua direção. Prepare-se para a batalha. Digite 'a' para atacar. (chance de acerto: 50%)`);
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
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(120deg)');
        document.querySelector('html').style.setProperty('background-color', '#00161e');
        playMusic('/extra/audios/Wolf-Victory.mp3');
        clearText();
        typeText(`O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, e conseguiu. Você matou o lobo selvagem, mas sofreu alguns cortes nas pernas.\n\nVocê perdeu 5 HP. Agora você tem apenas ${hp} HP.\n\nEssa luta foi intensa.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nApós a batalha, você vê uma luz azul estranha brilhando em um caminho à sua frente. Você deseja investigar? (s/n)`);
        currentRPGState = 'findShinyWeapon';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        if (hitChance <= 0.5) {
            hp -= 5;
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(120deg)');
            document.querySelector('html').style.setProperty('background-color', '#00161e');
            playMusic('/extra/audios/Wolf-Victory.mp3');
            clearText();
            typeText(`O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, e conseguiu. Você matou o lobo selvagem, mas sofreu alguns cortes nas pernas.\n\nVocê perdeu 5 HP. Agora você tem apenas ${hp} HP.\n\nEssa luta foi intensa.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nApós a batalha, você vê uma luz azul estranha brilhando em um caminho à sua frente. Você deseja investigar? (s/n)`);
            currentRPGState = 'findShinyWeapon';
        } else {
            hp -= 10;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#1e0000');
                playMusic('/extra/audios/Wolf-Death.mp3');
                clearText();
                typeText("O lobo selvagem avança em você com uma velocidade incrível. Você fez o seu melhor para atacá-lo sem ser morto, mas falhou. Você atacou o lobo, mas ele desviou do ataque e pulou no seu pescoço, mordendo e cortando sua garganta, deixando você sem ar e tempo para reagir.\n\nVocê morreu.");
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você tentou atacar o lobo, mas ele se esquivou e lhe causou alguns arranhões no corpo, mas você ainda está bem. Você perdeu 10 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: 50%)`);
            }
        }
    } else {
        typeText("Resposta inválida. Digite 'a' para atacar. (chance de acerto: 50%)");
    }
}

function findShinyWeapon(input) {
    const { article, pronoun } = getArticleAndPronoun(weapon);
    if (input.toLowerCase() === 's' || input.toLowerCase() === 'sim' || input.toLowerCase() === 'claro' || input.toLowerCase() === 'com certeza' || input.toLowerCase() === 'óbvio' || input.toLowerCase() === 'óbvio que sim' || input.toLowerCase() === 'claro que sim' || input.toLowerCase() === 'yes') {
        attack += 15;
        weapon = weapon + " Brilhante"
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(160deg)');
        document.querySelector('html').style.setProperty('background-color', '#0e001e');
        playMusic('audios/Path1.mp3');
        clearText();
        typeText(`Você seguiu a luz estranha e então...\n\nUau!\n\nVocê encontrou ${article} ${weapon}! + 15 DMG\n\nSeu dano aumentou para ${attack}.\n\nDepois de adquirir ${pronoun} ${weapon}, você avança mais fundo na floresta e começa a escurecer.\n\nVocê se pergunta: já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande caindo ao longe. Você deseja investigar a árvore caída? (s/n)`);
        currentRPGState = 'investigateTree';
    } else {
        ignoreLight(input);
    }
}

function ignoreLight(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(210deg)');
    document.querySelector('html').style.setProperty('background-color', '#16001e');
    playMusic('/extra/audios/Path2.mp3');
    clearText();
    typeText(`Você decide ignorá-lo e continuar sua aventura.\n\nVocê avança mais fundo na floresta e começa a escurecer.\n\nVocê se pergunta: já é noite? Algo parece muito estranho. De repente, você vê uma árvore muito grande caindo ao longe. Você deseja investigar a árvore caída? (s/n)`);
    currentRPGState = 'investigateTree';
}

function investigateTree(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input.toLowerCase() === 's' & attack >= 30 || input.toLowerCase() === 'sim' & attack >= 30 || input.toLowerCase() === 'claro' & attack >= 30 || input.toLowerCase() === 'com certeza' & attack >= 30 || input.toLowerCase() === 'óbvio' & attack >= 30 || input.toLowerCase() === 'óbvio que sim' & attack >= 30 || input.toLowerCase() === 'yes' & attack >= 30) {
        playMusic('/extra/audios/Abomination-Encounter1.mp3');
        clearText();
        typeText(`Você decide investigar a árvore caída e descobre uma enorme abominação escura emergindo dela.\n\n${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} emite uma luz brilhante como antes, enfraquecendo a abominação.\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 40%)`);
        currentRPGState = 'battleBoss';
    } else if (input.toLowerCase() === 's' || input.toLowerCase() === 'sim' || input.toLowerCase() === 'claro' || input.toLowerCase() === 'com certeza' || input.toLowerCase() === 'óbvio' || input.toLowerCase() === 'óbvio que sim' || input.toLowerCase() === 'claro que sim' || input.toLowerCase() === 'yes') {
        playMusic('/extra/audios/Abomination-Encounter2.mp3');
        clearText();
        typeText(`Você decide investigar a árvore caída e descobre uma enorme abominação escura emergindo dela.\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 30%)`);
        currentRPGState = 'battleBoss2';
    } else if (input.toLowerCase() !== 's' & weapon.includes('Brilhante') || input.toLowerCase() !== 'sim' & weapon.includes('Brilhante') || input.toLowerCase() !== 'claro' & weapon.includes('Brilhante') || input.toLowerCase() !== 'com certeza' & weapon.includes('Brilhante') || input.toLowerCase() !== 'óbvio' & weapon.includes('Brilhante') || input.toLowerCase() !== 'óbvio que sim' & weapon.includes('Brilhante') || input.toLowerCase() !== 'yes' & weapon.includes('Brilhante')) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(60deg)');
        document.querySelector('html').style.setProperty('background-color', '#001e11');
        playMusic('/extra/audios/Lake-Encounter1.mp3');
        clearText();
        typeText(`Você decide não investigar a árvore caída e, em vez disso, segue outro caminho que o leva a um lago sereno.\n\nNo lago, você aprecia a beleza do ambiente, sentindo-se atraído para ver seu reflexo e beber um pouco da água do lago.\n\nE ${pronoun} ${weapon} brilha levemente de acordo com a paz que você está sentindo agora.\n\nVocê deseja olhar para seu reflexo e beber a água? (s/n)`);
        currentRPGState = 'exploreLake';
    } else {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(60deg)');
        document.querySelector('html').style.setProperty('background-color', '#001e11');
        playMusic('/extra/audios/Lake-Encounter2.mp3');
        clearText();
        typeText(`Você decide não investigar a árvore caída e, em vez disso, segue outro caminho que o leva a um lago sereno.\n\nNo lago, você aprecia a beleza do ambiente, sentindo-se atraído para ver seu reflexo e beber um pouco da água do lago.\n\nVocê deseja olhar para seu reflexo e beber a água? (s/n)`);
        currentRPGState = 'exploreLake';
    }
}

function exploreLake(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input.toLowerCase() === 's' & attack >= 30 || input.toLowerCase() === 'sim' & attack >= 30 || input.toLowerCase() === 'claro' & attack >= 30 || input.toLowerCase() === 'com certeza' & attack >= 30 || input.toLowerCase() === 'óbvio' & attack >= 30 || input.toLowerCase() === 'óbvio que sim' & attack >= 30 || input.toLowerCase() === 'yes' & attack >= 30) {
        hp += 40;
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`Você olha para o seu reflexo no lago e se vê, com ${pronoun} incrível ${weapon} que brilha com baixa intensidade, cansado e machucado após uma aventura intensa.\n\nDepois de se sentir determinado ao ver seu reflexo, você bebe um pouco da água do lago, isso lhe traz uma onda de vitalidade. Você recupera 40 HP. Agora você tem ${hp} HP.\n\nSentindo-se aliviado, você continua sua jornada e logo se encontra em frente a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 20%)`);
        currentRPGState = 'battleGolem';
    } else if (input.toLowerCase() === 's' || input.toLowerCase() === 'sim' || input.toLowerCase() === 'claro' || input.toLowerCase() === 'com certeza' || input.toLowerCase() === 'óbvio' || input.toLowerCase() === 'óbvio que sim' || input.toLowerCase() === 'claro que sim' || input.toLowerCase() === 'yes') {
        hp += 40;
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`Você olha para o seu reflexo no lago e se vê, com ${pronoun} incrível ${weapon}, cansado e machucado após uma aventura intensa.\n\nDepois de se sentir determinado ao ver seu reflexo, você bebe um pouco da água do lago, isso lhe traz uma onda de vitalidade. Você recupera 40 HP. Agora você tem ${hp} HP.\n\nSentindo-se aliviado, você continua sua jornada e logo se encontra em frente a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta furiosamente assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 10%)`);
        currentRPGState = 'battleGolem2';
    } else if (input.toLowerCase() !== 's' & weapon.includes('Brilhante') || input.toLowerCase() !== 'sim' & weapon.includes('Brilhante') || input.toLowerCase() !== 'claro' & weapon.includes('Brilhante') || input.toLowerCase() !== 'com certeza' & weapon.includes('Brilhante') || input.toLowerCase() !== 'óbvio' & weapon.includes('Brilhante') || input.toLowerCase() !== 'óbvio que sim' & weapon.includes('Brilhante') || input.toLowerCase() !== 'yes' & weapon.includes('Brilhante')) {
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`Você decide não olhar para o seu reflexo e continua sua jornada.\n\nLogo, você se encontra diante de um templo abandonado na selva. Lá dentro, você encontra um golem de pedra, que desperta assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 20%)`);
        currentRPGState = 'battleGolem';
    } else {
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`Você decide não olhar para o seu reflexo e continua sua jornada.\n\nLogo, você se encontra diante de um templo abandonado na selva. Lá dentro, você encontra um golem de pedra, que desperta furiosamente assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de sucesso: 10%)`);
        currentRPGState = 'battleGolem2';
    }
}

function battleBoss(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`Sem saber o que pode acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou no ar e se esquivou do seu ataque. Você só poderia matá-lo estando próximo a ele, mas de alguma forma, ${pronoun} ${weapon} liberou um poder mágico que fez a abominação escura tremer e cair no chão. Você se aproximou dele e finalmente acabou com a abominação escura com ${pronoun} ${weapon}, fazendo-a desaparecer para sempre.\n\nEssa luta fez você entender do que você realmente é capaz, enchendo-o de determinação e felicidade.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nVocê avança mais fundo na floresta e eventualmente chega a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 20%)`);
        currentRPGState = 'battleGolem';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Brilhante') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
           document.querySelector('html').style.setProperty('filter', 'sepia(2)');
           document.querySelector('html').style.setProperty('background-color', '#1e1900');
           playMusic('/extra/audios/Golem-Encounter1.mp3');
           clearText();
           typeText(`Sem saber o que pode acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou no ar e se esquivou do seu ataque. Você só poderia matá-lo estando próximo a ele, mas de alguma forma, ${pronoun} ${weapon} liberou um poder mágico que fez a abominação escura tremer e cair no chão. Você se aproximou dele e finalmente acabou com a abominação escura com ${pronoun} ${weapon}, fazendo-a desaparecer para sempre.\n\nEssa luta fez você entender do que você realmente é capaz, enchendo-o de determinação e felicidade.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\nVocê avança mais fundo na floresta e eventualmente chega a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 20%)`);
           currentRPGState = 'battleGolem';
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('/extra/audios/Abomination-Death1.mp3');
                clearText();
                typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu, incluindo ${pronoun} ${weapon}.\n\nVocê morreu.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e a abominação escura lança uma rajada de vento em sua direção, lhe dando arrepios, mas você ainda mantém sua postura. Você perdeu 25 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: 40%)`);
            }
        }
    } else {
        typeText("Resposta inválida. Digite 'a' para atacar. (chance de acerto: 40%)");
    }
}

function battleBoss2(input) {
    const { article, pronoun } = getArticleAndPronoun(weapon);
    if (input === '/nuke') {
        attack += 25;
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`Sem saber o que pode acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou no ar e se esquivou do seu ataque. Você só poderia matá-lo estando próximo a ele, então esperou por uma oportunidade para atacar a abominação escura.\n\nEntão você decidiu correr para atrair a abominação escura para mais perto de você, e a abominação realmente o seguiu e se aproximou. Enquanto corria, você aproveitou a oportunidade para se virar e atacar a abominação escura com ${pronoun} ${weapon}.\n\nVocê finalmente a atacou, seu ataque a perfurou, mas não teve efeito, foi como atacar um fantasma.\n\nMas de alguma forma, ${pronoun} ${weapon} absorveu o seu inimigo, como se fosse energia. No início você não tinha ideia do que estava acontecendo, mas logo entendeu o que aconteceu. A abominação estava dentro da ${pronoun} ${weapon}, então você basicamente tinha controle sobre ela e sua energia agora.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\n${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} se tornou ${article} ${weapon} das Sombras! + 25 DMG\n\nSeu DMG aumentou para ${attack}.\n\nVocê avança mais fundo na floresta e eventualmente chega a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta furiosamente assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 30%)`);
        weapon = weapon + " das Sombras";
        currentRPGState = 'battleGolem2';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Brilhante') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            attack += 25;
            document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
            document.querySelector('html').style.setProperty('background-color', '#191919');
            playMusic('/extra/audios/Golem-Encounter2.mp3');
            clearText();
            typeText(`Sem saber o que pode acontecer a seguir, você se concentra na abominação escura e usa ${pronoun} ${weapon} para atacá-la.\n\nA abominação escura voou no ar e se esquivou do seu ataque. Você só poderia matá-lo estando próximo a ele, então esperou por uma oportunidade para atacar a abominação escura.\n\nEntão você decidiu correr para atrair a abominação escura para mais perto de você, e a abominação realmente o seguiu e se aproximou. Enquanto corria, você aproveitou a oportunidade para se virar e atacar a abominação escura com ${pronoun} ${weapon}.\n\nVocê finalmente a atacou, seu ataque a perfurou, mas não teve efeito, foi como atacar um fantasma.\n\nMas de alguma forma, ${pronoun} ${weapon} absorveu o seu inimigo, como se fosse energia. No início você não tinha ideia do que estava acontecendo, mas logo entendeu o que aconteceu. A abominação estava dentro da ${pronoun} ${weapon}, então você basicamente tinha controle sobre ela e sua energia agora.\n\nInimigo ELIMINADO!! Parabéns, ${userName}!\n\n${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${weapon} se tornou ${article} ${weapon} das Sombras! + 25 DMG\n\nSeu DMG aumentou para ${attack}.\n\nVocê avança mais fundo na floresta e eventualmente chega a um templo abandonado em uma selva próxima à floresta. Lá dentro, você encontra um golem de pedra, que desperta furiosamente assim que você se aproxima dele.\n\n|| !! BATALHA DO CHEFE !! ||\n\nPrepare-se para lutar e digite 'a' para atacar. (chance de acerto: 30%)`);
            weapon = weapon + " das Sombras";
            currentRPGState = 'battleGolem2';
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('/extra/audios/Abomination-Death2.mp3');
                clearText();
                typeText(`Inseguro sobre o que poderia acontecer a seguir, você ficou com medo da abominação escura que estava bem na sua frente, e então ela agarrou você e tudo escureceu.\n\nVocê morreu.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e a abominação escura lança uma rajada de vento em você, causando arrepios, mas você ainda mantém sua postura. Você perdeu 25 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: 30%)`);
            }
        }
    } else {
        typeText("Resposta inválida. Digite 'a' para atacar. (chance de acerto: 30%)");
    }
}

function battleGolem(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input === '/execute') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory1.mp3');
        clearText();
        typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê atinge o golem com ${pronoun} ${weapon}, então a luz de ${pronoun} ${weapon} faz com que o golem perca o controle por causa da força estranha que o mantém vivo, e então ele começa a rachar e desmoronar enquanto um ruído irritante começa a surgir dele.\n\nCom um poderoso golpe final, você quebra o golem em pedaços e todo o lugar fica em silêncio, já está quase amanhecendo então você vai ficar aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nDepois de uma aventura difícil, exaustiva e ameaçadora, você trouxe paz à selva, à floresta e a si mesmo, sendo reconhecido como um herói em todos os lugares além da floresta.\n\nFIM`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Brilhante') ? 0.2 : 0.1;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory1.mp3');
            clearText();
            typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê atinge o golem com ${pronoun} ${weapon}, então a luz de ${pronoun} ${weapon} faz com que o golem perca o controle por causa da força estranha que o mantém vivo, e então ele começa a rachar e desmoronar enquanto um ruído irritante começa a surgir dele.\n\nCom um poderoso golpe final, você quebra o golem em pedaços e todo o lugar fica em silêncio, já está quase amanhecendo então você vai ficar aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nDepois de uma aventura difícil, exaustiva e ameaçadora, você trouxe paz à selva, à floresta e a si mesmo, sendo reconhecido como um herói em todos os lugares além da floresta.\n\nFIM`);
            currentRPGState = '';
        } else {
            hp -= 30;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#1e0000');
                playMusic('/extra/audios/Golem-Death1.mp3');
                clearText();
                typeText(`O golem de pedra atinge você com um golpe poderoso e você cai no chão. Enquanto você está tonto com o impacto, o golem se aproxima de você e te esmaga como se você fosse um inseto.\n\nVocê morreu.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`Você errou o ataque e o golem de pedra aproveitou para te atacar, então ele te atinge com um forte impacto, te jogando contra a parede, você fica atordoado por um momento mas logo você se recupera. Você perdeu 30 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: ${hitThreshold * 100}%)`);
            }
        }
    } else {
        typeText(`Resposta inválida. Digite 'a' para atacar. (chance de acerto: ${hitThreshold * 100}%)`);
    }
}

function battleGolem2(input) {
    const { pronoun } = getArticleAndPronoun(weapon);
    if (input === '/execute' & attack >= 40) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory2.mp3');
        clearText();
        typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê atinge o golem com ${pronoun} ${weapon}, então o poder sombrio de ${pronoun} ${weapon} faz com que o golem perca o controle por causa da força estranha que o mantém vivo, e então ele começa a rachar e desmoronar quando um ruído irritante começa a surgir dele.\n\nCom um poderoso golpe final, você quebra o golem em pedaços e todo o lugar fica em silêncio, está quase amanhecendo então você ficará aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nFinalmente você decidiu ficar no templo, aguardando qualquer ameaça que possa surgir e tirar a paz que agora reina sobre a floresta e a selva.\n\nFIM`);
        currentRPGState = '';
    } else if (input === '/execute') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory2.mp3');
        clearText();
        typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê acertou o golem com ${pronoun} ${weapon}, o golem é muito forte, então você precisou atacá-lo várias vezes, e então ele começou a rachar e desmoronar, finalmente dando a você a oportunidade de derrubá-lo.\n\nCom um golpe final poderoso, você quebra o golem em pedaços e o todo o lugar fica tranquilo, já está quase amanhecendo então você vai ficar aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nFinalmente você decidiu ficar no templo, agora o templo servirá como um lugar para você chamar de "casa", como uma lembrança de todas as suas vitórias e aventuras épicas até agora, sendo reconhecido por todos como o grande herói da terra desconhecida, onde não só existe o caos, mas também maravilhas.\n\nFIM`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' & attack >= 40 || input.toLowerCase() === 'ataque' & attack >= 40 || input.toLowerCase() === 'atacar' & attack >= 40) {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Sombras') ? 0.3 : 0.1;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê atinge o golem com ${pronoun} ${weapon}, então o poder sombrio de ${pronoun} ${weapon} faz com que o golem perca o controle por causa da força estranha que o mantém vivo, e então ele começa a rachar e desmoronar quando um ruído irritante começa a surgir dele.\n\nCom um final poderoso golpe, você quebra o golem em pedaços e todo o lugar fica em silêncio, está quase amanhecendo então você ficará aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nFinalmente você decidiu ficar no templo, aguardando qualquer ameaça que possa surgir e tirar a paz que agora reina sobre a floresta e a selva.\n\nFIM`);
            currentRPGState = '';
            } else {
                hp -= 30;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                    document.querySelector('html').style.setProperty('background-color', '#1e0000');
                    playMusic('audios/Golem-Death2.mp3');
                    clearText();
                    typeText(`O golem de pedra atinge você com um golpe poderoso e você cai no chão. Enquanto você está tonto com o impacto, o golem se aproxima de você e te esmaga como se você fosse um inseto.\n\nVocê morreu.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`Você errou o ataque e o golem de pedra aproveitou para te atacar, então ele te atinge com um forte impacto, te jogando contra a parede, você fica atordoado por um momento mas logo você se recupera. Você perdeu 30 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: ${hitThreshold * 100}%)`);
                }
            }
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'ataque' || input.toLowerCase() === 'atacar') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Sombras') ? 0.3 : 0.1;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`Você se concentra no golem de pedra e usa ${pronoun} ${weapon} para atacá-lo.\n\nO golem é lento, mas poderoso, e você consegue se esquivar de seus ataques com sucesso.\n\nVocê acertou o golem com ${pronoun} ${weapon}, o golem é muito forte, então você precisou atacá-lo várias vezes, e então ele começou a rachar e desmoronar, finalmente dando a você a oportunidade de derrubá-lo.\n\nCom um golpe final poderoso, você quebra o golem em pedaços e o todo o lugar fica tranquilo, já está quase amanhecendo então você vai ficar aqui por um tempo.\n\nChefe ELIMINADO!! Parabéns, ${userName}!\n\nFinalmente você decidiu ficar no templo, agora o templo servirá como um lugar para você chamar de "casa", como uma lembrança de todas as suas vitórias e aventuras épicas até agora, sendo reconhecido por todos como o grande herói da terra desconhecida, onde não só existe o caos, mas também maravilhas.\n\nFIM`);
            currentRPGState = '';
            } else {
                hp -= 30;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                    document.querySelector('html').style.setProperty('background-color', '#1e0000');
                    playMusic('audios/Golem-Death2.mp3');
                    clearText();
                    typeText(`O golem de pedra atinge você com um golpe poderoso e você cai no chão. Enquanto você está tonto com o impacto, o golem se aproxima de você e te esmaga como se você fosse um inseto.\n\nVocê morreu.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`Você errou o ataque e o golem de pedra aproveitou para te atacar, então ele te atinge com um forte impacto, te jogando contra a parede, você fica atordoado por um momento mas logo você se recupera. Você perdeu 30 HP. Agora você tem ${hp} HP restantes.\n\nDigite 'a' para atacar novamente. (chance de acerto: ${hitThreshold * 100}%)`);
                }
            }
    } else {
        typeText(`Resposta inválida. Digite 'a' para atacar. (chance de acerto: ${hitThreshold * 100}%)`);
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
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(30deg)');
    document.querySelector('html').style.setProperty('background-color', 'var(--background-primary)');
    clearText();
    attack = 0;
    weapon = '';
    hp = 0;
    currentRPGState = '';
    terminalRPG();
}