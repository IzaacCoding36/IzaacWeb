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
    typeText("Loading Terminal RPG...");
    setTimeout(() => {
        clearText();
        typeText("Welcome to the Terminal RPG! Please select your starting class:\n(1) Knight - 100 HP | 20 DMG\n(2) Archer - 80 HP | 15 DMG\n(3) Mage - 60 HP | 25 DMG");
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
            type = "Knight";
            weapon = "Sword";
            hp = 100;
            attack = 20;
            break;
        case '2':
            type = "Archer";
            weapon = "Bow";
            hp = 80;
            attack = 15;
            break;
        case '3':
            type = "Mage";
            weapon = "Staff";
            hp = 60;
            attack = 25;
            break;
        default:
            typeText("You haven't chosen any valid options, so you decided to leave the game...");
            currentRPGState = '';
            return;
    }
    playMusic('/extra/audios/Wolf-Encounter.mp3');
    clearText();
    typeText(`You have chosen the ${type} class.\n\nYour adventure begins in a world where both wonder and chaos coexist.\n\nYou are the only one who can survive and experience all of this.\n\nAs you explore the forest, you keep hearing noises around you.\n\nPrepared for any threat, you see your first enemy approaching.\n\nA wild wolf charges at you. Prepare to battle. Type 'a' to attack. (chance of success: 50%)`);
    currentRPGState = 'battleBeast';
}

function battleBeast(input) {
    if (input === '/kill') {
        hp -= 5;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(120deg)');
        document.querySelector('html').style.setProperty('background-color', '#00161e');
        playMusic('/extra/audios/Wolf-Victory.mp3');
        clearText();
        typeText(`The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, and you succeeded. You killed the wild wolf after suffering some small cuts on your legs.\n\nYou lost 5 HP. Now you have only ${hp} HP left.\n\nThis fight was intense.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nAfter the battle, you see a strange blue light shining on a path ahead of you. Do you want to investigate it? (y/n)`);
        currentRPGState = 'findShinyWeapon';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        if (hitChance <= 0.5) {
            hp -= 5;
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(120deg)');
            document.querySelector('html').style.setProperty('background-color', '#00161e');
            playMusic('/extra/audios/Wolf-Victory.mp3');
            clearText();
            typeText(`The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, and you succeeded. You killed the wild wolf after suffering some small cuts on your legs.\n\nYou lost 5 HP. Now you have only ${hp} HP left.\n\nThis fight was intense.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nAfter the battle, you see a strange blue light shining on a path ahead of you. Do you want to investigate it? (y/n)`);
            currentRPGState = 'findShinyWeapon';
        } else {
            hp -= 10;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#1e0000');
                playMusic('/extra/audios/Wolf-Death.mp3');
                clearText();
                typeText("The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, but you failed. You attacked the wolf, but it dodged your attack and jumped on your neck, biting you and cutting your throat, leaving you without air and time to react.\n\nYou died.");
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`You tried to attack the wolf but it dodged and gave you some scratches on your body, but you're still fine. You lost 10 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 50%)`);
            }
        }
    } else {
        typeText("Invalid input. Type 'a' to attack. (chance of success: 50%)");
    }
}

function findShinyWeapon(input) {
    if (input.toLowerCase() === 'y' || input.toLowerCase() === 'yes' || input.toLowerCase() === 'yep' || input.toLowerCase() === 'yeah' || input.toLowerCase() === 'sure' || input.toLowerCase() === 'of course') {
        attack += 15;
        weapon = "Shiny Magic Powered " + weapon;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(160deg)');
        document.querySelector('html').style.setProperty('background-color', '#0e001e');
        playMusic('/extra/audios/Path1.mp3');
        clearText();
        typeText(`You followed the strange light and then...\n\nWow!\n\nYou found a ${weapon}! + 15 DMG\n\nYour damage has increased to ${attack}.\n\nAfter acquiring your new ${weapon}, you proceed deeper into the forest, and it starts getting darker.\n\nYou wonder: Is it already night? Something feels very strange. Suddenly, you see a very big tree fall in the distance. Do you want to investigate the fallen tree? (y/n)`);
        currentRPGState = 'investigateTree';
    } else {
        ignoreLight(input);
    }
}

