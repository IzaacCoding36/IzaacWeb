// IzaacWeb V4 - Terminal RPG Module  //

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
    playMusic('audios/Wolf-Encounter.mp3');
    clearText();
    typeText(`You have chosen the ${type} class.\n\nYour adventure begins in a world where both wonder and chaos coexist.\n\nYou are the only one who can survive and experience all of this.\n\nAs you explore the forest, you keep hearing noises around you.\n\nPrepared for any threat, you see your first enemy approaching.\n\nA wild wolf charges at you. Prepare to battle. Type 'a' to attack. (chance of success: 50%)`);
    currentRPGState = 'battleBeast';
}

function battleBeast(input) {
    if (input === '/kill') {
        hp -= 5;
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(90deg)');
        document.querySelector('html').style.setProperty('background-color', '#01488a');
        playMusic('audios/Wolf-Victory.mp3');
        clearText();
        typeText(`The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, and you succeeded. You killed the wild wolf after suffering some small cuts on your legs.\n\nYou lost 5 HP. Now you have only ${hp} HP left.\n\nThis fight was intense.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nAfter the battle, you see a strange blue light shining on a path ahead of you. Do you want to investigate? (y/n)`);
        currentRPGState = 'findShinyWeapon';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        if (hitChance <= 0.5) {
            hp -= 5;
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(90deg)');
            document.querySelector('html').style.setProperty('background-color', '#01488a');
            playMusic('audios/Wolf-Victory.mp3');
            clearText();
            typeText(`The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, and you succeeded. You killed the wild wolf after suffering some small cuts on your legs.\n\nYou lost 5 HP. Now you have only ${hp} HP left.\n\nThis fight was intense.\n\nEnemy ELIMINATED!! Congrats, ${userName}!\n\nAfter the battle, you see a strange blue light shining on a path ahead of you. Do you want to investigate? (y/n)`);
            currentRPGState = 'findShinyWeapon';
        } else {
            hp -= 10;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Wolf-Death.mp3');
                clearText();
                typeText("The wild wolf charged at you with incredible speed. You did your best to attack it without getting killed, but you failed. You attacked the wolf, but it dodged your attack and jumped on your neck, biting you and cutting your throat, leaving you without air and time to react.\n\nYou died.");
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`You missed the attack and the wild wolf bit you. You lost 10 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 50%)`);
            }
        }
    } else {
        typeText("Invalid input. Press 'a' to attack. (chance of success: 50%)");
    }
}

function findShinyWeapon(input) {
    if (input.toLowerCase() === 'y' || input.toLowerCase() === 'yes' || input.toLowerCase() === 'yup' || input.toLowerCase() === 'sure' || input.toLowerCase() === 'of course' || input.toLowerCase() === 'yeah') {
        attack += 15;
        weapon = "Shiny Magic Powered " + weapon
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(130deg)');
        document.querySelector('html').style.setProperty('background-color', '#01158a');
        playMusic('audios/Final-Boss-Encounter1.mp3');
        clearText();
        typeText(`You followed the strange light and then...\n\nWow!\n\nYou found a ${weapon}! + 15 DMG\n\nYour damage has increased to ${attack}.\n\nAfter acquiring your new ${weapon}, you proceed deeper into the forest, and it starts getting darker.\n\nYou wonder: Is it already night? Something feels very strange. Suddenly, you see a very big tree fall in the distance. You decide to investigate.\n\nYou look at the fallen tree and a huge dark abomination emerges in front of you. Your ${weapon} emits the light you saw before, weakening the abomination\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 40%)`);
        currentRPGState = 'battleBoss';
    } else {
        ignoreLight(input);
    }
}

function ignoreLight(input) {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(180deg)');
    document.querySelector('html').style.setProperty('background-color', '#67018a');
    playMusic('audios/Final-Boss-Encounter2.mp3');
    clearText();
    typeText(`You decide to ignore it and continue your adventure.\n\nYou proceed deeper into the forest, and it starts getting darker.\n\nYou wonder: Is it already night? Something feels very strange. Suddenly, you see a very big tree fall in the distance. You decide to investigate.\n\nYou look at the fallen tree and a huge dark abomination emerges in front of you.\n\n|| !! BOSS BATTLE !! ||\n\nGet ready to fight and type 'a' to attack. (chance of success: 30%)`);
    currentRPGState = 'battleBoss2';
}

