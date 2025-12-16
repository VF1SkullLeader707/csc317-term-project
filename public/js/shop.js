// public/js/shop.js
// Catalog rendering + category filtering + search + Saved (Option A)
// DigiKey-style catalog (NO randomization)

(function () {
  "use strict";

  /* -------------------------------
     HELPERS
  -------------------------------- */

  function getCurrentUser() {
    const raw =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser");

    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function money(value) {
    const n = Number(value);
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : "$0.00";
  }

  function openProduct(productId) {
    window.location.href = `/product?id=${encodeURIComponent(productId)}`;
  }

  function handleSaveOptionA(product) {
    const user = getCurrentUser();
    if (!user) {
      alert("Saved Lists are for members only. Please login or register.");
      window.location.href = "/login";
      return false;
    }

    if (!window.SavedList) {
      alert("Saved system not loaded.");
      return false;
    }

    const result = window.SavedList.toggle(product);
    return result.saved;
  }

  /* -------------------------------
     DATA SOURCE
  -------------------------------- */

  function getProducts() {
    return Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  }

  function filterProducts(products, category) {
    if (!category) return products;
    return products.filter((p) => String(p.category) === String(category));
  }

  function searchProducts(products, query) {
    if (!query) return products;

    const q = String(query).trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const name = String(p.name || "").toLowerCase();
      const desc = String(p.description || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }

  /* -------------------------------
     RENDERING
  -------------------------------- */

  function renderProducts(products) {
    const grid = document.getElementById("catalog-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (!products.length) {
      grid.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";

      const safeImg = p.image_url || "/images/placeholder-product.png";
      const safeName = p.name || "Unnamed Product";
      const safeDesc = p.description || "";

      card.innerHTML = `
        <button class="bookmark-btn" type="button" aria-label="Save item">★</button>

        <img src="${safeImg}" alt="${safeName}" />
        <h3>${safeName}</h3>
        <p class="product-short">${safeDesc}</p>
        <p class="product-price">${money(p.price)}</p>

        <a href="#" class="primary-btn" data-view>View Details</a>
      `;

      // View details
      const viewBtn = card.querySelector("[data-view]");
      viewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openProduct(p.id);
      });

      // Saved star
      const star = card.querySelector(".bookmark-btn");
      if (window.SavedList && window.SavedList.isSaved(String(p.id))) {
        star.classList.add("saved");
      }

      star.addEventListener("click", (e) => {
        e.preventDefault();
        const saved = handleSaveOptionA(p);
        star.classList.toggle("saved", saved);
      });

      grid.appendChild(card);
    });
  }

  /* -------------------------------
     INIT
  -------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const query = params.get("q");

    let products = getProducts();

    // Apply filters (category first, then search)
    if (category) {
      products = filterProducts(products, category);
    }
    if (query) {
      products = searchProducts(products, query);
    }

    renderProducts(products);
  });

})();
