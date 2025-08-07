// IzaacWeb V4 - Bot Utilities  //

function typeText(text) {
    isTyping = true;
    botMessage.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            botMessage.innerHTML += text.charAt(i);
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