// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, fadeInOptions);

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Region map switching
document.querySelectorAll('.region-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.region-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const region = this.dataset.region;
        document.querySelectorAll('.region-map').forEach(map => map.classList.remove('active-map'));
        document.getElementById(`map-${region}`).classList.add('active-map');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});