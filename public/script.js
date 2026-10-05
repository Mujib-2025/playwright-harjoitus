const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task === "") {
    message.textContent = "Omd Bro tehtävä ei voi olla tyhjä! 🤦‍♂️";
    return;
  }
  const listItem = document.createElement("li");
  listItem.textContent = task;
  taskList.appendChild(listItem);
  message.textContent = "Tehtävä lisätty.";
  taskInput.value = "";
});
