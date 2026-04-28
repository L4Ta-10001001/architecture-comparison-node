// LAYER: Routing
// Responsabilidad única: mapear verbos HTTP + rutas a funciones del controlador.
// Sin lógica de negocio, sin acceso a datos.

const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

// Lista todas las tareas
router.get('/', taskController.listTasks);

// Formulario para crear una tarea nueva
router.get('/tasks/new', taskController.showNewForm);

// Crea una tarea
router.post('/tasks', taskController.createTask);

// Formulario para editar una tarea existente
router.get('/tasks/:id/edit', taskController.showEditForm);

// Actualiza una tarea existente
router.post('/tasks/:id', taskController.updateTask);

// Alterna el estado completado/pendiente de una tarea
router.post('/tasks/:id/toggle', taskController.toggleTask);

// Elimina una tarea
router.post('/tasks/:id/delete', taskController.deleteTask);

module.exports = router;
