
const textField = document.getElementById('textfield');
const addButton = document.getElementById('addTodo');
const resultContainer = document.getElementById('result');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    resultContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');
        todoElement.innerHTML = `
            <span class="${todo.done ? 'done' : ''}">${todo.text}</span>
            <button class="deleteBtn">Delete</button>
            <button class="doneBtn">${todo.done ? 'Undo' : 'Done'}</button>
        `;
        resultContainer.appendChild(todoElement);

        todoElement.querySelector('.deleteBtn').addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        todoElement.querySelector('.doneBtn').addEventListener('click', () => {
            toggleDone(todo.id);
        });
    });
}


function addTodo() {
    const newTodoText = textField.value.trim();
    if (newTodoText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodo = {
            id: Date.now(), 
            text: newTodoText,
            done: false 
        };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        textField.value = '';
        loadTodos(); 
    }
}


function deleteTodo(todoId) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos(); 
}


function toggleDone(todoId) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos(); 
}


addButton.addEventListener('click', addTodo);
window.addEventListener('load', loadTodos);
