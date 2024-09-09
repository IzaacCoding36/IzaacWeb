// IzaacWeb V3 - Buttons //

document.querySelector('.filter').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'none');
});

document.querySelector('.filter2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
});

document.querySelector('.filter3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
});

document.querySelector('.eng').addEventListener('click', () => {
    alert('You are already using this language.');
});

document.querySelector('.morelang').addEventListener('click', () => {
    alert('To view this page in other languages, simply activate the Google Translate extension in your browser.');
});

document.querySelector('.main').addEventListener('click', () => {
    alert('You are already on the main page.');
});