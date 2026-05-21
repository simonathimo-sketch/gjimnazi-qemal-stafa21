// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

function goToSlide(n) {
    showSlide(n);
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// ===== CALENDAR FUNCTIONALITY =====
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    let html = `<h4>${monthNames[month]} ${year}</h4><table><thead><tr>
                <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr></thead><tbody><tr>`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        html += '<td></td>';
    }
    
    // School events dates
    const eventDates = [5, 8, 12, 15, 20, 25, 28];
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
            html += '</tr><tr>';
        }
        
        let cellClass = '';
        if (day === today.getDate()) {
            cellClass = 'today';
        } else if (eventDates.includes(day)) {
            cellClass = 'event';
        }
        
        html += `<td class="${cellClass}">${day}</td>`;
    }
    
    // Empty cells after month ends
    const totalCells = (firstDay + daysInMonth) % 7;
    if (totalCells !== 0) {
        for (let i = totalCells; i < 7; i++) {
            html += '<td></td>';
        }
    }
    
    html += '</tr></tbody></table>';
    calendar.innerHTML = html;
}

generateCalendar();

// ===== FORM SUBMISSION =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const inputs = this.querySelectorAll('input, textarea');
    
    // Validate form
    let isValid = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
        }
    });
    
    if (isValid) {
        formMessage.textContent = '✓ Faleminderit! Mesazhi juaj u dërgua me sukses. Ne do t\'ju kontaktojmë shpejt.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        this.reset();
        
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    } else {
        formMessage.textContent = '✗ Ju lutem plotësoni të gjitha fushat!';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    }
});

// ===== SMOOTH SCROLL & NAV ANIMATIONS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-in-out';
    observer.observe(section);
});

// ===== NAVBAR RESPONSIVE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = '#2c5aa0';
        navMenu.style.gap = '0';
        navMenu.style.padding = '1rem';
        navMenu.style.width = '100%';
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        // You can add a scroll to top button here if needed
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.borderBottom = '2px solid white';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', function() {
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.animation = 'fadeIn 0.8s ease-in-out';
    });
});

// ===== TIPPY HOVER TOOLTIPS (Optional - for extra interactivity) =====
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        // Tooltip functionality can be added here
    });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== RANDOM COLOR FOR KLUB ICONS =====
const colors = ['#4a90e2', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
document.querySelectorAll('.klub-icon').forEach((icon, index) => {
    icon.style.color = colors[index % colors.length];
});

// ===== PERFORMANCE OPTIMIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // All DOM-dependent code here
    console.log('Gjimnazi Qemal Stafa - Faqja është ngarkuar me sukses!');
});

// ===== HANDLE PAGE VISIBILITY =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations if needed
    } else {
        // Page is visible, resume animations
    }
});
