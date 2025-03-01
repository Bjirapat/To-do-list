document.addEventListener("DOMContentLoaded", function () {
  const addText = document.getElementById("addtext");
  const addButton = document.getElementById("btadd");
  const list = document.getElementById("list");
  const clearBtn = document.getElementById("clearBtn");
  const clock = document.getElementById("clock");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask(taskText) {
    if (taskText.trim() === "") return;
    const task = {
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveTasks();
    addListElement(task);
    addText.value = "";
  }

  function addListElement(task) {
    const listItem = document.createElement("li");

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = task.text;
    if (task.completed) {
      taskTextSpan.classList.add("completed");
    }
    listItem.appendChild(taskTextSpan);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.text !== task.text);
      saveTasks();
      listItem.remove();
    });

    listItem.addEventListener("click", () => {
      task.completed = !task.completed;
      taskTextSpan.classList.toggle("completed");
      saveTasks();
    });

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
  }

  function loadTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => addListElement(task));
  }

  addButton.addEventListener("click", () => {
    addTask(addText.value);
  });

  addText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(addText.value);
    }
  });

  clearBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    loadTasks();
  });

  function getThaiTime() {
    const now = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok",
    };
    return now.toLocaleTimeString("th-TH", options);
  }

  function updateClock() {
    clock.textContent = getThaiTime();
  }

  setInterval(updateClock, 1000);

  updateClock();
  loadTasks();
});
