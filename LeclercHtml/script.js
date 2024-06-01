let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
    clearInterval(slideInterval); // Stop the automatic slideshow
    slideIndex += n;
    showSlides(slideIndex);
    startSlideShow(); // Restart the automatic slideshow
}

function currentSlide(n) {
    clearInterval(slideInterval); // Stop the automatic slideshow
    slideIndex = n;
    showSlides(slideIndex);
    startSlideShow(); // Restart the automatic slideshow
}

function startSlideShow() {
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 3000);
}

// Initial display
showSlides(slideIndex);
startSlideShow(); // Start the automatic slideshow

// Stop the slideshow on mouse enter and resume on mouse leave
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    startSlideShow();
});
