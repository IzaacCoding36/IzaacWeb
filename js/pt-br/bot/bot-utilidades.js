// IzaacWeb V5 - Bot Utilities  //

// Enhanced typing animation with better responsiveness
function typeText(texto, speed = 30) {
    isTyping = true;
    botMessage.innerHTML = '';
    
    // Add typing indicator
    const typingIndicator = document.createElement('span');
    typingIndicator.className = 'typing-indicator';
    botMessage.appendChild(typingIndicator);
    
    let i = 0;
    const words = texto.split(' ');
    let currentText = '';
    
    const interval = setInterval(() => {
        if (i < texto.length) {
            currentText += texto.charAt(i);
            botMessage.innerHTML = currentText + '<span class="typing-indicator"></span>';
            i++;
            
            // Scroll to bottom for better UX
            botMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            botMessage.innerHTML = currentText;
            clearInterval(interval);
            isTyping = false;
            
            // Add fade-in animation to completed text
            botMessage.style.animation = 'fadeIn 0.5s ease';
        }
    }, speed);
}

// Enhanced clear function with animation
function clearText() {
    botMessage.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        botMessage.innerHTML = '';
        botMessage.style.animation = '';
    }, 300);
}

// Smooth page reset with confirmation
function resetPage() {
    if (confirm('Tem certeza que deseja reiniciar o Terminal Bot?')) {
        // Add fade out animation before reload
        document.querySelector('.bot-container').style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

// Add visual feedback for user actions (only shows last input)
function addUserMessage(message) {
    // Remove any existing user messages to show only the latest
    const existingUserMessages = document.querySelectorAll('.user-message');
    existingUserMessages.forEach(msg => msg.remove());
    
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.style.cssText = `
        color: var(--bot-primary);
        text-align: right;
        margin: 10px 0;
        padding: 8px 12px;
        background: var(--bot-shadow);
        border-right: 3px solid var(--bot-primary);
        border-radius: 5px 0 0 5px;
        font-style: italic;
        animation: slideInRight 0.3s ease;
    `;
    userMsg.textContent = `> ${message}`;
    
    // Insert before the bot message
    botMessage.parentNode.insertBefore(userMsg, botMessage);
    
    // Auto-scroll
    userMsg.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Enhanced button creation with better styling
function createStyledButton(text, action, className = '') {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = `bot-button ${className}`;
    button.style.cssText = `
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    `;
    
    button.onclick = action;
    
    // Add ripple effect
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: var(--bot-shadow);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    return button;
}

// Add loading spinner for async operations
function showLoading(message = 'Processando...') {
    const loader = document.createElement('div');
    loader.id = 'loading-spinner';
    loader.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin: 15px 0;
        color: var(--bot-primary);
        font-style: italic;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--bot-shadow);
        border-top: 2px solid var(--bot-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loader.appendChild(spinner);
    loader.appendChild(document.createTextNode(message));
    
    botMessage.appendChild(loader);
    
    // Auto-scroll
    loader.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function hideLoading() {
    const loader = document.getElementById('loading-spinner');
    if (loader) {
        loader.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
}

// Improved input handling with debouncing
let inputTimeout;
function handleInput(callback, delay = 300) {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(callback, delay);
}

// Add CSS animations if not already present
if (!document.querySelector('#bot-animations')) {
    const style = document.createElement('style');
    style.id = 'bot-animations';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .user-message {
            animation: slideInRight 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
}