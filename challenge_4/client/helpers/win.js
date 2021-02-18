var detectWins = (board) => {
  return hasAnyRowWins(board) + hasAnyColWins(board) + hasAnyDiagWins(board)
}

var hasAnyRowWins = (board) => {
  streak = 0;
  current = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      currentCell = board[i][j]
      if (currentCell === current) {
        streak++
      } else if (currentCell !== current) {
        streak = 0
      }
    }
  }
}

var hasAnyColWins = (board) => {
  //code
}

var hasAnyDiagWins = (board) => {
  //code
}

module.exports.detectWins = detectWins;