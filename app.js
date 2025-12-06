// DOM Nodes
let inputTodo = document.getElementById("inputTodo");
let addTodoBtn = document.getElementById("addTodoBtn");
let todoUl = document.getElementById("todoUl");

// Grab todo
let saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

// Add todos funtion
addTodoBtn.addEventListener("click", addTodo);
inputTodo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
function addTodo() {
  let todoText = inputTodo.value;
  if (todoText === "") {
    console.log("Empty todo cannot save");
  } else {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    rander();
    inputTodo.value = "";
  }
}

// Save todo function
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete todos function
function deleteTodos(index) {
  todos.splice(index, 1);
  saveTodos();
  rander();
}

// Rander Function
function rander() {
  todoUl.innerHTML = "";

  //Creat todos list(loop)
  todos.forEach((todos, index) => {
    let todoLi = document.createElement("li");
    todoLi.className = "todo-iteam";
    todoUl.appendChild(todoLi);

    let cheakBox = document.createElement("input");
    cheakBox.className = "iteam-cheakbox";
    cheakBox.type = "checkbox";
    cheakBox.checked = todos.completed;
    cheakBox.addEventListener("change", () => {
      CheakboxTougle(todos);
    });
    todoLi.appendChild(cheakBox);

    let todoPara = document.createElement("p");
    todoPara.className = "iteam-text";
    todoLi.appendChild(todoPara);
    todoPara.innerText = todos.text;
    if (todos.completed === true) {
      todoPara.style.textDecoration = "line-through";
    }

    let editBtn = document.createElement("button");
    editBtn.className = "iteam-edit-btn";
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    todoLi.appendChild(editBtn);
    editBtn.addEventListener("click", (e) => {
      editTodo(index);
    });

    let delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    delBtn.className = "iteam-delete-btn";
    todoLi.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
      deleteTodos(index);
    });
  });
}
rander();

// Cheakbox tougle function
function CheakboxTougle(todos) {
  if (todos.completed === false) {
    todos.completed = true;
  } else {
    todos.completed = false;
  }
  saveTodos();
  rander();
}

// Edit todo function
function editTodo(index) {
  inputTodo.value = todos[index].text;
  addTodoBtn.innerHTML = "Done";
  addTodoBtn.onclick = null; // Remove previous event listeners

  addTodoBtn.addEventListener("click", () => {
    deleteTodos(index);
    addTodoBtn.innerHTML = "Add Todo <i class=\"fa-solid fa-file-circle-plus\"></i>";
    addTodoBtn.onclick = null; // Reset the button
    addTodoBtn.addEventListener("click", addTodo);// Re-attach original listener
  });
};