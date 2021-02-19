import React from 'react'
import ReactDOM from 'react-dom'
import Row from './components/Row.jsx'
import gravity from './helpers/gravity'
import win from './helpers/win'

class App extends React.Component {
  constructor() {
    super();
    this.winmap = {
      1: 'blue',
      2: 'red'
    },
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      turn: 1,
      gameover: false,
      status: "Blue's Turn"
    }
  }

  select(e) {
    if (this.state.gameover) {
      return
    }
    var col = Number(e.target.dataset.x)
    var row = Number(e.target.dataset.y)
    if (gravity.alreadyOccupied(this.state.board.slice(), col, row)) {
      return;
    }
    var newBoard = gravity.drop(this.state.board.slice(), [col, row], this.state.turn)
    this.setState({ board: newBoard })
    console.log('Column', e.target.dataset.x, 'Row', e.target.dataset.y)
    var winner = win.detectWins(this.state.board)
    if (winner === 3) {
      this.setState({ gameover: true, status: "It's a tie!" })
    } else if (winner > 0) {
      var statusText = winner === 1 ? "Blue Wins!" : "Red Wins!"
      console.log(statusText)
      this.setState({ gameover: true, status: statusText })
    } else {
      this.switchTurn()
    }

  }

  switchTurn() {
    var newTurn = this.state.turn === 1 ? 2 : 1
    var statusText = newTurn === 1 ? "Blue's Turn" : "Red's Turn"
    this.setState({turn: newTurn, status: statusText})
  }

  reset() {
    var blankBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
    this.setState({
      gameover: false,
      board: blankBoard,
      turn: 1,
      status: "Blue's Turn!"
    })
  }

  render() {
    return (
      <div>
        <h1>Connect 4</h1>
        <h3>{this.state.status}</h3>
        <button onClick={this.reset.bind(this)}>Start Over</button>
        <table className="board">
          <tbody>
            {
              this.state.board.map((row, index) => {
                return <Row key={index} y={index} row={row} select={this.select.bind(this)}/>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))
