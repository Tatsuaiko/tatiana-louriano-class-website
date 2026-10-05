const button = document.querySelector("#button");
const message = document.querySelector("#message");

function changeMessage() {
  message.textContent = "You clicked the button!";
}

button.addEventListener("click", changeMessage);