const nameForm = document.querySelector(".nameform"),
  nameInput = nameForm.querySelector(".name"),
  greeting = document.querySelector(".greetings");

const USER_NAME = "currentUser",
  SHOWING_FR = "shouwing";

function saveName(text) {
  localStorage.setItem(USER_NAME, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentNameValue = nameInput.value;
  paintGreeting(currentNameValue);
  saveName(currentNameValue);
}

function askForName() {
  nameForm.classList.add(SHOWING_FR);
  nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  nameForm.classList.remove(SHOWING_FR);
  greeting.classList.add(SHOWING_FR);
  greeting.innerText = `${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
