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
  if (checklistBox) {
      checklistBox.pos = k.vec2(k.width() - 310, 20);
      updateChecklistItemPositions();
  }
}

import { objectives, rewardTextContent } from "./constants";
import { k } from "./kaboomCtx";

k.loadFont("monogram", "monogram.ttf");

function checkCompletion() {
  if (objectives.every(obj => obj.completed)) {
      showCompletionReward();
  }
}

export function completeObjective(index) {
  if (objectives[index] && !objectives[index].completed) {
      objectives[index].completed = true;
      displayChecklist();
      showNotification(`${objectives[index].description} completed!`);
      checkCompletion();
  }
}

function showCompletionReward() {
  const wrappedText = wrapText(rewardTextContent, 450, 30);

  const rewardText = k.add([
      k.text(wrappedText, { size: 30, font: "monogram" }),
      k.pos(k.width() - 290, 170),
      k.color(255, 255, 255),
      k.lifespan(30, { fade: 1 }),
      k.fixed(),
  ]);

  function getRandomColor() {
      return k.rgb(k.rand(0, 255), k.rand(0, 255), k.rand(0, 255));
  }

  // Change text color every 500ms
  setInterval(() => {
      rewardText.color = getRandomColor();
  }, 500);

  // Add confetti at random positions
  for (let i = 0; i < 10; i++) {
      const randomX = k.rand(0, k.width());
      const randomY = k.rand(0, k.height());
      createConfetti(randomX, randomY);
  }
}

// Add confetti
function createConfetti(x, y) {
  for (let i = 0; i < 10; i++) {
      k.add([
          k.rect(4, 4),
          k.pos(x, y),
          k.color(k.rand(0, 255), k.rand(0, 255), k.rand(0, 255)),
          k.move(k.rand(0, 360), k.rand(50, 100)),
          k.lifespan(30, { fade: 1 }),
      ]);
  }
}

let checklistBox;
let checklistItems = [];

export function displayChecklist() {
  // Remove previous items
  checklistItems.forEach(item => k.destroy(item));
  checklistItems = [];

  const itemHeight = 24;
  const totalHeight = objectives.length * itemHeight + 20;

  // Create or update the checklist box
  if (!checklistBox) {
      checklistBox = k.add([
          k.rect(300, totalHeight),
          k.pos(k.width() - 310, 20),
          k.color(0, 0, 0),
          k.opacity(0.3),
          k.z(1),
          k.fixed(),
          { tag: "checklist-background" },
      ]);
  } else {
      checklistBox.width = 300;
      checklistBox.height = totalHeight;
      checklistBox.pos = k.vec2(k.width() - 310, 20);
  }

  const startY = checklistBox.pos.y + 10;

  objectives.forEach((objective, index) => {
      const checkbox = objective.completed ? "[x]" : "[ ]";
      const color = objective.completed ? k.Color.GREEN : k.Color.WHITE;

      const item = k.add([
          k.text(`${checkbox} ${objective.description}`, { size: 25, font: "monogram" }),
          k.pos(checklistBox.pos.x + 10, startY + index * itemHeight),
          k.color(color),
          k.z(11),
          k.fixed(),
          { tag: "checklist-item" },
      ]);
      checklistItems.push(item);
  });
}

function updateChecklistItemPositions() {
  const startY = checklistBox.pos.y + 10;

  checklistItems.forEach((item, index) => {
      item.pos = k.vec2(checklistBox.pos.x + 10, startY + index * 24);
  });
}

window.addEventListener("resize", () => {
  if (checklistBox) {
      checklistBox.pos = k.vec2(k.width() - 310, 20);
      updateChecklistItemPositions();
  }
});

export function showNotification(message) {
  const checklistY = 20;
  const checklistHeight = objectives.length * 24 + 20;
  const maxWidth = 490;
  const notificationY = checklistY + checklistHeight + 10;
  const wrappedText = wrapText(message, maxWidth, 25);
  const notification = k.add([
      k.text(wrappedText, { size: 25, font: "monogram", width: maxWidth }),
      k.color(44, 255, 5),
      k.pos(k.width() - 290, notificationY),
      k.z(13),
      k.lifespan(1, { fade: 1 }),
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
