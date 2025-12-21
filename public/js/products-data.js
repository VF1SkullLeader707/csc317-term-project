// Central product catalog for OrbitCart (CSC 317)
// NO randomization — fixed 12 products (unique images)

window.PRODUCTS = [

  /* ===============================
     FLIGHT / AVIONICS
  =============================== */

  {
    id: "flight-001",
    name: "CubeSat Flight Computer Dev Board",
    category: "flight",
    price: 499.00,
    description: "ARM-based flight computer for CubeSat and UAV prototyping.",
    image_url: "/images/ARM.png"
  },
  {
    id: "flight-002",
    name: "6-DOF IMU Navigation Module",
    category: "flight",
    price: 179.00,
    description: "Inertial measurement unit for guidance and navigation systems.",
    image_url: "/images/iceps.png"
  },
  {
    id: "flight-003",
    name: "Satellite Power Distribution Unit",
    category: "flight",
    price: 349.00,
    description: "Radiation-tolerant power distribution for small satellites.",
    image_url: "/images/XP_Power.png"
  },
  {
    id: "flight-004",
    name: "UHF / VHF Telemetry Radio",
    category: "flight",
    price: 289.00,
    description: "Long-range telemetry radio for CubeSat and UAV platforms.",
    image_url: "/images/rotor.png"
  },

  /* ===============================
     TEST & LAB EQUIPMENT
  =============================== */

  {
    id: "elec-001",
    name: "Digital Storage Oscilloscope",
    category: "electronics",
    price: 1250.00,
    description: "Lab-grade oscilloscope for avionics and RF testing.",
    image_url: "/images/Oscilloscope.png"
  },
  {
    id: "elec-002",
    name: "Bench Power Supply (Triple Output)",
    category: "electronics",
    price: 549.00,
    description: "Precision triple-output lab power supply.",
    image_url: "/images/flightPlatforms.png"
  },
  {
    id: "elec-003",
    name: "Logic Analyzer Pro",
    category: "electronics",
    price: 399.00,
    description: "High-speed logic analyzer for embedded debugging.",
    image_url: "/images/Robotics.png"
  },
  {
    id: "elec-004",
    name: "RF Signal Conditioning Module",
    category: "electronics",
    price: 289.00,
    description: "Signal conditioning hardware for RF systems.",
    image_url: "/images/Airfoil.png"
  },

  /* ===============================
     CAD / MANUFACTURING
  =============================== */

  {
    id: "mfg-001",
    name: "NX Jet Engine CAD Assembly",
    category: "manufacturing",
    price: 899.00,
    description: "High-fidelity Siemens NX jet engine model.",
    image_url: "/images/cockpit_Sim.png"
  },
  {
    id: "mfg-002",
    name: "CNC Fixture Design Package",
    category: "manufacturing",
    price: 699.00,
    description: "Precision fixture designs for CNC machining workflows.",
    image_url: "/images/Bolt.png"
  },
  {
    id: "mfg-003",
    name: "Robotic Tooling Package",
    category: "manufacturing",
    price: 999.00,
    description: "NX-ready robotic tooling kit for aerospace manufacturing.",
    image_url: "/images/cockpit_inside.png"
  },
  {
    id: "mfg-004",
    name: "Cockpit Assembly CAD Model",
    category: "manufacturing",
    price: 749.00,
    description: "Detailed cockpit body and interior CAD assembly.",
    image_url: "/images/cockpit_body.png"
  }

];
