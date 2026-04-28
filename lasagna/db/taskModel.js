// LAYER: Data — Task Model
// Responsabilidad única: todas las operaciones CRUD sobre la tabla `tasks`.
// Sin lógica de Express. Sin objetos req/res. Solo SQL y datos.

const db = require('./database');

// Prepara las sentencias una sola vez para mejor rendimiento
const stmtGetAll    = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');
const stmtGetById   = db.prepare('SELECT * FROM tasks WHERE id = ?');
const stmtInsert    = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
const stmtUpdate    = db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?');
const stmtToggle    = db.prepare('UPDATE tasks SET completed = 1 - completed WHERE id = ?');
const stmtDelete    = db.prepare('DELETE FROM tasks WHERE id = ?');

// Devuelve todas las tareas ordenadas por fecha de creación (más reciente primero)
function getAllTasks() {
  return stmtGetAll.all();
}

// Devuelve una tarea por su id, o undefined si no existe
function getTaskById(id) {
  return stmtGetById.get(id);
}

// Inserta una nueva tarea y devuelve el objeto con el id generado
function createTask(title, description) {
  const result = stmtInsert.run(title, description);
  return getTaskById(result.lastInsertRowid);
}

// Actualiza el título y la descripción de una tarea existente
function updateTask(id, title, description) {
  stmtUpdate.run(title, description, id);
}

// Invierte el campo `completed` (0→1 ó 1→0)
function toggleTask(id) {
  stmtToggle.run(id);
}

// Elimina permanentemente una tarea
function deleteTask(id) {
  stmtDelete.run(id);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
};
