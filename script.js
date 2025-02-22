// Store call data
let callData = {
    total: 0,
    interested: 0,
    callback: 0,
    not_interested: 0
};

function openTelecallerPanel() {
    document.getElementById('telecallerPanel').style.display = 'block';
    document.getElementById('managerPanel').style.display = 'none';
    document.getElementById('feedbackForm').style.display = 'none';
}

function openManagerPanel() {
    document.getElementById('telecallerPanel').style.display = 'none';
    document.getElementById('managerPanel').style.display = 'block';
    document.getElementById('feedbackForm').style.display = 'none';
    updateManagerStats();
}

function makeCall() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber) {
        // In a real application, you would integrate with a calling API here
        alert(`Calling ${phoneNumber}...`);
        
        // After call ends (simulated)
        setTimeout(() => {
            document.getElementById('telecallerPanel').style.display = 'none';
            document.getElementById('feedbackForm').style.display = 'block';
        }, 2000);
    } else {
        alert('Please enter a phone number');
    }
}

function submitFeedback(type) {
    callData.total++;
    callData[type]++;
    
    // Save to localStorage
    localStorage.setItem('callData', JSON.stringify(callData));
    
    // Reset form
    document.getElementById('phoneNumber').value = '';
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('telecallerPanel').style.display = 'block';
    
    alert('Feedback submitted successfully!');
}

function updateManagerStats() {
    // Load data from localStorage
    const savedData = localStorage.getItem('callData');
    if (savedData) {
        callData = JSON.parse(savedData);
    }
    
    const statsHtml = `
        <h3>Call Statistics</h3>
        <p>Total Calls: ${callData.total}</p>
        <p>Interested: ${callData.interested}</p>
        <p>Callback: ${callData.callback}</p>
        <p>Not Interested: ${callData.not_interested}</p>
    `;
    
    document.getElementById('callStats').innerHTML = statsHtml;
}

// Load saved data when page loads
window.onload = function() {
    const savedData = localStorage.getItem('callData');
    if (savedData) {
        callData = JSON.parse(savedData);
    }
};

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        });
    });

    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Add this function to handle the demo video
function openDemoVideo() {
    // Open YouTube video in a new tab
    window.open('https://youtu.be/QmtxR3oIn78?si=naHmbyZszj2qQTdc', '_blank');
}

// Remove or comment out the old openDemoImage function since we're not using it anymore
/* 
function openDemoImage() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="https://iamsamarth.com/wp-content/uploads/2023/12/image_2023_12_23T08_14_08_617Z-1-1024x684.png" 
                 alt="Telecaller Demo" class="demo-image">
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking the X or outside the image
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
} 
*/ 

// Add image popup functionality
document.querySelector('.hero-app-preview img').addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${this.src}" alt="${this.alt}">
            <span class="close-modal">&times;</span>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking outside or on X
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.className === 'close-modal') {
            modal.remove();
        }
    });
}); 