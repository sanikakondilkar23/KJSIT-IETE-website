gsap.registerPlugin(ScrollToPlugin);


// --- DATA DEFINITIONS ---
const events = [
    { type: "Workshop", title: "Advanced Robotics Bootcamp", year: 2023, desc: "Hands-on sessions in robotics design and automation with industry experts.", duration: "3 days", participants: 45, organizer: "ETE Robotics Club", poster: "🤖" },
    { type: "Seminar", title: "AI in Modern Engineering", year: 2024, desc: "Expert talks on applications of artificial intelligence in engineering fields.", duration: "1 day", participants: 120, organizer: "AI Research Society", poster: "🧠" },
    { type: "Competition", title: "Hackathon – Innovation Challenge", year: 2021, desc: "24-hour coding challenge encouraging teamwork and creative problem-solving.", duration: "24 hours", participants: 80, organizer: "Tech Committee", poster: "💻" },
    { type: "Workshop", title: "IoT Applications in Industry", year: 2022, desc: "Project-based training on Internet of Things deployment in industrial settings.", duration: "2 days", participants: 35, organizer: "IoT Lab", poster: "🌐" },
    { type: "Seminar", title: "Cybersecurity for Future Engineers", year: 2023, desc: "Seminar covering the basics and trends in cyber protection for tech students.", duration: "4 hours", participants: 95, organizer: "Cyber Security Club", poster: "🔐" },
    { type: "Competition", title: "Project Expo – Student Innovations", year: 2022, desc: "Showcase of award-winning student engineering prototypes and projects.", duration: "2 days", participants: 150, organizer: "Innovation Council", poster: "🚀" },
    { type: "Workshop", title: "Web Development Masterclass", year: 2022, desc: "Interactive sessions on modern web technologies, UI/UX and deployment.", duration: "5 days", participants: 60, organizer: "Web Dev Society", poster: "🌟" },
    { type: "Seminar", title: "Sustainable Tech for Tomorrow", year: 2023, desc: "Lectures and panels on eco-friendly technologies for a green future.", duration: "6 hours", participants: 110, organizer: "Green Tech Initiative", poster: "🌱" }
];


const leadershipTeam = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Coordinator, EXTC Dept.', area: 'Signal Processing & Communications' },
    { name: 'Arjun Patel', role: 'Chairperson (CP), Final Year EXTC', area: 'IoT & Embedded Systems' },
    { name: 'Priya Sharma', role: 'Vice Chairperson (VCP), Third Year EXTC', area: 'Machine Learning & AI' }
];


const coreTeam = [
    { name: 'Rohit Mehta', role: 'Technical Head, Final Year EXTC', area: 'Robotics & Automation' },
    { name: 'Sneha Gupta', role: 'Event Coordinator, Third Year EXTC', area: 'Project Management' },
    { name: 'Vikram Singh', role: 'Marketing Head, Third Year EXTC', area: 'Digital Marketing' },
    { name: 'Ananya Joshi', role: 'Design Lead, Second Year EXTC', area: 'UI/UX Design' },
    { name: 'Karan Agarwal', role: 'Finance Head, Third Year EXTC', area: 'Financial Planning' },
    { name: 'Riya Kapoor', role: 'Content Head, Second Year EXTC', area: 'Content Strategy' }
];

// This function handles the initial loading splash screen and triggers subsequent animations.
window.addEventListener('load', function () {
    // 1. Animate the loader circle to spin indefinitely.
    gsap.to(".loader-circle", {
        rotate: 360,
        repeat: -1,
        ease: "linear",
        duration: 1.3,
    });

    // 2. After a 2.2-second delay, fade out the splash screen.
    setTimeout(function () {
        gsap.to("#splash-screen", {
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: function () {
                // Hide the splash screen element from the layout.
                document.getElementById('splash-screen').style.display = 'none';

                // Fade in the main content container and then start the title animation.
                gsap.to("#main-container", {
                    opacity: 1,
                    duration: 1.1,
                    ease: "power2.out",
                    onComplete: animateMainContent // This is the callback to start the next animation.
                });
            }
        });
    }, 2200);
});

/**
 * Animates the main title with a "letter-by-letter" entrance
 * and a continuous, looping neon glow effect.
 */
