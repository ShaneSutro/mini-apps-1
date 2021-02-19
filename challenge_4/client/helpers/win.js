var detectWins = (board) => {
  var rowWins = hasAnyRowWins(board)
  var colWins = hasAnyColWins(board)
  var diagWins = hasAnyDiagWins(board)

  if (rowWins > 0) {
    return rowWins;
  } else if (colWins > 0) {
    return colWins;
  } else if (diagWins > 0) {
    return diagWins;
  } else if (boardIsFull(board)) {
    return 3;
  } else {
    return 0;
  }

}

var hasAnyRowWins = (board) => {
  streak = 0;
  current = 0;
  for (var i = 0; i < board.length; i++) {
    streak = 0;
    for (var j = 0; j < board[i].length; j++) {
      currentCell = board[i][j]
      if (currentCell === 0) {
        streak = 1;
        current = 0;
        continue;
      }
      if (currentCell === current) {
        streak++
        if (streak === 4) {
          return current;
        }
      } else if (currentCell !== current) {
        streak = 1
        current = currentCell
      }
    }
  }
  return 0;
}

var hasAnyColWins = (board) => {
  streak = 0;
  current = 0;
  for (var col = 0; col < 7; col++) {
    streak = 0;
    for (var row = 0; row < 6; row++) {
      currentCell = board[row][col]
      if (currentCell === 0) {
        streak = 1;
        current = 0;
        continue;
      }
      if (currentCell === current) {
        streak++
        if (streak === 4) {
          return current;
        }
      } else if (currentCell !== current) {
        streak = 1
        current = currentCell
      }
    }
  }
  return 0;
}

var hasAnyDiagWins = (board) => {
  current = 0;
  for (var row = 5; row >= 0; row--) {
    for (var col = 0; col < 7; col++) {
      currentCell = board[row][col]
      if (currentCell === 0) {
        streak = 1;
        current = 0;
        continue
      }
      if (board[row - 1] && board[row - 1][col - 1] && board[row - 1][col - 1] === currentCell) {
        var isWin = recurseLeft(board, row - 1, col - 1, currentCell, 1)
        if (isWin) {
          return currentCell
        }
      }
      if (board[row - 1] && board[row - 1][col + 1] && board[row - 1][col + 1] === currentCell) {
        var isWin = recurseRight(board, row - 1, col + 1, currentCell, 1)
        if (isWin) {
          return currentCell
        }
      }
    }
  }
  return 0;
}

var recurseLeft = (board, row, col, player, streak) => {
  if ((row < 0 || col < 0) && streak < 3) {
    return false
  }
  if (streak === 3) {
    return true;
  }
  if (board[row - 1] && board[row - 1][col - 1] && board[row - 1][col - 1] === player) {
    return recurseLeft(board, row - 1, col - 1, player, streak + 1)
  } else {
    return false;
  }
}

var recurseRight = (board, row, col, player, streak) => {
  if ((row < 0 || col < 0) && streak < 3) {
    return false
  }
  if (streak === 3) {
    return true;
  }
  if (board[row - 1] && board[row-1][col + 1] && board[row - 1][col + 1] === player) {
    return recurseRight(board, row - 1, col + 1, player, streak + 1)
  } else {
    return false;
  }
}

var boardIsFull = (board) => {
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
}

module.exports.detectWins = detectWins;
module.exports.hasAnyRowWins = hasAnyRowWins;
module.exports.hasAnyColWins = hasAnyColWins;
module.exports.hasAnyDiagWins = hasAnyDiagWins;