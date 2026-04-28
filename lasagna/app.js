// LAYER: App Entry Point
// Responsabilidad única: configurar Express y arrancar el servidor.
// Sin lógica de rutas, sin acceso a la base de datos.

const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const PORT = 3001;

const app = express();

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');

// Permite leer cuerpos de formularios HTML
app.use(express.urlencoded({ extended: false }));

// Monta todas las rutas de tareas en la raíz
app.use('/', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor MVC escuchando en http://localhost:${PORT}`);
});
