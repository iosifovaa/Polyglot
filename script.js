const startButton = document.querySelector(".start-btn");
const onboarding = document.querySelector("#onboarding");
const optionButtons = document.querySelectorAll(".step-card button");

startButton.addEventListener("click", () => {
  onboarding.scrollIntoView({ behavior: "smooth" });
});

optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
  });
});
const lessonButtons = document.querySelectorAll(".lesson-card button");

lessonButtons.forEach(button => {
  button.addEventListener("click", () => {
    const lessonTitle = button.parentElement.querySelector("h3").textContent;
    alert(`Открывается урок: ${lessonTitle}`);
  });
});