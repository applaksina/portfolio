const btn = document.getElementById(‘toggleStyle’);

btn.addEventListener(‘click’, () => {
document.body.classList.toggle(‘style-fancy’);

if (document.body.classList.contains(‘style-fancy’)) {
localStorage.setItem(‘style’, ‘fancy’);
} else {
localStorage.setItem(‘style’, ‘default’);
}
});

window.onload = () => {
const saved = localStorage.getItem(‘style’);
if (saved === ‘fancy’) {
document.body.classList.add(‘style-fancy’);
}
};