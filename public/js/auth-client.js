// public/js/auth-client.js
// Handles LOGIN and REGISTER for OrbitCart (Design A: localStorage auth)

document.addEventListener("DOMContentLoaded", () => {

  function normalizeUserFromResponse(data, fallbackEmail, fallbackName) {
    // Some APIs return { user: {...} }, others return fields at top-level.
    const raw = (data && data.user) ? data.user : (data || {});

    const email =
      raw.email ||
      raw.username ||           // if you ever used username as email
      fallbackEmail ||
      "";

    const name =
      raw.fullName ||
      raw.name ||
      raw.displayName ||
      fallbackName ||
      (email ? email.split("@")[0] : "User");

    return {
      id: raw.id || data.id || null,
      name: String(name),
      email: String(email),
      role: raw.role || data.role || "user",
      organization: raw.organization || "Student Engineer",
      isMember: true
    };
  }

  /* =========================
     REGISTER
  ========================= */
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);

      const fullName = formData.get("fullName") || formData.get("name") || "";
      const email = formData.get("email") || "";
      const password = formData.get("password") || "";

      const payload = { fullName, email, password };

      try {
        const res = await fetch("/api/customers/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          alert(data.error || "Registration failed.");
          return;
        }

        // Canonical frontend user object (REGISTER already has fullName)
        const user = normalizeUserFromResponse(data, email, fullName);

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Registration successful!");
        window.location.href = "/profile";

      } catch (err) {
        console.error("Register error:", err);
        alert("Network error during registration.");
      }
    });
  }

  /* =========================
     LOGIN
  ========================= */
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);

      const email = formData.get("email") || "";
      const password = formData.get("password") || "";

      const payload = { email, password };

      try {
        const res = await fetch("/api/customers/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          alert(data.error || "Login failed.");
          return;
        }

        // Canonical frontend user object
        // If backend doesn't provide fullName, we fall back to email prefix.
        const user = normalizeUserFromResponse(data, email, "");

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "/profile";

      } catch (err) {
        console.error("Login error:", err);
        alert("Network error during login.");
      }
    });
  }

});
