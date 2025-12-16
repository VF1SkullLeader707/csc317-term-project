// public/js/saved.js
// Handles Saved List storage + rendering (guest & member agnostic)

(function () {
  "use strict";

  const STORAGE_KEY = "saved";

  /* =====================================================
     STORAGE LAYER (unchanged logic, just organized)
  ===================================================== */

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function getSavedList() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = safeParse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }

  function setSavedList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(
      new CustomEvent("savedList:changed", { detail: list })
    );
  }

  function normalizeProduct(product) {
    if (!product || !product.id) return null;

    return {
      id: String(product.id),
      name: product.name || "Unnamed Product",
      price: Number(product.price) || 0,
      description: product.description || "",
      image_url: product.image_url || "images/placeholder-product.png"
    };
  }

  function isSaved(productId) {
    return getSavedList().some(item => item.id === String(productId));
  }

  function saveProduct(product) {
    const normalized = normalizeProduct(product);
    if (!normalized) return false;

    const saved = getSavedList();
    if (saved.some(item => item.id === normalized.id)) return false;

    saved.push(normalized);
    setSavedList(saved);
    return true;
  }

  function removeSaved(productId) {
    const updated = getSavedList().filter(
      item => item.id !== String(productId)
    );
    setSavedList(updated);
  }

  function toggleSaved(product) {
    if (isSaved(product.id)) {
      removeSaved(product.id);
      return { saved: false };
    }
    saveProduct(product);
    return { saved: true };
  }

  /* =====================================================
     PUBLIC API
  ===================================================== */

  window.SavedList = {
    getAll: getSavedList,
    isSaved,
    save: saveProduct,
    remove: removeSaved,
    toggle: toggleSaved
  };

  /* =====================================================
     PAGE RENDERING (saved.html ONLY)
  ===================================================== */

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("saved-grid");
    const emptyMsg = document.getElementById("saved-empty");

    if (!grid) return; // Not on saved.html

    function renderSaved() {
      const saved = getSavedList();
      grid.innerHTML = "";

      if (!saved.length) {
        emptyMsg.style.display = "block";
        return;
      }

      emptyMsg.style.display = "none";

      saved.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${item.image_url}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p class="product-short">${item.description}</p>
          <p class="product-price">$${item.price.toFixed(2)}</p>

          <button class="primary-btn add-to-cart-btn">
            Add to Cart
          </button>

          <button class="btn-secondary remove-saved-btn">
            Remove
          </button>
        `;

        // Add to cart
        card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          const existing = cart.find(c => c.id === item.id);
          if (existing) {
            existing.qty += 1;
          } else {
            cart.push({ ...item, qty: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart!");
        });

        // Remove from saved
        card.querySelector(".remove-saved-btn").addEventListener("click", () => {
          removeSaved(item.id);
        });

        grid.appendChild(card);
      });
    }

    // Initial render
    renderSaved();

    // React to changes (add/remove anywhere)
    window.addEventListener("savedList:changed", renderSaved);
  });
})();
// Alias for compatibility with shop.js naming
if (window.SavedList && !window.SavedList.all) {
  window.SavedList.all = window.SavedList.getAll;
}
