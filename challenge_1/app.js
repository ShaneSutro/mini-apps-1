document.addEventListener("DOMContentLoaded", function () {
  var model = {
    currentTurn: 'X',
    winner: ''
  }

  var view = {
    placePiece: (className) => {
      target = document.querySelector('.' + className)
      target.innerText = `[${model.currentTurn}]`
      target.classList.add('occupied')
    },

    switchTurnIndicator: () => {
      document.querySelector('.whose-turn').innerText = `It's ${model.currentTurn}'s turn!`;
    },

    declareWinner: (winner) => {
      // alert(`${winner} wins!!`)
      document.getElementById('board').removeEventListener('click', controller.selectLocation, true)
      board.removeEventListener("click", controller.selectLocation);
      document.querySelector('.whose-turn').innerText = `${winner} wins!`;
    },

    declareDraw: () => {
      // alert('It\'s a draw!')
      document.querySelector('.whose-turn').innerText = 'Oh man, it\'s a draw!';
    }
  }

  var controller = {
    selectLocation: (e) => {
      selectedLocationClass = e.path[0].classList[0];
      if (controller.isValidMove(e)) {
        view.placePiece(selectedLocationClass);
        controller.switchTurn();
      } else {
        alert('Select an unoccupied location or start a new game!');
      }
      controller.checkForWinner();
    },

    switchTurn: () => {
      model.currentTurn === 'X'
        ? model.currentTurn = 'O'
        : model.currentTurn = 'X'
      view.switchTurnIndicator();
    },

    isValidMove: (e) => {
      allClasses = e.path[0].classList;
      if (allClasses.length > 1 || e.target.children.length > 0) {
        return false
      } else {
        return true
      }
    },

    checkForWinner: () => {
      boardRows = document.querySelector('#board').children;
      if (controller.checkWinningRow(boardRows) || controller.checkWinningColumn(boardRows) || controller.checkWinningDiag(boardRows)) {
        view.declareWinner(model.winner)
      } else if (controller.isADraw(boardRows)) {
        view.declareDraw();
      }


    },

    checkWinningRow: (boardRows) => {
      for (var i = 0; i < boardRows.length; i++) {
        var x = 0;
        var o = 0;
        for (var j = 0; j < boardRows[i].children.length; j++) {
          var spaceText = boardRows[i].children[j].innerText;
          if (spaceText === '[X]') {
            x++
          } else if (spaceText === '[O]') {
            o++
          }
        }
        if (x === 3) {
          model.winner = 'X'
          return true;
        } else if (o === 3) {
          model.winner = 'O'
          return true;
        }
      }
      return false;
    },

    checkWinningColumn: (boardRows) => {
      for (var i = 0; i < boardRows.length; i++) {
        var x = 0;
        var o = 0;
        for (var j = 0; j < boardRows[i].children.length; j++) {
          var spaceText = boardRows[j].children[i].innerText;
          if (spaceText === '[X]') {
            x++
          } else if (spaceText === '[O]') {
            o++
          }
        }
        if (x === 3) {
          model.winner = 'X'
          return true;
        } else if (o === 3) {
          model.winner = 'O'
          return true;
        }
      }
      return false;
    },

    checkWinningDiag: (boardRows) => {
      var x = 0;
      var x2 = 0;
      var o = 0;
      var o2 = 0;
      var j = 2;
      for (var i = 0; i < boardRows.length; i++) {
        var spaceText = boardRows[i].children[i].innerText
        var oppositeAxisText = boardRows[i].children[j].innerText
        console.log('Row at ', i, spaceText)
        if (spaceText === '[X]') {
          x++;
        } else if (spaceText === '[O]') {
          o++;
        }
        if (oppositeAxisText === '[X]') {
          x2++;
        } else if (oppositeAxisText === '[O]') {
          o2++;
        }
        j--;
      }
      if (x === 3 || x2 === 3) {
        model.winner = 'X'
        return true;
      } else if (o === 3 || o2 === 3) {
        model.winner = 'O'
        return true;
      }
      return false
    },

    isADraw: (boardRows) => {
      occupiedSquares = 0;
      for (var i = 0; i < boardRows.length; i++) {
        for (var j = 0; j < boardRows[i].children.length; j++) {
          if (boardRows[i].children[j].innerText !== '[ ]') {
            occupiedSquares++
          }
        }
      }
      return occupiedSquares === 9;
    },

    resetBoard: () => {
      blankBoard = `
      <h1 class='row-0'>
        <span class='_0-0'>[  ]</span> <span class='_0-1'>[  ]</span> <span class='_0-2'>[  ]</span>
      </h1>
      <h1 class='row-1'>
        <span class='_1-0'>[  ]</span> <span class='_1-1'>[  ]</span> <span class='_1-2'>[  ]</span>
      </h1>
      <h1 class='row-2'>
        <span class='_2-0'>[  ]</span> <span class='_2-1'>[  ]</span> <span class='_2-2'>[  ]</span>
      </h1>`
      board = document.getElementById('board')
      board.innerHTML = blankBoard;
      board.addEventListener("click", controller.selectLocation);
      document.querySelector('.whose-turn').innerText = `X starts`;
    }
  };

  board = document.querySelector("#board");
  board.addEventListener("click", controller.selectLocation);
  document.querySelector('button').addEventListener('click', controller.resetBoard)
});
