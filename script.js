'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let gameOver = false;
const switch_player = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const reset = function () {
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  gameOver = false;
  current0El.textContent = 0;
  current1El.textContent = 0;
};
const hold = function () {
  if (!gameOver) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. check if current player's score >=100
    if (scores[activePlayer] >= 25) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
      gameOver = true;

      document.getElementById(`current--${activePlayer}`).textContent = '🏆';
      document.getElementById(`score--${activePlayer}`).textContent = `You Win`;
      // finish game
    }
    // switch the player
    else {
      switch_player();
    }
  }
};
const add = function () {
  if (!gameOver) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   diceEl.setAttribute('src', `dice-${dice}.png`);

    // 3. check for roll 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch player
      switch_player();
    }
  }
};
//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

//hide dice
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Roll Dice functionality
btnRoll.addEventListener('click', add);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', reset);
