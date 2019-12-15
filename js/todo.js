const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector(".today"),
  pending = document.querySelector(".pL"),
  done = document.querySelector(".fL");

const TODOS_LS = "toDos",
  DONE_LS = "doneAim";

let toDos = [],
  doneAim = [];

let paint = true;

const createNode = element => {
  return document.createElement(element);
};

const append = (parent, ele) => {
  return parent.appendChild(ele);
};

const saveToDo = text => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(DONE_LS, JSON.stringify(doneAim));
};

const deleteToDo = dele => {
  const btn = dele.target;
  const li = btn.parentNode;

  if (li.parentNode === pending) {
    pending.removeChild(li);
    const cleanToDos = toDos.filter(toDo => {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDos = cleanToDos;
  } else {
    done.removeChild(li);
    const cleanAim = doneAim.filter(form => {
      return form.id !== parseInt(li.id, 10);
    });
    doneAim = cleanAim;
  }
  saveToDo();
};

const backToDo = dele => {
  paintToDo(dele.target.parentNode.querySelector("span").innerText);
  deleteToDo(dele);
};

const doneToDo = dele => {
  const item = dele.target.parentNode.cloneNode(true);
  const button = item.getElementsByTagName("button");
  const value = item.querySelector("span").innerText;
  const doneId = doneToDo.length + 1;
  item.id = doneId;
  button[0].innerText = "➕";

  button[0].addEventListener("click", backToDo);
  button[1].addEventListener("click", deleteToDo);

  deleteToDo(dele);

  append(done, item);
  const doneObj = {
    text: value,
    id: doneId
  };
  doneAim.push(doneObj);
  saveToDo();
};

const paintToDo = text => {
  const li = createNode("li");
  li.classList.add("item");
  const delBtn = createNode("button");
  const doneBtn = createNode("button");
  const span = createNode("span");
  let newId = paint ? toDos.length + 1 : doneAim.length + 1;
  if (paint) {
    doneBtn.innerText = "✔";
    doneBtn.addEventListener("click", doneToDo);
  } else {
    doneBtn.innerText = "➕";
    doneBtn.addEventListener("click", backToDo);
  }

  delBtn.innerText = "➖";

  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;
  append(li, span);
  append(li, doneBtn);
  append(li, delBtn);

  li.id = newId;
  if (paint) {
    append(pending, li);
  } else {
    append(done, li);
  }

  const toDoObj = {
    text: text,
    id: newId
  };

  if (paint) {
    toDos.push(toDoObj);
  } else {
    doneAim.push(toDoObj);
  }
  saveToDo();
};

const treatSubmit = dele => {
  dele.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
};

const loadToDo = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedDone = localStorage.getItem(DONE_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);

    parseToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
  if (loadedDone !== null) {
    const parseDone = JSON.parse(loadedDone);
    paint = false;
    parseDone.forEach(form => {
      paintToDo(form.text);
    });
    paint = true;
  }
};

const tomato = () => {
  loadToDo();
  toDoForm.addEventListener("submit", treatSubmit);
};

tomato();
