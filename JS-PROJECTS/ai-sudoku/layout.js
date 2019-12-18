class Sudoku {
  constructor() {
    (async () => {
      let container = document.getElementById('app');

      let div = document.createElement('app');
      container.appendChild(div);

      let table = document.createElement('table');
      div.appendChild(table);

      //this will generate random number so that for each time we will get random sudoku examples
      let board = await getRandomBoardNumbers();


      //this will make 9*9 grid for sudoku
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
      
      //solve button to solve soduku
      var solvee = document.createElement('button');
      solvee.id = 'Solve';
      solvee.innerHTML = 'Solve';
      solvee.style.width = '40px';
      solvee.style.height = '20px';
      div.appendChild(solvee);
      solvee.addEventListener('click', () => solveSudoku(inputs)
      );

      //randomsample buttion to generate random sudoku 
      var randomSample = document.createElement('button');
      randomSample.id = 'radomSampleButton';
      randomSample.innerHTML = 'Random Sample';
      randomSample.style.width = '105px';
      randomSample.style.height = '20px';
      randomSample.setAttribute('placeholder', 'solve');
      div.appendChild(randomSample);
      randomSample.addEventListener('click', () => coloredRandomBoard(inputs));

      //playmyself button such that user will play themself
      var playMySelf = document.createElement('button');
      playMySelf.innerHTML = 'Play';
      playMySelf.id = 'playButton';
      playMySelf.style.width = '40px';
      playMySelf.style.height = '20px';
      div.appendChild(playMySelf);


      
      var solvedTime = document.createElement('H1')
      solvedTime.id = "solvedTimeValue"
      div.appendChild(solvedTime)
  


      playMySelf.onclick = function() {
        randomSample.style.display = 'none';
        solvee.style.display = 'none';
        playMySelf.style.display = 'none';
        solvedTime.style.display = 'none';
        //console.log(solvedTime)

        //hint button such that user will get hint as required
        var hint = document.createElement('button');
        hint.innerHTML = 'Hint';
        hint.style.width = '40px';
        hint.style.height = '20px';
        div.appendChild(hint);

        //check button suchthat whether the problem is solved or not
        var check = document.createElement('button');
        check.innerHTML = 'Check';
        check.style.width = '42px';
        check.style.height = '20px';
        div.appendChild(check);

        let timer = document.createElement('H1');
        timer.id = 'timer';
        div.appendChild(timer);

        let validCheckText = document.createElement('H1');
        validCheckText.id = 'validCheckText';
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
        hint.onclick = async function() {
          let sudokuu = [...Array(9)].map(e => Array(9));
          let row;
          let col;
          let empty = [];
          for (i = 0; i < 81; i++) {
            row = Math.floor(i / 9);
            col = i % 9;

            sudokuu[row][col] = parseInt(inputs[i].value || 0);
            if (sudokuu[row][col] === 0) {

              empty.push(i);
            }
          }
          
          await solveDepth(sudokuu, false, inputs, true);

          let randomHint;
          
          for (i = 0; i < 81; i++) {
            if (i in empty) {
              
              randomHint = getRandomIntBetween(0,(empty.length-1))
              
              break;
            }
          }
          
          let randomnumber
          randomnumber = empty[randomHint]
          inputs[randomnumber].setAttribute(
            'value',
            sudokuu[Math.floor(randomnumber / 9)][randomnumber % 9]
          );
          inputs[randomnumber].setAttribute(
            'style',
            'background-color : yellow;'
          );
          empty.slice(randomHint,1)

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

          let validation = validCheck(sudokuu)
          console.log(validCheck(sudokuu))
          if(validation){
            timer.style.display = 'none'
            validCheckText.innerHTML = "Cogratulations, Solved Sudoku in" + timeCounter + " mili seconds"
          }
          else{
            validCheckText.innerHTML = "Take time and solve your sudoku"
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

//color values in grid which are not zero
function colorValue(board, inputs) {
  k = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
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

//get current board number in sudoku matrix
function getCurrentBoard(inputs) {
  let sudokuu = [...Array(9)].map(e => Array(9));
  for (i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;
    sudokuu[row][col] = parseInt(inputs[i].value || 0);
  }
 
  //
  let check = checkValidationBoard(sudokuu);
  if (check !== true) {
    colorError(check, inputs);
    return false;
  }

  return sudokuu;
}

function checkValidationBoard(sudokuu) {

  let errors = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuu[i][j] === 0) {
        continue;
      }

      let check = checkCellOnBoard(sudokuu, i, j, sudokuu[i][j]);
      if (!check) {
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
  if (document.querySelector('#playButton')) {
    document.querySelector('#playButton').disabled = true;
  }

  let currentBoard = getCurrentBoard(inputs);
  //console.log(currentBoard)

  if (currentBoard == false) {
    return;
  }

  let result= await solveDepth(currentBoard, true, inputs);
  
  //console.log(result.millis_passed)
  if (document.querySelector('#radomSampleButton')) {
    document.querySelector('#radomSampleButton').disabled = false;
  }
  if (document.querySelector('#playButton')) {
    document.querySelector('#playButton').disabled = false;
  }
  document.querySelector('#solvedTimeValue').innerHTML = "Time to complete Sudoku:" + result.millis_passed + 'milli seconds'
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
  //console.log(solvedRandomBoard)
  return solvedRandomBoard;
}

let sudoku = new Sudoku();

//let sudoku2 = new Sudoku();
