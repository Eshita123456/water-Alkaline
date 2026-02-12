document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     HERO IMAGE + VIDEO SLIDER
  ===================== */
  const heroSlides = document.querySelectorAll(".slide");
  const heroNext = document.querySelector(".nav.next");
  const heroPrev = document.querySelector(".nav.prev");

  let heroIndex = 0;

  function showHeroSlide(index) {
    heroSlides.forEach(slide => {
      slide.classList.remove("active");

      // pause video if exists
      if (slide.tagName === "VIDEO") {
        slide.pause();
      }
    });

    heroSlides[index].classList.add("active");

    // play video if active slide is video
    if (heroSlides[index].tagName === "VIDEO") {
      heroSlides[index].play();
    }
  }

  if (heroSlides.length && heroNext && heroPrev) {
    heroNext.addEventListener("click", () => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      showHeroSlide(heroIndex);
    });

    heroPrev.addEventListener("click", () => {
      heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
      showHeroSlide(heroIndex);
    });

    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      showHeroSlide(heroIndex);
    }, 5000);
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

      const images = benefitSlider.querySelectorAll("img");
      let loaded = 0;

      images.forEach(img => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === images.length) calculateWidth();
          });
        }
      });

      if (loaded === images.length) calculateWidth();

      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: slideWidth, behavior: "smooth" });
      });

      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -slideWidth, behavior: "smooth" });
      });

      window.addEventListener("resize", calculateWidth);
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
    const cardWidth = testimonialCards[0].offsetWidth + gap;

    testimonialNext.addEventListener("click", () => {
      index = (index + 1) % testimonialCards.length;
      testimonialTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    });

    testimonialPrev.addEventListener("click", () => {
      index = (index - 1 + testimonialCards.length) % testimonialCards.length;
      testimonialTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    });

    setInterval(() => {
      index = (index + 1) % testimonialCards.length;
      testimonialTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    }, 5000);
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
