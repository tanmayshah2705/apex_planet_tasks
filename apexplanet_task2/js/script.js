// Responsive navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Validate required fields and email format.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    ["nameError", "emailError", "messageError"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
    formFeedback.textContent = "";
    formFeedback.className = "feedback";
    let valid = true;

    if (!name) {
        document.getElementById("nameError").textContent = "Please enter your name.";
        valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById("emailError").textContent = "Please enter your email address.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
    }
    if (!message) {
        document.getElementById("messageError").textContent = "Please enter a message.";
        valid = false;
    }

    if (valid) {
        formFeedback.textContent = "Form validated successfully! (Demo only — no data was sent.)";
        formFeedback.classList.add("success");
        contactForm.reset();
    } else {
        formFeedback.textContent = "Please correct the highlighted fields.";
        formFeedback.classList.add("failure");
    }
});

// To-do list: add, complete and remove items through DOM manipulation.
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoError = document.getElementById("todoError");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");

function updateTodoDisplay() {
    const items = todoList.querySelectorAll(".todo-item");
    const completed = todoList.querySelectorAll(".todo-item.completed").length;
    emptyState.hidden = items.length > 0;
    taskCount.textContent = `${items.length} task${items.length === 1 ? "" : "s"} · ${completed} done`;
}

function addTodo(taskText) {
    const item = document.createElement("li");
    item.className = "todo-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Mark ${taskText} as complete`);
    const text = document.createElement("span");
    text.textContent = taskText;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${taskText}`);

    checkbox.addEventListener("change", () => {
        item.classList.toggle("completed", checkbox.checked);
        updateTodoDisplay();
    });
    remove.addEventListener("click", () => {
        item.remove();
        updateTodoDisplay();
    });
    item.append(checkbox, text, remove);
    todoList.appendChild(item);
    updateTodoDisplay();
}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = todoInput.value.trim();
    if (!task) {
        todoError.textContent = "Please type a task before adding it.";
        return;
    }
    todoError.textContent = "";
    addTodo(task);
    todoForm.reset();
    todoInput.focus();
});
updateTodoDisplay();
