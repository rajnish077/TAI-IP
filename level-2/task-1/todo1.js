const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
});

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToList(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
});

// Delete task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const taskText = e.target.parentElement.textContent.trim();
    e.target.parentElement.classList.add("fadeOut");
    setTimeout(() => {
      e.target.parentElement.remove();
      removeTask(taskText);
    }, 300);
  }
});

// Clear all tasks
clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});

function addTaskToList(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
  li.classList.add("fadeIn");
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
