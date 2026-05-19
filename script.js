document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector(".main-nav");
  const langSwitch = document.querySelector(".lang-switch");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("section[id]");
  const menuToggle = document.getElementById("menuToggle");
  const cookieBanner = document.getElementById("cookieBanner");

  // Menu burger
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // Scroll navigation
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainNav?.classList.add("scrolled");
      langSwitch?.classList.add("scrolled");
    } else {
      mainNav?.classList.remove("scrolled");
      langSwitch?.classList.remove("scrolled");
    }

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 300;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
      current = "contact";
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Cookies
  if (localStorage.getItem("cookieConsent") && cookieBanner) {
    cookieBanner.style.display = "none";
  }
});

// Fonctions cookies utilisées par les boutons HTML
function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");

  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }
}

function rejectCookies() {
  localStorage.setItem("cookieConsent", "rejected");

  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }
}
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      mainNav.classList.remove("open");
    });
  });
}