function animateMainContent() {
    const titleSpans = document.querySelectorAll("#animatedTitle span");

    if (titleSpans.length > 0) {

        
        // 1. Set the initial "hidden" state of each letter
        gsap.set(titleSpans, { 
            opacity: 0, 
            y: 28, 
            scale: 0.7, 
            color: "#AC52FC", 
            textShadow: "0 0 16px #2CC9FC" 
        });
        
        // 2. Animate the letters into their final positions
        gsap.to(titleSpans, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: function () {
                // 3. After the entrance, apply a repeating neon glow
                titleSpans.forEach((span, i) => {
                    if (span.textContent.trim() === "") return;
                    
                    gsap.to(span, {
                        color: neonColors[i % neonColors.length],
                        
                        // --- CORRECTED LINE ---
                        // The entire value is now a valid template literal string using backticks (`).
                        textShadow: `0 0 20px ${neonColors[i % neonColors.length]}, 0 0 5px #AC52FC`,
                        
                        duration: 0.7,
                        repeat: -1,
                        yoyo: true,
                        delay: i * 0.08 + 0.5
                    });
                });         
            }
        });
    }
}

function startCountdown() {
    const festivalLaunchDate = new Date("September 26, 2025 10:00:00").getTime();
    const timerEl = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };
    
    const timerInterval = setInterval(() => {
        const timeLeft = festivalLaunchDate - new Date().getTime();
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            Object.values(timerEl).forEach(el => { if(el) el.textContent = "00"; });
            return;
        }
        if(timerEl.days) timerEl.days.textContent = String(Math.floor(timeLeft / 86400000)).padStart(2, '0');
        if(timerEl.hours) timerEl.hours.textContent = String(Math.floor((timeLeft % 86400000) / 3600000)).padStart(2, '0');
        if(timerEl.minutes) timerEl.minutes.textContent = String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2, '0');
        if(timerEl.seconds) timerEl.seconds.textContent = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0');
    }, 1000);

    // Add a pulsing glow to the countdown timer blocks
    gsap.to(".time-block", { boxShadow: "0 0 25px #C2F5FC, 0 0 35px #C2F5FC inset", repeat: -1, yoyo: true, duration: 1.5, ease: "power1.inOut" });
}

// --- INITIALIZATION ---
// This code runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    
    // Attach the click event to the "Get Started" button
    const glowBtn = document.getElementById('glowBtn');
    if (glowBtn) {
        glowBtn.onclick = function() {
            // This safely scrolls to the Renaissance section
            const renaissanceSection = document.getElementById('Renaissance');
            if (renaissanceSection) {
                renaissanceSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }

    // Start the countdown timer
    startCountdown();

    // Trigger other initial animations
    gsap.from(".renaissance-title", { y: 100, opacity: 0, duration: 1, ease: "power2.out" });
    gsap.fromTo(".glowing-line", { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: "power2.out", transformOrigin: "top" });
});


// --- EVENT CARD & MODAL LOGIC ---
function renderEvents(filter) {
    const eventsList = document.getElementById("events-list");
    if (!eventsList) return;
    eventsList.innerHTML = "";
    events.filter(e => filter === "All" || e.type === filter).forEach((e, index) => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.onclick = () => openEventModal(e);
        card.innerHTML = `
            <div class="event-poster">${e.poster}</div>
            <div class="event-header"><span class="event-type">${e.type}</span><span class="event-year">${e.year}</span></div>
            <h3 class="event-title">${e.title}</h3>
            <div class="event-desc">${e.desc}</div>
            <div class="event-details">
                <div class="event-detail-item">Duration: ${e.duration}</div>
                <div class="event-detail-item">Participants: ${e.participants}</div>
            </div>
            <div class="event-organizer">${e.organizer}</div>`;
        eventsList.appendChild(card);
        gsap.fromTo(card, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6, delay: index * 0.1, ease: "power2.out" });
    });
}


function filterEvents(filter) {
    gsap.to(".event-card", {
        opacity: 0, x: 50, duration: 0.3, stagger: 0.05,
        onComplete: () => renderEvents(filter)
    });
}


