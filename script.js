document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const cards = document.querySelectorAll('.card');

    // Initially hide the header and cards
    header.style.opacity = 0;
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'opacity 1s ease, transform 1s ease';

    // Fade in the header first
    setTimeout(() => {
        header.style.opacity = 1;
        header.style.transform = 'translateY(0)';
    }, 500);

    // Then fade in the cards one by one
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200); // Stagger the animation
        });
    }, 1500); // Start after the header animation

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('visible')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;

                const rotateX = ((y - centerY) / centerY) * -7; // Tilt intensity
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('visible')) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            }
        });
    });
// Reveal main content and footer on scroll
let revealed = false;
window.addEventListener('scroll', () => {
   if (!revealed && window.scrollY > 100) {
       document.querySelectorAll('.hidden-until-scroll').forEach(el => {
           el.classList.remove('hidden-until-scroll');
       });
       // Remove center-header class to restore normal layout
       const overlay = document.querySelector('.overlay');
       if (overlay) {
           overlay.classList.remove('center-header');
       }
       revealed = true;
   }
});
});