function ignoreLight(input) {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(210deg)');
    document.querySelector('html').style.setProperty('background-color', '#16001e');
    playMusic('/extra/audios/Path2.mp3');
    clearText();
    typeText(`You decide to ignore it and continue your adventure.\n\nYou proceed deeper into the forest, and it starts getting darker.\n\nYou wonder: Is it already night? Something feels very strange. Suddenly, you see a very big tree fall in the distance. Do you want to investigate the fallen tree? (y/n)`);
    currentRPGState = 'investigateTree';
}

function investigateTree(input) {
    const answer = input.toLowerCase();
    const isYes = ['y', 'yes', 'yep', 'yeah', 'sure', 'of course'].includes(answer);
    if (isYes && attack >= 30) {
        playMusic('/extra/audios/Abomination-Encounter1.mp3');
        clearText();
        typeText(`You decide to investigate the fallen tree and discover a huge dark abomination emerging from it.\n\nYour ${weapon} emits a bright light just like before, weakening the abomination.\n\nGet ready to fight and type 'a' to attack. (chance of success: 40%)`);
        currentRPGState = 'battleBoss';
    } else if (isYes) {
        playMusic('/extra/audios/Abomination-Encounter2.mp3');
        clearText();
        typeText(`You decide to investigate the fallen tree and discover a huge dark abomination emerging from it.\n\nGet ready to fight and type 'a' to attack. (chance of success: 30%)`);
        currentRPGState = 'battleBoss2';
    } else if (!isYes && weapon.includes('Shiny')) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(60deg)');
        document.querySelector('html').style.setProperty('background-color', '#001e11');
        playMusic('/extra/audios/Lake-Encounter1.mp3');
        clearText();
        typeText(`You decide not to investigate the fallen tree and instead follow another path that leads you to a serene lake.\n\nAt the lake, you appreciate the beauty of your surroundings, feeling drawn to see your reflection and drink some of the water in the lake.\n\nAnd your ${weapon} glows slightly according to the peace you are feeling right now.\n\nDo you want to look at your reflection and drink the water? (y/n)`);
        currentRPGState = 'exploreLake';
    } else {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(60deg)');
        document.querySelector('html').style.setProperty('background-color', '#001e11');
        playMusic('/extra/audios/Lake-Encounter2.mp3');
        clearText();
        typeText(`You decide not to investigate the fallen tree and instead follow another path that leads you to a serene lake.\n\nAt the lake, you appreciate the beauty of your surroundings, feeling drawn to see your reflection and drink some of the water in the lake.\n\nDo you want to look at your reflection and drink the water? (y/n)`);
        currentRPGState = 'exploreLake';
    }
}

function exploreLake(input) {
    const answer = input.toLowerCase();
    const isYes = ['y', 'yes', 'yep', 'yeah', 'sure', 'of course'].includes(answer);
    if (isYes && attack >= 30) {
        hp += 40;
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`You look at your reflection in the lake and see yourself, with your incredible ${weapon} that glows with a low intensity, tired and bruised after an intense adventure.\n\nAfter feeling determined at the sight of your reflection, you drink some of the water in the lake, this brings you a surge of vitality. You recover 40 HP. Now you have ${hp} HP.\n\nFeeling relieved, you continue your journey and soon find yourself in front of an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 20%)`);
        currentRPGState = 'battleGolem';
    } else if (isYes) {
        hp += 40;
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`You look at your reflection in the lake and see yourself, with your incredible ${weapon}, tired and bruised after an intense adventure.\n\nAfter feeling determined at the sight of your reflection, you drink some of the water in the lake, this brings you a surge of vitality. You recover 40 HP. Now you have ${hp} HP.\n\nFeeling relieved, you continue your journey and soon find yourself in front of an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens furiously as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 10%)`);
        currentRPGState = 'battleGolem2';
    } else if (!isYes && attack >= 30) {
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`You decide not to look at your reflection and continue your journey.\n\nSoon, you find yourself in front of an abandoned temple in a jungle. Inside, you encounter a stone golem, which awakens as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 20%)`);
        currentRPGState = 'battleGolem';
    } else {
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`You decide not to look at your reflection and continue your journey.\n\nSoon, you find yourself in front of an abandoned temple in the jungle. Inside, you encounter a stone golem, which awakens furiously as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 10%)`);
        currentRPGState = 'battleGolem2';
    }
}

