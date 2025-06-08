// Login/Logout functionality
function updateNavbarState() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('.btn-login');
    const logoutBtn = document.querySelector('.btn-logout');
    
    if (loginBtn && logoutBtn) {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }
}

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    updateNavbarState();
    window.location.href = 'index.html';
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update navbar state
    updateNavbarState();
    
    // Add logout event listener
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation helper
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ff0000 !important;
    }
    .error-message {
        color: #ff0000;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Function to load dish images
function loadDishImages() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        const img = card.querySelector('img');
        const dishName = card.querySelector('h4').textContent.toLowerCase().replace(/\s+/g, '-');
        
        // Try to load the image
        img.onerror = function() {
            // If image fails to load, create a placeholder
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');

            // Background
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Text
            ctx.fillStyle = '#333';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dishName.toUpperCase(), canvas.width/2, canvas.height/2);

            // Set the placeholder as the image source
            img.src = canvas.toDataURL('image/jpeg');
        };

        // Set the image source
        img.src = `images/dishes/${dishName}.jpg`;
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.dish-card')) {
        loadDishImages();
    }
}); 