// Telegram WebApp initialization
const tg = window.Telegram.WebApp;

tg.ready();

// Expand the app
tg.expand();

// Get user data
const user = tg.initDataUnsafe.user;
if (user) {
    document.getElementById('user-name').textContent = user.first_name || 'User';
}

// Test button
document.getElementById('test-btn').addEventListener('click', () => {
    tg.showAlert('Hello from Mini App! User: ' + (user ? user.first_name : 'Unknown'));
    document.getElementById('result').textContent = 'Button clicked! Theme: ' + tg.colorScheme;
    
    // Optional: Send data back to bot
    // tg.sendData('test_button_clicked');
});

// Faction buttons
document.querySelectorAll('.faction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const faction = btn.dataset.faction;
        tg.HapticFeedback.impactOccurred('light');
        window.location.href = `home.html?faction=${encodeURIComponent(faction)}`;
        // Optional: tg.sendData(`faction:${faction}`);
    });
});
