let currentSiteLanguage = localStorage.getItem("polyglotLang") || "ru";
let currentLearningLanguage = localStorage.getItem("polyglotLearningLang") || "English";
let selectedLearningLang = currentLearningLanguage;

const profileLabels = {
  ru: "👤 Профиль",
  kk: "👤 Жеке бет",
  en: "👤 Profile",
  tr: "👤 Profil"
};

const onboardingSteps = [
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

function isLearningLanguageStep(step) {
  return step.options.includes("Deutsch") && step.options.includes("한국어");
}

function renderStep() {
  const t = translations[currentSiteLanguage];
  const steps = t.onboardingSteps || onboardingSteps;
  const step = steps[currentStep];
  const learningLanguageStep = isLearningLanguageStep(step);

  stepNumber.textContent = `${t.stepLabel} ${currentStep + 1} ${t.stepOf} ${steps.length}`;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;

  stepOptions.innerHTML = "";

  step.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    if (learningLanguageStep && option === selectedLearningLang) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".step-options button").forEach(btn => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      if (learningLanguageStep) {
        selectedLearningLang = option;
        localStorage.setItem("polyglotLearningLang", selectedLearningLang);
      }
    });

    stepOptions.appendChild(button);
  });

  nextStepBtn.textContent =
    currentStep === steps.length - 1 ? t.finishBtn : t.nextBtn;

  backStepBtn.textContent = t.backBtn;

  backStepBtn.disabled = currentStep === 0;
}

nextStepBtn.addEventListener("click", () => {
  const steps = translations[currentSiteLanguage].onboardingSteps || onboardingSteps;

  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    applyLearningLanguage(selectedLearningLang);
    alert(translations[currentSiteLanguage].onboardingDone);
  }
});

backStepBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

const seriesButtons = document.querySelectorAll(".video-lesson-card button");

const seriesModal = document.querySelector("#seriesModal");
const seriesTitle = document.querySelector("#seriesModal #seriesTitle");
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
    continueSeriesBtn.textContent = translations[currentSiteLanguage].finishLessonBtn;
  } else {
    continueSeriesBtn.textContent = translations[currentSiteLanguage].continueStudyBtn;
  }
}

seriesButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".video-lesson-card");
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
  const quizzes = {
    "🎬 Friends": {
      question: "Что означает фраза: How you doin'?",
      answers: [
        { text: "Как дела?", correct: true },
        { text: "Где ты живёшь?", correct: false },
        { text: "Что ты делаешь?", correct: false }
      ]
    },

    "🎬 Wednesday": {
      question: "Что означает фраза: I act as if I don't care?",
      answers: [
        { text: "Я веду себя так, будто мне всё равно.", correct: true },
        { text: "Мне всё нравится.", correct: false },
        { text: "Я очень переживаю.", correct: false }
      ]
    },

    "🎬 Stranger Things": {
      question: "Что означает фраза: Friends don't lie?",
      answers: [
        { text: "Друзья не лгут.", correct: true },
        { text: "Друзья не помогают.", correct: false },
        { text: "Друзья не разговаривают.", correct: false }
      ]
    }
  };

  const quiz = quizzes[currentSeries];

  seriesTitle.textContent = translations[currentSiteLanguage].miniQuizTitle;
  seriesPhrase.textContent = quiz.question;
  seriesTranslation.textContent = "";
  seriesExplanation.innerHTML = "";

  const quizBox = document.createElement("div");
  quizBox.classList.add("quiz-options");

  quiz.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      checkQuizAnswer(answer.correct);
    });

    quizBox.appendChild(button);
  });

  seriesExplanation.appendChild(quizBox);
  continueSeriesBtn.style.display = "none";
}

function checkQuizAnswer(isCorrect) {

  const oldWrong =
    document.querySelector(".wrong-answer");

  if (oldWrong) {
    oldWrong.remove();
  }

  if (isCorrect) {

    const t = translations[currentSiteLanguage];

    seriesTitle.textContent = t.lessonFinishedTitle;
    seriesPhrase.textContent = "+10 XP";
    seriesTranslation.textContent = t.lessonFinishedText;

    seriesExplanation.innerHTML = `
      <div class="finish-card">
        <p>${t.newPhraseLearned}</p>
        <p>${t.progressUpdated}</p>
        <p>${t.keepLearning}</p>
      </div>
    `;

    continueSeriesBtn.textContent = t.backToSeriesBtn;
    continueSeriesBtn.style.display = "block";

    continueSeriesBtn.onclick = () => {
      seriesModal.classList.remove("active");
    };

  } else {

    seriesExplanation.insertAdjacentHTML(
      "beforeend",
      `<p class="wrong-answer">
        ${translations[currentSiteLanguage].wrongTryAgain}
      </p>`
    );

  }

}
const seriesVideoLessons = [
  {
    video: "https://www.youtube.com/embed/8wThS5WCzs4",
    category: "Friends • A2–B1",
    phrase: "How you doin'?",
    translation: "Как дела?",
    explanation: "Неформальное приветствие, которое часто используется в разговорной речи."
  },
  {
    video: "https://www.youtube.com/embed/Di310WS8zLk",
    category: "Wednesday • B1",
    phrase: "I act as if I don't care.",
    translation: "Я веду себя так, будто мне всё равно.",
    explanation: "Конструкция “as if” используется для сравнения или описания поведения."
  },
  {
    video: "https://www.youtube.com/embed/b9EkMc79ZSU",
    category: "Stranger Things • B1–B2",
    phrase: "Friends don't lie.",
    translation: "Друзья не лгут.",
    explanation: "Пример короткого отрицательного предложения в Present Simple."
  }
];

let currentSeriesVideoLesson = 0;

const seriesVideo = document.querySelector("#seriesVideo");
const seriesCategory = document.querySelector("#seriesCategory");
const seriesStudyPhrase = document.querySelector("#seriesStudyPhrase");
const seriesStudyTranslation = document.querySelector("#seriesStudyTranslation");
const seriesStudyExplanation = document.querySelector("#seriesStudyExplanation");
const nextSeriesPhraseBtn = document.querySelector("#nextSeriesPhraseBtn");

nextSeriesPhraseBtn.addEventListener("click", () => {
  currentSeriesVideoLesson++;

  if (currentSeriesVideoLesson >= seriesVideoLessons.length) {
    currentSeriesVideoLesson = 0;
  }

  applySeriesVideoLesson();
});

const shortLessons = [
  {
    video: "https://www.youtube.com/embed/hiLAFv_nveY",
    category: "Coffee Shop • Beginner",
    phrase: "Can I get a latte, please?",
    translation: "Можно мне латте, пожалуйста?",
    explanation: [
      "<strong>Can I get...</strong> — можно мне...",
      "<strong>latte</strong> — латте",
      "<strong>please</strong> — пожалуйста"
    ],

    quiz: {
      question: "Что означает фраза: Can I get a latte, please?",
      answers: [
        { text: "Можно мне латте, пожалуйста?", correct: true },
        { text: "Где находится станция?", correct: false },
        { text: "Приятно познакомиться.", correct: false }
      ]
    }
  },
  {
    video: "https://www.youtube.com/embed/TMr2t8LaGwk",
    category: "Asking Directions • Beginner",
    phrase: "Where is the nearest station?",
    translation: "Где находится ближайшая станция?",
    explanation: [
      "<strong>where is...</strong> — где находится...",
      "<strong>nearest</strong> — ближайший",
      "<strong>station</strong> — станция"
    ],

    quiz: {
      question: "Что означает фраза: Where is the nearest station?",
      answers: [
        { text: "Где находится ближайшая станция?", correct: true },
        { text: "Можно мне кофе?", correct: false },
        { text: "Приятно познакомиться.", correct: false }
      ]
    }
  },
  {
    video: "https://www.youtube.com/embed/V7Dvcy0gq-U",
    category: "Meeting People • Beginner",
    phrase: "Nice to meet you.",
    translation: "Приятно познакомиться.",
    explanation: [
      "<strong>nice</strong> — приятно",
      "<strong>meet</strong> — познакомиться",
      "<strong>you</strong> — ты / вы"
    ],

    quiz: {
      question: "Что означает фраза: Nice to meet you?",
      answers: [
        { text: "Приятно познакомиться.", correct: true },
        { text: "Как дела?", correct: false },
        { text: "Спасибо.", correct: false }
      ]
    }
  }
];

let currentShort = 0;

const shortVideo = document.querySelector("#shortVideo");
const shortCategory = document.querySelector("#shortCategory");
const shortPhrase = document.querySelector("#shortPhrase");
const shortTranslation = document.querySelector("#shortTranslation");
const shortExplanation = document.querySelector("#shortExplanation");
const nextShortBtn = document.querySelector("#nextShortBtn");
const shortQuiz = document.querySelector("#shortQuiz");
const shortQuizQuestion = document.querySelector("#shortQuizQuestion");
const shortQuizOptions = document.querySelector("#shortQuizOptions");
const shortQuizResult = document.querySelector("#shortQuizResult");

nextShortBtn.addEventListener("click", () => {
  currentShort++;

  if (currentShort >= shortLessons.length) {
    currentShort = 0;
  }

  applyShortLesson(true);
});
function renderShortQuiz() {

  const lesson = getShortLesson();

  shortQuiz.classList.add("active");

  shortQuizQuestion.textContent =
    lesson.quiz.question;

  shortQuizResult.textContent = "";

  shortQuizOptions.innerHTML = "";

  lesson.quiz.answers.forEach(answer => {

    const button =
      document.createElement("button");

    button.textContent = answer.text;

    button.addEventListener("click", () => {

      if (answer.correct) {

        shortQuizResult.textContent =
          translations[currentSiteLanguage].correctResult;

        shortQuizResult.style.color =
          "#22c55e";

        shortTranslation.classList.remove("hidden-content");
        shortExplanation.classList.remove("hidden-content");

      } else {

        shortQuizResult.textContent =
          translations[currentSiteLanguage].wrongTryAgain;

        shortQuizResult.style.color =
          "#ef4444";

      }

    });

    shortQuizOptions.appendChild(button);

  });

}
const dictionarySearch = document.querySelector(".dictionary-search input");

