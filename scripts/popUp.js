window.addEventListener('load', () => {  // Change from 'DOMContentLoaded' to 'load'
    const popUp = document.querySelector('.popUp');
    let popUpClosed = false;

    // Check if popup has been shown in this session
    if (!sessionStorage.getItem('popupShown')) {
        // Show the popup 3 seconds after the page fully loads
        setTimeout(() => {
            if (!popUpClosed) {
                popUp.style.display = 'block'; // Ensure it's displayed
                requestAnimationFrame(() => {
                    // Using requestAnimationFrame to ensure the display is set before adding the class
                    popUp.classList.remove('hidden'); // Start fade-in
                    popUp.classList.add('visible'); // Set visibility
                });
            }
        }, 2000); // 2 seconds delay

        // Function to hide the popup
        function hidePopup() {
            if (popUp.classList.contains('visible')) {
                popUp.classList.remove('visible'); // Start fade-out
                popUp.classList.add('hidden'); // Set hidden after fade-out
                // Reset display property after transition ends
                setTimeout(() => {
                    popUp.style.display = 'none'; // Ensure it's hidden
                }, 500); // Match this timeout with the CSS transition duration
                popUpClosed = true;
                // Store a flag in sessionStorage to prevent showing the popup again
                sessionStorage.setItem('popupShown', 'true');
            }
        }

        // Close the popup when clicking on the popup itself
        popUp.addEventListener('click', () => {
            hidePopup();
        });
    }
});

