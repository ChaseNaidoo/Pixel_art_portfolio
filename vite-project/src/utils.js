export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";
  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }

    clearInterval(intervalRef);
  }, 1);

  const closeBtn = document.getElementById("close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);

  addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      closeBtn.click();
    }
  });
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}

import { objectives } from "./constants";
import { k } from "./kaboomCtx";

export function displayChecklist() {
  k.add([
    k.rect(220, objectives.length * 24 + 20),
    k.pos(k.width() - 240, 20),
    k.color(0, 0, 0, 0.8),
    k.z(10),
    k.fixed(),
  ]);

  objectives.forEach((objective, index) => {
    const color = objective.completed ? k.Color.GREEN : k.Color.WHITE;
    k.add([
      k.text(objective.description, { size: 16 }),
      k.pos(k.width() - 230, 30 + index * 24),
      k.color(color),
      k.z(11),
      k.fixed(),
    ]);
  });
}

export function completeObjective(index) {
  if (objectives[index] && !objectives[index].completed) {
    objectives[index].completed = true;
    displayChecklist();
    showNotification(`${objectives[index].description} completed!`);
  }
}

export function showNotification(message) {
  const notification = k.add([
    k.text(message, { size: 16 }),
    k.z(13),
    k.lifespan(2, { fade: 0.5 }),
  ]);

  const fontSize = 16;
  const textWidth = message.length * fontSize * 0.6;
  const textHeight = fontSize;

  notification.pos = k.vec2(k.width() / 2 - textWidth / 2, k.height() / 2 - textHeight / 2);
}

