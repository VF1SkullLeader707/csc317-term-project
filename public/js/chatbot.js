// public/js/chatbot.js
// OrbitCart Demo Assistant (frontend-only)

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("chatbot-toggle");
  const windowEl = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  // If a page doesn't include the chatbot markup, do nothing (SAFE)
  if (!toggle || !windowEl || !closeBtn || !form || !input || !messages) return;

  const responses = [
    { keywords: ["real", "store"], reply: "OrbitCart is a CSC 317 demo project. No real purchases occur." },
    { keywords: ["account", "login", "register"], reply: "Accounts enable Saved items and mock order history." },
    { keywords: ["checkout", "payment", "pay"], reply: "Checkout is simulated. No payment gateway is used." },
    { keywords: ["tech", "built", "stack"], reply: "Built with Node.js, Express, SQLite, and vanilla HTML/CSS/JS." },
    { keywords: ["saved", "bookmark"], reply: "Saved is a member feature—log in to use it." }
  ];

  function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.className = className;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  toggle.addEventListener("click", () => {
    windowEl.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    windowEl.classList.remove("open");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-msg");

    const lower = text.toLowerCase();
    let reply = "I’m a demo assistant. Ask about checkout, accounts, Saved, or the project.";

    for (let i = 0; i < responses.length; i += 1) {
      const r = responses[i];
      const match = r.keywords.some((k) => lower.includes(k));
      if (match) {
        reply = r.reply;
        break;
      }
    }

    window.setTimeout(() => addMessage(reply, "bot-msg"), 250);

    input.value = "";
    input.focus();
  });
});
