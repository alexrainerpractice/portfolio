document.addEventListener('DOMContentLoaded', () => {
    const mediaCounter = document.getElementById('media-counter');
    const scrollCounter = document.getElementById('scroll-counter');
    const mediaCaption = document.getElementById('media-caption');
    const mediaContainer = document.getElementById('media-container');
    
    // Read media data from the script tag
    const mediaDataScript = document.getElementById('media-data');
    const mediaPaths = JSON.parse(mediaDataScript.textContent);

    let mediaElements = [];
    let captions = [];
    let currentVisibleIndex = -1; // Index of the currently visible media
    let scrolledPastCount = 0; // Number of media items scrolled past

    const loadMedia = () => {
        mediaPaths.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('media-wrapper');
            
            let mediaElement;
            if (item.type === 'image') {
                mediaElement = new Image();
                mediaElement.src = item.src;
                mediaElement.alt = 'Image';
            } else if (item.type === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.src = item.src;
                mediaElement.controls = false;
                mediaElement.autoplay = true;
                mediaElement.loop = true;
                mediaElement.muted = true;
                mediaElement.playsInline = true;
            }

            wrapper.appendChild(mediaElement);
            mediaContainer.appendChild(wrapper);

            // Store media element and caption
            mediaElements.push(mediaElement);
            captions.push(item.caption);
        });

        initObserver(); // Initialize Intersection Observer
    };

    const updateUI = (index) => {
        if (index >= 0) {
            mediaCaption.textContent = captions[index];
            mediaCounter.textContent = `${index + 1}/${mediaElements.length}`;
            // Fade-in effect for visible elements
            mediaCaption.classList.remove('fade-out');
            mediaCounter.classList.remove('fade-out');
            mediaCaption.classList.add('fade-in', 'show');
            mediaCounter.classList.add('fade-in', 'show');
        } else {
            // Fade-out effect for hidden elements
            mediaCaption.classList.remove('fade-in');
            mediaCounter.classList.remove('fade-in');
            mediaCaption.classList.add('fade-out', 'hide');
            mediaCounter.classList.add('fade-out', 'hide');
        }
    };

    const initObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            let visibleMedia = [];
            let newScrolledPastCount = 0;

            entries.forEach(entry => {
                const index = mediaElements.indexOf(entry.target);
                if (entry.isIntersecting) {
                    if (!visibleMedia.includes(index)) {
                        visibleMedia.push(index);
                    }
                    newScrolledPastCount = Math.max(newScrolledPastCount, index + 1);
                }
            });

            // Determine the most visible media (the one with the highest index in view)
            if (visibleMedia.length > 0) {
                const maxIndex = Math.max(...visibleMedia);
                if (maxIndex !== currentVisibleIndex) {
                    currentVisibleIndex = maxIndex;
                    updateUI(currentVisibleIndex);
                }
            } else {
                if (currentVisibleIndex !== -1) {
                    currentVisibleIndex = -1;
                    updateUI(currentVisibleIndex);
                }
            }

            // Update the scroll counter
            scrollCounter.textContent = newScrolledPastCount;
        }, {
            root: null, // Use viewport as root
            rootMargin: '0px',
            threshold: 0.5 // 50% visibility threshold
        });

        mediaElements.forEach(media => observer.observe(media));
    };

    loadMedia(); // Load media on DOM content loaded
});
