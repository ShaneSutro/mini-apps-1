document.addEventListener("DOMContentLoaded", function () {
  var model = {
    currentTurn: 'X',
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
      alert(`${winner} wins!!`)
    }
  }

  var controller = {
    selectLocation: (e) => {
      selectedLocationClass = e.path[0].classList[0];
      if (controller.isValidMove(e)) {
        view.placePiece(selectedLocationClass);
        controller.switchTurn();
      } else {
        alert('Select an unoccupied location!');
      }
      controller.checkWinningRow();
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

    checkWinningRow: () => {
      boardRows = document.querySelector('#board').children;
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
          view.declareWinner('X')
        } else if (o === 3) {
          view.declareWinner('O')
        }
      }
    },

    checkWinningColumn: () => {

    },

    checkWinningDiag: () => {

    },

    checkTie: () => {

    },


  };

  board = document.querySelector("#board");
  board.addEventListener("click", controller.selectLocation);
});
