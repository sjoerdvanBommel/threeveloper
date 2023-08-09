const section = document.querySelector(".activities");
const activities = section.querySelectorAll(".activity");

activities.forEach((activityElement, i) => {
    activityElement.addEventListener("click", () => {
        if (activityElement.classList.contains('active')) return;

        // Move the section to the center of activityElement
        section.style.transform = `translateX(${25 - i * 50}%)`;

        // Animations to previous/next element
        const previousActiveElement = section.querySelector('.active');

        previousActiveElement.classList.remove('active');
        activityElement.classList.add("active");

        // Background
        const item = activityElement.getAttribute("data-item");
        const wave = document.querySelector(`[data-wave="${item}"]`);
        wave.parentNode.appendChild(wave);
    });
});
  









