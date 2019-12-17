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
