// public/js/product.js
// Handles product detail display + Add to Cart + Save to List

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------
  // LOAD SELECTED PRODUCT
  // -----------------------------------
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    window.location.href = "/shop";
    return;
  }

  // -----------------------------------
  // POPULATE PRODUCT UI
  // -----------------------------------
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent =
    product.description || "";
  document.getElementById("product-price").textContent =
    `$${product.price.toFixed(2)}`;

  // -----------------------------------
  // ADD TO CART
  // -----------------------------------
  const addBtn = document.getElementById("add-to-cart-btn");

  addBtn.addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty").value, 10) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        ...product,
        qty
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Later this becomes a modal (DigiKey-style)
    alert("Added to cart!");
    window.location.href = "/cart";
  });

  // -----------------------------------
  // SAVE TO LIST (BOOKMARK)
  // -----------------------------------
  const saveBtn = document.getElementById("save-to-list-btn");

  function updateSaveButton() {
    if (!saveBtn) return;

    const saved = window.SavedList.isSaved(product.id);
    saveBtn.textContent = saved
      ? "★ Saved to List"
      : "☆ Save to List";
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const saved = window.SavedList.isSaved(product.id);

      if (saved) {
        window.SavedList.remove(product.id);
      } else {
        window.SavedList.save(product);
      }

      updateSaveButton();
    });

    // Sync state on load
    updateSaveButton();
  }
});
