// IzaacWeb V3 - Buttons //

document.querySelector('.filter').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'none');
    document.querySelector('html').style.setProperty('background-color', '#001403');
});

document.querySelector('.filter2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
    document.querySelector('html').style.setProperty('background-color', '#3e3d26ff');
});

document.querySelector('.filter3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
    document.querySelector('html').style.setProperty('background-color', '#262626ff');
});

document.querySelector('.filter4').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(270deg)');
    document.querySelector('html').style.setProperty('background-color', '#683f02');
});

document.querySelector('.eng').addEventListener('click', () => {
    alert("You're already using this language.");
});

document.querySelector('.morelang').addEventListener('click', () => {
    alert("To view this page in other languages, simply activate the Google Translate extension in your browser.");
});

document.querySelector('.main').addEventListener('click', () => {
    alert("You're already on the main page.");
});