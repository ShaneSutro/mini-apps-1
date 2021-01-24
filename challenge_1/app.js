document.addEventListener("DOMContentLoaded", function () {
  var model = {
    currentTurn: 'X',
  }

  var view = {
    placePiece: (className) => {
      target = document.querySelector('.' + className)
      target.innerText = `[${model.currentTurn}]`
      target.classList.add('occupied')
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
    },

    switchTurn: () => {
      model.currentTurn === 'X'
        ? model.currentTurn = 'O'
        : model.currentTurn = 'X'
      document.querySelector('.whose-turn').innerText = `It's ${model.currentTurn}'s turn!`;
    },

    isValidMove: (e) => {
      allClasses = e.path[0].classList;
      if (allClasses.length > 1 || e.target.children.length > 0) {
        return false
      } else {
        return true
      }
    },


  };

  board = document.querySelector("#board");
  board.addEventListener("click", controller.selectLocation);
});
