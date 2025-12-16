// public/js/confirmation.js
// Displays last order confirmation

document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  const container = document.getElementById("order-details");

  if (!order) {
    window.location.href = "/";
    return;
  }

  container.innerHTML = `
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Name:</strong> ${order.customer.name}</p>
    <p><strong>Email:</strong> ${order.customer.email}</p>
    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
  `;
});