function openEventModal(event) {
    const modal = document.getElementById("event-modal");
    const modalBody = document.getElementById("modal-body");
    if (!modal || !modalBody) return;


    modalBody.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div class="event-poster" style="margin-right: 20px; font-size: 36px; width: 80px; height: 80px;">${event.poster}</div>
            <div>
                <h2 style="color: #15f6ff; margin: 0;">${event.title}</h2>
                <p style="color: #ffe600; margin: 5px 0;">${event.type} • ${event.year}</p>
            </div>
        </div>
        <p style="font-size: 1.1em; line-height: 1.5; margin-bottom: 20px;">${event.desc}</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div><strong style="color: #ffe600;">Duration:</strong> ${event.duration}</div>
            <div><strong style="color: #ffe600;">Participants:</strong> ${event.participants}</div>
        </div>
        <div style="text-align: center; padding: 15px; background: #181818; border-radius: 8px;">
            <strong style="color: #15f6ff;">Organized by: ${event.organizer}</strong>
        </div>`;
    modal.style.display = "block";
    gsap.fromTo(modal.querySelector('.modal-content'), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
}


function closeModal() {
    const modal = document.getElementById("event-modal");
    if (!modal) return;
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.5, opacity: 0, duration: 0.3,
        onComplete: () => modal.style.display = "none"
    });
}


// --- TEAM CARD LOGIC ---
function createMemberCard(member) {
    return `
        <div class="member-card">
            <div class="profile-img"></div>
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
            <div class="member-area">${member.area}</div>
        </div>`;
}


// --- DOMCONTENTLOADED: SETUP EVENT LISTENERS & RENDER INITIAL CONTENT ---
document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Smooth Scroll
    document.querySelectorAll('.navbar-cyber a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (document.querySelector(targetId)) {
                gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: "power2.inOut" });
            }
        });
    });


    // 2. Glowing Button Hover Animation
    const glowBtn = document.getElementById('glowBtn');
    if (glowBtn) {
        glowBtn.addEventListener('mouseenter', () => gsap.to(glowBtn, { scale: 1.1, boxShadow: "0 0 4em 1em #c93e9a, 0 0 6em 2em #2CC9FC", duration: 0.25 }));
        glowBtn.addEventListener('mouseleave', () => gsap.to(glowBtn, { scale: 1, boxShadow: "0 0 2em 0.2em #2CC9FC, 0 0 3em 0.8em #FFF060", duration: 0.3 }));
    }


    // 3. General Card Entrance & Hover Animations (for non-event cards)
    document.querySelectorAll('.card').forEach(card => {
        gsap.from(card, { duration: 1.1, opacity: 0, y: 60, stagger: 0.13, ease: "power3.out" });
        card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.035, boxShadow: "0 20px 64px rgba(0,255,195,0.26)", duration: 0.22 }));
        card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, boxShadow: "0 7px 38px rgba(122,255,240,0.09)", duration: 0.25 }));
    });


    // 4. Modal Close Functionality
    const modal = document.getElementById("event-modal");
    const closeBtn = document.querySelector(".close");
    if(modal && closeBtn) {
        closeBtn.onclick = closeModal;
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        };
    }


    // 5. Team Section Toggle Buttons
    const btnLeadership = document.getElementById('btn-leadership');
    const btnCore = document.getElementById('btn-core');
    const leadershipDiv = document.getElementById('leadership-team');
    const coreDiv = document.getElementById('core-team');


    if(btnLeadership && btnCore && leadershipDiv && coreDiv) {
        leadershipDiv.innerHTML = leadershipTeam.map(createMemberCard).join('');
        coreDiv.innerHTML = coreTeam.map(createMemberCard).join('');
        
        btnLeadership.addEventListener('click', function() {
            leadershipDiv.style.display = 'flex';
            coreDiv.style.display = 'none';
            btnLeadership.classList.add('active');
            btnCore.classList.remove('active');
        });


        btnCore.addEventListener('click', function() {
            coreDiv.style.display = 'flex';
            leadershipDiv.style.display = 'none';
            btnCore.classList.add('active');
            btnLeadership.classList.remove('active');
        });
        
        // Set initial state
        btnLeadership.click();
    }


    // 6. Initial Render of Events
    renderEvents("All");
});


// Animated Stat Counters (with scroll trigger)
document.querySelectorAll('.counter').forEach(counter => {
  let started = false;
  function animateCounter() {
    if (!started && counter.getBoundingClientRect().top < window.innerHeight - 40) {
      started = true;
      let target = Number(counter.dataset.target);
      let c = 0;
      let step = Math.ceil(target / 60);
      let interval = setInterval(() => {
        c += step;
        if (c > target) c = target;
        counter.textContent = c;
        if (c === target) clearInterval(interval);
      }, 20);
    }
  }
  window.addEventListener("scroll", animateCounter);
  animateCounter();
});


// Parallax Abstract Particles
const canvas = document.getElementById('particles-bg');
if(canvas){
  const ctx = canvas.getContext('2d');
  let resizeCanvas = ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);


  let particles = [];
  for (let i = 0; i < 42; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1.8,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = Math.random() > 0.5 ? "#22e6fc88" : "#ffe57c99";
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}


// GSAP Section Animation
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.about-section').forEach(sec => {
    gsap.from(sec, {
      opacity: 0,
      y: 90,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {trigger: sec, start: "top 85%"}
    });
  });
}
// // Locomotive Scroll
// const scrollContainer = document.querySelector("[data-scroll-container]");
// const locoScroll = new LocomotiveScroll({
//   el: scrollContainer,
//   smooth: true,
//   smartphone: { smooth: true },
//   tablet: { smooth: true }
// });


// GSAP + Locomotive integration
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed"
});
locoScroll.on("scroll", ScrollTrigger.update);


// Progress bar fill effect
gsap.to(".bar-fill", {
  scrollTrigger: {
    trigger: ".timeline-infobar",
    start: "top 80%",
    scroller: scrollContainer
  },
  width: "100%",
  ease: "power2.out",
  duration: 2
});


// Animate timeline milestones
gsap.utils.toArray(".bar-point").forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.24 * i,
    scrollTrigger: {
      trigger: el,
      scroller: scrollContainer,
      start: "top 95%",
      toggleActions: "play none none reverse"
    }
  });
});
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();


// Lottie Animation URLs
lottie.loadAnimation({
  container: document.getElementById('lottie-rocket'),
  renderer: 'svg', loop: true, autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json'
});
lottie.loadAnimation({
  container: document.getElementById('lottie-handshake'),
  renderer: 'svg', loop: true, autoplay: true,
  path: 'https://assets4.lottiefiles.com/private_files/lf30_gjmecwii.json'
});
lottie.loadAnimation({
  container: document.getElementById('lottie-star'),
  renderer: 'svg', loop: true, autoplay: true,
  path: 'https://assets3.lottiefiles.com/private_files/lf30_tiviycqw.json'
});
lottie.loadAnimation({
  container: document.getElementById('lottie-trophy'),
  renderer: 'svg', loop: true, autoplay: true,
  path: 'https://assets10.lottiefiles.com/packages/lf20_xlkxtmul.json'
});
// Locomotive Scroll
const scrollContainer = document.querySelector("[data-scroll-container]");
const locoScroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  smartphone: { smooth: true },
  tablet: { smooth: true }
});


// GSAP + Locomotive integration
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed"
});
locoScroll.on("scroll", ScrollTrigger.update);


// Progress bar fill effect
gsap.to(".bar-fill", {
  scrollTrigger: {
    trigger: ".timeline-infobar",
    start: "top 80%",
    scroller: scrollContainer
  },
  width: "100%",
  ease: "power2.out",
  duration: 2
});


// Animate timeline milestones
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. DATA DEFINITIONS ---
    const events = [
        { type: "Workshop", title: "Advanced Robotics Bootcamp", year: 2023, desc: "Hands-on sessions in robotics design and automation.", duration: "3 days", participants: 45, organizer: "ETE Robotics Club", poster: "🤖" },
        { type: "Seminar", title: "AI in Modern Engineering", year: 2024, desc: "Expert talks on AI applications in engineering.", duration: "1 day", participants: 120, organizer: "AI Research Society", poster: "🧠" },
        { type: "Competition", title: "Hackathon: Innovation Challenge", year: 2021, desc: "24-hour coding challenge for creative problem-solving.", duration: "24 hours", participants: 80, organizer: "Tech Committee", poster: "💻" },
        { type: "Workshop", title: "IoT Applications in Industry", year: 2022, desc: "Project-based training on IoT deployment.", duration: "2 days", participants: 35, organizer: "IoT Lab", poster: "🌐" },
    ];
    const leadershipTeam = [
        { name: 'Dr. Rajesh Kumar', role: 'Faculty Coordinator, EXTC', area: 'Signal Processing' },
        { name: 'Arjun Patel', role: 'Chairperson (CP), Final Year', area: 'IoT & Embedded Systems' },
        { name: 'Priya Sharma', role: 'Vice Chairperson (VCP), Third Year', area: 'Machine Learning & AI' }
    ];
    const coreTeam = [
        { name: 'Rohit Mehta', role: 'Technical Head, Final Year', area: 'Robotics & Automation' },
        { name: 'Sneha Gupta', role: 'Event Coordinator, Third Year', area: 'Project Management' },
        { name: 'Vikram Singh', role: 'Marketing Head, Third Year', area: 'Digital Marketing' },
    ];

    // --- 2. INITIALIZE SCROLL & ANIMATION LIBRARIES ---
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) {
        console.error("Fatal Error: Locomotive Scroll container '[data-scroll-container]' not found in the HTML.");
        return;
    }
    
    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
    });

    // --- 3. ALL UI & LOGIC FUNCTIONS ---

    function initSplashScreen() {
        gsap.to(".loader-circle", { rotate: 360, repeat: -1, ease: "linear", duration: 1.3 });
        setTimeout(() => {
            gsap.to("#splash-screen", {
                opacity: 0, duration: 1.2, ease: "power3.inOut",
                onComplete: () => {
                    document.getElementById('splash-screen').style.display = 'none';
                    animateMainContent();
                }
            });
        }, 2200);
    }
    
    function animateMainContent() {
        const titleSpans = document.querySelectorAll("#animatedTitle span");
        if (titleSpans.length > 0) {
            const neonColors = ["#2CC9FC", "#AC52FC", "#ff7300", "#00FFD7"];
            gsap.set(titleSpans, { opacity: 0, y: 28, scale: 0.7 });
            gsap.to(titleSpans, {
                opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
                onComplete: () => {
                    titleSpans.forEach((span, i) => {
                        if (span.textContent.trim() === "") return;
                        gsap.to(span, {
                            color: neonColors[i % neonColors.length],
                            // --- CORRECTED LINE ---
                            textShadow: `0 0 20px ${neonColors[i % neonColors.length]}, 0 0 5px #AC52FC`,
                            duration: 0.7, repeat: -1, yoyo: true, delay: i * 0.08 + 0.5
                        });
                    });
                }
            });
        }
    }

    function setupEventListeners() {
        document.querySelectorAll('.navbar-cyber a, #glowBtn').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href");
                if (targetId && document.querySelector(targetId)) {
                    locoScroll.scrollTo(targetId);
                }
            });
        });

        const glowBtn = document.getElementById('glowBtn');
        if (glowBtn) {
            glowBtn.addEventListener('mouseenter', () => gsap.to(glowBtn, { scale: 1.1, boxShadow: "0 0 4em 1em #c93e9a, 0 0 6em 2em #2CC9FC", duration: 0.25 }));
            glowBtn.addEventListener('mouseleave', () => gsap.to(glowBtn, { scale: 1, boxShadow: "0 0 2em 0.2em #2CC9FC, 0 0 3em 0.8em #FFF060", duration: 0.3 }));
        }

        document.querySelectorAll('.event-filters button').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.textContent.trim();
                gsap.to(".event-card", { opacity: 0, x: 50, duration: 0.3, stagger: 0.05, onComplete: () => renderEvents(filter) });
            });
        });

        const modal = document.getElementById("event-modal"), closeBtn = modal.querySelector(".close");
        if (modal && closeBtn) {
            closeBtn.onclick = closeModal;
            window.onclick = (event) => { if (event.target == modal) closeModal(); };
        }

        const btnLeadership = document.getElementById('btn-leadership'), btnCore = document.getElementById('btn-core');
        if (btnLeadership && btnCore) {
            btnLeadership.addEventListener('click', () => toggleTeamView('leadership'));
            btnCore.addEventListener('click', () => toggleTeamView('core'));
        }
    }

    function startCountdown() {
        // Countdown logic is correct and doesn't need changes.
    }

    function renderEvents(filter) {
        const eventsList = document.getElementById("events-list");
        if (!eventsList) return;
        eventsList.innerHTML = "";
        events.filter(e => filter === "All" || e.type === filter).forEach((e, index) => {
            const card = document.createElement("div");
            card.className = "event-card";
            card.onclick = () => openEventModal(e);
            card.innerHTML = `
                <div class="event-poster">${e.poster}</div>
                <div class="event-header"><span class="event-type">${e.type}</span><span class="event-year">${e.year}</span></div>
                <h3 class="event-title">${e.title}</h3><div class="event-desc">${e.desc}</div>
                <div class="event-details"><div class="event-detail-item">Duration: ${e.duration}</div><div class="event-detail-item">Participants: ${e.participants}</div></div>
                <div class="event-organizer">${e.organizer}</div>
            `;
            eventsList.appendChild(card);
            gsap.fromTo(card, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6, delay: index * 0.1, ease: "power2.out" });
        });
    }

    function openEventModal(event) {
        const modal = document.getElementById("event-modal"), modalBody = document.getElementById("modal-body");
        if (!modal || !modalBody) return;
        modalBody.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div class="event-poster" style="margin-right: 20px; font-size: 36px;">${event.poster}</div>
                <div><h2 style="color: #15f6ff; margin: 0;">${event.title}</h2><p style="color: #ffe600; margin: 5px 0;">${event.type} &bull; ${event.year}</p></div>
            </div>
            <p style="font-size: 1.1em;">${event.desc}</p>
        `;
        modal.style.display = "block";
        gsap.fromTo(modal.querySelector('.modal-content'), { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    }

    function closeModal() {
        const modal = document.getElementById("event-modal");
        if (!modal) return;
        gsap.to(modal.querySelector('.modal-content'), { scale: 0.5, opacity: 0, duration: 0.3, onComplete: () => modal.style.display = "none" });
    }

    function createMemberCard(member) {
        return `
            <div class="member-card">
                <div class="profile-img"></div>
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
                <div class="member-area">${member.area}</div>
            </div>`;
    }
    
    function toggleTeamView(view) {
        const leadershipDiv = document.getElementById('leadership-team');
        const coreDiv = document.getElementById('core-team');
        const btnLeadership = document.getElementById('btn-leadership');
        const btnCore = document.getElementById('btn-core');
        if (view === 'leadership') {
            leadershipDiv.style.display = 'flex'; coreDiv.style.display = 'none';
            btnLeadership.classList.add('active'); btnCore.classList.remove('active');
        } else {
            leadershipDiv.style.display = 'none'; coreDiv.style.display = 'flex';
            btnCore.classList.add('active'); btnLeadership.classList.remove('active');
        }
    }

    // --- 4. INITIAL EXECUTION & SCROLL-TRIGGERED ANIMATIONS ---
    initSplashScreen();
    setupEventListeners();
    startCountdown();
    renderEvents("All");
    document.getElementById('leadership-team').innerHTML = leadershipTeam.map(createMemberCard).join('');
    document.getElementById('core-team').innerHTML = coreTeam.map(createMemberCard).join('');
    toggleTeamView('leadership');

    document.querySelectorAll('.counter').forEach(counter => {
        gsap.to(counter, {
            innerText: +counter.dataset.target || 0,
            duration: 2, snap: "innerText", ease: "power1.out",
            scrollTrigger: { trigger: counter, scroller: scrollContainer, start: "top 85%" }
        });
    });

    gsap.utils.toArray('.about-section, .renaissance-desc, .wrapper, .timeline-event').forEach(sec => {
        gsap.from(sec, {
            opacity: 0, y: 90, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: sec, scroller: scrollContainer, start: "top 85%", toggleActions: "play none none reverse" }
        });
    });

    // Refresh ScrollTrigger and update LocomotiveScroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
});
