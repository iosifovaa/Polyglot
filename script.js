const buttons = document.querySelectorAll(".language-buttons button");
const startButton = document.querySelector(".main-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    alert(`Выбран язык сайта: ${button.textContent}`);
  });
});

startButton.addEventListener("click", () => {
  alert("Скоро здесь будет регистрация и персональная анкета!");
});