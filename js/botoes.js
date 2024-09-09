// IzaacWeb V3 - Botões //

document.querySelector('.filtro').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'none');
});

document.querySelector('.filtro2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
});

document.querySelector('.filtro3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
});

document.querySelector('.pt-br').addEventListener('click', () => {
    alert('Você já está utilizando esta linguagem.');
});

document.querySelector('.maislang').addEventListener('click', () => {
    alert('Para visualizar esta página em outras línguas, basta ativar a extensão do google tradutor em seu navegador.');
});

document.querySelector('.principal').addEventListener('click', () => {
    alert('Você já está na página principal.');
});