dictionarySearch.addEventListener("input", () => {
  const searchText = dictionarySearch.value.toLowerCase();

  document.querySelectorAll(".word-card").forEach(card => {
    const word = card.querySelector("h3").textContent.toLowerCase();
    const translation = card.querySelector("p").textContent.toLowerCase();

    if (word.includes(searchText) || translation.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
const newWordInput = document.querySelector("#newWord");
const newTranslationInput = document.querySelector("#newTranslation");
const addWordBtn = document.querySelector("#addWordBtn");
const dictionaryGrid = document.querySelector(".dictionary-grid");

let savedWords = JSON.parse(localStorage.getItem("polyglotWords")) || [];

function createWordCard(word, translation) {
  const card = document.createElement("div");
  card.classList.add("word-card");

  card.innerHTML = `
    <h3>${word}</h3>
    <p>${translation}</p>
  `;

  dictionaryGrid.appendChild(card);
}

savedWords.forEach(item => {
  createWordCard(item.word, item.translation);
});

addWordBtn.addEventListener("click", () => {
  const word = newWordInput.value.trim();
  const translation = newTranslationInput.value.trim();

  if (word === "" || translation === "") {
    alert(translations[currentSiteLanguage].wordRequiredAlert);
    return;
  }

  createWordCard(word, translation);

  savedWords.push({
    word: word,
    translation: translation
  });

  localStorage.setItem("polyglotWords", JSON.stringify(savedWords));

  newWordInput.value = "";
  newTranslationInput.value = "";
});

const userNameInput = document.querySelector("#userNameInput");
const userEmailInput = document.querySelector("#userEmailInput");
const registerBtn = document.querySelector("#registerBtn");

const registerForm = document.querySelector("#registerForm");
const profileBox = document.querySelector("#profileBox");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profileLearningLang = document.querySelector("#profileLearningLang");
const logoutBtn = document.querySelector("#logoutBtn");
const profileLink = document.querySelector("#profileLink");

function showProfile(user) {
  registerForm.classList.add("hidden-content");
  profileBox.classList.remove("hidden-content");

  profileName.textContent = user.name;
  profileEmail.textContent = user.email;
  profileLink.textContent = `👤 ${user.name}`;
}

function showRegisterForm() {
  registerForm.classList.remove("hidden-content");
  profileBox.classList.add("hidden-content");

  profileLink.textContent = profileLabels[currentSiteLanguage] || profileLabels.ru;
}

const savedUser = JSON.parse(localStorage.getItem("polyglotUser"));

if (savedUser) {
  showProfile(savedUser);
} else {
  showRegisterForm();
}

registerBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  const email = userEmailInput.value.trim();

  if (name === "" || email === "") {
    alert(translations[currentSiteLanguage].requiredFieldsAlert);
    return;
  }

  const user = {
    name: name,
    email: email
  };

  localStorage.setItem("polyglotUser", JSON.stringify(user));

  showProfile(user);

  userNameInput.value = "";
  userEmailInput.value = "";
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("polyglotUser");
  showRegisterForm();
});
const quizModal = document.querySelector("#quizModal");
const closeQuiz = document.querySelector("#closeQuiz");
const quizProgress = document.querySelector("#quizProgress");
const quizTitle = document.querySelector("#quizTitle");
const quizQuestion = document.querySelector("#quizQuestion");
const quizAnswerOptions = document.querySelector("#quizAnswerOptions");
const quizResult = document.querySelector("#quizResult");
const nextQuizQuestion = document.querySelector("#nextQuizQuestion");

const coffeeQuiz = [
  {
    question: "Что обычно заказывает человек в coffee shop?",
    answers: [
      { text: "Coffee or latte", correct: true },
      { text: "Train ticket", correct: false },
      { text: "Hotel room", correct: false }
    ]
  },
  {
    question: "Что означает 'Can I get...'?",
    answers: [
      { text: "Можно мне...", correct: true },
      { text: "Где находится...", correct: false },
      { text: "Я работаю...", correct: false }
    ]
  },
  {
    question: "Как переводится 'please'?",
    answers: [
      { text: "Пожалуйста", correct: true },
      { text: "Спасибо", correct: false },
      { text: "Привет", correct: false }
    ]
  },
  {
    question: "Что значит 'Iced coffee'?",
    answers: [
      { text: "Холодный кофе", correct: true },
      { text: "Горячий чай", correct: false },
      { text: "Молочный коктейль", correct: false }
    ]
  },
  {
    question: "Как вежливо заказать кофе?",
    answers: [
      { text: "Can I get a coffee, please?", correct: true },
      { text: "Give me coffee now", correct: false },
      { text: "Coffee fast", correct: false }
    ]
  }
];

const friendsQuiz = [
  {
    question: "Что означает фраза 'How you doin'?'",
    answers: [
      { text: "Как дела?", correct: true },
      { text: "Куда ты идёшь?", correct: false },
      { text: "Что ты заказал?", correct: false }
    ]
  },
  {
    question: "Что означает 'We were on a break!'?",
    answers: [
      { text: "У нас был перерыв в отношениях!", correct: true },
      { text: "Мы были на работе!", correct: false },
      { text: "Мы были в кафе!", correct: false }
    ]
  },
  {
    question: "Что означает 'He's her lobster'?",
    answers: [
      { text: "Он её судьба", correct: true },
      { text: "Он её брат", correct: false },
      { text: "Он её сосед", correct: false }
    ]
  }
];

const wednesdayQuiz = [
  {
    question: "Что означает 'I act as if I don't care'?",
    answers: [
      { text: "Я веду себя так, будто мне всё равно", correct: true },
      { text: "Я всегда радуюсь", correct: false },
      { text: "Я ничего не понимаю", correct: false }
    ]
  },
  {
    question: "Что означает конструкция 'as if'?",
    answers: [
      { text: "Как будто", correct: true },
      { text: "Потому что", correct: false },
      { text: "Несмотря на", correct: false }
    ]
  },
  {
    question: "Что означает 'I don't believe'?",
    answers: [
      { text: "Я не верю", correct: true },
      { text: "Я не знаю", correct: false },
      { text: "Я не хочу", correct: false }
    ]
  }
];

const strangerThingsQuiz = [
  {
    question: "Что означает 'Friends don't lie'?",
    answers: [
      { text: "Друзья не лгут", correct: true },
      { text: "Друзья не помогают", correct: false },
      { text: "Друзья не разговаривают", correct: false }
    ]
  },
  {
    question: "Какой грамматический tense в 'Friends don't lie'?",
    answers: [
      { text: "Present Simple", correct: true },
      { text: "Past Simple", correct: false },
      { text: "Present Continuous", correct: false }
    ]
  },
  {
    question: "Что означает слово 'lie'?",
    answers: [
      { text: "Лгать", correct: true },
      { text: "Смеяться", correct: false },
      { text: "Бежать", correct: false }
    ]
  }
];

const shortVideosQuiz = [
  {
    question: "Что означает 'Nice to meet you'?",
    answers: [
      { text: "Приятно познакомиться", correct: true },
      { text: "До свидания", correct: false },
      { text: "Как тебя зовут?", correct: false }
    ]
  },
  {
    question: "Что означает 'Where is the nearest station?'",
    answers: [
      { text: "Где находится ближайшая станция?", correct: true },
      { text: "Где находится кафе?", correct: false },
      { text: "Где находится отель?", correct: false }
    ]
  },
  {
    question: "Что означает 'Can I get a latte, please?'",
    answers: [
      { text: "Можно мне латте, пожалуйста?", correct: true },
      { text: "Можно мне билет?", correct: false },
      { text: "Где мой кофе?", correct: false }
    ]
  }
];

const travelQuiz = [
  {
    question: "Что означает 'Where is the hotel?'",
    answers: [
      { text: "Где находится отель?", correct: true },
      { text: "Где находится кафе?", correct: false },
      { text: "Где находится аэропорт?", correct: false }
    ]
  },
  {
    question: "Как переводится 'ticket'?",
    answers: [
      { text: "Билет", correct: true },
      { text: "Чемодан", correct: false },
      { text: "Отель", correct: false }
    ]
  },
  {
    question: "Что означает 'I need a taxi'?",
    answers: [
      { text: "Мне нужно такси", correct: true },
      { text: "Мне нужен билет", correct: false },
      { text: "Мне нужен номер", correct: false }
    ]
  }
];

const airportQuiz = [
  {
    question: "Что означает 'boarding pass'?",
    answers: [
      { text: "Посадочный талон", correct: true },
      { text: "Паспорт", correct: false },
      { text: "Багаж", correct: false }
    ]
  },
  {
    question: "Как переводится 'luggage'?",
    answers: [
      { text: "Багаж", correct: true },
      { text: "Билет", correct: false },
      { text: "Выход", correct: false }
    ]
  },
  {
    question: "Что означает 'departure gate'?",
    answers: [
      { text: "Выход на посадку", correct: true },
      { text: "Регистрация", correct: false },
      { text: "Паспортный контроль", correct: false }
    ]
  }
];

const restaurantQuiz = [
  {
    question: "Что означает 'Can I see the menu?'",
    answers: [
      { text: "Можно посмотреть меню?", correct: true },
      { text: "Где находится отель?", correct: false },
      { text: "Сколько стоит билет?", correct: false }
    ]
  },
  {
    question: "Как переводится 'bill' в ресторане?",
    answers: [
      { text: "Счёт", correct: true },
      { text: "Стол", correct: false },
      { text: "Блюдо", correct: false }
    ]
  },
  {
    question: "Что означает 'I would like some water'?",
    answers: [
      { text: "Я бы хотел воды", correct: true },
      { text: "Я ищу воду", correct: false },
      { text: "Мне не нужна вода", correct: false }
    ]
  }
];

const hotelQuiz = [
  {
    question: "Что означает 'I have a reservation'?",
    answers: [
      { text: "У меня есть бронь", correct: true },
      { text: "Мне нужен билет", correct: false },
      { text: "Я ищу ресторан", correct: false }
    ]
  },
  {
    question: "Как переводится 'room key'?",
    answers: [
      { text: "Ключ от номера", correct: true },
      { text: "Багаж", correct: false },
      { text: "Лифт", correct: false }
    ]
  },
  {
    question: "Что означает 'check-in'?",
    answers: [
      { text: "Регистрация / заселение", correct: true },
      { text: "Выезд", correct: false },
      { text: "Завтрак", correct: false }
    ]
  }
];

const modernDialoguesQuiz = [
  {
    question: "Что означает 'What are you up to?'",
    answers: [
      { text: "Чем занимаешься?", correct: true },
      { text: "Куда ты идёшь?", correct: false },
      { text: "Где ты живёшь?", correct: false }
    ]
  },
  {
    question: "Что означает 'Sounds good'?",
    answers: [
      { text: "Звучит хорошо / хорошо", correct: true },
      { text: "Это громко", correct: false },
      { text: "Я не слышу", correct: false }
    ]
  },
  {
    question: "Что означает 'No worries'?",
    answers: [
      { text: "Без проблем", correct: true },
      { text: "Не волнуй меня", correct: false },
      { text: "Я переживаю", correct: false }
    ]
  }
];

const meetingPeopleQuiz = [
  {
    question: "Что означает 'Nice to meet you'?",
    answers: [
      { text: "Приятно познакомиться", correct: true },
      { text: "До свидания", correct: false },
      { text: "Как дела?", correct: false }
    ]
  },
  {
    question: "Что означает 'What is your name?'",
    answers: [
      { text: "Как тебя зовут?", correct: true },
      { text: "Где ты живёшь?", correct: false },
      { text: "Сколько тебе лет?", correct: false }
    ]
  },
  {
    question: "Что означает 'Where are you from?'",
    answers: [
      { text: "Откуда ты?", correct: true },
      { text: "Куда ты идёшь?", correct: false },
      { text: "Где ты работаешь?", correct: false }
    ]
  }
];

const dailyRoutineQuiz = [
  {
    question: "Что означает 'I wake up early'?",
    answers: [
      { text: "Я просыпаюсь рано", correct: true },
      { text: "Я ложусь поздно", correct: false },
      { text: "Я завтракаю", correct: false }
    ]
  },
  {
    question: "Как переводится 'breakfast'?",
    answers: [
      { text: "Завтрак", correct: true },
      { text: "Обед", correct: false },
      { text: "Ужин", correct: false }
    ]
  },
  {
    question: "Что означает 'I go to work'?",
    answers: [
      { text: "Я иду на работу", correct: true },
      { text: "Я иду домой", correct: false },
      { text: "Я учусь дома", correct: false }
    ]
  }
];

const workStudyQuiz = [
  {
    question: "Что означает 'I have a meeting'?",
    answers: [
      { text: "У меня встреча", correct: true },
      { text: "У меня экзамен", correct: false },
      { text: "У меня отпуск", correct: false }
    ]
  },
  {
    question: "Как переводится 'deadline'?",
    answers: [
      { text: "Срок сдачи", correct: true },
      { text: "Перерыв", correct: false },
      { text: "Задание", correct: false }
    ]
  },
  {
    question: "Что означает 'I need to study'?",
    answers: [
      { text: "Мне нужно учиться", correct: true },
      { text: "Мне нужно работать", correct: false },
      { text: "Мне нужно отдыхать", correct: false }
    ]
  }
];

const finalChallengeQuiz = [
  {
    question: "Что означает 'Nice to meet you'?",
    answers: [
      { text: "Приятно познакомиться", correct: true },
      { text: "До свидания", correct: false },
      { text: "Я устал", correct: false }
    ]
  },
  {
    question: "Что означает 'boarding pass'?",
    answers: [
      { text: "Посадочный талон", correct: true },
      { text: "Ключ от номера", correct: false },
      { text: "Счёт в ресторане", correct: false }
    ]
  },
  {
    question: "Что означает 'Friends don't lie'?",
    answers: [
      { text: "Друзья не лгут", correct: true },
      { text: "Друзья не спорят", correct: false },
      { text: "Друзья не уходят", correct: false }
    ]
  },
  {
    question: "Как переводится 'deadline'?",
    answers: [
      { text: "Срок сдачи", correct: true },
      { text: "Меню", correct: false },
      { text: "Багаж", correct: false }
    ]
  },
  {
    question: "Что означает 'Can I get a latte, please?'",
    answers: [
      { text: "Можно мне латте, пожалуйста?", correct: true },
      { text: "Где ближайшая станция?", correct: false },
      { text: "У меня есть бронь", correct: false }
    ]
  }
];

let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;
let activeQuiz = coffeeQuiz;

function openCoffeeQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = coffeeQuiz;
  quizTitle.textContent = "Coffee Shop Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openFriendsQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = friendsQuiz;
  quizTitle.textContent = "Friends Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openShortVideosQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = shortVideosQuiz;
  quizTitle.textContent = "Short Videos Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openWednesdayQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = wednesdayQuiz;
  quizTitle.textContent = "Wednesday Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openStrangerThingsQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = strangerThingsQuiz;
  quizTitle.textContent = "Stranger Things Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openTravelQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = travelQuiz;
  quizTitle.textContent = "Travel Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openAirportQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = airportQuiz;
  quizTitle.textContent = "Airport Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openRestaurantQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = restaurantQuiz;
  quizTitle.textContent = "Restaurant Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openHotelQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = hotelQuiz;
  quizTitle.textContent = "Hotel Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openModernDialoguesQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = modernDialoguesQuiz;
  quizTitle.textContent = "Modern Dialogues Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openMeetingPeopleQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = meetingPeopleQuiz;
  quizTitle.textContent = "Meeting People Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openDailyRoutineQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = dailyRoutineQuiz;
  quizTitle.textContent = "Daily Routine Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openWorkStudyQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = workStudyQuiz;
  quizTitle.textContent = "Work & Study Quiz";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function openFinalChallengeQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  activeQuiz = finalChallengeQuiz;
  quizTitle.textContent = "Polyglot Final Challenge";
  quizModal.classList.add("active");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const current = activeQuiz[currentQuizQuestion];

  const t = translations[currentSiteLanguage];

  quizProgress.textContent = `${t.quizQuestionProgress} ${currentQuizQuestion + 1} ${t.quizOf} ${activeQuiz.length}`;
  quizQuestion.textContent = current.question;
  quizResult.textContent = "";
  quizAnswerOptions.innerHTML = "";
  nextQuizQuestion.classList.add("hidden-content");
  nextQuizQuestion.textContent = t.nextQuestionBtn;
  quizAnswered = false;

  const shuffledAnswers =
  [...current.answers].sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;

      if (answer.correct) {
        quizScore++;
        quizResult.textContent = t.correctShort;
        quizResult.style.color = "#22c55e";
      } else {
        quizResult.textContent = t.wrongTryAgain;
        quizResult.style.color = "#ef4444";
      }

      nextQuizQuestion.classList.remove("hidden-content");
    });

    quizAnswerOptions.appendChild(button);
  });
}

