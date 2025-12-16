-- ===============================
-- OrbitCart Seed Data
-- ===============================

-- Clean slate (safe for dev)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM users;

-- ===============================
-- USERS (Mock accounts)
-- ===============================
INSERT INTO users (email, password_hash, full_name, role) VALUES
('demo@orbitcart.aero', 'hashed_password_here', 'Demo User', 'user'),
('admin@orbitcart.aero', 'hashed_admin_pw', 'OrbitCart Admin', 'admin');

-- ===============================
-- CATEGORIES
-- ===============================
INSERT INTO categories (name, slug) VALUES
('Flight Platforms', 'flight-platforms'),
('Avionics & Electronics', 'avionics-electronics'),
('Test & Measurement', 'test-measurement'),
('CAD Models & Tooling', 'cad-tooling');

-- ===============================
-- PRODUCTS
-- ===============================
INSERT INTO products
(name, description, price, image_url, sku, category_id)
VALUES

-- Flight Platforms
(
  'CubeSat Flight Computer Dev Board',
  'ARM-based flight computer for CubeSat and UAV prototyping.',
  499.00,
  '/images/flightPlatforms.png',
  'OC-FC-001',
  (SELECT id FROM categories WHERE slug='flight-platforms')
),

-- Avionics
(
  '6-DOF IMU Navigation Module',
  'Inertial measurement unit for guidance and navigation systems.',
  179.00,
  '/images/Robotics.png',
  'OC-IMU-002',
  (SELECT id FROM categories WHERE slug='avionics-electronics')
),

-- Test Equipment
(
  'Digital Storage Oscilloscope',
  'Lab-grade oscilloscope suitable for RF and avionics testing.',
  1250.00,
  '/images/Oscilloscope.png',
  'OC-SCOPE-003',
  (SELECT id FROM categories WHERE slug='test-measurement')
),

-- CAD Tooling
(
  'NX Jet Engine CAD Assembly',
  'High-fidelity Siemens NX jet engine model for analysis and manufacturing.',
  899.00,
  '/images/models/jet_engine.png',
  'OC-CAD-004',
  (SELECT id FROM categories WHERE slug='cad-tooling')
);
