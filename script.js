// Ensure Music & Hearts Start on Page Load
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('backgroundMusic').play().catch(error => console.log("Autoplay blocked."));
    createHeartsLoop();
});

// Show Yes/No Question on Click
document.getElementById('clickToOpen').addEventListener('click', function() {
    document.getElementById('card-container').classList.remove('hidden');
    this.classList.add('hidden');
});

// Move "No" Button Randomly
document.getElementById('noButton').addEventListener('mouseover', function() {
    const card = document.getElementById('card-container');
    let x = Math.random() * (card.clientWidth - this.clientWidth);
    let y = Math.random() * (card.clientHeight - this.clientHeight);
    
    this.style.left = x + "px";
    this.style.top = y + "px";
});

// Floating Hearts in a Continuous Loop
function createHeartsLoop() {
    setInterval(() => {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(heart);

        setTimeout(() => { heart.remove(); }, 3000);
    }, 500);
}

document.getElementById('yesButton').addEventListener('click', function(event) {
    document.getElementById('card-container').remove();
    document.getElementById('appreciationBox').classList.remove('hidden');
    
    let clickX = event.clientX; // Capture click X position
    let clickY = event.clientY; // Capture click Y position
    
    createFlowerExplosion(clickX, clickY); // Start explosion from click point
});

// Function to create a flower explosion effect
function createFlowerExplosion(startX, startY) {
    const flowerEmojis = ['🌸', '🌻', '🌼', '🌷', '💐'];
    const totalFlowers = 350; // Number of flowers for explosion

    for (let i = 0; i < totalFlowers; i++) {
        let flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        
        // Start position (initial explosion point)
        flower.style.left = `${startX}px`;
        flower.style.top = `${startY}px`;

        // Randomize rotation angle
        let rotationAngle = Math.random() * 360;
        flower.style.transform = `rotate(${rotationAngle}deg)`;

        document.body.appendChild(flower);

        // Random target positions for outward explosion
        let endX = Math.random() * window.innerWidth;
        let endY = Math.random() * window.innerHeight;

        // Animate explosion outward, float slightly, then fade out
        flower.animate([
            { transform: `translate(0, 0) scale(0.5) rotate(${rotationAngle}deg)`, opacity: 1 },  // Start small
            { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.5) rotate(${rotationAngle}deg)`, opacity: 1, offset: 0.4 }, // Explosion outward
            { transform: `translate(${endX - startX}px, ${endY - startY - 20}px) scale(1.5) rotate(${rotationAngle}deg)`, opacity: 1, offset: 0.85 }, // Floating effect
            { transform: `translate(${endX - startX}px, ${endY - startY - 30}px) scale(1.5) rotate(${rotationAngle}deg)`, opacity: 0 }  // Fade out
        ], { duration: 7000, easing: "ease-in-out", fill: "forwards" }); // Total 7s: Explosion + Hold + Fade

        // Remove flowers after animation (7s total)
        setTimeout(() => { flower.remove(); }, 7000);
    }
}

// Floating Images Animation
function startFloatingImages() {
    const images = document.querySelectorAll('.movingImage');
    
    images.forEach(image => {
        let x = Math.random() * (window.innerWidth - image.clientWidth);
        let y = Math.random() * (window.innerHeight - image.clientHeight);
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;

        function moveImage() {
            x += dx;
            y += dy;

            // Check for collisions with screen boundaries
            if (x <= 0 || x + image.clientWidth >= window.innerWidth) {
                dx *= -1; // Reverse X direction
            }
            if (y <= 0 || y + image.clientHeight >= window.innerHeight) {
                dy *= -1; // Reverse Y direction
            }

            image.style.left = x + "px";
            image.style.top = y + "px";
            requestAnimationFrame(moveImage);
        }
        moveImage();
    });
}

// Start Floating Images on Load
window.onload = function() {
    startFloatingImages();
};