function battleBoss(input) {
        if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'sepia(2)');
        document.querySelector('html').style.setProperty('background-color', '#1e1900');
        playMusic('/extra/audios/Golem-Encounter1.mp3');
        clearText();
        typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, but somehow, your ${weapon} unleashed a magic power that made the dark abomination tremble and fall to the ground. You went closer to it and finally finished the dark abomination with your ${weapon}, making it vanish forever.\n\nThis fight made you understand what you're really capable of, filling you with determination and happiness.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nYou proceed deeper into the forest and eventually reach an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 20%)`);
        currentRPGState = 'battleGolem';
        } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
            const hitChance = Math.random();
            const hitThreshold = weapon.includes('Shiny') ? 0.4 : 0.3;

            if (hitChance <= hitThreshold) {
                document.querySelector('html').style.setProperty('filter', 'sepia(2)');
                document.querySelector('html').style.setProperty('background-color', '#1e1900');
                playMusic('/extra/audios/Golem-Encounter1.mp3');
                clearText();
                typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, but somehow, your ${weapon} unleashed a magic power that made the dark abomination tremble and fall to the ground. You went closer to it and finally finished the dark abomination with your ${weapon}, making it vanish forever.\n\nThis fight made you understand what you're really capable of, filling you with determination and happiness.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nYou proceed deeper into the forest and eventually reach an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 20%)`);
                currentRPGState = 'battleGolem';
            } else {
                hp -= 25;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                    document.querySelector('html').style.setProperty('background-color', '#8a0101');
                    playMusic('/extra/audios/Abomination-Death1.mp3');
                    clearText();
                    typeText(`Uncertain of what could happen next, you became scared of the dark abomination that was right in front of you, and then it suddenly grabbed you and everything turned dark, including your ${weapon}.\n\nYou died.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`You missed the attack and the dark abomination launches a gust of wind at you, giving you goosebumps, but you still maintain your posture. You lost 25 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 40%)`);
                }
            }
        } else {
            typeText("Invalid input. Type 'a' to attack. (chance of success: 40%)");
        }
}

function battleBoss2(input) {
    if (input === '/nuke') {
        attack += 25;
        document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
        document.querySelector('html').style.setProperty('background-color', '#191919');
        playMusic('/extra/audios/Golem-Encounter2.mp3');
        clearText();
        typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, so you waited for an opportunity to attack the dark abomination.\n\nThen you decided to run to attract the dark abomination closer to you, and the abomination actually followed you and got closer. While running, you took the opportunity to turn around and attack the dark abomination with your ${weapon}.\n\nYou finally attacked it, your attack pierced it but had no effect, it was like attacking a ghost.\n\nBut somehow, your ${weapon} absorbed your enemy, like it was energy. At first, you had no clue what was happening, but soon you understood what happened. The abomination was inside your ${weapon}, so you basically had control over it and its energy now.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nYour ${weapon} became a Shadow ${weapon}! + 25 DMG\n\nYour DMG has increased to ${attack}.\n\nYou proceed deeper into the forest and eventually reach an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens furiously as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 30%)`);
        weapon = "Shadow " + weapon;
        currentRPGState = 'battleGolem2';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Shiny') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            attack += 25
            document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
            document.querySelector('html').style.setProperty('background-color', '#191919');
            playMusic('/extra/audios/Golem-Encounter2.mp3');
            clearText();
            typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, so you waited for an opportunity to attack the dark abomination.\n\nThen you decided to run to attract the dark abomination closer to you, and the abomination actually followed you and got closer. While running, you took the opportunity to turn around and attack the dark abomination with your ${weapon}.\n\nYou finally attacked it, your attack pierced it but had no effect, it was like attacking a ghost.\n\nBut somehow, your ${weapon} absorbed your enemy, like it was energy. At first, you had no clue what was happening, but soon you understood what happened. The abomination was inside your ${weapon}, so you basically had control over it and its energy now.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nYour ${weapon} became a Shadow ${weapon}! + 25 DMG\n\nYour DMG has increased to ${attack}.\n\nYou proceed deeper into the forest and eventually reach an abandoned temple in a jungle next to the forest. Inside, you encounter a stone golem, which awakens furiously as soon as you approach it.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 30%)`);
            weapon = "Shadow " + weapon;
            currentRPGState = 'battleGolem2';
            } else {
                hp -= 25;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                    document.querySelector('html').style.setProperty('background-color', '#8a0101');
                    playMusic('/extra/audios/Abomination-Death2.mp3');
                    clearText();
                    typeText(`Uncertain of what could happen next, you became scared of the dark abomination that was right in front of you, and then it suddenly grabbed you and everything turned dark.\n\nYou died.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`You missed the attack and the dark abomination launches a gust of wind at you, giving you goosebumps, but you still maintain your posture. You lost 25 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 30%)`);
                }
            }
    } else {
        typeText("Invalid input. Type 'a' to attack. (chance of success: 30%)");
    }
}

