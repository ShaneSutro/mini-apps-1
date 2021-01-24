// var model = {

// }

// var view = {

// }

// var controller = {

// }

document.addEventListener("DOMContentLoaded", function () {
  board = document.querySelector("#board");
  board.addEventListener('click', (e) => {
    targetClass = e.path[0].className;
    targetSpan = document.querySelector('.' + targetClass)
    targetSpan.innerText = '[X]';
  });
});
