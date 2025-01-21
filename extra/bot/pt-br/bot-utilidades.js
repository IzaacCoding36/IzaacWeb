// IzaacWeb V4 - Utilidades do Terminal Bot  //

function typeText(texto) {
    isTyping = true;
    botMessage.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < texto.length) {
            botMessage.innerHTML += texto.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            isTyping = false;
        }
    }, 50);
}

function clearText() {
    botMessage.innerHTML = '';
}

function resetPage() {
    location.reload();
}