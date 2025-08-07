// AgroTech - Botões //

document.querySelector('.filtro').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(30deg)');
    document.querySelector('html').style.setProperty('background-color', '#001403');
});

document.querySelector('.filtro2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
    document.querySelector('html').style.setProperty('background-color', '#3e3d26ff');
});

document.querySelector('.filtro3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
    document.querySelector('html').style.setProperty('background-color', '#262626ff');
});

document.querySelector('.pt-br').addEventListener('click', () => {
    alert("Você já está utilizando esta linguagem.");
});

document.querySelector('.maislang').addEventListener('click', () => {
    alert("Para visualizar esta página em outras línguas, basta ativar a extensão do google tradutor em seu navegador.");
});

document.querySelector('.aqui').addEventListener('click', () => {
    alert("Você já está nesta página.");
});

document.querySelector('.tema').addEventListener('click', () => {
    alert("Você já está utilizando este tema.");
});