function battleBoss(input) {
    if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        document.querySelector('html').style.setProperty('background-color', '#8a6101');
        playMusic('audios/Final-Boss-Victory1.mp3');
        clearText();
        typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, but somehow, your ${weapon} unleashed a magic power that made the dark abomination tremble and fall to the ground. You went closer to it and finally finished the dark abomination with your ${weapon}, making it vanish forever.\n\nThis fight made you understand what you're really capable of, filling you with determination and happiness.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nAfter a hard, exhausting, and threatening adventure, you brought peace to the forest and to yourself, being recognized as a hero everywhere beyond the woods.\n\nTHE END`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Shiny') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
            document.querySelector('html').style.setProperty('background-color', '#8a6101');
            playMusic('audios/Final-Boss-Victory1.mp3');
            clearText();
            typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, but somehow, your ${weapon} unleashed a magic power that made the dark abomination tremble and fall to the ground. You went closer to it and finally finished the dark abomination with your ${weapon}, making it vanish forever.\n\nThis fight made you understand what you're really capable of, filling you with determination and happiness.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nAfter a hard, exhausting, and threatening adventure, you brought peace to the forest and to yourself, being recognized as a hero everywhere beyond the woods.\n\nTHE END`);
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Final-Boss-Death1.mp3');
                clearText();
                typeText(`Uncertain of what could happen next, you became scared of the dark abomination that was right in front of you, and then it suddenly grabbed you and everything turned dark, including your ${weapon}.\n\nYou died.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`You missed the attack and the dark abomination hit you. You lost 25 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 40%)`);
            }
        }
    } else {
        typeText("Invalid input. Type 'a' to attack. (chance of success: 40%)");
    }
}

function battleBoss2(input) {
    if (input === '/nuke') {
        document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
        document.querySelector('html').style.setProperty('background-color', '#8a6101');
        playMusic('audios/Final-Boss-Victory2.mp3');
        clearText();
        typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, so you waited for an opportunity to attack the dark abomination.\n\nThen you decided to run to attract the dark abomination closer to you, and the abomination actually followed you and got closer. While running, you took the opportunity to turn around and attack the dark abomination with your ${weapon}.\n\nYou finally attacked it, your attack pierced it but had no effect, it was like attacking a ghost.\n\nBut somehow, your ${weapon} absorbed your enemy, like it was energy. At first, you had no clue what was happening, but soon you understood what happened. The abomination was inside your ${weapon}, so you basically had control over it and its energy now.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nYour ${weapon} became a Dark ${weapon}!\n\nAfter some time exploring the woods, you gave yourself some time to build a place to call "home", and now you live peacefully in the woods, with everything you've achieved so far, you are happy, and in peace.\n\nTHE END`);
        currentRPGState = '';
    } else if (input.toLowerCase() === 'a' || input.toLowerCase() === 'attack') {
        const hitChance = Math.random();
        const hitThreshold = weapon.includes('Shiny') ? 0.4 : 0.3;

        if (hitChance <= hitThreshold) {
            document.querySelector('html').style.setProperty('filter', 'hue-rotate(300deg)');
            document.querySelector('html').style.setProperty('background-color', '#8a6101');
            playMusic('audios/Final-Boss-Victory2.mp3');
            clearText();
            typeText(`Uncertain of what could happen next, you focus on the dark abomination and use your ${weapon} to attack it.\n\nThe dark abomination flew into the air and dodged your attack. You could only kill it by being next to it, so you waited for an opportunity to attack the dark abomination.\n\nThen you decided to run to attract the dark abomination closer to you, and the abomination actually followed you and got closer. While running, you took the opportunity to turn around and attack the dark abomination with your ${weapon}.\n\nYou finally attacked it, your attack pierced it but had no effect, it was like attacking a ghost.\n\nBut somehow, your ${weapon} absorbed your enemy, like it was energy. At first, you had no clue what was happening, but soon you understood what happened. The abomination was inside your ${weapon}, so you basically had control over it and its energy now.\n\nBoss ELIMINATED!! Congrats, ${userName}!\n\nYour ${weapon} became a Dark ${weapon}!\n\nAfter some time exploring the woods, you gave yourself some time to build a place to call "home", and now you live peacefully in the woods, with everything you've achieved so far, you are happy, and in peace.\n\nTHE END`);
        } else {
            hp -= 25;
            if (hp <= 0) {
                document.querySelector('html').style.setProperty('filter', 'hue-rotate(240deg)');
                document.querySelector('html').style.setProperty('background-color', '#8a0101');
                playMusic('audios/Final-Boss-Death2.mp3');
                clearText();
                typeText(`Uncertain of what could happen next, you became scared of the dark abomination that was right in front of you, and then it suddenly grabbed you and everything turned dark.\n\nYou died.`);
                showTryAgainButton();
                currentRPGState = '';
            } else {
                typeText(`You missed the attack and the dark abomination hit you. You lost 25 HP. Now you have ${hp} HP left.\n\nType 'a' to attack again. (chance of success: 30%)`);
            }
        }
    } else {
        typeText("Invalid input. Type 'a' to attack. (chance of success: 30%)");
    }
}

function showTryAgainButton() {
    if (!tryAgainButtonAdded) {
        const tryAgainButton = document.createElement("button");
        tryAgainButton.textContent = "Try Again";
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