nextQuizQuestion.addEventListener("click", () => {
  currentQuizQuestion++;

  if (currentQuizQuestion < activeQuiz.length) {
    renderQuizQuestion();
  } else {
    const t = translations[currentSiteLanguage];

    quizProgress.textContent = t.quizComplete;
    quizQuestion.textContent = `${t.quizResultPrefix}: ${quizScore} ${t.quizOf} ${activeQuiz.length}`;
    quizAnswerOptions.innerHTML = "";

    let currentXP = Number(localStorage.getItem("polyglotXP")) || 0;
    let currentLessons = Number(localStorage.getItem("polyglotLessons")) || 0;

    currentXP += 50;
    currentLessons += 1;

    localStorage.setItem("polyglotXP", currentXP);
    localStorage.setItem("polyglotLessons", currentLessons);

    quizResult.textContent =
      quizScore >= 4
        ? translations[currentSiteLanguage].excellentQuizResult
        : translations[currentSiteLanguage].goodQuizResult;

    quizResult.style.color = "#38bdf8";

    nextQuizQuestion.classList.add("hidden-content");

    updateDashboard();
  }
});

closeQuiz.addEventListener("click", () => {
  quizModal.classList.remove("active");
});

const musicData = [
  {
    phrase: "I keep thinking about you.",
    translation: "Я продолжаю думать о тебе.",
    missing: "thinking",
    words: [
      { word: "keep", translation: "продолжать" },
      { word: "thinking", translation: "думать" },
      { word: "about", translation: "о / про" }
    ]
  },
  {
    phrase: "We're running out of time.",
    translation: "У нас заканчивается время.",
    missing: "time",
    words: [
      { word: "running out", translation: "заканчиваться" },
      { word: "time", translation: "время" },
      { word: "we're", translation: "мы" }
    ]
  },
  {
    phrase: "Everything changed so fast.",
    translation: "Всё изменилось так быстро.",
    missing: "changed",
    words: [
      { word: "everything", translation: "всё" },
      { word: "changed", translation: "изменилось" },
      { word: "fast", translation: "быстро" }
    ]
  }
];

let currentMusicIndex = 0;

const musicCardPhrase = document.querySelector("#musicCardPhrase");
const musicCardTranslation = document.querySelector("#musicCardTranslation");
const musicCardWords = document.querySelector("#musicCardWords");

const musicModal = document.querySelector("#musicModal");
const musicModalTitle = document.querySelector("#musicModalTitle");
const musicModalBody = document.querySelector("#musicModalBody");
const closeMusic = document.querySelector("#closeMusic");

function updateMusicCards() {
  const lesson = getMusicLesson();

  musicCardPhrase.textContent = lesson.phrase;
  musicCardTranslation.textContent = lesson.translation;
  musicCardWords.textContent = lesson.words.map(item => item.word).join(", ");
}

function openMusicModal(type) {
  const lesson = getMusicLesson();
  const t = translations[currentSiteLanguage];

  musicModal.classList.add("active");

  if (type === "lyrics") {
    musicModalTitle.textContent = t.lyricsModalTitle;
    musicModalBody.innerHTML = `
      <p><strong>${t.phraseLabel}:</strong> ${lesson.phrase}</p>
      <p><strong>${t.translationLabel}:</strong> ${lesson.translation}</p>
      ${lesson.words.map(item => `
        <p><strong>${item.word}</strong> — ${item.translation}</p>
      `).join("")}

      <button onclick="goToNextMusicLesson()">${t.nextPhraseBtn}</button>
    `;
  }

  if (type === "listening") {
    const sentence = lesson.phrase.replace(lesson.missing, "_____");

    musicModalTitle.textContent = t.listeningPractice;
    musicModalBody.innerHTML = `
      <p><strong>${t.taskLabel}:</strong> ${sentence}</p>
      <button onclick="checkMusicAnswer(false)">working</button>
      <button onclick="checkMusicAnswer(true)">${lesson.missing}</button>
      <button onclick="checkMusicAnswer(false)">looking</button>
      <p id="musicAnswerResult"></p>
    `;
  }

  if (type === "vocabulary") {
    musicModalTitle.textContent = t.vocabularyTitle;
    musicModalBody.innerHTML = `
      ${lesson.words.map(item => `
        <div class="music-vocab-item">
          <p><strong>${item.word}</strong> — ${item.translation}</p>
          <button onclick="saveMusicWord('${item.word}', '${item.translation}')">
            ⭐ ${t.saveToDictionaryBtn}
          </button>
        </div>
      `).join("")}
    `;
  }
}

function checkMusicAnswer(isCorrect) {
  const result = document.querySelector("#musicAnswerResult");

  if (isCorrect) {
    result.textContent = translations[currentSiteLanguage].correctShort;
    result.style.color = "#22c55e";
  } else {
    result.textContent = translations[currentSiteLanguage].wrongTryAgain;
    result.style.color = "#ef4444";
  }
}

function goToNextMusicLesson() {
  currentMusicIndex++;

  if (currentMusicIndex >= musicData.length) {
    currentMusicIndex = 0;
  }

  updateMusicCards();
  musicModal.classList.remove("active");
}

function saveMusicWord(word, translation) {
  createWordCard(word, translation);

  savedWords.push({
    word: word,
    translation: translation
  });

  localStorage.setItem("polyglotWords", JSON.stringify(savedWords));

  alert(translations[currentSiteLanguage].wordSavedAlert);
}

closeMusic.addEventListener("click", () => {
  musicModal.classList.remove("active");
});

const wordsCount = document.querySelector("#wordsCount");
const weeklyXP = document.querySelector("#weeklyXP");
const lessonsCount = document.querySelector("#lessonsCount");

function updateDashboard() {
  const words = JSON.parse(localStorage.getItem("polyglotWords")) || [];
  const xp = Number(localStorage.getItem("polyglotXP")) || 0;
  const lessons = Number(localStorage.getItem("polyglotLessons")) || 0;

  wordsCount.textContent = words.length;
  weeklyXP.textContent = xp;
  lessonsCount.textContent = lessons;
}

