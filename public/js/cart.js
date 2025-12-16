// public/js/cart.js
// Renders cart, updates quantities, calculates totals
// LOCALSTORAGE = single source of truth

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const discountRow = document.getElementById("member-discount");
  const discountAmountEl = document.getElementById("discount-amount");

  /* =============================
     AUTH CHECK
  ============================== */
  function getCurrentUser() {
    const raw =
      localStorage.getItem("currentUser") ||
      sessionStorage.getItem("currentUser") ||
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /* =============================
     STATE
  ============================== */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* =============================
     RENDER CART
  ============================== */
  function renderCart() {
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
      subtotalEl.textContent = "0.00";
      totalEl.textContent = "0.00";
      if (discountRow) discountRow.style.display = "none";
      persistCart();
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <div>
          <strong>${item.name}</strong><br />
          $${item.price.toFixed(2)} each
        </div>

        <div>
          <input
            type="number"
            min="1"
            value="${item.qty}"
            data-index="${index}"
            class="cart-qty"
          />
        </div>

        <div>
          $${itemTotal.toFixed(2)}
        </div>

        <button class="remove-btn" data-index="${index}">
          Remove
        </button>
      `;

      cartItemsEl.appendChild(row);
    });

    const user = getCurrentUser();
    const isMember = !!user;
    const discount = isMember ? subtotal * 0.10 : 0;
    const total = subtotal - discount;

    subtotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = total.toFixed(2);

    if (discountRow && discountAmountEl) {
      if (isMember && discount > 0) {
        discountRow.style.display = "block";
        discountAmountEl.textContent = discount.toFixed(2);
      } else {
        discountRow.style.display = "none";
      }
    }

    persistCart();
  }

  function persistCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* =============================
     EVENTS
  ============================== */
  cartItemsEl.addEventListener("change", (e) => {
    if (!e.target.classList.contains("cart-qty")) return;
    const index = Number(e.target.dataset.index);
    const qty = Number(e.target.value);
    if (qty > 0 && cart[index]) {
      cart[index].qty = qty;
      renderCart();
    }
  });

  cartItemsEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove-btn")) return;
    const index = Number(e.target.dataset.index);
    if (cart[index]) {
      cart.splice(index, 1);
      renderCart();
    }
  });

  /* =============================
     CHECKOUT → PURCHASE HISTORY
  ============================== */
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) return;

      const user = getCurrentUser();
      const isMember = !!user;

      let subtotal = 0;
      cart.forEach(i => subtotal += i.price * i.qty);

      const discount = isMember ? subtotal * 0.10 : 0;
      const total = subtotal - discount;

      const history =
        JSON.parse(localStorage.getItem("purchaseHistory")) || [];

      history.push({
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        subtotal,
        discount,
        total
      });

      localStorage.setItem(
        "purchaseHistory",
        JSON.stringify(history)
      );

      localStorage.removeItem("cart");
      cart = [];

      alert("Order placed successfully!");
      window.location.href = "/profile";
    });
  }

  renderCart();
});
