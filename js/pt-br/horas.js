// IzaacWeb V5 - Horas //

function displayTime() {
    const dateTime = new Date();
    const hrs = dateTime.getHours();
    const min = dateTime.getMinutes();
    const sec = dateTime.getSeconds();

    const pad = (n) => String(n).padStart(2, '0');
    const elH = document.getElementById('horas');
    const elM = document.getElementById('minutos');
    const elS = document.getElementById('segundos');
    if (elH) elH.innerHTML = pad(hrs);
    if (elM) elM.innerHTML = pad(min);
    if (elS) elS.innerHTML = pad(sec);
}
setInterval(displayTime, 1000);
displayTime();