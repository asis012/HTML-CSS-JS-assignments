class Sudoku {
  constructor() {
    (async () => {
      let container = document.getElementById('app');

      let div = document.createElement('app');
      container.appendChild(div);

      let table = document.createElement('table');
      div.appendChild(table);

      let board = await getRandomBoardNumbers();

      for (var a = 0; a < 9; a++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var b = 0; b < 9; b++) {
          var td = document.createElement('td');
          var input = document.createElement('input');
          if (board[a][b] === 0) {
            input.setAttribute('value', '');
          } else {
            input.setAttribute('value', board[a][b]);
          }
          input.setAttribute('data-a', a);
          input.setAttribute('data-b', b);
          board[a][b] = input.value;
          tr.appendChild(td);
          td.appendChild(input);
        }
      }

      let inputs = table.querySelectorAll('input');

      var solvee = document.createElement('button');
      solvee.id = 'Solve';
      solvee.innerHTML = 'Solve';
      solvee.style.width = '40px';
      solvee.style.height = '20px';
      div.appendChild(solvee);
      solvee.addEventListener('click', () => solveSudoku(inputs));

      var randomSample = document.createElement('button');
      randomSample.id = 'radomSampleButton';
      randomSample.innerHTML = 'Random Sample';
      randomSample.style.width = '105px';
      randomSample.style.height = '20px';
      randomSample.setAttribute('placeholder', 'solve');
      div.appendChild(randomSample);
      var copy;
      randomSample.addEventListener('click', () => coloredRandomBoard(inputs));

      var playMySelf = document.createElement('button');
      playMySelf.innerHTML = 'Play';
      playMySelf.style.width = '40px';
      playMySelf.style.height = '20px';
      div.appendChild(playMySelf);

      playMySelf.onclick = function() {
        randomSample.style.display = 'none';
        solvee.style.display = 'none';
        playMySelf.style.display = 'none';
        var hint = document.createElement('button');
        hint.innerHTML = 'Hint';
        hint.style.width = '40px';
        hint.style.height = '20px';
        div.appendChild(hint);

        var check = document.createElement('button');
        check.innerHTML = 'Check';
        check.style.width = '42px';
        check.style.height = '20px';
        div.appendChild(check);

        hint.onclick = function() {
          console.log('ok');
        };
      };

      await coloredRandomBoard(inputs);
    })();
  }
}

function getRandomBoardNumbers() {
  var random = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  for (i = 0; i < 9; i++) {
    var ran = getRandomIntBetween(1, 9);
    for (j = 0; j < 9; j++) {
      if (random[i][j] != ran) {
        random[i][i + i] = ran;
      }
    }
  }
  return random;
}

function colorValue(board, inputs) {
  k = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        inputs[k].setAttribute('style', 'color:green;');
      } else {
        inputs[k].setAttribute('style', 'color:black;');
      }
      k++;
    }
  }
}

function colorError(checks, inputs) {
  checks.forEach(check => {
    k = 0;
    for (row = 0; row < 9; row++) {
      for (col = 0; col < 9; col++) {
        if (check.i === row && check.j == col) {
          inputs[k].setAttribute('style', 'color:red');
        }

        k++;
      }
    }
  });
}

function getCurrentBoard(inputs) {
  let sudokuu = [...Array(9)].map(e => Array(9));
  for (i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    sudokuu[row][col] = parseInt(inputs[i].value || 0);
  }
  console.log(sudokuu)
  //console.log('check', checkValidationBoard(sudokuu));
  let check = checkValidationBoard(sudokuu);
  if (check !== true) {
    colorError(check, inputs);
    // console.log(check,check[0]);
    // inputs[2].setAttribute('style', 'color:red;');
    return false;
  }

  return sudokuu;
}

function checkValidationBoard(sudokuu) {
  // console.log(sudokuu);

  let errors = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuu[i][j] === 0) {
        continue;
      }

      let check = checkCellOnBoard(sudokuu, i, j, sudokuu[i][j]);
      if (!check) {
        // console.log(sudokuu[i][j], sudokuu[i][j] === 0);
        errors.push({ i, j, value: sudokuu[i][j] });
      }
    }
  }

  if (errors.length >= 1) {
    return errors;
  }
  return true;
}

async function solveSudoku(inputs) {
  if (document.querySelector('#radomSampleButton')) {
    document.querySelector('#radomSampleButton').disabled = true;
  }

  let currentBoard = getCurrentBoard(inputs);

  if (currentBoard == false) {
    return;
  }

  await solveDepth(currentBoard, true, inputs);

  if (document.querySelector('#radomSampleButton')) {
    document.querySelector('#radomSampleButton').disabled = false;
  }
  return true;
}

function insertLayout(board, inputs) {
  var k = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      values = board[i][j];
      if (values == 0) {
        inputs[k].setAttribute('value', values);
      }
      inputs[k].setAttribute('value', values);
      k++;
    }
  }
}

async function coloredRandomBoard(inputs) {
  let randomBoard = await randomBoardGenerator(inputs);
  insertLayout(randomBoard, inputs);
  colorValue(randomBoard, inputs);
}

async function randomBoardGenerator(inputs) {
  let solvedRandomBoard;

  let isSolved;
  while (true) {
    solvedRandomBoard = getRandomBoardNumbers();
    isSolved = await solveDepth(solvedRandomBoard, false, inputs);
    if (isSolved !== false && isSolved.solved == true) {
      break;
    }
  }

  for (i = 0; i < 70; i++) {
    var randomRow = Math.floor(Math.random() * 9);
    var randomCol = Math.floor(Math.random() * 9);

    solvedRandomBoard[randomRow][randomCol] = '';
  }
  return solvedRandomBoard;
}

let sudoku = new Sudoku();

//let sudoku2 = new Sudoku();
