document.addEventListener('DOMContentLoaded', () => {
    const about = document.getElementById('about');
    const button = document.getElementById('showSectionButton');
    const menu = document.querySelector('.menu');
    let lastScrollY = window.scrollY;
    let aboutVisible = false;  // Track if 'about' section is visible

    // Function to toggle the 'about' section visibility with a smooth transition
    function toggleSection() {
        if (about.classList.contains('hidden')) {
            about.classList.remove('hidden');
            setTimeout(() => {
                about.style.opacity = 1;
            }, 10);  // Small delay to ensure the transition effect
        } else {
            about.style.opacity = 0;
            setTimeout(() => {
                about.classList.add('hidden');
            }, 550);  // Match the duration of the transition
        }
    }

    // Event listener for the button to toggle the 'about' section
    button.addEventListener('click', toggleSection);

    about.addEventListener('click', () => {
        if (!about.classList.contains('hidden')) {
            toggleSection(); // Close the 'about' section
        }
    });


    // Intersection Observer to monitor the 'about' section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                menu.classList.remove('menu--hidden');
                aboutVisible = true;
            } else {
                aboutVisible = false;
            }
        });
    }, {
        threshold: 0.5  // Adjust the threshold as needed
    });

    observer.observe(about);

    // Scroll event listener to hide/show the menu based on scroll direction
    window.addEventListener('scroll', () => {
        if (aboutVisible) {
            // Always show the menu if 'about' is visible
            menu.classList.remove('menu--hidden');
        } else if (window.scrollY === 0) {
            // Always show the menu if at the top of the page
            menu.classList.remove('menu--hidden');
        } else {
            if (lastScrollY < window.scrollY) {
                menu.classList.add('menu--hidden');
            } else {
                menu.classList.remove('menu--hidden');
            }
        }
        lastScrollY = window.scrollY;
    });
});