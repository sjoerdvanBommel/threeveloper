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

  setTimeout(() => {
    bubble.style.top = "-6px";
  }, 100);

  bubble.style.setProperty("--size", `${Math.random() * 3 + 3}px`);
  bubble.style.setProperty("--duration", `${Math.random() * 30 + 10}s`);
  bubble.style.setProperty("--opacity", `${Math.random() * 80 + 20}%`);
  const randomColorIndex = Math.floor(Math.random() * colors.length);

  bubble.style.backgroundColor = colors[randomColorIndex];

  bubble.ontransitionend = () => {
    bubblesContainer.removeChild(bubble);
  };
}, 100);
