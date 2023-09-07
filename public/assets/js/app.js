document.addEventListener("DOMContentLoaded", function () {
  fetch('../../../database/questions.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.questions)) {
        const shuffledQuestions = [...data.questions].sort(() => Math.random() - 0.5);
        let currentQuestionIndex = 0;

        // Select elements from the HTML
        const questionElement = document.getElementById('question');
        const answersContainer = document.getElementById('answers');

        // Function to start the quiz
        function startGame() {
          currentQuestionIndex = 0;
          setNextQuestion();
        }

        // Function to set the next question
        function setNextQuestion() {
          resetState();
          showQuestion(shuffledQuestions[currentQuestionIndex]);
        }

        // Function to display a question
        function showQuestion(question) {
          questionElement.classList.add('question');
          questionElement.innerText = question.question;

          // Create answer buttons
          question.answers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.innerText = answer.answer;
            answerButton.classList.add('btn');
            answerButton.addEventListener('click', () => selectAnswer(answer));
            answersContainer.appendChild(answerButton);
          });
        }

        // Function to reset the question state
        function resetState() {
          while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
          }
        }

        // Function to handle answer selection
        function selectAnswer(answer) {
          // Handle the selected answer (you can add your logic here)
          console.log('Selected answer:', answer.answer);

          // Move to the next question
          currentQuestionIndex++;

          if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
          } else {
            // Quiz is complete, you can add your completion logic here
            console.log('Quiz completed!');
          }
        }

        // Start the game when the page loads
        startGame();
      } else {
        console.error('Data is not an array:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
});
