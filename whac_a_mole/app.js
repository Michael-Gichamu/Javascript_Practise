const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const restart = document.querySelector('.restart-button');
const stop = document.querySelector('.stop-button');

let result = 0;
let hitPosition;
let currentTime = 20;
let timerId;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition && square.classList.contains('mole')) {
      result++;
      score.textContent = result
      hitPosition = null;
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result)
  }
}

let countDownTimerId = setInterval(countDown, 1000);

function restartGame() {
  restart.addEventListener('click', () => {
    currentTime = 20;
    result = 0;
    score.textContent = result;
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    moveMole(); // You might want to restart the mole movement.
    countDownTimerId = setInterval(countDown, 1000);
  });
}
restartGame();

let continueButton;
let exitButton;

function stopGame() {
  stop.addEventListener('click', () => {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    continueGame();
    exitGame();
  });
}
stopGame();

function continueGame() {
  continueButton = document.createElement('button');
  continueButton.textContent = 'Continue';
  continueButton.classList.add('continue-button');
  document.body.appendChild(continueButton);
  continueButton.addEventListener('click', () => {
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
    continueButton.remove();
    exitButton.remove();
  });
}

function exitGame() {
  exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.classList.add('exit-button');
  exitButton.classList.add('left');
  document.body.appendChild(exitButton);
  exitButton.addEventListener('click', () => {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME EXIT! Your final score is ' + result);
    currentTime = 20;
    result = 0;
    score.textContent = result;
    timeLeft.textContent = currentTime;
    continueButton.remove();
    exitButton.remove();
  });
}