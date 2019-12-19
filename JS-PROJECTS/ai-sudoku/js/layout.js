class Sudoku {
  constructor() {
    (async function() {
      let container = document.getElementById('app');

      let div = document.createElement('app');
      container.appendChild(div);

      let table = document.createElement('table');
      div.appendChild(table);

      //this will generate random number so that for each time we will get random sudoku examples
      let board = await getRandomBoardNumbers();

      //this will make 9*9 grid for sudoku
      for (var row = 0; row < 9; row++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var col = 0; col < 9; col++) {
          var td = document.createElement('td');
          var input = document.createElement('input');
          input.setAttribute('type', 'number');
          input.setAttribute('min', 1);
          input.setAttribute('class', 'input-box');

          input.addEventListener('input', function(e) {
            // input.style.bacolor =

            // input.style.backgroundColor = 'lightgrey'
            if (e.target.value > 9) {
              e.target.value = e.target.defaultValue;
            }
            if (e.target.value == 0) {
              e.target.value = '';
            }
          });

          input.max = '9';
          board[row][col] = input.value;
          tr.appendChild(td);
          td.appendChild(input);
          input.setAttribute('maxLength', '10');
        }
      }

      let inputs = table.querySelectorAll('input');

      var solvee = document.createElement('button');
      solvee.id = 'Solve';
      solvee.innerHTML = 'Solve';
      solvee.style.marginLeft = '40%';
      solvee.style.width = '70px';
      solvee.style.height = '30px';
      div.appendChild(solvee);
      solvee.onclick = function() {
        solveSudoku(inputs);
      };
      var randomSample = document.createElement('button');
      randomSample.id = 'radomSampleButton';
      randomSample.innerHTML = 'Random Sample';
      randomSample.style.width = '205px';
      randomSample.style.height = '30px';
      randomSample.setAttribute('placeholder', 'solve');
      div.appendChild(randomSample);
      randomSample.onclick = function() {
        coloredRandomBoard(inputs);
      };

      //playmyself button such that user will play themself
      var playMySelf = document.createElement('button');
      playMySelf.innerHTML = 'Play';
      playMySelf.id = 'playButton';
      playMySelf.style.width = '60px';
      playMySelf.style.height = '30px';
      div.appendChild(playMySelf);

      var solvedTime = document.createElement('H1');
      solvedTime.id = 'solvedTimeValue';
      solvedTime.style.marginLeft = '40%';
      div.appendChild(solvedTime);

      playMySelf.onclick = function() {
        randomSample.style.display = 'none';
        solvee.style.display = 'none';
        playMySelf.style.display = 'none';
        solvedTime.style.display = 'none';
        for (i = 0; i < 81; i++) {
          // inputs[i].setAttribute('style', 'color:black ');
        }

        //hint button such that user will get hint as required
        var hint = document.createElement('button');
        hint.innerHTML = 'Hint';
        hint.id = 'hint';
        hint.style.marginLeft = '45%';
        hint.style.width = '70px';
        hint.style.height = '30px';
        div.appendChild(hint);

        //check button suchthat whether the problem is solved or not
        var check = document.createElement('button');
        check.id = 'checkButton';

        check.innerHTML = 'Check';
        check.style.width = '70px';
        check.style.height = '30px';
        div.appendChild(check);
        if (document.querySelector('#checkButton')) {
          document.querySelector('#checkButton').disabled = true;
        }

        let timer = document.createElement('H1');
        timer.id = 'timer';
        timer.style.marginLeft = '45%';
        timer.style.display = 'inline';
        timer.innerHTML = '';
        div.appendChild(timer);

        let hintText = document.createElement('H1');
        hintText.id = 'hintText';

        hintText.style.display = 'inline';
        hintText.style.marginLeft = '4%';

        hintText.innerHTML = 'Hint: ' + '5';
        div.appendChild(hintText);

        let validCheckText = document.createElement('H1');
        validCheckText.id = 'validCheckText';
        validCheckText.style.marginLeft = '40%';
        validCheckText.innerHTML = '';
        div.appendChild(validCheckText);

        var timeCounter = 0;

        var initialTime = new Date();

        //time function for stopwatch
        updateTimer();
        function updateTimer() {
          if (new Date() - initialTime >= 0) {
            timer.innerHTML = 'Time :' + timeCounter++;
            setTimeout(updateTimer, 1000);
          }
        }

        //hint generation function
        var hintValue = 5;
        hint.onclick = async function() {
          if (hintValue == 1) {
            document.querySelector('#hint').disabled = true;
            hintText.style.display = 'none';
          }
          //let sudokuu = Array(9).fill(Array(9))
          let sudokuu = [...Array(9)].map(e => Array(9));
          let row;
          let col;
          let empty = [];
          for (i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;

            inputs[i].style.color = 'black';
            sudokuu[row][col] = parseInt(inputs[i].value || 0);
            if (sudokuu[row][col] == 0) {
              empty.push(i);
            }
          }
          if (empty.length == 1) {
            if (document.querySelector('#checkButton')) {
              document.querySelector('#checkButton').disabled = false;
            }
          }

          await solveDepth(sudokuu, false, inputs, true);
          let randomHint;

          for (i = 0; i < 81; i++) {
            if (i in empty) {
              randomHint = getRandomIntBetween(1, empty.length - 1);

              break;
            }
          }

          let randomnumber;
          randomnumber = empty[randomHint];
          let check = checkValidationBoard(sudokuu);

          if (check === true) {
            if (sudokuu[Math.floor(randomnumber / 9)][randomnumber % 9] != 0) {
              inputs[randomnumber].value =
                sudokuu[Math.floor(randomnumber / 9)][randomnumber % 9];

              inputs[randomnumber].setAttribute(
                'style',
                'background-color : yellow;'
              );
              hintValue = hintValue - 1;
              hintText.innerHTML = 'Hint: ' + hintValue;

              empty.slice(randomHint, 1);
              return;
            }
          } else {
            colorError(check, inputs);
            return;
          }

          sudokuu[Math.floor(randomnumber / 9)][randomnumber % 9];
        };

        check.onclick = async function() {
          let sudokuu = [...Array(9)].map(e => Array(9));
          let row;
          let col;

          for (i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;

            sudokuu[row][col] = parseInt(inputs[i].value || 0);
          }

          let validation = validCheck(sudokuu);

          if (validation) {
            timer.style.display = 'none';
            validCheckText.innerHTML =
              'Cogratulations, Solved Sudoku in' + timeCounter + 'seconds';
            setTimeout(function() {
              window.location.reload(true);
            }, 5000);
          } else {
            validCheckText.innerHTML = 'Take time and solve your sudoku';
            let check = checkValidationBoard(sudokuu);
            if (check !== true) {
              colorError(check, inputs);
              return;
            }
          }
        };
      };

      await coloredRandomBoard(inputs);
    })();
  }
}

