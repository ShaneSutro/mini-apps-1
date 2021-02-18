var drop = (board, target, turn) => {
  //Target = [col, row]
  var newBoard = board.slice();
  var newCoords = getDroppedLocation(board, target)
  var newCol = newCoords[0]
  var newRow = newCoords[1]
  newBoard[newRow].splice(newCol, 1, turn)
  console.log('modified board:', newBoard)
  return newBoard
}

var getDroppedLocation = (board, target) => {
  var col = target[0]
  var row = target[1]
  while (row < 4) {
    if (isEmpty(board, col, row + 1)) {
      row++
    } else {
      return [col, row]
    }
  }
  return [col, row]
}

var isEmpty = (board, col, row) => {
  return board[row][col] === 0;
}

module.exports.drop = drop;