window.addEventListener('DOMContentLoaded', () => { 
  const player = document.querySelector('.player');
  const blocks = document.querySelectorAll('.mini__card');
  const reset = document.querySelector('.game__reset__btn');
  const display = document.querySelector('.displayScreen');
  let currentValue = 'X';
  let isGameActive = true;

  let board = ['', '', '', '', '', '', '', '', '', ];
  const winnerX = 'WinnnerX';
  const winnerO = 'WinnnerO';
  const tie = 'TIE';
  const winningPoints = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningPoints.length; i++) {
      let winPoint = winningPoints[i];
      let a = board[winPoint[0]];
      let b = board[winPoint[1]];
      let c = board[winPoint[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentValue === 'X' ? winnerX : winnerO);
      isGameActive = false;
      return;
    }

    if (!board.includes('')) {
      announce(tie);
    }
  }

  function announce(type) {
    switch (type) {
      case winnerO:
        player.innerHTML = `Player <span class="playerO">O</span> Won`;
        break;
      case winnerX:
        player.innerHTML = `Player <span class="playerX">X</span> Won`;
        break;
      case tie:
        player.innerText = 'TIE';
        player.style.fontSize = '2rem';
    }
    player.classList.remove('hide');
  }

  function isValidAction(eachBox) {
    if (eachBox.innerText === 'X' || eachBox.innerText === 'O') {
      return false;
    }

    return true;
  }

  function updateBoard(index) {
    board[index] = currentValue;
  }

  function changePlayer() {
    display.classList.remove(`player${currentValue}`);
    currentValue = currentValue === 'X' ? 'O' : 'X';
    display.innerText = currentValue;
    display.classList.add(`player${currentValue}`);
  }

  const userAction = (eachBox, index) => {
    if (isValidAction(eachBox) && isGameActive) {
      eachBox.innerText = currentValue;
      eachBox.classList.add(`player${currentValue}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  }

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    player.classList.add('hide');

    if (currentValue === 'O') {
      changePlayer();
    }

    blocks.forEach(eachBox => {
      eachBox.innerText = '';
      eachBox.classList.remove('playerX');
      eachBox.classList.remove('playerO');
    });
  }

  blocks.forEach((eachBox, index) => {
    eachBox.addEventListener('click', () => userAction(eachBox, index));
  })

  reset.addEventListener('click', resetBoard);
});
