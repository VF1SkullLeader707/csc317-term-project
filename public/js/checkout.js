// public/js/checkout.js
// Handles checkout summary + order submission

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsEl = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!cart.length) {
    window.location.href = "/cart";
    return;
  }

  let total = 0;
  itemsEl.innerHTML = "";

  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;

    const row = document.createElement("div");
    row.className = "checkout-item";
    row.textContent = `${item.qty} × ${item.name} — $${lineTotal.toFixed(2)}`;
    itemsEl.appendChild(row);
  });

  totalEl.textContent = total.toFixed(2);

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      customer: {
        name: document.getElementById("checkout-name").value,
        email: document.getElementById("checkout-email").value
      },
      items: cart,
      total,
      date: new Date().toISOString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "/order-confirmation";
  });
});
