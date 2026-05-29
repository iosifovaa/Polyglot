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
const seriesButtons = document.querySelectorAll(".series-card button");

const seriesModal = document.querySelector("#seriesModal");
const seriesTitle = document.querySelector("#seriesTitle");
const seriesPhrase = document.querySelector("#seriesPhrase");
const seriesTranslation = document.querySelector("#seriesTranslation");
const seriesExplanation = document.querySelector("#seriesExplanation");
const closeSeries = document.querySelector(".close-series");
const continueSeriesBtn = document.querySelector("#seriesModal .continue-btn");

let currentSeries = "";
let currentPhraseIndex = 0;

const seriesData = {
  "🎬 Friends": [
    {
      phrase: "How you doin'?",
      translation: "Как дела?",
      explanation: "Популярное неформальное приветствие."
    },
    {
      phrase: "We were on a break!",
      translation: "У нас был перерыв в отношениях!",
      explanation: "Фраза используется, когда человек оправдывает своё действие."
    },
    {
      phrase: "Could I BE wearing any more clothes?",
      translation: "Могу ли я надеть ещё больше одежды?",
      explanation: "Пример эмоциональной разговорной речи."
    }
  ],

  "🎬 Wednesday": [
    {
      phrase: "I act as if I don't care.",
      translation: "Я веду себя так, будто мне всё равно.",
      explanation: "Пример конструкции 'as if'."
    },
    {
      phrase: "I don't believe in heaven or hell.",
      translation: "Я не верю в рай или ад.",
      explanation: "Пример отрицательного предложения в Present Simple."
    },
    {
      phrase: "Emotions are a gateway trait.",
      translation: "Эмоции — это черта, которая открывает путь к другим слабостям.",
      explanation: "Более сложная фраза для расширения словарного запаса."
    }
  ],

  "🎬 Stranger Things": [
    {
      phrase: "Friends don't lie.",
      translation: "Друзья не лгут.",
      explanation: "Простое предложение в Present Simple."
    },
    {
      phrase: "Mornings are for coffee and contemplation.",
      translation: "Утро создано для кофе и размышлений.",
      explanation: "Фраза помогает изучить устойчивые выражения."
    },
    {
      phrase: "She's our friend and she's crazy.",
      translation: "Она наша подруга, и она сумасшедшая.",
      explanation: "Пример связки предложений через 'and'."
    }
  ]
};

function showSeriesPhrase() {
  const lesson = seriesData[currentSeries][currentPhraseIndex];

  seriesTitle.textContent = currentSeries;
  seriesPhrase.textContent = lesson.phrase;
  seriesTranslation.textContent = lesson.translation;
  seriesExplanation.textContent = lesson.explanation;

  if (currentPhraseIndex === seriesData[currentSeries].length - 1) {
    continueSeriesBtn.textContent = "Завершить урок";
  } else {
    continueSeriesBtn.textContent = "Продолжить изучение";
  }
}

seriesButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    currentSeries = card.querySelector("h3").textContent;
    currentPhraseIndex = 0;

    showSeriesPhrase();
    seriesModal.classList.add("active");
  });
});

continueSeriesBtn.addEventListener("click", () => {
  if (currentPhraseIndex < seriesData[currentSeries].length - 1) {
    currentPhraseIndex++;
    showSeriesPhrase();
  } else {
    seriesModal.classList.remove("active");
    alert("Урок завершён!");
  }
});

closeSeries.addEventListener("click", () => {
  seriesModal.classList.remove("active");
});