updateDashboard();
const translations = {
  ru: {
    heroTitle: "Изучай языки через то, что тебе действительно интересно",
    heroText: "Сериалы, музыка, короткие видео, реальные диалоги, грамматика и тесты — всё в одном современном сайте для изучения языков.",
    chooseLang: "Выберите язык сайта",
    startBtn: "Начать обучение",
    about: "О проекте",
    lessons: "Уроки",
    grammar: "Грамматика",
    profile: "👤 Профиль",
    aboutLabel: "About Polyglot",
    aboutTitle: "Платформа для изучения языков через интересный контент",
    aboutText: "Polyglot помогает изучать иностранные языки не только через обычные правила, но и через короткие видео, сериалы, музыку, реальные диалоги и интерактивные задания.",
    learningLabel: "Learning paths",
    learningTitle: "Выберите формат обучения",
    learningText: "Учитесь так, как удобно именно вам: через видео, музыку, грамматику и практику.",
    learningSeriesTitle: "Сериалы и шоу",
    seriesText: "Изучайте живые фразы, сленг и реальные диалоги из популярных сцен.",
    musicTitleCard: "Музыка",
    musicTextCard: "Разбирайте строки песен, переводите выражения и запоминайте новые слова.",
    shortsTitle: "Короткие видео",
    shortsText: "Учите современный язык через формат TikTok, Reels и повседневную речь.",
    grammarTitleCard: "Грамматика",
    grammarTextCard: "Понимайте правила простым языком и закрепляйте их на примерах.",
    testsTitle: "Тесты",
    testsText: "Проверяйте знания после каждого урока и отслеживайте результат.",
    dictionaryTitle: "Словарь",
    dictionaryText: "Сохраняйте новые слова и полезные выражения в личный словарь.",
    authLabel: "User Account",
    authTitle: "Создайте профиль",
    authText: "Введите данные, чтобы Polyglot мог персонализировать обучение.",
    namePlaceholder: "Ваше имя",
    emailPlaceholder: "Email",
    registerBtn: "Зарегистрироваться",
    profileLabel: "My Profile",
    profileTitle: "👤 Мой профиль",
    nameLabel: "Имя",
    studiedLanguageLabel: "Изучаемый язык",
    levelLabel: "Уровень",
    logoutBtn: "Выйти",
    requiredFieldsAlert: "Введите имя и email",
    stepLabel: "Шаг",
    stepOf: "из",
    backBtn: "Назад",
    nextBtn: "Далее",
    finishBtn: "Завершить",
    onboardingDone: "Программа обучения настроена!",
    onboardingSteps: [
      { title: "Какой язык вы хотите изучать?", description: "Выберите язык, под который будет подбираться программа.", options: ["English", "Türkçe", "Қазақша", "Deutsch", "Français", "한국어"] },
      { title: "Какая у вас цель?", description: "Это поможет подобрать темы и задания.", options: ["Путешествия", "Работа", "Учёба", "Сериалы и фильмы"] },
      { title: "Ваш уровень", description: "Выберите примерный уровень владения языком.", options: ["Beginner", "Elementary", "Intermediate", "Advanced"] },
      { title: "Готово к старту", description: "Мы соберём для вас маршрут обучения по выбранным ответам.", options: ["Начать обучение"] }
    ],
    shortsLabel: "Short Video Lessons",
    shortsSectionTitle: "Изучение через короткие видео",
    shortsSectionText: "Смотрите короткое видео и сразу разбирайте фразу из него.",
    miniTest: "Мини-тест",
    nextVideoBtn: "Следующее видео",
    correctShort: "✅ Правильно!",
    correctResult: "✅ Правильно! +10 XP",
    wrongTryAgain: "❌ Неправильно. Попробуйте ещё раз.",
    dashboardLabel: "Your progress",
    dashboardTitle: "Ваш прогресс обучения",
    currentLevel: "Текущий уровень",
    nextGoal: "Следующая цель",
    skillLabel: "Навык",
    recommendationLabel: "Рекомендация",
    recommendationText: "Пройти 3 урока грамматики",
    streakTitle: "Серия дней",
    streakText: "Вы заходили 12 дней подряд",
    lessonsDoneTitle: "Пройдено уроков",
    lessonsDoneText: "Продолжайте обучение каждый день",
    wordsLearnedTitle: "Изучено слов",
    wordsLearnedText: "Ваш словарный запас растёт",
    weeklyXP: "Weekly XP",
    seriesLabel: "Series Learning",
    seriesSectionTitle: "Изучение через видео-отрывки",
    seriesSectionText: "Смотрите короткий отрывок, затем разбирайте фразу, перевод и объяснение.",
    nextPhraseBtn: "Следующая фраза",
    phraseLabel: "Фраза",
    translationLabel: "Перевод",
    explanationLabel: "Объяснение",
    musicLabel: "Music Learning",
    musicSectionTitle: "Изучение через музыку",
    musicSectionText: "Разбирайте строки из песен, переводите выражения и запоминайте новые слова.",
    songLyricsTitle: "🎵 Song Lyrics",
    analyzeLineBtn: "Разобрать строку",
    listeningPractice: "Listening Practice",
    taskLabel: "Задание",
    taskText: "Найти пропущенное слово",
    listeningSkill: "Аудирование",
    startPracticeBtn: "Начать практику",
    vocabularyTitle: "Vocabulary",
    wordsLabel: "Слова",
    goalLabel: "Цель",
    vocabGoalText: "Пополнить словарный запас",
    studyWordsBtn: "Изучить слова",
    lyricsModalTitle: "Разбор строки",
    saveToDictionaryBtn: "Сохранить в словарь",
    grammarLabel: "Grammar",
    grammarSectionTitle: "Грамматика простым языком",
    grammarSectionText: "Изучайте правила языка через понятные объяснения и реальные примеры.",
    grammarPresentSimpleText: "Используется для привычек, фактов и регулярных действий.",
    grammarPresentContinuousText: "Используется для действий, которые происходят сейчас.",
    grammarPastSimpleText: "Используется для действий, которые произошли в прошлом.",
    openTopicBtn: "Открыть тему",
    testsLabel: "Assessment Center",
    testsSectionTitle: "Проверка знаний",
    testsSectionText: "Проходите тесты по мере изучения контента и открывайте новые уровни.",
    vocabularyTrack: "📖 Vocabulary Track",
    seriesTrack: "🎬 Series Track",
    shortVideosTrack: "📱 Short Videos Track",
    finalChallenge: "🏆 Final Challenge",
    levelWord: "Level",
    finalWord: "Final",
    nextQuestionBtn: "Следующий вопрос",
    quizQuestionProgress: "Вопрос",
    quizOf: "из",
    quizComplete: "Тест завершён",
    quizResultPrefix: "Ваш результат",
    dictionaryLabel: "Personal Dictionary",
    dictionarySectionTitle: "Ваш словарь",
    dictionarySectionText: "Сохраняйте новые слова и выражения для повторения.",
    newWordPlaceholder: "Новое слово",
    newTranslationPlaceholder: "Перевод",
    addWordBtn: "Добавить слово",
    searchWordPlaceholder: "Поиск слова..."
  },
  kk: {
    heroTitle: "Тілді өзіңізге қызықты контент арқылы үйреніңіз",
    heroText: "Сериалдар, музыка, қысқа видеолар, нақты диалогтар, грамматика және тесттер — бәрі бір заманауи сайтта.",
    chooseLang: "Сайт тілін таңдаңыз",
    startBtn: "Оқуды бастау",
    about: "Жоба туралы",
    lessons: "Сабақтар",
    grammar: "Грамматика",
    profile: "👤 Жеке бет",
    aboutLabel: "Polyglot туралы",
    aboutTitle: "Тілді қызықты контент арқылы үйренуге арналған платформа",
    aboutText: "Polyglot шет тілдерін тек ережелер арқылы ғана емес, қысқа видеолар, сериалдар, музыка, нақты диалогтар және интерактивті тапсырмалар арқылы үйренуге көмектеседі.",
    learningLabel: "Оқу бағыттары",
    learningTitle: "Оқу форматын таңдаңыз",
    learningText: "Өзіңізге ыңғайлы түрде оқыңыз: видео, музыка, грамматика және практика арқылы.",
    learningSeriesTitle: "Сериалдар мен шоулар",
    seriesText: "Танымал көріністерден тірі сөз тіркестерін, сленгті және нақты диалогтарды үйреніңіз.",
    musicTitleCard: "Музыка",
    musicTextCard: "Ән жолдарын талдап, сөз тіркестерін аударып, жаңа сөздерді есте сақтаңыз.",
    shortsTitle: "Қысқа видеолар",
    shortsText: "TikTok, Reels және күнделікті сөйлеу форматы арқылы заманауи тілді үйреніңіз.",
    grammarTitleCard: "Грамматика",
    grammarTextCard: "Ережелерді қарапайым тілмен түсініп, мысалдар арқылы бекітіңіз.",
    testsTitle: "Тесттер",
    testsText: "Әр сабақтан кейін біліміңізді тексеріп, нәтижені бақылаңыз.",
    dictionaryTitle: "Сөздік",
    dictionaryText: "Жаңа сөздер мен пайдалы тіркестерді жеке сөздікке сақтаңыз.",
    authLabel: "Пайдаланушы аккаунты",
    authTitle: "Профиль жасаңыз",
    authText: "Polyglot оқуды жекелендіруі үшін деректеріңізді енгізіңіз.",
    namePlaceholder: "Атыңыз",
    emailPlaceholder: "Email",
    registerBtn: "Тіркелу",
    profileLabel: "Менің профилім",
    profileTitle: "👤 Менің профилім",
    nameLabel: "Аты",
    studiedLanguageLabel: "Үйреніп жатқан тіл",
    levelLabel: "Деңгей",
    logoutBtn: "Шығу",
    requiredFieldsAlert: "Атыңыз бен email енгізіңіз",
    stepLabel: "Қадам",
    stepOf: "/",
    backBtn: "Артқа",
    nextBtn: "Келесі",
    finishBtn: "Аяқтау",
    onboardingDone: "Оқу бағдарламасы бапталды!",
    onboardingSteps: [
      { title: "Қай тілді үйренгіңіз келеді?", description: "Бағдарлама соған қарай таңдалады.", options: ["English", "Türkçe", "Қазақша", "Deutsch", "Français", "한국어"] },
      { title: "Мақсатыңыз қандай?", description: "Бұл тақырыптар мен тапсырмаларды таңдауға көмектеседі.", options: ["Саяхат", "Жұмыс", "Оқу", "Сериалдар мен фильмдер"] },
      { title: "Деңгейіңіз", description: "Тілді меңгеру деңгейіңізді таңдаңыз.", options: ["Beginner", "Elementary", "Intermediate", "Advanced"] },
      { title: "Бастауға дайын", description: "Жауаптарыңыз бойынша оқу маршрутын құрамыз.", options: ["Оқуды бастау"] }
    ],
    shortsLabel: "Қысқа видео сабақтар",
    shortsSectionTitle: "Қысқа видеолар арқылы оқу",
    shortsSectionText: "Қысқа видеоны көріп, одан алынған фразаны бірден талдаңыз.",
    miniTest: "Мини-тест",
    nextVideoBtn: "Келесі видео",
    correctShort: "✅ Дұрыс!",
    correctResult: "✅ Дұрыс! +10 XP",
    wrongTryAgain: "❌ Қате. Қайта көріңіз.",
    dashboardLabel: "Сіздің прогресіңіз",
    dashboardTitle: "Оқу прогресіңіз",
    currentLevel: "Қазіргі деңгей",
    nextGoal: "Келесі мақсат",
    skillLabel: "Дағды",
    recommendationLabel: "Ұсыныс",
    recommendationText: "3 грамматика сабағын өту",
    streakTitle: "Күндер сериясы",
    streakText: "Сіз 12 күн қатарынан кірдіңіз",
    lessonsDoneTitle: "Өткен сабақтар",
    lessonsDoneText: "Күн сайын оқуды жалғастырыңыз",
    wordsLearnedTitle: "Үйренген сөздер",
    wordsLearnedText: "Сөздік қорыңыз өсіп келеді",
    weeklyXP: "Апталық XP",
    seriesLabel: "Сериал арқылы оқу",
    seriesSectionTitle: "Видео үзінділер арқылы оқу",
    seriesSectionText: "Қысқа үзіндіні көріп, фразаны, аударманы және түсіндірмені талдаңыз.",
    nextPhraseBtn: "Келесі фраза",
    phraseLabel: "Фраза",
    translationLabel: "Аударма",
    explanationLabel: "Түсіндірме",
    musicLabel: "Музыка арқылы оқу",
    musicSectionTitle: "Музыка арқылы оқу",
    musicSectionText: "Ән жолдарын талдап, сөз тіркестерін аударып, жаңа сөздерді есте сақтаңыз.",
    songLyricsTitle: "🎵 Ән мәтіні",
    analyzeLineBtn: "Жолды талдау",
    listeningPractice: "Тыңдау практикасы",
    taskLabel: "Тапсырма",
    taskText: "Түсіп қалған сөзді табу",
    listeningSkill: "Тыңдалым",
    startPracticeBtn: "Практиканы бастау",
    vocabularyTitle: "Сөздік",
    wordsLabel: "Сөздер",
    goalLabel: "Мақсат",
    vocabGoalText: "Сөздік қорды толықтыру",
    studyWordsBtn: "Сөздерді үйрену",
    lyricsModalTitle: "Жолды талдау",
    saveToDictionaryBtn: "Сөздікке сақтау",
    grammarLabel: "Грамматика",
    grammarSectionTitle: "Грамматика қарапайым тілмен",
    grammarSectionText: "Тіл ережелерін түсінікті түсіндірмелер мен нақты мысалдар арқылы үйреніңіз.",
    grammarPresentSimpleText: "Әдеттер, фактілер және тұрақты әрекеттер үшін қолданылады.",
    grammarPresentContinuousText: "Қазір болып жатқан әрекеттер үшін қолданылады.",
    grammarPastSimpleText: "Өткен уақытта болған әрекеттер үшін қолданылады.",
    openTopicBtn: "Тақырыпты ашу",
    testsLabel: "Білімді тексеру орталығы",
    testsSectionTitle: "Білімді тексеру",
    testsSectionText: "Контентті үйренген сайын тесттерден өтіп, жаңа деңгейлерді ашыңыз.",
    vocabularyTrack: "📖 Сөздік бағыты",
    seriesTrack: "🎬 Сериал бағыты",
    shortVideosTrack: "📱 Қысқа видео бағыты",
    finalChallenge: "🏆 Қорытынды сынақ",
    levelWord: "Деңгей",
    finalWord: "Финал",
    nextQuestionBtn: "Келесі сұрақ",
    quizQuestionProgress: "Сұрақ",
    quizOf: "/",
    quizComplete: "Тест аяқталды",
    quizResultPrefix: "Нәтижеңіз",
    dictionaryLabel: "Жеке сөздік",
    dictionarySectionTitle: "Сіздің сөздігіңіз",
    dictionarySectionText: "Қайталау үшін жаңа сөздер мен тіркестерді сақтаңыз.",
    newWordPlaceholder: "Жаңа сөз",
    newTranslationPlaceholder: "Аударма",
    addWordBtn: "Сөз қосу",
    searchWordPlaceholder: "Сөз іздеу..."
  },
  en: {
    heroTitle: "Learn languages through content you actually enjoy",
    heroText: "Series, music, short videos, real dialogues, grammar and quizzes — all in one modern language learning website.",
    chooseLang: "Choose site language",
    startBtn: "Start learning",
    about: "About",
    lessons: "Lessons",
    grammar: "Grammar",
    profile: "👤 Profile",
    aboutLabel: "About Polyglot",
    aboutTitle: "A platform for learning languages through engaging content",
    aboutText: "Polyglot helps users learn foreign languages not only through grammar rules, but also through short videos, series, music, real dialogues and interactive tasks.",
    learningLabel: "Learning paths",
    learningTitle: "Choose your learning format",
    learningText: "Learn in the way that works for you: through videos, music, grammar and practice.",
    learningSeriesTitle: "Series and shows",
    seriesText: "Study natural phrases, slang and real dialogues from popular scenes.",
    musicTitleCard: "Music",
    musicTextCard: "Break down song lyrics, translate expressions and remember new words.",
    shortsTitle: "Short videos",
    shortsText: "Learn modern language through TikTok, Reels and everyday speech.",
    grammarTitleCard: "Grammar",
    grammarTextCard: "Understand rules in simple language and reinforce them with examples.",
    testsTitle: "Quizzes",
    testsText: "Check your knowledge after each lesson and track your results.",
    dictionaryTitle: "Dictionary",
    dictionaryText: "Save new words and useful expressions in your personal dictionary.",
    authLabel: "User Account",
    authTitle: "Create a profile",
    authText: "Enter your details so Polyglot can personalize your learning.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Email",
    registerBtn: "Register",
    profileLabel: "My Profile",
    profileTitle: "👤 My Profile",
    nameLabel: "Name",
    studiedLanguageLabel: "Learning language",
    levelLabel: "Level",
    logoutBtn: "Log out",
    requiredFieldsAlert: "Enter your name and email",
    stepLabel: "Step",
    stepOf: "of",
    backBtn: "Back",
    nextBtn: "Next",
    finishBtn: "Finish",
    onboardingDone: "Your learning program is ready!",
    onboardingSteps: [
      { title: "Which language do you want to learn?", description: "Choose the language your program will be built around.", options: ["English", "Türkçe", "Қазақша", "Deutsch", "Français", "한국어"] },
      { title: "What is your goal?", description: "This helps us choose topics and tasks.", options: ["Travel", "Work", "Study", "Series and movies"] },
      { title: "Your level", description: "Choose your approximate language level.", options: ["Beginner", "Elementary", "Intermediate", "Advanced"] },
      { title: "Ready to start", description: "We will build a learning path from your answers.", options: ["Start learning"] }
    ],
    shortsLabel: "Short Video Lessons",
    shortsSectionTitle: "Learn through short videos",
    shortsSectionText: "Watch a short video and immediately break down a phrase from it.",
    miniTest: "Mini quiz",
    nextVideoBtn: "Next video",
    correctShort: "✅ Correct!",
    correctResult: "✅ Correct! +10 XP",
    wrongTryAgain: "❌ Incorrect. Try again.",
    dashboardLabel: "Your progress",
    dashboardTitle: "Your learning progress",
    currentLevel: "Current level",
    nextGoal: "Next goal",
    skillLabel: "Skill",
    recommendationLabel: "Recommendation",
    recommendationText: "Complete 3 grammar lessons",
    streakTitle: "Day streak",
    streakText: "You logged in 12 days in a row",
    lessonsDoneTitle: "Lessons completed",
    lessonsDoneText: "Keep learning every day",
    wordsLearnedTitle: "Words learned",
    wordsLearnedText: "Your vocabulary is growing",
    weeklyXP: "Weekly XP",
    seriesLabel: "Series Learning",
    seriesSectionTitle: "Learn through video clips",
    seriesSectionText: "Watch a short clip, then break down the phrase, translation and explanation.",
    nextPhraseBtn: "Next phrase",
    phraseLabel: "Phrase",
    translationLabel: "Translation",
    explanationLabel: "Explanation",
    musicLabel: "Music Learning",
    musicSectionTitle: "Learn through music",
    musicSectionText: "Break down song lyrics, translate expressions and remember new words.",
    songLyricsTitle: "🎵 Song Lyrics",
    analyzeLineBtn: "Analyze line",
    listeningPractice: "Listening Practice",
    taskLabel: "Task",
    taskText: "Find the missing word",
    listeningSkill: "Listening",
    startPracticeBtn: "Start practice",
    vocabularyTitle: "Vocabulary",
    wordsLabel: "Words",
    goalLabel: "Goal",
    vocabGoalText: "Build your vocabulary",
    studyWordsBtn: "Study words",
    lyricsModalTitle: "Line breakdown",
    saveToDictionaryBtn: "Save to dictionary",
    grammarLabel: "Grammar",
    grammarSectionTitle: "Grammar in simple language",
    grammarSectionText: "Learn language rules through clear explanations and real examples.",
    grammarPresentSimpleText: "Used for habits, facts and regular actions.",
    grammarPresentContinuousText: "Used for actions happening right now.",
    grammarPastSimpleText: "Used for actions that happened in the past.",
    openTopicBtn: "Open topic",
    testsLabel: "Assessment Center",
    testsSectionTitle: "Knowledge check",
    testsSectionText: "Take quizzes as you study content and unlock new levels.",
    vocabularyTrack: "📖 Vocabulary Track",
    seriesTrack: "🎬 Series Track",
    shortVideosTrack: "📱 Short Videos Track",
    finalChallenge: "🏆 Final Challenge",
    levelWord: "Level",
    finalWord: "Final",
    nextQuestionBtn: "Next question",
    quizQuestionProgress: "Question",
    quizOf: "of",
    quizComplete: "Quiz complete",
    quizResultPrefix: "Your result",
    dictionaryLabel: "Personal Dictionary",
    dictionarySectionTitle: "Your dictionary",
    dictionarySectionText: "Save new words and expressions for review.",
    newWordPlaceholder: "New word",
    newTranslationPlaceholder: "Translation",
    addWordBtn: "Add word",
    searchWordPlaceholder: "Search word..."
  },
  tr: {
    heroTitle: "Dilleri gerçekten ilginizi çeken içeriklerle öğrenin",
    heroText: "Diziler, müzik, kısa videolar, gerçek diyaloglar, gramer ve testler — hepsi modern bir dil öğrenme sitesinde.",
    chooseLang: "Site dilini seçin",
    startBtn: "Öğrenmeye başla",
    about: "Proje hakkında",
    lessons: "Dersler",
    grammar: "Dil bilgisi",
    profile: "👤 Profil",
    aboutLabel: "Polyglot hakkında",
    aboutTitle: "İlgi çekici içeriklerle dil öğrenme platformu",
    aboutText: "Polyglot, yabancı dilleri sadece kurallarla değil; kısa videolar, diziler, müzik, gerçek diyaloglar ve etkileşimli görevlerle öğrenmeye yardımcı olur.",
    learningLabel: "Öğrenme yolları",
    learningTitle: "Öğrenme formatını seçin",
    learningText: "Size uygun şekilde öğrenin: video, müzik, gramer ve pratikle.",
    learningSeriesTitle: "Diziler ve şovlar",
    seriesText: "Popüler sahnelerden doğal ifadeleri, argo kelimeleri ve gerçek diyalogları öğrenin.",
    musicTitleCard: "Müzik",
    musicTextCard: "Şarkı sözlerini inceleyin, ifadeleri çevirin ve yeni kelimeleri aklınızda tutun.",
    shortsTitle: "Kısa videolar",
    shortsText: "TikTok, Reels ve günlük konuşma formatıyla modern dili öğrenin.",
    grammarTitleCard: "Gramer",
    grammarTextCard: "Kuralları sade bir dille anlayın ve örneklerle pekiştirin.",
    testsTitle: "Testler",
    testsText: "Her dersten sonra bilginizi kontrol edin ve sonucunuzu takip edin.",
    dictionaryTitle: "Sözlük",
    dictionaryText: "Yeni kelimeleri ve yararlı ifadeleri kişisel sözlüğünüze kaydedin.",
    authLabel: "Kullanıcı Hesabı",
    authTitle: "Profil oluşturun",
    authText: "Polyglot'un öğrenmeyi kişiselleştirmesi için bilgilerinizi girin.",
    namePlaceholder: "Adınız",
    emailPlaceholder: "Email",
    registerBtn: "Kayıt ol",
    profileLabel: "Profilim",
    profileTitle: "👤 Profilim",
    nameLabel: "Ad",
    studiedLanguageLabel: "Öğrenilen dil",
    levelLabel: "Seviye",
    logoutBtn: "Çıkış yap",
    requiredFieldsAlert: "Adınızı ve email adresinizi girin",
    stepLabel: "Adım",
    stepOf: "/",
    backBtn: "Geri",
    nextBtn: "İleri",
    finishBtn: "Bitir",
    onboardingDone: "Öğrenme programı hazırlandı!",
    onboardingSteps: [
      { title: "Hangi dili öğrenmek istiyorsunuz?", description: "Programın hazırlanacağı dili seçin.", options: ["English", "Türkçe", "Қазақша", "Deutsch", "Français", "한국어"] },
      { title: "Hedefiniz nedir?", description: "Bu, konu ve görevleri seçmemize yardımcı olur.", options: ["Seyahat", "İş", "Eğitim", "Diziler ve filmler"] },
      { title: "Seviyeniz", description: "Yaklaşık dil seviyenizi seçin.", options: ["Beginner", "Elementary", "Intermediate", "Advanced"] },
      { title: "Başlamaya hazır", description: "Cevaplarınıza göre bir öğrenme yolu oluşturacağız.", options: ["Öğrenmeye başla"] }
    ],
    shortsLabel: "Kısa Video Dersleri",
    shortsSectionTitle: "Kısa videolarla öğrenme",
    shortsSectionText: "Kısa bir video izleyin ve içindeki ifadeyi hemen inceleyin.",
    miniTest: "Mini test",
    nextVideoBtn: "Sonraki video",
    correctShort: "✅ Doğru!",
    correctResult: "✅ Doğru! +10 XP",
    wrongTryAgain: "❌ Yanlış. Tekrar deneyin.",
    dashboardLabel: "İlerlemeniz",
    dashboardTitle: "Öğrenme ilerlemeniz",
    currentLevel: "Mevcut seviye",
    nextGoal: "Sonraki hedef",
    skillLabel: "Beceri",
    recommendationLabel: "Öneri",
    recommendationText: "3 gramer dersi tamamla",
    streakTitle: "Gün serisi",
    streakText: "12 gün üst üste giriş yaptınız",
    lessonsDoneTitle: "Tamamlanan dersler",
    lessonsDoneText: "Her gün öğrenmeye devam edin",
    wordsLearnedTitle: "Öğrenilen kelimeler",
    wordsLearnedText: "Kelime bilginiz büyüyor",
    weeklyXP: "Haftalık XP",
    seriesLabel: "Dizilerle öğrenme",
    seriesSectionTitle: "Video kesitleriyle öğrenme",
    seriesSectionText: "Kısa bir kesit izleyin, ardından ifadeyi, çeviriyi ve açıklamayı inceleyin.",
    nextPhraseBtn: "Sonraki ifade",
    phraseLabel: "İfade",
    translationLabel: "Çeviri",
    explanationLabel: "Açıklama",
    musicLabel: "Müzikle öğrenme",
    musicSectionTitle: "Müzikle öğrenme",
    musicSectionText: "Şarkı sözlerini inceleyin, ifadeleri çevirin ve yeni kelimeleri aklınızda tutun.",
    songLyricsTitle: "🎵 Şarkı sözleri",
    analyzeLineBtn: "Satırı incele",
    listeningPractice: "Dinleme pratiği",
    taskLabel: "Görev",
    taskText: "Eksik kelimeyi bul",
    listeningSkill: "Dinleme",
    startPracticeBtn: "Pratiğe başla",
    vocabularyTitle: "Kelime bilgisi",
    wordsLabel: "Kelimeler",
    goalLabel: "Hedef",
    vocabGoalText: "Kelime hazinesini geliştirmek",
    studyWordsBtn: "Kelimeleri öğren",
    lyricsModalTitle: "Satır incelemesi",
    saveToDictionaryBtn: "Sözlüğe kaydet",
    grammarLabel: "Gramer",
    grammarSectionTitle: "Basit dille gramer",
    grammarSectionText: "Dil kurallarını anlaşılır açıklamalar ve gerçek örneklerle öğrenin.",
    grammarPresentSimpleText: "Alışkanlıklar, gerçekler ve düzenli eylemler için kullanılır.",
    grammarPresentContinuousText: "Şu anda gerçekleşen eylemler için kullanılır.",
    grammarPastSimpleText: "Geçmişte gerçekleşen eylemler için kullanılır.",
    openTopicBtn: "Konuyu aç",
    testsLabel: "Değerlendirme Merkezi",
    testsSectionTitle: "Bilgi kontrolü",
    testsSectionText: "İçerikleri öğrendikçe testleri çözün ve yeni seviyeler açın.",
    vocabularyTrack: "📖 Kelime rotası",
    seriesTrack: "🎬 Dizi rotası",
    shortVideosTrack: "📱 Kısa video rotası",
    finalChallenge: "🏆 Final mücadelesi",
    levelWord: "Seviye",
    finalWord: "Final",
    nextQuestionBtn: "Sonraki soru",
    quizQuestionProgress: "Soru",
    quizOf: "/",
    quizComplete: "Test tamamlandı",
    quizResultPrefix: "Sonucunuz",
    dictionaryLabel: "Kişisel Sözlük",
    dictionarySectionTitle: "Sözlüğünüz",
    dictionarySectionText: "Tekrar etmek için yeni kelimeleri ve ifadeleri kaydedin.",
    newWordPlaceholder: "Yeni kelime",
    newTranslationPlaceholder: "Çeviri",
    addWordBtn: "Kelime ekle",
    searchWordPlaceholder: "Kelime ara..."
  }
};

