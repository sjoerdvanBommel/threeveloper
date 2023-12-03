const rows = 20;
const cols = 6;
const gridRectSize = 80;
const svg = document.getElementById("grid-svg");
svg?.setAttribute(
  "viewBox",
  `0 0 ${rows * gridRectSize} ${cols * gridRectSize}`
);

const bubblesContainer = document.getElementById("bubbles");
const colors = ["#e44141", "#4f2af3"];

setInterval(() => {
  if (Math.random() < 0.9) return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const xPos = Math.random() * bubblesContainer.clientWidth;
  bubble.style.left = `${xPos}px`;
  bubble.style.top = "100%";

  bubblesContainer.appendChild(bubble);


  const durationSeconds = Math.random() * 30 + 10;
  const sizePx = Math.random() * 4 + 4;

  requestAnimationFrame(() => {
    bubble.style.top = `-${sizePx}px`;
  });

  bubble.style.setProperty("--size", `${sizePx}px`);
  bubble.style.setProperty("--duration", `${durationSeconds}s`);
  bubble.style.setProperty("--opacity", `${Math.random() * 80 + 20}%`);
  const randomColorIndex = Math.floor(Math.random() * colors.length);

  bubble.style.backgroundColor = colors[randomColorIndex];

  setTimeout(() => {
    bubblesContainer.removeChild(bubble);
  }, durationSeconds * 1000);
}, 10);
