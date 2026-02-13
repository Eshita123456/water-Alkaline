document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     HAMBURGER MENU
  ===================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* =====================
     ABOUT MODAL
  ===================== */
  const aboutModal = document.getElementById("aboutModal");
  const aboutBtn = document.querySelector(".about-btn");
  const closeBtn = document.querySelector(".close-btn");

  if (aboutBtn && aboutModal && closeBtn) {

    aboutBtn.addEventListener("click", () => {
      aboutModal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      aboutModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === aboutModal) {
        aboutModal.style.display = "none";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        aboutModal.style.display = "none";
      }
    });
  }

  /* =====================
     HERO IMAGE + VIDEO SLIDER
  ===================== */
  const heroSlides = document.querySelectorAll(".slide");
  const heroNext = document.querySelector(".nav.next");
  const heroPrev = document.querySelector(".nav.prev");

  let heroIndex = 0;
  let heroInterval;

  function showHeroSlide(index) {
    heroSlides.forEach(slide => {
      slide.classList.remove("active");
      if (slide.tagName === "VIDEO") slide.pause();
    });

    heroSlides[index].classList.add("active");

    if (heroSlides[index].tagName === "VIDEO") {
      heroSlides[index].play();
    }
  }

  function startHeroAutoSlide() {
    heroInterval = setInterval(() => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      showHeroSlide(heroIndex);
    }, 5000);
  }

  function stopHeroAutoSlide() {
    clearInterval(heroInterval);
  }

  if (heroSlides.length && heroNext && heroPrev) {

    showHeroSlide(heroIndex);
    startHeroAutoSlide();

    heroNext.addEventListener("click", () => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      showHeroSlide(heroIndex);
    });

    heroPrev.addEventListener("click", () => {
      heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
      showHeroSlide(heroIndex);
    });

    heroSlides.forEach(slide => {
      slide.addEventListener("mouseenter", stopHeroAutoSlide);
      slide.addEventListener("mouseleave", startHeroAutoSlide);
    });
  }

  /* =====================
     STATS COUNTER (ON SCROLL)
  ===================== */
  const counters = document.querySelectorAll(".counter");

  if (counters.length) {

    const startCounter = (counter) => {
      const target = +counter.dataset.target;
      let count = 0;
      const speed = target / 120;

      const update = () => {
        if (count < target) {
          count += speed;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* =====================
     BENEFIT IMAGE SLIDER
  ===================== */
  const benefitSlider = document.querySelector(".benefit-slider");

  if (benefitSlider) {

    const track = benefitSlider.querySelector(".slider-track");
    const slides = benefitSlider.querySelectorAll(".benefit-slide");
    const nextBtn = benefitSlider.querySelector(".benefit-next");
    const prevBtn = benefitSlider.querySelector(".benefit-prev");

    if (track && slides.length && nextBtn && prevBtn) {

      let slideWidth = 0;
      const gap = 30;

      const calculateWidth = () => {
        slideWidth = slides[0].getBoundingClientRect().width + gap;
      };

      window.addEventListener("load", calculateWidth);
      window.addEventListener("resize", calculateWidth);

      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: slideWidth, behavior: "smooth" });
      });

      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -slideWidth, behavior: "smooth" });
      });
    }
  }

  /* =====================
     TESTIMONIAL SLIDER
  ===================== */
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialNext = document.querySelector(".t-btn.next");
  const testimonialPrev = document.querySelector(".t-btn.prev");

  if (testimonialTrack && testimonialCards.length && testimonialNext && testimonialPrev) {

    let index = 0;
    const gap = 30;

    const getCardWidth = () => {
      return testimonialCards[0].offsetWidth + gap;
    };

    function moveSlide() {
      testimonialTrack.style.transform =
        `translateX(-${index * getCardWidth()}px)`;
    }

    testimonialNext.addEventListener("click", () => {
      index = (index + 1) % testimonialCards.length;
      moveSlide();
    });

    testimonialPrev.addEventListener("click", () => {
      index = (index - 1 + testimonialCards.length) % testimonialCards.length;
      moveSlide();
    });

    setInterval(() => {
      index = (index + 1) % testimonialCards.length;
      moveSlide();
    }, 5000);

    window.addEventListener("resize", moveSlide);
  }

  /* =====================
     FAQ ACCORDION
  ===================== */
  document.querySelectorAll(".faq-question").forEach(btn => {

    btn.addEventListener("click", () => {

      const item = btn.parentElement;

      document.querySelectorAll(".faq-item").forEach(faq => {
        if (faq !== item) faq.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });

});
