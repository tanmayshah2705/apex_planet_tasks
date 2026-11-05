const STORAGE_KEY = 'tanmay-portfolio-tasks-v1';

const form = document.querySelector('#todo-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const message = document.querySelector('#form-message');
const clearCompletedButton = document.querySelector('#clear-completed');

let tasks = loadTasks();
let currentFilter = 'all';

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved)
      ? saved.filter(task => task && typeof task.text === 'string' && typeof task.completed === 'boolean')
      : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    message.textContent = 'Could not save tasks. Browser storage may be unavailable.';
  }
}

function createTask(text) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false,
    createdAt: Date.now()
  };
}

function getVisibleTasks() {
  if (currentFilter === 'active') return tasks.filter(task => !task.completed);
  if (currentFilter === 'completed') return tasks.filter(task => task.completed);
  return tasks;
}

function updateCounts() {
  const completed = tasks.filter(task => task.completed).length;
  const active = tasks.length - completed;

  document.querySelector('#all-count').textContent = tasks.length;
  document.querySelector('#active-count').textContent = active;
  document.querySelector('#completed-count').textContent = completed;
  document.querySelector('#remaining-count').textContent =
    `${active} ${active === 1 ? 'task' : 'tasks'} remaining`;
  clearCompletedButton.disabled = completed === 0;
}

function renderTasks() {
  list.replaceChildren();
  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach(task => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.setAttribute('aria-label', `Mark ${task.text} as ${task.completed ? 'active' : 'completed'}`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-task';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter(entry => entry.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTasks.length !== 0;
  updateCounts();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    message.textContent = 'Please enter a task first.';
    input.focus();
    return;
  }

  tasks.unshift(createTask(text));
  saveTasks();
  input.value = '';
  message.textContent = 'Task added.';
  currentFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.classList.toggle('selected', button.dataset.filter === 'all');
  });
  renderTasks();
  input.focus();
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(filterButton => {
      const selected = filterButton === button;
      filterButton.classList.toggle('selected', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    renderTasks();
  });
});

clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
  message.textContent = 'Completed tasks cleared.';
});

renderTasks();
