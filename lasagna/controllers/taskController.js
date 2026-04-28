// LAYER: Business Logic — Task Controller
// Responsabilidad: recibir la petición HTTP, invocar el modelo y decidir
// qué vista renderizar o hacia dónde redirigir.
// Sin SQL. Sin HTML directo.

const taskModel = require('../db/taskModel');

// Obtiene todas las tareas y las envía a la vista principal
function listTasks(req, res) {
  const tasks = taskModel.getAllTasks();
  res.render('index', { tasks });
}

// Muestra el formulario vacío para crear una tarea nueva
function showNewForm(req, res) {
  res.render('new');
}

// Valida el título y crea la tarea; redirige a la lista
function createTask(req, res) {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.redirect('/tasks/new');
  }

  taskModel.createTask(title.trim(), description ? description.trim() : '');
  res.redirect('/');
}

// Busca la tarea por id y muestra el formulario de edición
function showEditForm(req, res) {
  const task = taskModel.getTaskById(Number(req.params.id));

  if (!task) {
    return res.redirect('/');
  }

  res.render('edit', { task });
}

// Valida y actualiza los datos de una tarea existente
function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.redirect(`/tasks/${id}/edit`);
  }

  taskModel.updateTask(id, title.trim(), description ? description.trim() : '');
  res.redirect('/');
}

// Alterna el estado completado/pendiente de una tarea
function toggleTask(req, res) {
  taskModel.toggleTask(Number(req.params.id));
  res.redirect('/');
}

// Elimina una tarea y vuelve a la lista
function deleteTask(req, res) {
  taskModel.deleteTask(Number(req.params.id));
  res.redirect('/');
}

module.exports = {
  listTasks,
  showNewForm,
  createTask,
  showEditForm,
  updateTask,
  toggleTask,
  deleteTask,
};