function battleGolem(input) {
    const hitThreshold = weapon.includes('Shiny') ? 0.2 : 0.1;
    if (input === '/execute') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory1.mp3');
        clearText();
        typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, then the light from your ${weapon} causes the golem to lose control because of the strange force keeping it alive, and then it starts to crack and crumble as an annoying noise starts to arise out of it.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place goes quiet, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nAfter a hard, exhausting, and threatening adventure, you brought peace to the jungle, to the forest and to yourself, being recognized as a hero everywhere beyond the woods.\n\nTHE END`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
    const hitChance = Math.random();

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory1.mp3');
            clearText();
            typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, then the light from your ${weapon} causes the golem to lose control because of the strange force keeping it alive, and then it starts to crack and crumble as an annoying noise starts to arise out of it.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place goes quiet, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nAfter a hard, exhausting, and threatening adventure, you brought peace to the jungle, to the forest and to yourself, being recognized as a hero everywhere beyond the woods.\n\nTHE END`);
            currentRPGState = '';
        } else {
            hp -= 30;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                document.querySelector('html').style.setProperty('background-color', '#1e0000');
                playMusic('/extra/audios/Golem-Death1.mp3');
                clearText();
                typeText(`The stone golem hits you with a powerful blow and you fall to the ground. While you are dizzy from the impact, the golem approaches you and crushes you like a bug.\n\nYou died.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`You missed the attack and the stone golem took this opportunity to attack you, then it hits you with a strong impact, throwing you against the wall, you get stunned for a moment but soon you recover yourself. You lost 30 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: ${hitThreshold * 100}%)`);
            }
        }
    } else {
        typeText(`Invalid input. Type 'a' to attack. (chance of success: ${hitThreshold * 100}%)`);
    }
}

function battleGolem2(input) {
   if (input === '/execute' && attack >= 40) {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory2.mp3');
        clearText();
        typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, then the dark power from your ${weapon} causes the golem to lose control because of the strange force keeping it alive, and then it starts to crack and crumble as an annoying noise starts to arise out of it.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place goes quiet, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nFinally you decided to stay in the temple, awaiting for any threat that may arise and take away the peace that now reigns over the forest and jungle.\n\nTHE END`);
        currentRPGState = '';
    } else if (input === '/execute') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
        document.querySelector('html').style.setProperty('background-color', '#1e1800');
        playMusic('/extra/audios/Final-Boss-Victory2.mp3');
        clearText();
    typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, the golem is really strong, so you needed to attack it several times, and then it started to crack and crumble, finally giving you an opportunity to take it down.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place turns peaceful, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nFinally you decided to stay in the temple, now the temple will serve as a place for you to call \"home\", as a reminder of all your epic victories and adventures so far, being recognized by everyone as the great hero of the unknown land, where not only chaos exists, but also wonders.\n\nTHE END`);
        currentRPGState = '';
    } else if ((input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') && attack >= 40) {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Shadow') ? 0.3 : 0.1;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, then the dark power from your ${weapon} causes the golem to lose control because of the strange force keeping it alive, and then it starts to crack and crumble as an annoying noise starts to arise out of it.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place goes quiet, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nFinally you decided to stay in the temple, awaiting for any threat that may arise and take away the peace that now reigns over the forest and jungle.\n\nTHE END`);
            currentRPGState = '';
            } else {
                hp -= 30;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                    document.querySelector('html').style.setProperty('background-color', '#1e0000');
                    playMusic('/extra/audios/Golem-Death2.mp3');
                    clearText();
                    typeText(`The stone golem hits you with a powerful blow and you fall to the ground. While you are dizzy from the impact, the golem approaches you and crushes you like a bug.\n\nYou died.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`You missed the attack and the stone golem took this opportunity to attack you, then it hits you with a strong impact, throwing you against the wall, you get stunned for a moment but soon you recover yourself. You lost 30 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: ${hitThreshold * 100}%)`);
                }
            }
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Shadow') ? 0.3 : 0.1;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(330deg)');
            document.querySelector('html').style.setProperty('background-color', '#1e1800');
            playMusic('/extra/audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`You focus on the stone golem and use your ${weapon} to attack it.\n\nThe golem is slow but powerful, and you manage to dodge its attacks successfully.\n\nYou hit the golem with your ${weapon}, the golem is really strong, so you needed to attack it several times, and then it started to crack and crumble, finally giving you an opportunity to take it down.\n\nWith a powerful final blow, you shatter the golem into pieces and the whole place turns peaceful, it's almost dawn so you'll be here for a while.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nFinally you decided to stay in the temple, now the temple will serve as a place for you to call \"home\", as a reminder of all your epic victories and adventures so far, being recognized by everyone as the great hero of the unknown land, where not only chaos exists, but also wonders.\n\nTHE END`);
            currentRPGState = '';
            } else {
                hp -= 30;
                if (hp <= 0) {
                    document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
                    document.querySelector('html').style.setProperty('background-color', '#1e0000');
                    playMusic('/extra/audios/Golem-Death2.mp3');
                    clearText();
                    typeText(`The stone golem hits you with a powerful blow and you fall to the ground. While you are dizzy from the impact, the golem approaches you and crushes you like a bug.\n\nYou died.`);
                    showTryAgainButton();
                    currentRPGState = '';
                } else {
                    typeText(`You missed the attack and the stone golem took this opportunity to attack you, then it hits you with a strong impact, throwing you against the wall, you get stunned for a moment but soon you recover yourself. You lost 30 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: ${hitThreshold * 100}%)`);
                }
            }
    } else {
        typeText("Invalid input. Type 'a' to attack. (chance of success: 20% with enchanted weapons, 10% otherwise)");
    }
}


function showTryAgainButton() {
    if (!tryAgainButtonAdded) {
        const tryAgainButton = document.createElement("button");
        tryAgainButton.textContent = "Try again";
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