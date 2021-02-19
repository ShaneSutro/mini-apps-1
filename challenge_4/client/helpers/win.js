var detectWins = (board) => {
  return hasAnyRowWins(board) + hasAnyColWins(board) + hasAnyDiagWins(board)
}

var hasAnyRowWins = (board) => {
  streak = 0;
  current = 0;
  for (var i = 0; i < board.length; i++) {
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
  //code
}

module.exports.detectWins = detectWins;
module.exports.hasAnyRowWins = hasAnyRowWins;
module.exports.hasAnyColWins = hasAnyColWins;
module.exports.hasAnyDiagWins = hasAnyDiagWins;