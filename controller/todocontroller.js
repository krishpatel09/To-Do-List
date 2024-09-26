const db = require('../database/db');

// Get all todos
exports.getTodos = (req, res) => {
    db.all('SELECT * FROM todos ORDER BY id DESC', (err, rows) => {
        if (err) {
            console.error('error  fetchnig todos',err.message)
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Add a new todo
exports.addTodo = (req, res) => {
    const { task  } = req.body;
    const created_at = new Date().toLocaleTimeString();
    db.run('INSERT INTO todos (task ,  created_at ) VALUES (? , ? )', [task, created_at ], function(err) {
        if (err) {
            console.error('error to insert data',err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, task , created_at});
    });
};

// Update a todo
exports.updateTodo = (req, res) => {
    const { task } = req.body;
    const { id } = req.params;
    db.run('UPDATE todos SET task = ? WHERE id = ?', [task, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo updated successfully' });
    });
};

// Delete a todo
exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted successfully' });
    });
};
