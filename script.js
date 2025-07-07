const questions = [
  {
    type: "mcq",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    type: "mcq",
    question: "Which is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    type: "mcq",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Charles Dickens", "JK Rowling", "Leo Tolstoy"],
    answer: "Shakespeare"
  },
  {
    type: "fill",
    question: "Fill in the blank: The sun rises in the ____.",
    answer: "east"
  },
  {
    type: "mcq",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');

const questionBox = document.getElementById('question');
const optionsBox = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreBox = document.getElementById('score');

document.getElementById('start-btn').addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizBox.classList.remove('hidden');
  loadQuestion();
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  optionsBox.innerHTML = "";

  if (q.type === "mcq") {
    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      optionsBox.appendChild(btn);
    });
  } else if (q.type === "fill") {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = "Type your answer here";
    input.id = "text-answer";
    input.style.padding = "10px";
    input.style.width = "100%";
    input.style.marginTop = "10px";
    optionsBox.appendChild(input);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = "Submit";
    submitBtn.style.marginTop = "10px";
    submitBtn.onclick = () => {
      const userAnswer = document.getElementById('text-answer').value.trim().toLowerCase();
      checkAnswer(userAnswer);
    };
    optionsBox.appendChild(submitBtn);
  }

  nextBtn.style.display = "none";
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer.toLowerCase();
  if (selected.toLowerCase() === correct) {
    score++;
  }
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
  nextBtn.style.display = "none";
});

function showResult() {
  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');
  scoreBox.textContent = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add('hidden');
  quizBox.classList.remove('hidden');
  loadQuestion();
}