//generate random number each time
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
  for (row = 0; row < 9; row++) {
    var ran = getRandomIntBetween(1, 9);
    for (col = 0; col < 9; col++) {
      if (random[row][col] != ran) {
        random[row][row + row] = ran;
      }
    }
  }
  return random;
}

//color values in grid which are not zero
function colorValue(board, inputs) {
  k = 0;
  for (row = 0; row < 9; row++) {
    for (col = 0; col < 9; col++) {
      if (board[row][col] != 0) {
        inputs[k].setAttribute('style', 'background-color : lightgrey;');
      } else {
        inputs[k].setAttribute('style', 'color:black;');
      }
      k++;
    }
  }
}

//display error if user insert wrong number
function colorError(checks, inputs) {
  checks.forEach(function(check) {
    let k = 0;
    for (row = 0; row < 9; row++) {
      for (col = 0; col < 9; col++) {
        if (check.row === row && check.col == col) {
          // inputs[k].setAttribute('style', 'color:red;');
          inputs[k].style.color = 'red';
        }
        k++;
      }
    }
  });
}

//get current board number in sudoku matrix
function getCurrentBoard(inputs) {
  //let sudokuu = Array(9).fill(Array(9))
  let sudokuu = [...Array(9)].map(e => Array(9));
  for (i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    sudokuu[row][col] = parseInt(inputs[i].value || 0);
  }

  let check = checkValidationBoard(sudokuu);
  if (check !== true) {
    colorError(check, inputs);
    return false;
  }
  return sudokuu;
}

function checkValidationBoard(sudokuu) {
  let errors = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (sudokuu[row][col] === 0) {
        continue;
      }

      let check = checkCellOnBoard(sudokuu, row, col, sudokuu[row][col]);
      if (!check) {
        errors.push({ row, col, value: sudokuu[row][col] });
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
  if (document.querySelector('#Solve')) {
    document.querySelector('#Solve').disabled = true;
  }
  if (document.querySelector('#playButton')) {
    document.querySelector('#playButton').disabled = true;
  }

  let currentBoard = getCurrentBoard(inputs);

  if (currentBoard == false) {
    return;
  }

  let result = await solveDepth(currentBoard, true, inputs);

  if (document.querySelector('#radomSampleButton')) {
    document.querySelector('#radomSampleButton').disabled = false;
  }
  if (document.querySelector('#Solve')) {
    document.querySelector('#Solve').disabled = false;
  }
  document.querySelector('#solvedTimeValue').innerHTML =
    'Time to complete Sudoku: ' + result.millis_passed + ' milli seconds';
  return true;
}

function insertLayout(board, inputs) {
  var k = 0;
  for (row = 0; row < 9; row++) {
    for (col = 0; col < 9; col++) {
      values = board[row][col];

      if (values == 0) {
        inputs[k].value = values;
        //inputs[k].setAttribute('value', values);
      }
      inputs[k].setAttribute('value', values);
      k++;
    }
  }
}

async function coloredRandomBoard(inputs) {
  if (document.querySelector('#playButton')) {
    document.querySelector('#playButton').disabled = false;
  }
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
