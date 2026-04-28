// LAYER: Data — DB Connection
// Responsabilidad única: abrir la conexión a SQLite y crear la tabla si no existe.
// Exporta la instancia de la base de datos para que el modelo la consuma.

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database.db');

const db = new Database(DB_PATH);

// Crea la tabla de tareas si aún no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL DEFAULT '',
    completed   INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

module.exports = db;
