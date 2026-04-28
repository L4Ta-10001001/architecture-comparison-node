# Task Manager — Conventional Architecture
### A minimal task manager demonstrating spaghetti/conventional code —
### intentionally unstructured for educational purposes.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)
![Port](https://img.shields.io/badge/Port-3000-blue)

## What Is Conventional Architecture?

Conventional (or spaghetti) architecture is not a deliberate design decision — it is what happens when a project grows without structure. In this pattern, there are no defined layers: the same function that receives an HTTP request also queries the database, applies business rules, and renders the HTML response.

This approach is extremely common in beginner projects and early prototypes because it requires no upfront planning. Everything lives in one place, which feels simple at first. The problem appears later: as the application grows, the single file becomes harder to read, test, and modify without breaking something else.

Studying this pattern is valuable because it appears constantly in real legacy codebases. Recognizing it is the first step toward improving it.

## Project Structure

```
spaghetti/
├── views/
│   ├── index.ejs      ← task list
│   ├── new.ejs        ← create form
│   └── edit.ejs       ← edit form
├── app.js             ← ALL logic lives here (routes + DB + rendering)
├── database.db        ← auto-generated on first run
└── package.json
```

## How It Works

Every route handler in `app.js` does three things at once:

```js
// Pseudocode of a single route in this app:
app.get('/', (req, res) => {
  const db = openDatabase()                          // 1. data access
  const tasks = db.query('SELECT * FROM tasks')      // 1. data access
  if (!tasks) return res.send('Error')               // 2. business rule
  res.render('index', { tasks })                     // 3. presentation
})
```

There is no separation. The route IS the controller, the model, and the view logic all at once.

## Running the App

```bash
npm install
node app.js
# Open http://localhost:3000
```

## Features

- List all tasks
- Create a new task
- Edit an existing task
- Toggle task as complete / incomplete
- Delete a task

## Why Study This?

Seeing spaghetti code in a small, controlled project makes it easy to understand why it is problematic at scale — without having to suffer through a real legacy codebase first. Compare this folder with `lasagna/` to see the same features implemented with structure.

## Part of

[architecture-comparison-node](https://github.com/L4Ta-10001001/architecture-comparison-node)
