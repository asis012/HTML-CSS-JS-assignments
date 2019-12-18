function getRandomIntBetween(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function checkCellOnBoard(arr, row, col) {
  return (
    validRow(arr, row, col) &&
    validColumn(arr, row, col) &&
    validGrid(arr, row, col)
  );
}

function validRow(arr, row, col) {
  let value = arr[row][col];
  for (let i = 0; i < 9; i++) {
    if (col === i || arr[row][i] === 0) {
      continue;
    }
    if (arr[row][i] === value) {
      return false;
    }
  }
  return true;
}

function validColumn(arr, row, col) {
  let value = arr[row][col];
  for (let i = 0; i < 9; i++) {
    if (row === i || arr[i][col] === 0) {
      continue;
    }
    if (arr[i][col] === value) {
      return false;
    }
  }
  return true;
}

function validGrid(arr, row, col) {
  let value = arr[row][col];

  let normalizedRow = row - (row % 3);
  let normalizedCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        (normalizedRow + i === row && normalizedCol + j === col) ||
        arr[row][col] === 0
      ) {
        continue;
      }

      if (arr[normalizedRow + i][normalizedCol + j] === value) {
        return false;
      }
    }
  }
  return true;
}



function validCheck(arraySolution){
  for (var y = 0; y < 9; ++y) {
      for (var x = 0; x < 9; ++x) {
          var value = arraySolution[y][x];
          if(arraySolution[y][x]==0){
            return false
          }
          if (value) {
              // Check the line
              for (var x2 = 0; x2 < 9; ++x2) {
                  if (x2 != x && arraySolution[y][x2] == value) {
                      return false;
                  } 
              }

              // Check the column
              for (var y2 = 0; y2 < 9; ++y2) {
                  if (y2 != y && arraySolution[y2][x] == value) {
                      return false;
                  } 
              }

              // Check the square
              var startY = Math.floor(y/3)*3;
              for (var y2 = startY; y2 < startY + 3; ++y2) {
                  var startX = Math.floor(x/3)*3;
                  for (x2 = startX; x2 < startX + 3; ++x2) {
                      if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
                          return false;
                      }
                  }
              }
          }
      }
  

  return true;
}
}