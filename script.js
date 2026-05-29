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
const seriesButtons =
  document.querySelectorAll(".series-card button");

const seriesModal =
  document.querySelector("#seriesModal");

const seriesTitle =
  document.querySelector("#seriesTitle");

const seriesPhrase =
  document.querySelector("#seriesPhrase");

const seriesTranslation =
  document.querySelector("#seriesTranslation");

const seriesExplanation =
  document.querySelector("#seriesExplanation");

const closeSeries =
  document.querySelector(".close-series");

const seriesData = {
  "🎬 Friends": {
    phrase: "How you doin'?",
    translation: "Как дела?",
    explanation:
      "Популярное неформальное приветствие."
  },

  "🎬 Wednesday": {
    phrase: "I act as if I don't care.",
    translation:
      "Я веду себя так, будто мне всё равно.",
    explanation:
      "Пример использования конструкции 'as if'."
  },

  "🎬 Stranger Things": {
    phrase: "Friends don't lie.",
    translation: "Друзья не лгут.",
    explanation:
      "Простое предложение в Present Simple."
  }
};

seriesButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
      button.parentElement;

    const title =
      card.querySelector("h3").textContent;

    seriesTitle.textContent = title;
    seriesPhrase.textContent =
      seriesData[title].phrase;

    seriesTranslation.textContent =
      seriesData[title].translation;

    seriesExplanation.textContent =
      seriesData[title].explanation;

    seriesModal.classList.add("active");

  });

});

closeSeries.addEventListener("click", () => {
  seriesModal.classList.remove("active");
});