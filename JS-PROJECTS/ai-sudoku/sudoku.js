function setValueToCell(solvedSudoku, inputs) {
  if (!inputs) {
    throw 'setValueToCell requires input box';
  }

  let k = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      
      if(solvedSudoku[i][j] === 0 ){
     
        
      }
      else{
      values = solvedSudoku[i][j];
      inputs[k].setAttribute('value', values);
      }
      k++;
    }
  }
}

async function solveDepth(matrix, shouldDelay = false, inputs) {
  if (!inputs) {
    throw 'Input boxes are required';
  }

  let depth = 0;
  let delayed = 0;
  let delayMills = 25;
  let old_time = new Date();

  async function solve(matrix, inputs) {
    let i, j, k;
    depth++;

    if (depth > 5000) {
      return false;
    }

    for (i = 0; i <= 8; i++) {
      for (j = 0; j <= 8; j++) {
        if (matrix[i][j] == '0') {
          for (k = 1; k <= 9; k++) {
            if (sudokucheckCellOnBoard(matrix, i, j, k)) {
              matrix[i][j] = k;
              if (shouldDelay == true) {
                delayed = delayed + 1;
                await new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                  }, delayMills);
                });
              }
              setValueToCell(matrix, inputs);

              if (depth > 5000) {
                return false;
              }

              isSolved = await solve(matrix, inputs);

              if (isSolved !== false && isSolved.solved == true) {
                return isSolved;
              }

              matrix[i][j] = 0;
            }
          }

          return false;
        }
      }
    }
    var new_time = new Date();
    var millis_passed = new_time - old_time - delayMills * delayed;
    depth = 0;

    return { solved: true, millis_passed, delayed: delayMills * delayed };
  }
  return solve(matrix, inputs);
}

function sudokucheckCellOnBoard(arr, row, col, number) {
  if (number === 0) {
    return true;
  }
  return (
    sudokuvalidRow(arr, row, number) &&
    sudokuvalidColumn(arr, col, number) &&
    sudokuvalidGrid(arr, row - (row % 3), col - (col % 3), number)
  );
}

function sudokuvalidRow(arr, row, number) {
  for (let i = 0; i < 9; i++) {
    if (arr[row][i] == number) return false;
  }
  return true;
}

function sudokuvalidColumn(arr, col, number) {
  for (let j = 0; j < 9; j++) {
    if (arr[j][col] == number) return false;
  }
  return true;
}

function sudokuvalidGrid(arr, row, col, number) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[i + row][j + col] == number) {
        return false;
      }
    }
  }
  return true;
}
