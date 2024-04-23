const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "Question 1?",
    answers: {
      a: "Option 1", 
      b: "Option 2",
      c: "Option 3",
    },
    optionA: "a",
    optionB: "b",
    optionC: "c", 
  },
  {
    question: "Question 2?",
    answers: {
      a: "Option 1",
      b: "Option 2",
      c: "Option 3",
    },
    optionA: "a",
    optionB: "b",
    optionC: "c", 
  },
  {
    question: "Question 3?",
    answers: {
      a: "Option 1",
      b: "Option 2",
      c: "Option 3",
    },
    optionA: "a",
    optionB: "b",
    optionC: "c",
  },
  {
    question: "Question 4?",
    answers: {
      a: "Option 1",
      b: "Option 2",
      c: "Option 3",
    },
    optionA: "a",
    optionB: "b",
    optionC: "c",
  }
];

function buildQuiz(){
  const output = [];

  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      
      
      const answers = [];

      for(letter in currentQuestion.answers){

        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join('');
}


function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let score = 0;
  
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      if(userAnswer === currentQuestion.optionA){
        score += 1;
      }else if(userAnswer === currentQuestion.optionB){
        score += 2;
      }else if (userAnswer === currentQuestion.optionC){
        score += 3;
      }
    });
  
    if (score >= 1 && score <= 4) {
      window.location.href = 'pokemon.html';
    } else if (score >= 5 && score <= 8) {
      window.location.href = 'digimon.html';
    } else if (score >= 9 && score <= 12) {
      window.location.href = 'shinchan.html';
    }
  }
  



buildQuiz();

submitButton.addEventListener('click', showResults);