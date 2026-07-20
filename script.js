const typingSpeed = 130; // Typing speed in milliseconds
// const text = "Aman Asish Gupta"; // The text to type
var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

let i = 0;


document.addEventListener('DOMContentLoaded', function() {
    if (window.gsap) {
        gsap.registerPlugin(TextPlugin, ScrollTrigger);
        
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

        // Typing effect for the initial load
        tl.to('#typed-text', {
            duration: 1.2,
            text: "Aman Asish Gupta",
            ease: "none"
        });

        // Faster photo fade in
        tl.to('#photo-area', {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.4");

        // Swapping Cards Logic
        const cards = document.querySelectorAll('.swap-card');
        const headerH1 = document.querySelector('.header-text h1');
        const typedTextSpan = document.querySelector('#typed-text');
        const headerH2 = document.querySelector('.header-text h2');
        const headerP = document.querySelector('.header-text p');

        const projects = [
            {
                name: "Aman Asish Gupta",
                subtitle: "Turning coffee into code, ideas into reality.",
                desc: "Crafting the future of digital experiences — where art meets algorithm.",
                images: ["images/mypicBlack.jpg"]
            },
            {
                name: "ElderNest Mobile App",
                subtitle: "Elderly Care & Health Companion",
                desc: "A Flutter application providing medical reminders, linking, and safety features for elderly care.",
                images: [
                    "images/HomeSlides/Eldernest Login.png",
                    "images/HomeSlides/E_Home.png",
                    "images/HomeSlides/E_Linking.png",
                    "images/HomeSlides/E_Medicine’s Reminder.png",
                    "images/HomeSlides/E_Medicine’s Search.png",
                    "images/HomeSlides/E_Register.png",
                    "images/HomeSlides/E_Logout.png"
                ]
            },
            {
                name: "Voice E-Commerce",
                subtitle: "AI-Powered Hands-Free Shopping",
                desc: "An AI-powered voice command e-commerce platform allowing hands-free shopping experiences.",
                images: [
                    "images/HomeSlides/v_HomeWihtoutSearched.png",
                    "images/HomeSlides/v_Parsed.png",
                    "images/HomeSlides/v_Parsed data.png",
                    "images/HomeSlides/v_Results.png"
                ]
            },
            {
                name: "Tic-Tac-Toe",
                subtitle: "Interactive Web Game",
                desc: "An interactive, animated Tic Tac Toe game built using vanilla HTML, CSS, and JS.",
                images: ["images/HomeSlides/Tic-Tac-Toe.png"]
            },
            {
                name: "Tasks App (My Day)",
                subtitle: "Productivity & Tasks Tracker",
                desc: "A neat tasks management application to boost productivity with subtasks and progress tracking.",
                images: ["images/HomeSlides/My Day.png"]
            },
            {
                name: "QR Generator",
                subtitle: "Instant QR Utility",
                desc: "A simple and efficient utility to generate QR codes instantly for links and custom text.",
                images: ["images/HomeSlides/QR Code .png"]
            }
        ];

        if (cards.length > 0) {
            let projectIndex = 0;
            let imageIndex = 0;
            let cardCycleIndex = 0;

            const getActiveCard = () => {
                return document.querySelector('.swap-card.active');
            };

            // Set initial state
            typedTextSpan.textContent = "";
            headerH2.textContent = projects[0].subtitle;
            headerP.textContent = projects[0].desc;

            const handleSlideshow = () => {
                const currentProject = projects[projectIndex];
                
                // If there are more images in current project, slide the images inside the active card
                if (imageIndex < currentProject.images.length - 1) {
                    imageIndex++;
                    const activeCard = getActiveCard();
                    const activeImg = activeCard.querySelector('img');
                    
                    gsap.to(activeImg, {
                        opacity: 0.1,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            activeImg.src = currentProject.images[imageIndex];
                            gsap.to(activeImg, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
                        }
                    });
                } else {
                    // Transition to the next project
                    projectIndex = (projectIndex + 1) % projects.length;
                    imageIndex = 0;
                    const nextProject = projects[projectIndex];

                    cardCycleIndex = (cardCycleIndex + 1) % cards.length;
                    const nextActiveCardIndex = (cardCycleIndex) % cards.length;
                    const nextNextCardIndex = (cardCycleIndex + 1) % cards.length;
                    const prevCardIndex = (cardCycleIndex + 2) % cards.length;

                    // Set first image and text of the next project in the upcoming active card
                    const upcomingCard = cards[nextActiveCardIndex];
                    upcomingCard.querySelector('img').src = nextProject.images[0];
                    upcomingCard.querySelector('h3').textContent = nextProject.name;

                    // Apply card state rotation
                    cards.forEach((card, idx) => {
                        card.classList.remove('active', 'next', 'prev');
                        if (idx === nextActiveCardIndex) {
                            card.classList.add('active');
                        } else if (idx === nextNextCardIndex) {
                            card.classList.add('next');
                        } else {
                            card.classList.add('prev');
                        }
                    });

                    // Update text content with premium fade & type transitions
                    const textTimeline = gsap.timeline();
                    textTimeline.to([headerH2, headerP], {
                        opacity: 0,
                        y: -10,
                        duration: 0.35,
                        ease: "power2.inOut",
                        onComplete: () => {
                            typedTextSpan.textContent = "";
                            headerH2.textContent = nextProject.subtitle;
                            headerP.textContent = nextProject.desc;
                        }
                    });
                    
                    textTimeline.to(typedTextSpan, {
                        duration: 1.0,
                        text: nextProject.name,
                        ease: "none"
                    });
                    
                    textTimeline.to([headerH2, headerP], {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    }, "-=0.25");
                }
            };

            // Slide interval
            setInterval(handleSlideshow, 4000);

            // --- Pet Cat Animations ---
            // Wag tail
            gsap.to('#cat-tail', {
                rotation: 15,
                transformOrigin: "bottom right",
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: "sine.inOut"
            });

            // Blink eyes
            const blinkCat = () => {
                gsap.timeline()
                    .to(['#cat-eye-l', '#cat-eye-r', '#cat-pupil-l', '#cat-pupil-r'], { scaleY: 0.1, transformOrigin: "center", duration: 0.12 })
                    .to(['#cat-eye-l', '#cat-eye-r', '#cat-pupil-l', '#cat-pupil-r'], { scaleY: 1, transformOrigin: "center", duration: 0.12 });
            };
            setInterval(blinkCat, 4000);

            // Twitch ears on hover
            const petContainer = document.querySelector('.pixel-pet');
            if (petContainer) {
                petContainer.addEventListener('mouseenter', () => {
                    gsap.to(['#cat-ear-l', '#cat-ear-r'], { y: -2, duration: 0.08, yoyo: true, repeat: 3 });
                });
            }
        }

        // Scroll Animations for sections
        const sections = ['#about', '#services', '#portfolio', '#contact'];
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
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

