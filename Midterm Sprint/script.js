// Save this as script.js
let index = 0;
const testimonialText = document.getElementById("testimonial-text");

function showTestimonial() {
    testimonialText.textContent = reviews[index];
    index = (index + 1) % reviews.length;
}

// Show first testimonial immediately
showTestimonial();

// Change testimonial every 3 seconds
setInterval(showTestimonial, 4000);