(function () {
  /****************************************************
   * 🌐 NAVIGATION TOGGLE (Hamburger Menu)
   ****************************************************/
  console.log("✅ About page JS loaded successfully!");

  const hamburger = document.getElementById("hamburger");
  const nav_bar = document.getElementById("navList");
  const sideButton = document.querySelector(".Side-btton");
  const logoIcon = document.querySelector(".nav-icon");

  if (hamburger && nav_bar && sideButton && logoIcon) {
    hamburger.addEventListener("click", () => {
      console.log("Hamburger clicked!");

      nav_bar.classList.toggle("show");
      console.log("Toggled 'show' class. Current classes:", nav_bar.classList);

      if (nav_bar.classList.contains("show")) {
        console.log("Menu open — hiding side button and logo.");
        sideButton.style.display = "none";
        logoIcon.style.display = "none";
      } else {
        console.log("Menu closed — showing side button and logo.");
        sideButton.style.display = "block";
        logoIcon.style.display = "block";
      }
    });
  }

  /****************************************************
   * 🎞️ HERO SECTION (Background Image + Text Slider)
   ****************************************************/
  const heroSection = document.querySelector(".About-hero");
  const heroText = document.getElementById("hero-text");

  if (heroSection && heroText) {
    const slides = [
      { img: "../photo/img/hero1.jpg", text: "Innovate. Build. Grow." },
      { img: "../photo/img/hero2.jpg", text: "Transform Your Ideas Into Reality." },
      { img: "../photo/img/hero3.jpg", text: "Empowering Digital Futures." },
    ];

    let currentSlide = 0;

    function changeSlide() {
      heroSection.style.setProperty("--bg-image", `url(${slides[currentSlide].img})`);
      heroText.textContent = slides[currentSlide].text;
      heroSection.classList.add("active");
      setTimeout(() => heroSection.classList.remove("active"), 3000);
      currentSlide = (currentSlide + 1) % slides.length;
    }

    changeSlide();
    setInterval(changeSlide, 4000);

    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 60;
      const y = (window.innerHeight / 2 - e.pageY) / 60;
      heroSection.querySelector(".hero-content").style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  /****************************************************
   * 🔎 SCROLL REVEAL (About Section + Others)
   ****************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-container");
    if (aboutSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(aboutSection);
    }
  });

  /****************************************************
   * ✨ GENERIC SCROLL OBSERVER (Skills, Hobbies, etc.)
   ****************************************************/
  function createScrollObserver(targetSelector, options = { threshold: 0.2 }) {
    const elements = document.querySelectorAll(targetSelector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          if (entry.target.classList.contains("skill-card")) {
            const allSkills = document.querySelectorAll(".skill-card");
            const index = Array.from(allSkills).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
  }

  createScrollObserver(".q-item", { threshold: 0.3 });
  createScrollObserver(".reveal-on-scroll", { threshold: 0.2 });
  createScrollObserver(".about-container", { threshold: 0.4 });

  /****************************************************
   * 🌀 PARALLAX EFFECT (Qualification Background)
   ****************************************************/
  const qualificationSection = document.querySelector(".qualification-journey");
  if (qualificationSection) {
    window.addEventListener("scroll", () => {
      const sectionTop = qualificationSection.offsetTop;
      const sectionHeight = qualificationSection.offsetHeight;
      const scrollY = window.scrollY;

      if (
        scrollY > sectionTop - window.innerHeight / 1.2 &&
        scrollY < sectionTop + sectionHeight
      ) {
        qualificationSection.classList.add("scrolled");
      } else {
        qualificationSection.classList.remove("scrolled");
      }
    });
  }

  console.log("✅ About page JS initialized!");
})();
