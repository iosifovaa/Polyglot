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