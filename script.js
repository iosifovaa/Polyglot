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

const seriesButtons = document.querySelectorAll(".video-lesson-card button");

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

  seriesTitle.textContent = "Мини-тест";
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

    seriesTitle.textContent = "Урок завершён 🎉";
    seriesPhrase.textContent = "+10 XP";
    seriesTranslation.textContent = "Вы успешно прошли мини-урок по сериалу.";

    seriesExplanation.innerHTML = `
      <div class="finish-card">
        <p>✅ Новая фраза изучена</p>
        <p>⭐ Прогресс обновлён</p>
        <p>🔥 Продолжайте обучение каждый день</p>
      </div>
    `;

    continueSeriesBtn.textContent = "Вернуться к сериалам";
    continueSeriesBtn.style.display = "block";

    continueSeriesBtn.onclick = () => {
      seriesModal.classList.remove("active");
    };

  } else {

    seriesExplanation.insertAdjacentHTML(
      "beforeend",
      `<p class="wrong-answer">
        Неправильно. Попробуйте ещё раз.
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

  const lesson = seriesVideoLessons[currentSeriesVideoLesson];

  seriesVideo.src = lesson.video;
  seriesCategory.textContent = lesson.category;
  seriesStudyPhrase.textContent = lesson.phrase;
  seriesStudyTranslation.textContent = lesson.translation;
  seriesStudyExplanation.textContent = lesson.explanation;
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

  const lesson = shortLessons[currentShort];
  shortTranslation.classList.add("hidden-content");
  shortExplanation.classList.add("hidden-content");

  shortVideo.src = lesson.video;
  shortCategory.textContent = lesson.category;
  shortPhrase.textContent = lesson.phrase;
  shortTranslation.textContent = lesson.translation;

  shortExplanation.innerHTML = lesson.explanation
  .map(item => `<p>${item}</p>`)
  .join("");

renderShortQuiz();
});
function renderShortQuiz() {

  const lesson = shortLessons[currentShort];

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
          "✅ Правильно! +10 XP";

        shortQuizResult.style.color =
          "#22c55e";

        shortTranslation.classList.remove("hidden-content");
        shortExplanation.classList.remove("hidden-content");

      } else {

        shortQuizResult.textContent =
          "❌ Неправильно. Попробуйте ещё раз.";

        shortQuizResult.style.color =
          "#ef4444";

      }

    });

    shortQuizOptions.appendChild(button);

  });

}
const dictionarySearch = document.querySelector(".dictionary-search input");
const wordCards = document.querySelectorAll(".word-card");

dictionarySearch.addEventListener("input", () => {
  const searchText = dictionarySearch.value.toLowerCase();

  wordCards.forEach(card => {
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
    alert("Введите слово и перевод");
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

  profileLink.textContent = "👤 Профиль";
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
    alert("Введите имя и email");
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

function renderQuizQuestion() {
  const current = activeQuiz[currentQuizQuestion];

  quizProgress.textContent = `Вопрос ${currentQuizQuestion + 1} из ${activeQuiz.length}`;
  quizQuestion.textContent = current.question;
  quizResult.textContent = "";
  quizAnswerOptions.innerHTML = "";
  nextQuizQuestion.classList.add("hidden-content");
  quizAnswered = false;

  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;

      if (answer.correct) {
        quizScore++;
        quizResult.textContent = "✅ Правильно!";
        quizResult.style.color = "#22c55e";
      } else {
        quizResult.textContent = "❌ Неправильно.";
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
    quizProgress.textContent = "Тест завершён";
    quizQuestion.textContent = `Ваш результат: ${quizScore} из ${activeQuiz.length}`;
    quizAnswerOptions.innerHTML = "";
    quizResult.textContent = quizScore >= 4
      ? "🎉 Отличный результат!"
      : "Хорошая попытка! Попробуйте пройти ещё раз.";
    quizResult.style.color = "#38bdf8";
    nextQuizQuestion.classList.add("hidden-content");
  }
});

closeQuiz.addEventListener("click", () => {
  quizModal.classList.remove("active");
});