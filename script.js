document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     LANGUAGE
  ========================================================= */

  const currentLanguage =
    document.documentElement.lang?.toLowerCase() || "en";

  const translations = {
    en: {
      learnMore: "Learn more +",
      showLess: "Show less −",
      viewMore: "View more +"
    },

    fr: {
      learnMore: "En savoir plus +",
      showLess: "Voir moins −",
      viewMore: "Voir plus +"
    },

    nl: {
      learnMore: "Meer info +",
      showLess: "Minder tonen −",
      viewMore: "Meer tonen +"
    }
  };

  const t =
    translations[currentLanguage] ||
    translations.en;


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const mainNav = document.getElementById("mainNav");
  const langSwitch = document.querySelector(".lang-switch");

  const navLinks =
    document.querySelectorAll(".main-nav > a");

  const sections =
    document.querySelectorAll("section[id]");

  const menuToggle =
    document.getElementById("menuToggle");

  const cookieBanner =
    document.getElementById("cookieBanner");


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", (event) => {

      event.stopPropagation();

      menuToggle.classList.toggle("open");
      mainNav.classList.toggle("open");

    });


    mainNav.addEventListener("click", (event) => {
      event.stopPropagation();
    });


    document.addEventListener("click", () => {

      menuToggle.classList.remove("open");
      mainNav.classList.remove("open");

    });


    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("open");
        mainNav.classList.remove("open");

      });

    });

  }


  /* =========================================================
     SCROLL NAVIGATION
  ========================================================= */

  function updateNavigation() {

    if (window.scrollY > 50) {

      mainNav?.classList.add("scrolled");
      langSwitch?.classList.add("scrolled");

    } else {

      mainNav?.classList.remove("scrolled");
      langSwitch?.classList.remove("scrolled");

    }


    let current = "";


    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop - 300;

      const sectionHeight =
        section.offsetHeight;


      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        current =
          section.getAttribute("id");

      }

    });


    if (
      window.innerHeight +
      window.scrollY >=
      document.body.offsetHeight - 20
    ) {

      current = "contact";

    }


    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        "#" + current
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateNavigation
  );

  updateNavigation();


  /* =========================================================
     SERVICE CARDS
  ========================================================= */

  const serviceButtons =
    document.querySelectorAll(".service-toggle");


  serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const currentCard =
        button.closest(".service-card");

      if (!currentCard) return;


      /* Close other cards */

      document
        .querySelectorAll(".service-card")
        .forEach((card) => {

          if (card !== currentCard) {

            card.classList.remove("open");

            const otherButton =
              card.querySelector(
                ".service-toggle"
              );

            if (otherButton) {

              otherButton.textContent =
                t.learnMore;

            }

          }

        });


      /* Toggle current card */

      currentCard.classList.toggle("open");


      if (
        currentCard.classList.contains("open")
      ) {

        button.textContent =
          t.showLess;

      } else {

        button.textContent =
          t.learnMore;

      }

    });

  });


  /* =========================================================
     GALLERY
  ========================================================= */

  const gallery =
    document.querySelector(".gallery");

  const galleryToggle =
    document.getElementById(
      "galleryToggle"
    );


  if (gallery && galleryToggle) {

    galleryToggle.addEventListener(
      "click",
      () => {

        gallery.classList.toggle(
          "show-all"
        );


        if (
          gallery.classList.contains(
            "show-all"
          )
        ) {

          galleryToggle.textContent =
            t.showLess;

        } else {

          galleryToggle.textContent =
            t.viewMore;

        }

      }
    );

  }


  /* =========================================================
     GALLERY LIGHTBOX
  ========================================================= */

  const galleryImages =
    Array.from(
      document.querySelectorAll(
        ".gallery-item"
      )
    );

  const lightbox =
    document.getElementById(
      "galleryLightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxClose =
    document.getElementById(
      "lightboxClose"
    );

  const lightboxPrev =
    document.getElementById(
      "lightboxPrev"
    );

  const lightboxNext =
    document.getElementById(
      "lightboxNext"
    );

  const lightboxCounter =
    document.getElementById(
      "lightboxCounter"
    );


  let currentImageIndex = 0;


  function showGalleryImage(index) {

    if (
      !galleryImages.length ||
      !lightboxImage
    ) {
      return;
    }


    if (index < 0) {

      index =
        galleryImages.length - 1;

    }


    if (
      index >= galleryImages.length
    ) {

      index = 0;

    }


    currentImageIndex = index;


    lightboxImage.src =
      galleryImages[
        currentImageIndex
      ].src;


    if (lightboxCounter) {

      lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${galleryImages.length}`;

    }

  }


  galleryImages.forEach(
    (image, index) => {

      image.addEventListener(
        "click",
        () => {

          if (!lightbox) return;

          currentImageIndex = index;

          showGalleryImage(
            currentImageIndex
          );

          lightbox.classList.add(
            "open"
          );

          document.body.style.overflow =
            "hidden";

        }
      );

    }
  );


  function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

  }


  lightboxClose?.addEventListener(
    "click",
    closeLightbox
  );


  lightboxPrev?.addEventListener(
    "click",
    () => {

      showGalleryImage(
        currentImageIndex - 1
      );

    }
  );


  lightboxNext?.addEventListener(
    "click",
    () => {

      showGalleryImage(
        currentImageIndex + 1
      );

    }
  );


  lightbox?.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          "open"
        )
      ) {
        return;
      }


      if (event.key === "Escape") {

        closeLightbox();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        showGalleryImage(
          currentImageIndex - 1
        );

      }


      if (
        event.key === "ArrowRight"
      ) {

        showGalleryImage(
          currentImageIndex + 1
        );

      }

    }
  );


  /* =========================================================
     COOKIES
  ========================================================= */

  if (
    localStorage.getItem(
      "cookieConsent"
    ) &&
    cookieBanner
  ) {

    cookieBanner.style.display =
      "none";

  }

});


/* =========================================================
   COOKIE FUNCTIONS
========================================================= */

function acceptCookies() {

  localStorage.setItem(
    "cookieConsent",
    "accepted"
  );

  const cookieBanner =
    document.getElementById(
      "cookieBanner"
    );

  if (cookieBanner) {

    cookieBanner.style.display =
      "none";

  }

}


function rejectCookies() {

  localStorage.setItem(
    "cookieConsent",
    "rejected"
  );

  const cookieBanner =
    document.getElementById(
      "cookieBanner"
    );

  if (cookieBanner) {

    cookieBanner.style.display =
      "none";

  }

}