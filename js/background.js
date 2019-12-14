const body = document.querySelector("body");

const IMG_NUMBER = 11;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `bg/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function random() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = random();
  paintImage(randomNumber);
}

init();
