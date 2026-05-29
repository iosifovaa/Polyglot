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

const modal = document.querySelector("#lessonModal");
const modalTitle = document.querySelector("#modalTitle");
const closeModal = document.querySelector(".close-modal");
const modalExample = document.querySelector("#modalExample");

const lessonData = {
  "Приветствие": "Hello! How are you? — Привет! Как дела?",
  "Путешествия": "Where is the hotel? — Где находится отель?",
  "Сериалы": "What are you up to? — Чем занимаешься?"
};

lessonButtons.forEach(button => {
  button.addEventListener("click", () => {
    const lessonTitle =
      button.parentElement.querySelector("h3").textContent;

    modalTitle.textContent = lessonTitle;
    modalExample.textContent = lessonData[lessonTitle];

    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});