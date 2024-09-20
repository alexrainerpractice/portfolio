document.addEventListener('DOMContentLoaded', () => {
    const fadeInDiv = document.querySelector('.fade-in-div');
    const scrollTrigger = document.querySelector('.scroll-trigger');

    // Create an IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fadeInDiv.classList.add('visible');
            } else {
                fadeInDiv.classList.remove('visible');
            }
        });
    }, {
        root: null, // Observe changes relative to the viewport
        rootMargin: '0px',
        threshold: 0 // Trigger as soon as any part of the trigger element is visible
    });

    // Start observing the scroll trigger element
    observer.observe(scrollTrigger);

    // Debugging
    console.log('IntersectionObserver initialized and observing scroll-trigger element');
});
