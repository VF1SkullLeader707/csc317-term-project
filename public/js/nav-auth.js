// public/js/nav-auth.js
// Handles auth UI + mobile hamburger menu

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("nav-login");
  const profileLink = document.getElementById("nav-profile");
  const logoutLink = document.getElementById("nav-logout");
  const savedLink = document.getElementById("nav-saved");

  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  /* -----------------------------
     AUTH HELPERS
  ----------------------------- */

  function safeParse(raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }

  function getUser() {
    const raw =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser") ||
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!raw) return null;
    return safeParse(raw);
  }

  function setLoggedInUI() {
    if (loginLink) loginLink.style.display = "none";
    if (profileLink) profileLink.style.display = "inline-block";
    if (logoutLink) logoutLink.style.display = "inline-block";
    if (savedLink) savedLink.style.display = "inline-block";
  }

  function setLoggedOutUI() {
    if (loginLink) loginLink.style.display = "inline-block";
    if (profileLink) profileLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";
    if (savedLink) savedLink.style.display = "none";
  }

  const user = getUser();
  user ? setLoggedInUI() : setLoggedOutUI();

  /* -----------------------------
     LOGOUT
  ----------------------------- */

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    });
  }

  /* -----------------------------
     MOBILE HAMBURGER
  ----------------------------- */

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const expanded =
        navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
    });

    // Optional UX polish: close menu after tap
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