const localizedPageData = {
  ru: {
    previewTodayTitle: "Сегодняшний урок",
    previewLessonTitle: "Фразы из сериалов",
    previewPhrase: "“What are you up to?” — Чем занимаешься?",
    previewProgressLabel: "Прогресс",
    aboutFeatureShortTitle: "📱 Короткие видео",
    aboutFeatureShortText: "Изучение фраз через реальные ситуации и современные видеоформаты.",
    aboutFeaturePathTitle: "🎯 Персональный путь",
    aboutFeaturePathText: "Программа подбирается по цели пользователя: учёба, работа, путешествия или общение.",
    aboutFeatureProgressTitle: "📊 Прогресс",
    aboutFeatureProgressText: "Тесты, уровни и задания помогают отслеживать результат обучения.",
    continueStudyBtn: "Продолжить изучение",
    finishLessonBtn: "Завершить урок",
    miniQuizTitle: "Мини-тест",
    lessonFinishedTitle: "Урок завершён 🎉",
    lessonFinishedText: "Вы успешно прошли мини-урок по сериалу.",
    newPhraseLearned: "✅ Новая фраза изучена",
    progressUpdated: "⭐ Прогресс обновлён",
    keepLearning: "🔥 Продолжайте обучение каждый день",
    backToSeriesBtn: "Вернуться к сериалам",
    wordRequiredAlert: "Введите слово и перевод",
    wordSavedAlert: "Слово сохранено в словарь!",
    excellentQuizResult: "🎉 Отличный результат! +50 XP",
    goodQuizResult: "Хорошая попытка! +50 XP за прохождение",
    seriesVideoLessons: [
      { category: "Friends • A2–B1", translation: "Как дела?", explanation: "Неформальное приветствие, которое часто используется в разговорной речи." },
      { category: "Wednesday • B1", translation: "Я веду себя так, будто мне всё равно.", explanation: "Конструкция “as if” используется для сравнения или описания поведения." },
      { category: "Stranger Things • B1–B2", translation: "Друзья не лгут.", explanation: "Пример короткого отрицательного предложения в Present Simple." }
    ],
    shortLessons: [
      {
        category: "Coffee Shop • Beginner",
        translation: "Можно мне латте, пожалуйста?",
        explanation: ["<strong>Can I get...</strong> — можно мне...", "<strong>latte</strong> — латте", "<strong>please</strong> — пожалуйста"],
        quiz: { question: "Что означает фраза: Can I get a latte, please?", answers: ["Можно мне латте, пожалуйста?", "Где находится станция?", "Приятно познакомиться."] }
      },
      {
        category: "Asking Directions • Beginner",
        translation: "Где находится ближайшая станция?",
        explanation: ["<strong>where is...</strong> — где находится...", "<strong>nearest</strong> — ближайший", "<strong>station</strong> — станция"],
        quiz: { question: "Что означает фраза: Where is the nearest station?", answers: ["Где находится ближайшая станция?", "Можно мне кофе?", "Приятно познакомиться."] }
      },
      {
        category: "Meeting People • Beginner",
        translation: "Приятно познакомиться.",
        explanation: ["<strong>nice</strong> — приятно", "<strong>meet</strong> — познакомиться", "<strong>you</strong> — ты / вы"],
        quiz: { question: "Что означает фраза: Nice to meet you?", answers: ["Приятно познакомиться.", "Как дела?", "Спасибо."] }
      }
    ],
    musicData: [
      { translation: "Я продолжаю думать о тебе.", words: [{ word: "keep", translation: "продолжать" }, { word: "thinking", translation: "думать" }, { word: "about", translation: "о / про" }] },
      { translation: "У нас заканчивается время.", words: [{ word: "running out", translation: "заканчиваться" }, { word: "time", translation: "время" }, { word: "we're", translation: "мы" }] },
      { translation: "Всё изменилось так быстро.", words: [{ word: "everything", translation: "всё" }, { word: "changed", translation: "изменилось" }, { word: "fast", translation: "быстро" }] }
    ],
    dictionaryDefaults: ["латте", "станция", "познакомиться", "аэропорт", "путешествие", "классный"]
  },
  kk: {
    previewTodayTitle: "Бүгінгі сабақ",
    previewLessonTitle: "Сериалдардан фразалар",
    previewPhrase: "“What are you up to?” — Немен айналысып жатырсың?",
    previewProgressLabel: "Прогресс",
    aboutFeatureShortTitle: "📱 Қысқа видеолар",
    aboutFeatureShortText: "Фразаларды нақты жағдайлар мен заманауи видео форматтар арқылы үйрену.",
    aboutFeaturePathTitle: "🎯 Жеке оқу жолы",
    aboutFeaturePathText: "Бағдарлама мақсатқа қарай таңдалады: оқу, жұмыс, саяхат немесе қарым-қатынас.",
    aboutFeatureProgressTitle: "📊 Прогресс",
    aboutFeatureProgressText: "Тесттер, деңгейлер және тапсырмалар оқу нәтижесін бақылауға көмектеседі.",
    continueStudyBtn: "Оқуды жалғастыру",
    finishLessonBtn: "Сабақты аяқтау",
    miniQuizTitle: "Мини-тест",
    lessonFinishedTitle: "Сабақ аяқталды 🎉",
    lessonFinishedText: "Сіз сериал бойынша мини-сабақты сәтті өттіңіз.",
    newPhraseLearned: "✅ Жаңа фраза үйренілді",
    progressUpdated: "⭐ Прогресс жаңартылды",
    keepLearning: "🔥 Күн сайын оқуды жалғастырыңыз",
    backToSeriesBtn: "Сериалдарға оралу",
    wordRequiredAlert: "Сөз бен аударманы енгізіңіз",
    wordSavedAlert: "Сөз сөздікке сақталды!",
    excellentQuizResult: "🎉 Тамаша нәтиже! +50 XP",
    goodQuizResult: "Жақсы талпыныс! Өткені үшін +50 XP",
    seriesVideoLessons: [
      { category: "Friends • A2–B1", translation: "Қалайсың?", explanation: "Күнделікті сөйлеуде жиі қолданылатын бейресми амандасу." },
      { category: "Wednesday • B1", translation: "Мен бәрібір сияқты әрекет етемін.", explanation: "“as if” құрылымы салыстыру немесе мінез-құлықты сипаттау үшін қолданылады." },
      { category: "Stranger Things • B1–B2", translation: "Достар өтірік айтпайды.", explanation: "Present Simple шақтағы қысқа болымсыз сөйлемнің мысалы." }
    ],
    shortLessons: [
      {
        category: "Coffee Shop • Beginner",
        translation: "Маған латте бересіз бе, өтінемін?",
        explanation: ["<strong>Can I get...</strong> — маған ... бола ма", "<strong>latte</strong> — латте", "<strong>please</strong> — өтінемін"],
        quiz: { question: "Can I get a latte, please? фразасы нені білдіреді?", answers: ["Маған латте бересіз бе, өтінемін?", "Станция қайда орналасқан?", "Танысқаныма қуаныштымын."] }
      },
      {
        category: "Asking Directions • Beginner",
        translation: "Ең жақын станция қайда?",
        explanation: ["<strong>where is...</strong> — қайда орналасқан", "<strong>nearest</strong> — ең жақын", "<strong>station</strong> — станция"],
        quiz: { question: "Where is the nearest station? фразасы нені білдіреді?", answers: ["Ең жақын станция қайда?", "Маған кофе бола ма?", "Танысқаныма қуаныштымын."] }
      },
      {
        category: "Meeting People • Beginner",
        translation: "Танысқаныма қуаныштымын.",
        explanation: ["<strong>nice</strong> — қуанышты / жағымды", "<strong>meet</strong> — танысу", "<strong>you</strong> — сен / сіз"],
        quiz: { question: "Nice to meet you фразасы нені білдіреді?", answers: ["Танысқаныма қуаныштымын.", "Қалайсың?", "Рақмет."] }
      }
    ],
    musicData: [
      { translation: "Мен сен туралы ойлай беремін.", words: [{ word: "keep", translation: "жалғастыру" }, { word: "thinking", translation: "ойлау" }, { word: "about", translation: "туралы" }] },
      { translation: "Уақытымыз таусылып бара жатыр.", words: [{ word: "running out", translation: "таусылу" }, { word: "time", translation: "уақыт" }, { word: "we're", translation: "біз" }] },
      { translation: "Бәрі өте тез өзгерді.", words: [{ word: "everything", translation: "бәрі" }, { word: "changed", translation: "өзгерді" }, { word: "fast", translation: "тез" }] }
    ],
    dictionaryDefaults: ["латте", "станция", "танысу", "әуежай", "саяхат", "керемет"]
  },
  en: {
    previewTodayTitle: "Today's lesson",
    previewLessonTitle: "Phrases from series",
    previewPhrase: "“What are you up to?” — What are you doing?",
    previewProgressLabel: "Progress",
    aboutFeatureShortTitle: "📱 Short videos",
    aboutFeatureShortText: "Learn phrases through real situations and modern video formats.",
    aboutFeaturePathTitle: "🎯 Personal path",
    aboutFeaturePathText: "The program adapts to your goal: study, work, travel or communication.",
    aboutFeatureProgressTitle: "📊 Progress",
    aboutFeatureProgressText: "Quizzes, levels and tasks help you track your learning results.",
    continueStudyBtn: "Continue learning",
    finishLessonBtn: "Finish lesson",
    miniQuizTitle: "Mini quiz",
    lessonFinishedTitle: "Lesson complete 🎉",
    lessonFinishedText: "You successfully completed the mini lesson for this series.",
    newPhraseLearned: "✅ New phrase learned",
    progressUpdated: "⭐ Progress updated",
    keepLearning: "🔥 Keep learning every day",
    backToSeriesBtn: "Back to series",
    wordRequiredAlert: "Enter a word and translation",
    wordSavedAlert: "Word saved to dictionary!",
    excellentQuizResult: "🎉 Excellent result! +50 XP",
    goodQuizResult: "Good try! +50 XP for completing it",
    seriesVideoLessons: [
      { category: "Friends • A2–B1", translation: "How are you?", explanation: "An informal greeting often used in conversational speech." },
      { category: "Wednesday • B1", translation: "I behave as though I do not care.", explanation: "The “as if” structure is used for comparison or describing behavior." },
      { category: "Stranger Things • B1–B2", translation: "Friends do not lie.", explanation: "An example of a short negative sentence in Present Simple." }
    ],
    shortLessons: [
      {
        category: "Coffee Shop • Beginner",
        translation: "Can I get a latte, please?",
        explanation: ["<strong>Can I get...</strong> — a polite request", "<strong>latte</strong> — latte", "<strong>please</strong> — polite marker"],
        quiz: { question: "What does “Can I get a latte, please?” mean?", answers: ["Can I get a latte, please?", "Where is the station?", "Nice to meet you."] }
      },
      {
        category: "Asking Directions • Beginner",
        translation: "Where is the nearest station?",
        explanation: ["<strong>where is...</strong> — asking for a location", "<strong>nearest</strong> — closest", "<strong>station</strong> — station"],
        quiz: { question: "What does “Where is the nearest station?” mean?", answers: ["Where is the nearest station?", "Can I get a coffee?", "Nice to meet you."] }
      },
      {
        category: "Meeting People • Beginner",
        translation: "Nice to meet you.",
        explanation: ["<strong>nice</strong> — pleasant", "<strong>meet</strong> — meet someone", "<strong>you</strong> — the person you speak to"],
        quiz: { question: "What does “Nice to meet you” mean?", answers: ["Nice to meet you.", "How are you?", "Thank you."] }
      }
    ],
    musicData: [
      { translation: "I keep thinking about you.", words: [{ word: "keep", translation: "continue" }, { word: "thinking", translation: "thinking" }, { word: "about", translation: "about" }] },
      { translation: "We are running out of time.", words: [{ word: "running out", translation: "becoming used up" }, { word: "time", translation: "time" }, { word: "we're", translation: "we are" }] },
      { translation: "Everything changed so fast.", words: [{ word: "everything", translation: "everything" }, { word: "changed", translation: "changed" }, { word: "fast", translation: "quickly" }] }
    ],
    dictionaryDefaults: ["latte", "station", "meet", "airport", "travel", "awesome"]
  },
  tr: {
    previewTodayTitle: "Bugünün dersi",
    previewLessonTitle: "Dizilerden ifadeler",
    previewPhrase: "“What are you up to?” — Ne yapıyorsun?",
    previewProgressLabel: "İlerleme",
    aboutFeatureShortTitle: "📱 Kısa videolar",
    aboutFeatureShortText: "İfadeleri gerçek durumlar ve modern video formatlarıyla öğrenin.",
    aboutFeaturePathTitle: "🎯 Kişisel yol",
    aboutFeaturePathText: "Program hedefinize göre seçilir: eğitim, iş, seyahat veya iletişim.",
    aboutFeatureProgressTitle: "📊 İlerleme",
    aboutFeatureProgressText: "Testler, seviyeler ve görevler öğrenme sonucunu takip etmeye yardımcı olur.",
    continueStudyBtn: "Öğrenmeye devam et",
    finishLessonBtn: "Dersi bitir",
    miniQuizTitle: "Mini test",
    lessonFinishedTitle: "Ders tamamlandı 🎉",
    lessonFinishedText: "Dizi mini dersini başarıyla tamamladınız.",
    newPhraseLearned: "✅ Yeni ifade öğrenildi",
    progressUpdated: "⭐ İlerleme güncellendi",
    keepLearning: "🔥 Her gün öğrenmeye devam edin",
    backToSeriesBtn: "Dizilere dön",
    wordRequiredAlert: "Kelime ve çeviri girin",
    wordSavedAlert: "Kelime sözlüğe kaydedildi!",
    excellentQuizResult: "🎉 Harika sonuç! +50 XP",
    goodQuizResult: "İyi deneme! Tamamladığınız için +50 XP",
    seriesVideoLessons: [
      { category: "Friends • A2–B1", translation: "Nasılsın?", explanation: "Günlük konuşmada sık kullanılan samimi bir selamlaşma." },
      { category: "Wednesday • B1", translation: "Umursamıyormuş gibi davranıyorum.", explanation: "“as if” yapısı karşılaştırma veya davranış anlatmak için kullanılır." },
      { category: "Stranger Things • B1–B2", translation: "Arkadaşlar yalan söylemez.", explanation: "Present Simple ile kısa bir olumsuz cümle örneği." }
    ],
    shortLessons: [
      {
        category: "Coffee Shop • Beginner",
        translation: "Bir latte alabilir miyim, lütfen?",
        explanation: ["<strong>Can I get...</strong> — ... alabilir miyim", "<strong>latte</strong> — latte", "<strong>please</strong> — lütfen"],
        quiz: { question: "Can I get a latte, please? ifadesi ne anlama gelir?", answers: ["Bir latte alabilir miyim, lütfen?", "İstasyon nerede?", "Tanıştığımıza memnun oldum."] }
      },
      {
        category: "Asking Directions • Beginner",
        translation: "En yakın istasyon nerede?",
        explanation: ["<strong>where is...</strong> — nerede", "<strong>nearest</strong> — en yakın", "<strong>station</strong> — istasyon"],
        quiz: { question: "Where is the nearest station? ifadesi ne anlama gelir?", answers: ["En yakın istasyon nerede?", "Bir kahve alabilir miyim?", "Tanıştığımıza memnun oldum."] }
      },
      {
        category: "Meeting People • Beginner",
        translation: "Tanıştığımıza memnun oldum.",
        explanation: ["<strong>nice</strong> — hoş / güzel", "<strong>meet</strong> — tanışmak", "<strong>you</strong> — sen / siz"],
        quiz: { question: "Nice to meet you ifadesi ne anlama gelir?", answers: ["Tanıştığımıza memnun oldum.", "Nasılsın?", "Teşekkürler."] }
      }
    ],
    musicData: [
      { translation: "Seni düşünmeye devam ediyorum.", words: [{ word: "keep", translation: "devam etmek" }, { word: "thinking", translation: "düşünmek" }, { word: "about", translation: "hakkında" }] },
      { translation: "Zamanımız tükeniyor.", words: [{ word: "running out", translation: "tükenmek" }, { word: "time", translation: "zaman" }, { word: "we're", translation: "biz" }] },
      { translation: "Her şey çok hızlı değişti.", words: [{ word: "everything", translation: "her şey" }, { word: "changed", translation: "değişti" }, { word: "fast", translation: "hızlı" }] }
    ],
    dictionaryDefaults: ["latte", "istasyon", "tanışmak", "havaalanı", "seyahat", "harika"]
  }
};

