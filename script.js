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
        if (faction === 'Diamond list') {
            window.location.href = 'Diamond.html';
        } else {
            window.location.href = `home.html?faction=${encodeURIComponent(faction)}`;
        }
        // Optional: tg.sendData(`faction:${faction}`);
    });
});


// Smart Chat Bot
const factions = {
    'Ring': '💍 High-quality 3D scans marketplace for premium assets.',
    'Diamond list': '💎 Premium Diamond collection and exclusive list.',
    'Alliance': '🤝 United factions for collaboration and trading.',
    'Syndicate': '💰 Underground network for rare digital goods.',
    'Order': '⚔️ Elite warrior faction with top security protocols.'
};


const GEMINI_API_KEY = 'AIzaSyAxcLyPQ9VuD-Glv9kS6JP3U-Q91NyB3-I';
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const general = [
    'I can tell you about factions like Ring, Diamond, Alliance etc.',
    "Ask 'what is Ring?' or 'tell me about Diamond list'",
    'This is a Telegram Mini App demo with factions.',
    'Try asking about factions!',
    'Smart bot at your service 😎',
    'Powered by JavaScript keyword matching.'
];


async function getBotResponse(message) {
    const lower = message.toLowerCase().trim();
    
    // Local smart rules first
    if (lower.match(/hi|hello|hey|good (morning|afternoon|evening|day)/)) {
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    for (const [faction, desc] of Object.entries(factions)) {
        if (lower.includes(faction.toLowerCase()) || lower.includes(faction.split(' ')[0].toLowerCase())) {
            return `${faction} faction: ${desc}`;
        }
    }
    if (lower.includes('telegram') || lower.includes('mini app') || lower.includes('app')) {
        return 'This Telegram Mini App features factions navigation and smart chat powered by Gemini AI! Use bot buttons below.';
    }
    if (lower.includes('help') || lower.includes('?')) {
        return 'AI chat + factions bot. Ask anything! Fallback: local rules for speed.';
    }
    
    // Gemini AI for complex queries
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a smart assistant for Telegram Mini App with factions: Ring (3D assets), Diamond list (premium), Alliance (collaboration), Syndicate (underground), Order (elite). Keep replies short (1-2 sentences), fun, crypto/NFT themed. User said: "${message}". Reply:`
                    }]
                }]
            })
        });
        const data = await response.json();
        const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'AI thinking...';
        return aiReply;
    } catch (e) {
        console.log('Gemini API error, fallback:', e);
        return general[Math.floor(Math.random() * general.length)];
    }
}


function addMessage(text, isUser = false) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}


function toggleChat() {
    const overlay = document.getElementById('chat-overlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
    tg.HapticFeedback.impactOccurred('medium');
    if (overlay.style.display === 'flex') {
        document.getElementById('chat-messages').innerHTML = ''; // Clear chat
        setTimeout(() => addMessage(`Hello ${user ? user.first_name : 'user'}! Gemini AI + factions bot ready ✨ Ask anything!`), 200);
    }
}





document.getElementById('chat-close').addEventListener('click', () => {
    document.getElementById('chat-overlay').style.display = 'none';
    tg.HapticFeedback.impactOccurred('light');
});



document.getElementById('chat-send').addEventListener('click', async () => {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.disabled = true;
    input.placeholder = 'Sending...';
    addMessage(msg, true);
    input.value = '';
    tg.HapticFeedback.selectionChanged();
    const thinkingMsg = addMessage('🤖 AI generating smooth reply...', false);
    try {
        const reply = await getBotResponse(msg);
        thinkingMsg.classList.remove('bot-message');
        thinkingMsg.classList.add('user-message');
        thinkingMsg.textContent = reply;
        thinkingMsg.style.opacity = '0';
        thinkingMsg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            thinkingMsg.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            thinkingMsg.style.opacity = '1';
            thinkingMsg.style.transform = 'scale(1)';
        }, 10);
        tg.sendData(JSON.stringify({chat_message: msg, bot_reply: reply, ai: true}));
    } catch (e) {
        thinkingMsg.textContent = 'Smooth fallback: Try faction names or hi!';
        thinkingMsg.style.color = '#f4d03f';
        tg.sendData(JSON.stringify({chat_message: msg, bot_reply: 'fallback', error: true}));
    } finally {
        input.disabled = false;
        input.placeholder = 'Ask about factions or anything...';
        input.focus();
    }
});



document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('chat-send').click();
    }
});

