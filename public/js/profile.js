// public/js/profile.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // If NOT logged in → redirect to login
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");
  const roleEl = document.getElementById("profile-role");
  const orgEl = document.getElementById("profile-organization");

  if (nameEl) {
    nameEl.textContent = user.name || "N/A";
  }

  if (emailEl) {
    emailEl.textContent = user.email || "N/A";
  }

  if (roleEl) {
    roleEl.textContent = user.role || "user";
  }

  if (orgEl) {
    orgEl.textContent = user.organization || "Student Engineer";
  }
});
