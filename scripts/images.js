document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const captionDisplay = document.getElementById('caption-display');

     // Define thresholds
     const thresholdMobile = 0.8; // Adjust this value as needed for mobile
     const thresholdDesktop = 0.5; // Adjust this value as needed for desktop
 
     // Determine threshold based on device width
     const isMobile = window.innerWidth <= 768; // Consider mobile if width is 768px or less
     const threshold = isMobile ? thresholdMobile : thresholdDesktop;

    const observer = new IntersectionObserver((entries) => {
        // Sort entries based on their vertical position
        entries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        entries.forEach(entry => {
            const figcaption = entry.target.querySelector('figcaption');
            const img = entry.target.querySelector('img');
            if (figcaption && img) {
                if (entry.isIntersecting) {
                    // Check if the caption is already displayed
                    if (!captionDisplay.querySelector(`[data-src="${img.src}"]`)) {
                        const displayItem = document.createElement('div');
                        displayItem.classList.add('display-item');
                        displayItem.dataset.src = img.src;
                        const displayImg = document.createElement('img');
                        displayImg.src = img.src;
                        const displayCaption = document.createElement('figcaption');
                        displayCaption.textContent = figcaption.textContent;
                        displayItem.appendChild(displayImg);
                        displayItem.appendChild(displayCaption);

                        // Insert the caption based on its vertical position
                        const existingItems = Array.from(captionDisplay.children);
                        const index = existingItems.findIndex(item => item.dataset.top > entry.boundingClientRect.top);
                        displayItem.dataset.top = entry.boundingClientRect.top;
                        if (index === -1) {
                            captionDisplay.appendChild(displayItem);
                        } else {
                            captionDisplay.insertBefore(displayItem, existingItems[index]);
                        }

                        // Smooth fade-in transition
                        setTimeout(() => {
                            displayItem.classList.add('fade-in');
                        }, 50); // Delay for a smoother transition
                    }
                } else {
                    // Remove the caption if it's no longer intersecting
                    const displayItem = captionDisplay.querySelector(`[data-src="${img.src}"]`);
                    if (displayItem) {
                        displayItem.classList.remove('fade-in');
                        displayItem.classList.add('fade-out');
                        captionDisplay.removeChild(displayItem);
                    }
                }
            }
        });

        // Adjust opacity based on whether there are any captions to display
        if (captionDisplay.children.length > 0) {
            captionDisplay.style.opacity = 1;
        } else {
            captionDisplay.style.opacity = 0;
        }
    }, {
        threshold: threshold, // Trigger when 100% visibility
        rootMargin: '0px'
    });

    galleryItems.forEach(item => {
        observer.observe(item);
    });
});
