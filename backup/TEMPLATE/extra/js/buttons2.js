// AgroTech - Buttons //

document.querySelector('.filter').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(30deg)');
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

document.querySelector('.eng').addEventListener('click', () => {
    alert("You're already using this language.");
});

document.querySelector('.morelang').addEventListener('click', () => {
    alert("To view this page in other languages, simply activate the Google Translate extension in your browser.");
});

document.querySelector('.here').addEventListener('click', () => {
    alert("You're already on this page.");
});

document.querySelector('.theme').addEventListener('click', () => {
    alert("You're already using this theme.");
});