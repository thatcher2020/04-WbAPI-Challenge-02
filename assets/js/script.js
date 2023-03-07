const questions = [
  {
    questionTitle: "Which item is not a javascript value?",
    choices: ["Boolean", "Number", "String", "Zero"],
    answerIndex: 3,
  },
  {
    questionTitle:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answerIndex: 2,
  },
  {
    questionTitle: "Arrays in JavaScript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answerIndex: 3,
  },
  {
    questionTitle:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answerIndex: 2,
  },
  {
    questionTitle:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answerIndex: 3,
  },
];

function startTimer() {
  let currentTime = 75;
  const timerInterval = setInterval(() => {
    const timer = document.querySelector("#timer");
    currentTime--;

    if (currentTime == 0) {
      alert("Times up!");
      clearInterval(timerInterval);
      endQuiz();
    } else {
      timer.innerText = currentTime;
    }
  }, 1000);
}

function renderQuestion(questionIndex) {
  const questionScreen = document.querySelector("#questions");
  questionScreen.innerHTML = "";
  const question = questions[questionIndex];

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionTitle = document.createElement("h2");
  questionTitle.id = "question-title";
  questionTitle.innerText = question.questionTitle;

  const choices = document.createElement("ul");
  choices.id = "choices";
  choices.classList.add("choices");

  for (let [i, choice] of question.choices.entries()) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = choice;
    button.addEventListener("click", () => {
      if (i === question.answerIndex) {
        alert("Correct");
      } else {
        alert("Wrong");
      }
      if (questionIndex === questions.length - 1) {
        endQuiz();
      } else {
        renderQuestion(questionIndex + 1);
      }
    });
    li.appendChild(button);
    choices.appendChild(li);
  }

  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(choices);

  questionScreen.appendChild(questionDiv);
}

function startQuiz() {
  startTimer();

  const startScreen = document.querySelector("#start-screen");
  startScreen.classList.add("hide");

  const questionScreen = document.querySelector("#questions");
  questionScreen.classList.remove("hide");

  renderQuestion(0);
}

function endQuiz() {
  const questionScreen = document.querySelector("#questions");
  questionScreen.classList.add("hide");

  const endScreen = document.querySelector("#end-screen");
  endScreen.classList.remove("hide");

  const score = document.querySelector("#score");
  const numCorrect = document.querySelectorAll(".correct").length;
  const percentCorrect = ((numCorrect / questions.length) * 100).toFixed(2);

  score.innerText = `You got ${numCorrect} out of ${questions.length} questions correct (${percentCorrect}%).`;
}

function init() {
  document.querySelector("#start").addEventListener("click", () => {
    startQuiz();
  });
}

init();