Object.keys(localizedPageData).forEach(lang => {
  Object.assign(translations[lang], localizedPageData[lang]);
});

const learningContent = {
  English: {
    useDefaultContent: true,
    profileLanguage: "English",
    shortLesson: {
      category: "Meet & Greet • Beginner",
      phrase: "Nice to meet you.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>nice</strong> — приятно", "<strong>meet</strong> — познакомиться", "<strong>you</strong> — ты / вы"],
      quiz: { question: "Что означает фраза: Nice to meet you?", answers: ["Приятно познакомиться.", "Как дела?", "Спасибо."] }
    },
    grammarExamples: ["I study English every day.", "I am watching a series now.", "I watched a movie yesterday."],
    dictionaryWords: [
      { word: "meet", translation: "познакомиться" },
      { word: "you", translation: "ты / вы" },
      { word: "nice", translation: "приятно" }
    ]
  },
  Türkçe: {
    profileLanguage: "Türkçe",
    shortLesson: {
      category: "Tanışma • Beginner",
      phrase: "Tanıştığıma memnun oldum.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>tanışmak</strong> — знакомиться", "<strong>memnun</strong> — довольный / рад", "<strong>oldum</strong> — я стал / мне стало"],
      quiz: { question: "Что означает фраза: Tanıştığıma memnun oldum?", answers: ["Приятно познакомиться.", "Где станция?", "Спасибо."] }
    },
    grammarExamples: ["Her gün Türkçe çalışıyorum.", "Şimdi bir dizi izliyorum.", "Dün bir film izledim."],
    dictionaryWords: [
      { word: "tanışmak", translation: "знакомиться" },
      { word: "memnun", translation: "довольный / рад" },
      { word: "oldum", translation: "я стал / мне стало" }
    ]
  },
  Қазақша: {
    profileLanguage: "Қазақша",
    shortLesson: {
      category: "Танысу • Beginner",
      phrase: "Танысқаныма қуаныштымын.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>танысу</strong> — знакомиться", "<strong>қуаныш</strong> — радость", "<strong>мен</strong> — я"],
      quiz: { question: "Что означает фраза: Танысқаныма қуаныштымын?", answers: ["Приятно познакомиться.", "Как дела?", "Спасибо."] }
    },
    grammarExamples: ["Мен күн сайын қазақ тілін оқимын.", "Мен қазір сериал көріп отырмын.", "Мен кеше фильм көрдім."],
    dictionaryWords: [
      { word: "танысу", translation: "знакомиться" },
      { word: "қуаныш", translation: "радость" },
      { word: "мен", translation: "я" }
    ]
  },
  Deutsch: {
    profileLanguage: "Deutsch",
    shortLesson: {
      category: "Begrüßung • Beginner",
      phrase: "Schön, dich kennenzulernen.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>schön</strong> — приятно", "<strong>kennenlernen</strong> — знакомиться", "<strong>dich</strong> — тебя"],
      quiz: { question: "Что означает фраза: Schön, dich kennenzulernen?", answers: ["Приятно познакомиться.", "Где станция?", "До завтра."] }
    },
    grammarExamples: ["Ich lerne jeden Tag Deutsch.", "Ich schaue jetzt eine Serie.", "Ich habe gestern einen Film gesehen."],
    dictionaryWords: [
      { word: "schön", translation: "приятно" },
      { word: "kennenlernen", translation: "знакомиться" },
      { word: "dich", translation: "тебя" }
    ]
  },
  Français: {
    profileLanguage: "Français",
    shortLesson: {
      category: "Rencontre • Beginner",
      phrase: "Ravi de vous rencontrer.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>ravi</strong> — рад", "<strong>rencontrer</strong> — встречать / знакомиться", "<strong>vous</strong> — вы"],
      quiz: { question: "Что означает фраза: Ravi de vous rencontrer?", answers: ["Приятно познакомиться.", "Как пройти?", "Спасибо."] }
    },
    grammarExamples: ["J'étudie le français chaque jour.", "Je regarde une série maintenant.", "J'ai regardé un film hier."],
    dictionaryWords: [
      { word: "ravi", translation: "рад" },
      { word: "rencontrer", translation: "встречать / знакомиться" },
      { word: "vous", translation: "вы" }
    ]
  },
  한국어: {
    profileLanguage: "한국어",
    shortLesson: {
      category: "인사 • Beginner",
      phrase: "만나서 반가워요.",
      translation: "Приятно познакомиться.",
      explanation: ["<strong>만나다</strong> — встречать", "<strong>반갑다</strong> — быть радостным встрече", "<strong>요</strong> — вежливое окончание"],
      quiz: { question: "Что означает фраза: 만나서 반가워요?", answers: ["Приятно познакомиться.", "Где кафе?", "Спасибо."] }
    },
    grammarExamples: ["저는 매일 한국어를 공부해요.", "저는 지금 드라마를 보고 있어요.", "저는 어제 영화를 봤어요."],
    dictionaryWords: [
      { word: "만나다", translation: "встречать" },
      { word: "반갑다", translation: "быть радостным встрече" },
      { word: "요", translation: "вежливое окончание" }
    ]
  }
};

