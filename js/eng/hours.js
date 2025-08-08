// IzaacWeb V5 - Hours //

function displayTime() {
    const dateTime = new Date();
    let hrs = dateTime.getHours();
    const min = dateTime.getMinutes();
    const sec = dateTime.getSeconds();
    const session = document.getElementById('period');

    if (session) {
        session.innerHTML = hrs >= 12 ? 'PM' : 'AM';
    }

    if (hrs === 0) {
        hrs = 12; // 12 AM
    } else if (hrs > 12) {
        hrs -= 12;
    }

    const pad = (n) => String(n).padStart(2, '0');
    const elH = document.getElementById('hours');
    const elM = document.getElementById('minutes');
    const elS = document.getElementById('seconds');
    if (elH) elH.innerHTML = pad(hrs);
    if (elM) elM.innerHTML = pad(min);
    if (elS) elS.innerHTML = pad(sec);
}
setInterval(displayTime, 1000);
displayTime();