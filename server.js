// server.js (FINAL PROJECT VERSION)
const express = require("express");
const path = require("path");
const session = require("express-session");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart-routes");
const customersRouter = require("./routes/customers");

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
// BODY PARSING
// ----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------
// SESSION MIDDLEWARE
// ----------------------------
app.use(
  session({
    secret: "orbitcart-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// ----------------------------
// STATIC FILES
// ----------------------------
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------
// PAGE ROUTES (HTML)
// ----------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "shop.html"));
});

app.get("/saved", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "saved.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkout.html"));
});

app.get("/confirmation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "confirmation.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

app.get("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "faq.html"));
});

// ----------------------------
// API ROUTES (JSON)
// ----------------------------
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/customers", customersRouter);

// ----------------------------
// 404 PAGE
// ----------------------------
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// ----------------------------
// START SERVER
// ----------------------------
app.listen(PORT, () => {
  console.log(`OrbitCart server running at http://localhost:${PORT}`);
});
