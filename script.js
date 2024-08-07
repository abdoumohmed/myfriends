document.addEventListener('DOMContentLoaded', function() {
    // Welcome message typewriter effect
    const welcomeMessage = document.getElementById('welcome-message');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const message = "سمي الله وخش برجلك اليمين";
    let i = 0;

    function typeWriter() {
        if (i < message.length) {
            welcomeMessage.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                welcomeOverlay.style.opacity = '0';
                setTimeout(() => {
                    welcomeOverlay.style.display = 'none';
                }, 1000);
            }, 2000);
        }
    }

    typeWriter();

    // Audio player functionality
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    function toggleMusic() {
        if (isMusicPlaying) {
            audio.pause();
            musicToggle.textContent = '🔇';
        } else {
            audio.play();
            musicToggle.textContent = '🔊';
        }
        isMusicPlaying = !isMusicPlaying;
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Attempt to play audio on page load (may be blocked by browsers)
    audio.play().catch(error => {
        console.log('Auto-play was prevented. Please use the play button.');
    });
    // Timeline data
    const timelineData = [
        { year: 2004, event: 'عيد ميلادنا كلنا ما عدا توفيق' },
        { year: 2008, event: 'كنا في الحضانة' },
        { year: 2012, event: 'اكيد اولة ابتدائي بقي' },
        { year: 2016, event: 'اولي اعدادي' },
        { year: 2020, event: 'تالته ثانوي' },
        { year: 2024, event: 'كل واحد دخل كليه' }
    ];

    // Populate timeline
    const timelineContainer = document.querySelector('.timeline-container');
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        timelineItem.classList.add(index % 2 === 0 ? 'left' : 'right');

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${item.year}</h3>
                <p>${item.event}</p>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });



    // Gallery functionality
    const slideshowContainer = document.querySelector('.slideshow-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;

    // Sample image paths (replace with your actual image paths)
    const imagePaths = [
        'images/IMG20240131005154.jpg',
        'images/IMG20240131012010.jpg',
        'images/IMG20240131012011.jpg',
        'images/IMG20240131012013.jpg',
        'images/IMG20240131013321.jpg',
        'images/IMG20240411181033.jpg',
        'images/IMG20240411181044.jpg',
        'images/IMG20240411181047.jpg'
    ];

    // Function to create slideshow images
    function createSlideshow() {
        imagePaths.forEach((path, index) => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = `Friendship moment ${index + 1}`;
            img.classList.add('slideshow-image');
            if (index === 0) img.classList.add('active');
            slideshowContainer.appendChild(img);
        });
    }

    // Function to show a specific slide
    function showSlide(index) {
        const slides = document.querySelectorAll('.slideshow-image');
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Function to show the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to show the previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Function to toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(slideInterval);
            playPauseBtn.textContent = 'Play';
        } else {
            slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    }

    // Create the slideshow
    createSlideshow();

    // Start the slideshow
    slideInterval = setInterval(nextSlide, 1000);

    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) togglePlayPause();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) togglePlayPause();
    });

    playPauseBtn.addEventListener('click', togglePlayPause);

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});