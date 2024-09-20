document.addEventListener("DOMContentLoaded", function() {
    const backgroundContainer = document.querySelector('.background-container');
    const imageUrls = [
        'img/profile/profile-1.jpeg', 
        'img/profile/profile-2.jpeg', 
        'img/profile/profile-3.jpeg', 
        'img/profile/profile-4.jpeg',
        'img/profile/profile-5.jpeg'    // Add paths to your images
    ];
    const videoUrls = [
        '/videos/profile/profile-v01.mp4', 
        '/videos/profile/profile-v02.mp4', 
        '/videos/profile/profile-v03.mp4'    // Add paths to your videos
    ];

    function createBackgroundElement(type, url) {
        let element;
        if (type === 'image') {
            element = document.createElement('img');
            element.src = url;
        } else if (type === 'video') {
            element = document.createElement('video');
            element.src = url;
            element.autoplay = true;
            element.loop = true;
            element.muted = true; // Ensure videos are muted to autoplay on mobile
            element.playsInline = true; // Important for iOS to autoplay videos
        }
        element.className = 'background-item hidden';
        backgroundContainer.appendChild(element);
        return element;
    }

    function getRandomPosition() {
        const x = Math.random() * 80; // Ensure the element stays within bounds
        const y = Math.random() * 80;
        return { x, y };
    }

    function showElement(element) {
        const { x, y } = getRandomPosition();
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        element.classList.remove('hidden');
        element.classList.add('visible');
        setTimeout(() => {
            element.classList.remove('visible');
            element.classList.add('hidden');
        }, Math.random() * 3000 + 2000); // Display time between 2 to 5 seconds
    }

    function scheduleElements() {
        const elements = [];
        imageUrls.forEach(url => elements.push(createBackgroundElement('image', url)));
        videoUrls.forEach(url => elements.push(createBackgroundElement('video', url)));

        function showRandomElement() {
            const element = elements[Math.floor(Math.random() * elements.length)];
            showElement(element);
            setTimeout(showRandomElement, Math.random() * 3000 + 2000); // Interval between 2 to 5 seconds
        }

        showRandomElement();
    }

    scheduleElements();
});