function getSeriesVideoLesson() {
  const base = seriesVideoLessons[currentSeriesVideoLesson];
  const localized = translations[currentSiteLanguage].seriesVideoLessons[currentSeriesVideoLesson];
  return { ...base, ...localized };
}

function applySeriesVideoLesson() {
  const lesson = getSeriesVideoLesson();
  if (seriesVideo) seriesVideo.src = lesson.video;
  if (seriesCategory) seriesCategory.textContent = lesson.category;
  if (seriesStudyPhrase) seriesStudyPhrase.textContent = lesson.phrase;
  if (seriesStudyTranslation) seriesStudyTranslation.textContent = lesson.translation;
  if (seriesStudyExplanation) seriesStudyExplanation.textContent = lesson.explanation;
}

function getShortLesson() {
  const base = shortLessons[currentShort];
  const localized = translations[currentSiteLanguage].shortLessons[currentShort];
  const currentLearningContent = learningContent[currentLearningLanguage];
  const learningLesson = currentLearningContent?.useDefaultContent ? null : currentLearningContent?.shortLesson;
  const quizAnswers = learningLesson?.quiz?.answers || localized.quiz.answers;
  return {
    ...base,
    ...localized,
    ...learningLesson,
    quiz: {
      question: learningLesson?.quiz?.question || localized.quiz.question,
      answers: base.quiz.answers.map((answer, index) => ({
        ...answer,
        text: quizAnswers[index]
      }))
    }
  };
}

function applyShortLesson(resetQuiz) {
  const lesson = getShortLesson();
  const shouldRenderQuiz = resetQuiz || (shortQuiz && shortQuiz.classList.contains("active"));
  if (shortTranslation && resetQuiz) shortTranslation.classList.add("hidden-content");
  if (shortExplanation && resetQuiz) shortExplanation.classList.add("hidden-content");
  if (shortVideo) shortVideo.src = lesson.video;
  if (shortCategory) shortCategory.textContent = lesson.category;
  if (shortPhrase) shortPhrase.textContent = lesson.phrase;
  if (shortTranslation) shortTranslation.textContent = lesson.translation;
  if (shortExplanation) {
    shortExplanation.innerHTML = lesson.explanation.map(item => `<p>${item}</p>`).join("");
  }
  if (shouldRenderQuiz) {
    renderShortQuiz();
  }
}

