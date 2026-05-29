const onboardingSteps = [
  {
    title: "Выберите язык интерфейса",
    description: "На каком языке вам удобно пользоваться сайтом?",
    options: ["Русский", "Қазақша", "English", "Türkçe"]
  },
  {
    title: "Какой язык вы хотите изучать?",
    description: "Выберите язык, под который будет подбираться программа.",
    options: ["English", "Türkçe", "Қазақша", "Deutsch", "Français", "한국어"]
  },
  {
    title: "Какая у вас цель?",
    description: "Это поможет подобрать темы и задания.",
    options: ["Путешествия", "Работа", "Учёба", "Сериалы и фильмы"]
  },
  {
    title: "Ваш уровень",
    description: "Выберите примерный уровень владения языком.",
    options: ["Beginner", "Elementary", "Intermediate", "Advanced"]
  }
];

let currentStep = 0;

const stepNumber = document.querySelector("#stepNumber");
const stepTitle = document.querySelector("#stepTitle");
const stepDescription = document.querySelector("#stepDescription");
const stepOptions = document.querySelector("#stepOptions");
const nextStepBtn = document.querySelector("#nextStepBtn");
const backStepBtn = document.querySelector("#backStepBtn");

function renderStep() {
  const step = onboardingSteps[currentStep];

  stepNumber.textContent = `Шаг ${currentStep + 1} из ${onboardingSteps.length}`;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;

  stepOptions.innerHTML = "";

  step.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => {
      document.querySelectorAll(".step-options button").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    stepOptions.appendChild(button);
  });

  nextStepBtn.textContent =
    currentStep === onboardingSteps.length - 1 ? "Завершить" : "Далее";

  backStepBtn.disabled = currentStep === 0;
}

nextStepBtn.addEventListener("click", () => {
  if (currentStep < onboardingSteps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    alert("Программа обучения настроена!");
  }
});

backStepBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
}); 

renderStep();
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
    },
    {
      phrase: "He's her lobster.",
      translation: "Он её судьба.",
      explanation: "В сериале 'lobster' используется как метафора настоящей любви."
    },
    {
      phrase: "Welcome to the real world. It sucks. You're gonna love it.",
      translation: "Добро пожаловать в реальный мир. Он ужасен. Тебе понравится.",
      explanation: "Популярная фраза о взрослении и самостоятельной жизни."
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
    },
    {
      phrase: "I find social media to be a soul-sucking void.",
      translation: "Я считаю социальные сети высасывающей душу пустотой.",
      explanation: "Полезная современная лексика."
    },
    {
      phrase: "People like to break me down.",
      translation: "Люди любят пытаться сломить меня.",
      explanation: "Фраза о давлении со стороны окружающих."
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
    },
    {
      phrase: "Why are you keeping this curiosity door locked?",
      translation: "Почему ты держишь дверь любопытства закрытой?",
      explanation: "Метафорическая фраза о познании нового."
    },
    {
      phrase: "Sometimes your total obliviousness just blows my mind.",
      translation: "Иногда твоя полная неосведомлённость просто поражает меня.",
      explanation: "Полезная разговорная конструкция."
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
    showSeriesQuiz();
  }
});

closeSeries.addEventListener("click", () => {
  seriesModal.classList.remove("active");
});
function showSeriesQuiz() {
  seriesTitle.textContent = "Мини-тест";

  seriesPhrase.textContent = "Что означает фраза: Friends don't lie?";
  seriesTranslation.textContent = "";

  seriesExplanation.innerHTML = `
    <div class="quiz-options">
      <button onclick="checkQuizAnswer(true)">Друзья не лгут</button>
      <button onclick="checkQuizAnswer(false)">Друзья не помогают</button>
      <button onclick="checkQuizAnswer(false)">Друзья не разговаривают</button>
    </div>
  `;

  continueSeriesBtn.style.display = "none";
}

function checkQuizAnswer(isCorrect) {
  if (isCorrect) {
    seriesExplanation.innerHTML = `
      <p class="correct-answer">Правильно! +10 XP 🎉</p>
    `;
  } else {
    seriesExplanation.innerHTML = `
      <p class="wrong-answer">Неправильно. Попробуйте ещё раз.</p>
    `;
  }

  setTimeout(() => {
    seriesModal.classList.remove("active");
    continueSeriesBtn.style.display = "block";
  }, 1500);
}