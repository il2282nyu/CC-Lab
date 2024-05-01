class Quiz {
  constructor(quizContainerId, submitButtonId) {
    this.quizContainer = document.getElementById(quizContainerId);
    this.submitButton = document.getElementById(submitButtonId);
    this.myQuestions = [
      {
        question: "Which type of creature would you prefer as a companion?",
        answers: {
          a: "Cute and cuddly",
          b: "Cool and powerful",
          c: "Quirky and mischievous",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c",
      },
      {
        question: "What kind of adventures do you enjoy most?",
        answers: {
          a: "Exploring vast landscapes",
          b: "Battling powerful foes",
          c: "Getting into humorous and unexpected situations",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c", 
      },
      {
        question: "What's your favorite kind of team dynamic?",
        answers: {
          a: "Friendship and teamwork",
          b: "Strategic planning and cooperation",
          c: "Unpredictability and surprises",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c",
      },
      {
        question: "What's your preferred method of transportation?",
        answers: {
          a: "Riding on epic creatures",
          b: "Walking or running",
          c: "Finding creative and unconventional ways to get around",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c",
      },
    
      {
        question: "How do you handle challenges?",
        answers: {
          a: "With determination and perseverance",
          b: "By strategizing and adapting",
          c: "With humor and spontaneity",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c",
      },
    
      {
        question: "What's your ideal way to spend a day?",
        answers: {
          a: "Exploring nature and making new friends",
          b: "Training and battling to become stronger",
          c: "Having fun and causing a bit of mischief wherever you go",
        },
        optionA: "a",
        optionB: "b",
        optionC: "c",
      },
    ];
  }

  buildQuiz() {
    const output = [];

    this.myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (const letter in currentQuestion.answers) {
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
    });

    this.quizContainer.innerHTML = output.join('');
  }

  showResults() {
    const answerContainers = this.quizContainer.querySelectorAll('.answers');
    let score = 0;

    this.myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.optionA) {
        score += 1;
      } else if (userAnswer === currentQuestion.optionB) {
        score += 2;
      } else if (userAnswer === currentQuestion.optionC) {
        score += 3;
      }
    });

    if (score >= 1 && score <= 6) {
      window.location.href = 'pokemon.html';
    } else if (score > 6 && score <= 12) {
      window.location.href = 'digimon.html';
    } else if (score > 12 && score <= 18) {
      window.location.href = 'shinchan.html';
    }
  }

  playAudio() {
    var audio = document.getElementById("backgroundAudio");
    if (audio.paused) {
      audio.play();
    }
  }

  initialize() {
    this.buildQuiz();
    this.submitButton.addEventListener('click', () => this.showResults());
  }
}


const myQuiz = new Quiz('quiz', 'submit');
myQuiz.initialize();
