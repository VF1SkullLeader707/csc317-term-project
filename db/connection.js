// db/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ DB connection error:', err.message);
    } else {
        console.log('✅ Connected to OrbitCart SQLite database');
    }
});

module.exports = db;
