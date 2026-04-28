# Task Manager — MVC Architecture
### A minimal task manager demonstrating a clean
### Model-View-Controller layered architecture.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)
![Port](https://img.shields.io/badge/Port-3001-blue)

## What Is MVC Architecture?

MVC (Model-View-Controller) is a software pattern that separates an application into three distinct layers, each with a single, well-defined responsibility. No layer does the job of another.

The **Model** handles all data access — it is the only part of the app that talks to the database. The **View** handles all presentation — it renders HTML and knows nothing about where data comes from. The **Controller** sits between them: it receives requests, asks the Model for data, applies business logic, and tells the View what to render.

This separation makes code easier to read, test, and extend because a change in one layer does not ripple into the others.

## Project Structure

```
lasagna/
├── controllers/
│   └── taskController.js   ← Business Logic layer
├── db/
│   ├── database.js         ← DB connection
│   └── taskModel.js        ← Data layer (only file that runs SQL)
├── routes/
│   └── taskRoutes.js       ← Maps HTTP paths to controller functions
├── views/
│   ├── index.ejs           ← Presentation layer
│   ├── new.ejs
│   └── edit.ejs
├── app.js                  ← Entry point only (no route logic, no SQL)
├── database.db             ← auto-generated on first run
└── package.json
```

## Layer Breakdown

| File / Folder | Responsible for | NOT allowed to |
|---|---|---|
| `db/taskModel.js` | SQL queries only | Use `req`/`res` objects |
| `controllers/taskController.js` | Orchestrate model + view | Write raw SQL |
| `views/*.ejs` | Render HTML | Call the database |
| `routes/taskRoutes.js` | Map paths to controllers | Contain business logic |
| `app.js` | Bootstrap Express | Contain any route or DB logic |

## How It Works

Every request follows a strict lifecycle:

```
Request
  → taskRoutes.js        (which controller handles this?)
  → taskController.js    (call the model, apply logic)
  → taskModel.js         (run the SQL, return data)
  → taskController.js    (receive data, call res.render)
  → views/*.ejs          (render HTML)
Response
```

Pseudocode for the "list all tasks" route:

```js
// taskModel.js
const getAllTasks = () => db.prepare('SELECT * FROM tasks').all()

// taskController.js
const listTasks = (req, res) => {
  const tasks = getAllTasks()        // asks the model
  res.render('index', { tasks })    // tells the view
}

// taskRoutes.js
router.get('/', listTasks)          // maps the path
```

## Running the App

```bash
npm install
node app.js
# Open http://localhost:3001
```

## Features

- List all tasks
- Create a new task
- Edit an existing task
- Toggle task as complete / incomplete
- Delete a task

## Part of

[architecture-comparison-node](https://github.com/L4Ta-10001001/architecture-comparison-node)
