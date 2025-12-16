-- =====================================================
-- ORDERS
-- =====================================================

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

-- ----------------------------
-- ORDERS (one per checkout)
-- ----------------------------
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total REAL NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL DEFAULT 'paid',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- ----------------------------
-- ORDER ITEMS (line items)
-- ----------------------------
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),

  FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

  FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);
