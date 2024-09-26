const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

async function fetchTodos() {
  try {
    const response = await fetch("/todos");
    if (!response.ok) {
      console.error("failed to fetch todos");
    }
    const todos = await response.json();
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.dataset.id = todo.id;
      li.innerHTML = `
            <input type="text" value="${todo.task}" disabled>
            <span>${todo.created_at}</span>
            <button onclick="editTodo(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            
            `;
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("error fetching todo response", error);
  }
}

// Add new todo
async function addTodo(task) {
  try {
    await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    fetchTodos();
  } catch (error) {
    console.error("error edding todo", error);
  }
}

// Edit an todo
async function editTodo(id) {
  const li = document.querySelector(`[data-id='${id}']`);
  const input = li.querySelector('input');
  input.disabled = false;
  input.focus();
  li.querySelector('button').textContent = 'Save';
  li.querySelector('button').onclick = async function() {
      const updatedTask = input.value;
      await fetch(`/todos/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: updatedTask }),
      });
      fetchTodos();
  };
}

// Delete a todo
async function deleteTodo(id) {
  await fetch(`/todos/${id}`, {
    method: "DELETE",
  });
  fetchTodos();
}

// Handle form submission
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const task = todoInput.value;
  addTodo(task);
  todoInput.value = "";
});
fetchTodos();
