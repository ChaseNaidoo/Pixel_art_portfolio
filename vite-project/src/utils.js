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

k.loadFont("monogram", "monogram.ttf");

export function displayChecklist() {
  k.add([
    k.rect(300, objectives.length * 24 + 20),
    k.pos(k.width() - 310, 20),
    k.color(0, 0, 0),
    k.opacity(0.3),
    k.z(10),
    k.fixed(),
  ]);

  objectives.forEach((objective, index) => {
    const color = objective.completed ? k.Color.GREEN : k.Color.WHITE;
    k.add([
      k.text(objective.description, { size: 25, font: "monogram" }),
      k.pos(k.width() - 290, 30 + index * 24),
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
  const checklistY = 20;
  const checklistHeight = objectives.length * 24 + 20;
  const maxWidth = 490;
  const notificationY = checklistY + checklistHeight + 10;
  const wrappedText = wrapText(message, maxWidth, 25);
  const notification = k.add([
    k.text(wrappedText, { size: 25, font: "monogram", width: maxWidth }),
    k.color(57, 255, 20),
    k.pos(k.width() - 290, notificationY),
    k.z(13),
    k.lifespan(2, { fade: 1 }),
    k.fixed(),
  ]);
}

function wrapText(text, maxWidth, fontSize) {
  const words = text.split(" ");
  let lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine + word + " ";
    const testWidth = testLine.length * fontSize * 0.6;

    if (testWidth > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  });

  lines.push(currentLine.trim());
  return lines.join("\n");
}

