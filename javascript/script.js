document.querySelector('.nav_toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('open');
});



// Get references to the carousel elements
const prevButton = document.getElementById('portfolio-prev');
const nextButton = document.getElementById('portfolio-next');
const carouselSlides = document.querySelectorAll('.carousel__slide');

let currentSlide = 0;


function showSlide(index) {
    // Ensure the index is within the valid range
    if (index >= carouselSlides.length) {
        currentSlide = 0; // Loop back to the first slide
    } else if (index < 0) {
        currentSlide = carouselSlides.length - 1; // Loop back to the last slide
    } else {
        currentSlide = index;
    }

    // Hide all slides
    carouselSlides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    // Show the current slide
    carouselSlides[currentSlide].classList.add('active');
}

// Show the next slide on clicking the "Next" button
nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Show the previous slide on clicking the "Previous" button
prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Initialize the first slide
showSlide(currentSlide);