function getMusicLesson() {
  const base = musicData[currentMusicIndex];
  const localized = translations[currentSiteLanguage].musicData[currentMusicIndex];
  return { ...base, ...localized };
}

function applyDictionaryDefaults() {
  const currentLearningContent = learningContent[currentLearningLanguage];
  const learningWords = currentLearningContent?.useDefaultContent ? [] : currentLearningContent?.dictionaryWords || [];
  const translationsList = translations[currentSiteLanguage].dictionaryDefaults;
  const defaultWords = ["latte", "station", "meet", "airport", "travel", "awesome"];
  document.querySelectorAll(".dictionary-grid .word-card").forEach((card, index) => {
    const learningWord = learningWords[index];
    if (learningWord) {
      const word = card.querySelector("h3");
      const translation = card.querySelector("p");
      if (word) word.textContent = learningWord.word;
      if (translation) translation.textContent = learningWord.translation;
      return;
    }
    if (index >= translationsList.length) return;
    const word = card.querySelector("h3");
    const translation = card.querySelector("p");
    if (word && defaultWords[index]) word.textContent = defaultWords[index];
    if (translation) translation.textContent = translationsList[index];
  });
}

function applyLearningLanguage(language) {
  currentLearningLanguage = learningContent[language] ? language : "English";
  selectedLearningLang = currentLearningLanguage;
  localStorage.setItem("polyglotLearningLang", currentLearningLanguage);

  const content = learningContent[currentLearningLanguage];

  if (profileLearningLang) {
    profileLearningLang.textContent = content.profileLanguage;
  }

  document.querySelectorAll("#grammar .grammar-card").forEach((card, index) => {
    const example = card.querySelector("p:nth-of-type(2)");
    if (example && content.grammarExamples[index]) {
      example.innerHTML = `<strong>Example:</strong> ${content.grammarExamples[index]}`;
    }
  });

  applyShortLesson(true);
  applyDictionaryDefaults();
}

function changeSiteLanguage(lang) {
  currentSiteLanguage = translations[lang] ? lang : "ru";
  const t = translations[currentSiteLanguage];
  const setText = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  };
  const setQueryText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  };
  const setPlaceholder = (selector, text) => {
    const input = document.querySelector(selector);
    if (input) {
      input.placeholder = text;
    }
  };
  const setStrongLine = (selector, label, text) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const strong = element.querySelector("strong");
    if (strong) {
      strong.textContent = `${label}:`;
    }

    const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.textContent = ` ${text}`;
    }
  };

  setQueryText(".text-block h1", t.heroTitle);
  setQueryText(".text-block p", t.heroText);
  setQueryText(".language-box h3", t.chooseLang);
  setQueryText(".start-btn", t.startBtn);

  setQueryText('a[href="#about"]', t.about);
  setQueryText('a[href="#shorts"]', t.lessons);
  setQueryText('a[href="#grammar"]', t.grammar);

  const profileLink = document.querySelector("#profileLink");
  const savedUser = JSON.parse(localStorage.getItem("polyglotUser"));
  if (savedUser && profileLink) {
    profileLink.textContent = `👤 ${savedUser.name}`;
  } else if (profileLink) {
    profileLink.textContent = t.profile;
  }

  localStorage.setItem("polyglotLang", currentSiteLanguage);
  setQueryText(".about-text span", t.aboutLabel);
  setQueryText(".about-text h2", t.aboutTitle);
  setQueryText(".about-text p", t.aboutText);
  setText("previewTodayTitle", t.previewTodayTitle);
  setText("previewLessonTitle", t.previewLessonTitle);
  setText("previewPhrase", t.previewPhrase);
  setText("previewProgressLabel", t.previewProgressLabel);
  setText("aboutFeatureShortTitle", t.aboutFeatureShortTitle);
  setText("aboutFeatureShortText", t.aboutFeatureShortText);
  setText("aboutFeaturePathTitle", t.aboutFeaturePathTitle);
  setText("aboutFeaturePathText", t.aboutFeaturePathText);
  setText("aboutFeatureProgressTitle", t.aboutFeatureProgressTitle);
  setText("aboutFeatureProgressText", t.aboutFeatureProgressText);

  setText("learningLabel", t.learningLabel);
  setText("learningTitle", t.learningTitle);
  setText("learningText", t.learningText);
  setText("learningSeriesTitle", t.learningSeriesTitle);
  setText("seriesText", t.seriesText);
  setText("musicTitleCard", t.musicTitleCard);
  setText("musicTextCard", t.musicTextCard);
  setText("shortsTitle", t.shortsTitle);
  setText("shortsText", t.shortsText);
  setText("grammarTitleCard", t.grammarTitleCard);
  setText("grammarTextCard", t.grammarTextCard);
  setText("testsTitle", t.testsTitle);
  setText("testsText", t.testsText);
  setText("dictionaryTitle", t.dictionaryTitle);
  setText("dictionaryText", t.dictionaryText);

  setQueryText("#registerForm span", t.authLabel);
  setQueryText("#registerForm h2", t.authTitle);
  setQueryText("#registerForm p", t.authText);
  setPlaceholder("#userNameInput", t.namePlaceholder);
  setPlaceholder("#userEmailInput", t.emailPlaceholder);
  setText("registerBtn", t.registerBtn);
  setQueryText("#profileBox > span", t.profileLabel);
  setQueryText("#profileBox h2", t.profileTitle);
  setQueryText("#profileBox .profile-info p:nth-child(1) strong", `${t.nameLabel}:`);
  setQueryText("#profileBox .profile-info p:nth-child(3) strong", `${t.studiedLanguageLabel}:`);
  setQueryText("#profileBox .profile-info p:nth-child(4) strong", `${t.levelLabel}:`);
  setText("logoutBtn", t.logoutBtn);

  setQueryText("#shorts .section-title span", t.shortsLabel);
  setQueryText("#shorts .section-title h2", t.shortsSectionTitle);
  setQueryText("#shorts .section-title p", t.shortsSectionText);
  setQueryText("#shortQuiz h4", t.miniTest);
  setText("nextShortBtn", t.nextVideoBtn);
  if (shortQuiz && shortQuiz.classList.contains("active")) {
    renderShortQuiz();
  }

  setQueryText("#dashboard .dashboard-header span", t.dashboardLabel);
  setQueryText("#dashboard .dashboard-header h2", t.dashboardTitle);
  setQueryText("#dashboard .big-card h3", t.currentLevel);
  setQueryText("#dashboard .level-info div:nth-child(1) strong", t.nextGoal);
  setQueryText("#dashboard .level-info div:nth-child(2) strong", t.skillLabel);
  setQueryText("#dashboard .level-info div:nth-child(3) strong", t.recommendationLabel);
  setQueryText("#dashboard .level-info div:nth-child(3) span", t.recommendationText);
  setQueryText("#dashboard .dashboard-card:nth-child(2) h3", t.streakTitle);
  setQueryText("#dashboard .dashboard-card:nth-child(2) p", t.streakText);
  setQueryText("#dashboard .dashboard-card:nth-child(3) h3", t.lessonsDoneTitle);
  setQueryText("#dashboard .dashboard-card:nth-child(3) p", t.lessonsDoneText);
  setQueryText("#dashboard .dashboard-card:nth-child(4) h3", t.wordsLearnedTitle);
  setQueryText("#dashboard .dashboard-card:nth-child(4) p", t.wordsLearnedText);
  setQueryText("#dashboard .dashboard-card:nth-child(5) h3", t.weeklyXP);

  setQueryText("#series .section-title span", t.seriesLabel);
  setQueryText("#series .section-title h2", t.seriesSectionTitle);
  setQueryText("#series .section-title p", t.seriesSectionText);
  setText("nextSeriesPhraseBtn", t.nextPhraseBtn);
  setQueryText("#seriesModal .phrase-block:nth-of-type(1) h4", t.phraseLabel);
  setQueryText("#seriesModal .phrase-block:nth-of-type(2) h4", t.translationLabel);
  setQueryText("#seriesModal .phrase-block:nth-of-type(3) h4", t.explanationLabel);

  setQueryText("#music .section-title span", t.musicLabel);
  setQueryText("#music .section-title h2", t.musicSectionTitle);
  setQueryText("#music .section-title p", t.musicSectionText);
  setQueryText("#music .music-card:nth-child(1) h3", t.songLyricsTitle);
  setQueryText("#music .music-card:nth-child(1) p:nth-of-type(1) strong", `${t.phraseLabel}:`);
  setQueryText("#music .music-card:nth-child(1) p:nth-of-type(2) strong", `${t.translationLabel}:`);
  setQueryText("#music .music-card:nth-child(1) button", t.analyzeLineBtn);
  setQueryText("#music .music-card:nth-child(2) h3", `🎧 ${t.listeningPractice}`);
  setStrongLine("#music .music-card:nth-child(2) p:nth-of-type(1)", t.taskLabel, t.taskText);
  setStrongLine("#music .music-card:nth-child(2) p:nth-of-type(2)", t.skillLabel, t.listeningSkill);
  setQueryText("#music .music-card:nth-child(2) button", t.startPracticeBtn);
  setQueryText("#music .music-card:nth-child(3) h3", `⭐ ${t.vocabularyTitle}`);
  setQueryText("#music .music-card:nth-child(3) p:nth-of-type(1) strong", `${t.wordsLabel}:`);
  setStrongLine("#music .music-card:nth-child(3) p:nth-of-type(2)", t.goalLabel, t.vocabGoalText);
  setQueryText("#music .music-card:nth-child(3) button", t.studyWordsBtn);

  setQueryText("#grammar .section-title span", t.grammarLabel);
  setQueryText("#grammar .section-title h2", t.grammarSectionTitle);
  setQueryText("#grammar .section-title p", t.grammarSectionText);
  setQueryText("#grammar .grammar-card:nth-child(1) p:nth-of-type(1)", t.grammarPresentSimpleText);
  setQueryText("#grammar .grammar-card:nth-child(2) p:nth-of-type(1)", t.grammarPresentContinuousText);
  setQueryText("#grammar .grammar-card:nth-child(3) p:nth-of-type(1)", t.grammarPastSimpleText);
  document.querySelectorAll("#grammar .grammar-card button").forEach(button => {
    button.textContent = t.openTopicBtn;
  });

  setQueryText("#tests .section-title span", t.testsLabel);
  setQueryText("#tests .section-title h2", t.testsSectionTitle);
  setQueryText("#tests .section-title p", t.testsSectionText);
  setQueryText("#tests .track-column:nth-child(1) .track-title", t.vocabularyTrack);
  setQueryText("#tests .track-column:nth-child(2) .track-title", t.seriesTrack);
  setQueryText("#tests .track-column:nth-child(3) .track-title:nth-of-type(1)", t.shortVideosTrack);
  setQueryText("#tests .final-title", t.finalChallenge);
  document.querySelectorAll("#tests .track-item span, #tests .track-column > span").forEach(span => {
    if (/Level\s+\d+|Деңгей\s+\d+|Seviye\s+\d+/.test(span.textContent)) {
      const number = span.textContent.match(/\d+/);
      if (number) span.textContent = `${t.levelWord} ${number[0]}`;
    } else if (span.textContent.trim() === "Final" || span.textContent.trim() === "Финал") {
      span.textContent = t.finalWord;
    }
  });
  setText("nextQuizQuestion", t.nextQuestionBtn);

  setQueryText("#dictionary .section-title span", t.dictionaryLabel);
  setQueryText("#dictionary .section-title h2", t.dictionarySectionTitle);
  setQueryText("#dictionary .section-title p", t.dictionarySectionText);
  setPlaceholder("#newWord", t.newWordPlaceholder);
  setPlaceholder("#newTranslation", t.newTranslationPlaceholder);
  setText("addWordBtn", t.addWordBtn);
  setPlaceholder(".dictionary-search input", t.searchWordPlaceholder);
  applySeriesVideoLesson();
  applyShortLesson(false);
  updateMusicCards();
  applyDictionaryDefaults();
  applyLearningLanguage(currentLearningLanguage);

  renderStep();
}

const savedLang = localStorage.getItem("polyglotLang");

if (savedLang) {
  changeSiteLanguage(savedLang);
} else {
  changeSiteLanguage(currentSiteLanguage);
}
