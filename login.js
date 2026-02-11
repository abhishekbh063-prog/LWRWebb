// Login credentials (in production, this should be handled server-side)
const CREDENTIALS = {
    username: 'manju',
    password: '9606'
};

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate credentials
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        // Set session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Show success and redirect
        errorMessage.classList.add('hidden');
        
        // Add success animation
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = '✓ Login Successful!';
        loginBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        // Show error message
        errorMessage.textContent = '❌ Invalid username or password';
        errorMessage.classList.remove('hidden');
        
        // Shake animation
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginCard.style.animation = '';
        }, 500);
    }
});

// Clear error message when user starts typing
document.getElementById('username').addEventListener('input', () => {
    document.getElementById('errorMessage').classList.add('hidden');
});

document.getElementById('password').addEventListener('input', () => {
    document.getElementById('errorMessage').classList.add('hidden');
});

