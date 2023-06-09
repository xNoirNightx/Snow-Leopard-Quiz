 //quiz ( add btn listenrs , **note go in order**)
  const startContainer = document.getElementById("start-container");
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  //scoreboard ( **note localstorage display)
  const scoreElement = document.getElementById("score");
  const nameInput = document.getElementById("name");
  const submitScoreBtn = document.getElementById("submit-score-btn");
  const scoreboardElement = document.getElementById("scoreboard");
  const timerElement = document.getElementById("timer");

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60; 
  let timer;

 // questions 
 const quizData = [
    {
      question: "Question 1: Where do Snow Leopards live?",
      choices: ["Europe", "Asia", "Brazil", "North America"],
      correctAnswer: 1,
    },
    {
      question: "Question 2: About how many Snow Leopards are left in the wild? ",
      choices: ["4,080-6,590", "2,080-4,590", "6,080-8,590", "5,080-7,590"],
      correctAnswer: 0,
    },
    {
      question: "Question 3: What CANT Snow Leopards do? ",
      choices: ["roar", "chuffing", "growl", "mew"],
      correctAnswer: 0,
    },
    {
      question: "Question 4: How long are Snow Leopards tails?  ",
      choices: ["50-75cm long", "70-95cm long", "60-85cm long", "80-105cm long"],
      correctAnswer: 3,
    },
    {
      question: "Question 5: How far can Snow Leopards leap?",
      choices: ["upto 5meters", "upto 7meters", "upto 9meters", "upto 4meters"],
      correctAnswer: 2,
    },];


 // quiz start and timer start  
  function showStartPage() {
    startContainer.style.display = "block";
    quizContainer.style.display = "none";
  }
  function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
  }

 // display quiz questions 
  function showQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    choicesElement.innerHTML = "";
  
    for (let i = 0; i < currentQuiz.choices.length; i++) {
      const choice = currentQuiz.choices[i];
      const button = document.createElement("button");
      button.textContent = choice;
      button.value = i;
      button.addEventListener("click", selectAnswer);
      choicesElement.appendChild(button);
    }}

 // displayer quiz colours in CSS *correct or wrong answers* , adds/removes points.
  function selectAnswer(event) {
    const selectedAnswer = parseInt(event.target.value);
    const currentQuiz = quizData[currentQuestion];
  
    if (selectedAnswer === currentQuiz.correctAnswer) {
      event.target.classList.add("correct");
      score += 20;
    } else {
      event.target.classList.add("wrong");
      score -= 20;
      timeLeft -= 10;
    }
  
    // quiz buttons 
    const buttons = choicesElement.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      setTimeout(showQuestion, 1000); 
    } else {
      endQuiz();
    }}
  
 // timer
  function startTimer() {
    timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
  
    if (timeLeft === 0) {
    clearInterval(timer);
    endQuiz();
    endQuizByTime();
    }}, 1000);
    }


// End the quiz after answers
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    scoreElement.textContent = `Your Score: ${score}`;
    document.getElementById("score-container").style.display = "block";
    document.getElementById("name-container").style.display = "block";
  }

  // End the quiz no time
  function endQuizByTime() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    scoreElement.textContent = "Time's up!";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("name-container").style.display = "block";
  }
  
  // Scoreboard saved to localstorage
  function submitScore() {
    const name = nameInput.value.trim();
    if (name === "") {
      alert("Enter Your Name");
      return;
    }
  
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ name, score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem("quizScores", JSON.stringify(scores));
  
    showScoreboard();
    document.getElementById("name-container").style.display = "none";
  }
  
  function showScoreboard() {
    scoreboardElement.innerHTML = "";
  
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.forEach((score, index) => {
      if (index < 10) {
        const li = document.createElement("li");
        li.textContent = `${score.name}: ${score.score}`;
        scoreboardElement.appendChild(li);
      }
    });
  
    document.getElementById("scoreboard-container").style.display = "block";
  }
  
// end quiz and score board
 document.getElementById("start-btn").addEventListener("click", startQuiz);
 submitScoreBtn.addEventListener("click", submitScore);
 
 showStartPage();

 

