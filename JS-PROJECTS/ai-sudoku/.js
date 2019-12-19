function validCheck(arraySolution) {
  for (var row = 0; row < 9; ++row) {
    for (var col = 0; col < 9; col++) {
      var value = arraySolution[row][col];
      if (arraySolution[row][col] == 0) {
        return false;
      }
      if (value) {
        // Check the line
        for (var col2 = 0; col2 < 9; col2++) {
          if (col2 != col && arraySolution[row][col2] == value) {
            return false;
          }
        }

        // Check the column
        for (var row2 = 0; row2 < 9; row2++) {
          if (row2 != row && arraySolution[row2][col] == value) {
            return false;
          }
        }

        // Check the square
        var startY = Math.floor(row / 3) * 3;
        for (var row2 = startY; row2 < startY + 3; row2++) {
          var startX = Math.floor(col / 3) * 3;
          for (col2 = startX; col2 < startX + 3; col2++) {
            if (
              (col2 != col || row2 != row) &&
              arraySolution[row2][col2] == value
            ) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }
}
