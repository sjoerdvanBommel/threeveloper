const between = (min, max) => Math.random() * (max - min) + min

const bubblesContainer = document.getElementById("bubbles");
const colors = ["#e44141", "#4f2af3"];

setInterval(() => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  
  bubblesContainer.appendChild(bubble);

  bubble.style.left = `${between(0, 100)}%`;

  const sizePx = `${between(4, 8)}px`;

  const floatingBubbleKeyFrames = [
    { top: '100%' },
    { top: `-${sizePx}` }
  ]

  const floatingAnimation = bubble.animate(
    floatingBubbleKeyFrames,
    between(10000, 40000),
  );

  floatingAnimation.onfinish = () => {
    bubblesContainer.removeChild(bubble);
  }

  bubble.style.width = sizePx;
  bubble.style.height = sizePx;

  const colors = ["#e44141", "#4f2af3"];
  const randomColorIndex = 
    Math.floor(Math.random() * colors.length);
  bubble.style.background = colors[randomColorIndex];

  bubble.style.opacity = `${between(20, 100)}%`;
}, 100);
