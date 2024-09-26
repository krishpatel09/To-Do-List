const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todos.db");

db.run(
  `CREATE TABLE IF NOT EXISTS todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
     created_at TEXT  NOT NULL DEFAULT (datetime('now'))
 ) `,
  (err) => {
    if (err) {
      console.error("Error creating database.", err.message);
    }
  }
);

// db.run(`DROP TABLE IF EXISTS todos `, (err) => {
//   console.log(err);
// });
module.exports = db;
