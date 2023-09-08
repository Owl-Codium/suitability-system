document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  let shuffledQuestions = [];
  let currentQuestionIndex = 0;

  function startGame() {
    currentQuestionIndex = 0;
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.classList.add('question');
    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
      const answerButton = document.createElement('button');
      answerButton.innerText = answer.answer;
      answerButton.classList.add('btn');
      answerButton.addEventListener('click', () => selectAnswer(answer));
      answersContainer.appendChild(answerButton);
    });
  }

  function resetState() {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
  }

  function selectAnswer(answer) {
    console.log('Selected answer:', answer.answer);
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
      setNextQuestion();
    } else {
      console.log('Quiz completed!');
    }
  }

  fetch('../../../database/questions.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.questions)) {
        shuffledQuestions = [...data.questions].sort(() => Math.random() - 0.5);
        startGame();
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
});
