// IzaacWeb V4 - Horas //

function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('periodo');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    }else{
        session.innerHTML = 'AM';
    }

    if(hrs > 12){
        hrs = hrs - 12;
    }

    document.getElementById('horas').innerHTML = hrs;
    document.getElementById('minutos').innerHTML = min;
    document.getElementById('segundos').innerHTML = sec;
}
setInterval(displayTime, 10);