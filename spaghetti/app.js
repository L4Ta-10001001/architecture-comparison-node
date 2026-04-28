// CONVENTIONAL ARCHITECTURE — Presentation + Business Logic mixed (no separation of concerns)

const express = require('express');
const path    = require('path');
const Database = require('better-sqlite3');

// ──────────────────────────────────────────────
// Inicialización de la base de datos SQLite
// ──────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'database.db'));

// Crear la tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT    DEFAULT '',
    completed   INTEGER DEFAULT 0,
    created_at  TEXT    DEFAULT (datetime('now', 'localtime'))
  )
`);

// ──────────────────────────────────────────────
// Configuración de Express
// ──────────────────────────────────────────────
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear formularios HTML
app.use(express.urlencoded({ extended: false }));

// ──────────────────────────────────────────────
// RUTA: Listar todas las tareas
// GET /
// ──────────────────────────────────────────────
app.get('/', (req, res) => {
  // Consulta directa a la BD — lógica mezclada con la presentación
  const tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();

  // Renderiza la vista pasándole los datos directamente
  res.render('index', { tasks });
});

// ──────────────────────────────────────────────
// RUTA: Mostrar formulario para crear tarea
// GET /tasks/new
// ──────────────────────────────────────────────
app.get('/tasks/new', (req, res) => {
  res.render('new');
});

// ──────────────────────────────────────────────
// RUTA: Crear una nueva tarea
// POST /tasks
// ──────────────────────────────────────────────
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  // Validación de negocio: el título es obligatorio
  if (!title || title.trim() === '') {
    return res.render('new', { error: 'El título es obligatorio.' });
  }

  // Insertar la tarea directamente en la BD
  db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)').run(
    title.trim(),
    description ? description.trim() : ''
  );

  // Redirigir al listado
  res.redirect('/');
});

// ──────────────────────────────────────────────
// RUTA: Mostrar formulario para editar tarea
// GET /tasks/:id/edit
// ──────────────────────────────────────────────
app.get('/tasks/:id/edit', (req, res) => {
  const { id } = req.params;

  // Buscar la tarea por ID directamente en la BD
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

  // Regla de negocio: si la tarea no existe, redirigir al inicio
  if (!task) {
    return res.redirect('/');
  }

  res.render('edit', { task });
});

// ──────────────────────────────────────────────
// RUTA: Actualizar una tarea existente
// POST /tasks/:id
// ──────────────────────────────────────────────
app.post('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Verificar que la tarea existe
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) {
    return res.redirect('/');
  }

  // Validación de negocio: el título es obligatorio
  if (!title || title.trim() === '') {
    return res.render('edit', { task, error: 'El título es obligatorio.' });
  }

  // Actualizar directamente en la BD
  db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?').run(
    title.trim(),
    description ? description.trim() : '',
    id
  );

  res.redirect('/');
});

// ──────────────────────────────────────────────
// RUTA: Alternar estado completado / pendiente
// POST /tasks/:id/toggle
// ──────────────────────────────────────────────
app.post('/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;

  // Invertir el valor de completed (0 → 1, 1 → 0) directamente en la BD
  db.prepare('UPDATE tasks SET completed = (1 - completed) WHERE id = ?').run(id);

  res.redirect('/');
});

// ──────────────────────────────────────────────
// RUTA: Eliminar una tarea
// POST /tasks/:id/delete
// ──────────────────────────────────────────────
app.post('/tasks/:id/delete', (req, res) => {
  const { id } = req.params;

  // Eliminar directamente de la BD
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

  res.redirect('/');
});

// ──────────────────────────────────────────────
// Iniciar el servidor
// ──────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
