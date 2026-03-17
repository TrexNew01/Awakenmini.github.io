// Telegram WebApp initialization
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe.user;
if (user) {
    document.getElementById('user-name').textContent = user.first_name || 'User';
}

document.getElementById('test-btn').addEventListener('click', () => {
    tg.showAlert('Hello from Laravel Mini App!');
    document.getElementById('result').textContent = 'Button clicked!';
});

document.querySelectorAll('.faction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const faction
