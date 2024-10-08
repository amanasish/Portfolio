const typingSpeed = 130; // Typing speed in milliseconds
// const text = "Aman Asish Gupta"; // The text to type
var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

let i = 0;


document.addEventListener('DOMContentLoaded', function() {
    if (window.gsap) {
        gsap.registerPlugin(TextPlugin);
        
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set('nav ul li', { opacity: 0, y: -20 });
        gsap.set('.header-text', { opacity: 0 });
        gsap.set('#photo-area', { opacity: 0 });
        
        // Faster menu animations
        tl.to('nav ul li', {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Faster header text animation
        tl.to('.header-text', {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        // Faster typing effect
        tl.to('#typed-text', {
            duration: 1,
            text: "Aman Asish Gupta",
            ease: "none"
        });

        // Faster photo fade in
        tl.to('#photo-area', {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.5");
    }
});

// Tab functionality
function opentab(tabname) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    
    for(let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typed-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
        }
    }
// Trigger the typewriter effect when the document is loaded
document.addEventListener("DOMContentLoaded", typeWriter);



document.querySelector('.burger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    const navMenu = document.querySelector('nav ul');
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
    } else {
        navMenu.style.display = "block";
    }
});



const scriptURL = 'https://script.google.com/macros/s/AKfycbzQj7iryezWLJ7fNfwUIuh2cqRjKumHhZ42R0hRBPHIaZykQbBVeiSwZzkC1R47jmxA/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Form submitted successfully !"
        setTimeout(function(){
            msg.innerHTML = ""
        },1000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

