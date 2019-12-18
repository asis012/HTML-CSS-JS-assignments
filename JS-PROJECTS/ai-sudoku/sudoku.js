//set value to cell to show bracktraclking and bruteforce
var td = document.querySelectorAll('td')



function setValueToCell(solvedSudoku, inputs) {
  

  
  
  if (!inputs) {
    throw 'setValueToCell requires input box';
  }

  let k = 0;
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      if (solvedSudoku[i][j] === 0) {
      } else {
        values = solvedSudoku[i][j];


        //inputs[k].setRangeText("values")
        
        //console.log(values);
        
       // inputs[k].setAttribute('value','0')
        inputs[k].setAttribute('value', values);
        //inputs[k].attr('value', values);
      }
      k++;
    }
  }
}
//depth is used so that if the number of iteration is more that 5000 we return false and doesnot goes to infinite loop
async function solveDepth(matrix, shouldDelay = false, inputs, ishint = false) {
  if (!inputs) {
    throw 'Input boxes are required';
  }
  //console.log(inputs)

  let depth = 0;
  let delayed = 0;
  let delayMills = 30;
  let old_time = new Date();
  console.log(inputs);
  
  
  //functon to solve sudoku
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
            //check whether K is eligible for insert or not
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

              if (!ishint) {
                setValueToCell(matrix, inputs);
              }

              if (depth > 5000) {
                return false;
              }
              //recursion
              isSolved = await solve(matrix, inputs);

              if (isSolved !== false && isSolved.solved == true) {
                return isSolved;
              }
              //initalize to 0 for false
              matrix[i][j] = 0;
            }
          }

          return false;
        }
      }
    }
    //time reqired for calculation...here we have added delay also so it take more time
    var new_time = new Date();
    var millis_passed = new_time - old_time - delayMills * delayed;
    depth = 0;
    console.log((inputs.values[1] == "0"));
    
    if(inputs.values[1] == ''){
      console.log('ok')
    }
    return { solved: true, millis_passed, delayed: delayMills * delayed };
  }
  return solve(matrix, inputs);
}

//check valid number for board

//here we call there function suchthat one will check for row validation, next for col validation and last one for 3*3 grid validation
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

//row validation such that there isnot same two number in one
function sudokuvalidRow(arr, row, number) {
  for (let i = 0; i < 9; i++) {
    if (arr[row][i] == number) return false;
  }
  return true;
}

//row validation such that there isnot same two number in one row
function sudokuvalidColumn(arr, col, number) {
  for (let j = 0; j < 9; j++) {
    if (arr[j][col] == number) return false;
  }
  return true;
}

//row validation such that there isnot same two number in one row
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
