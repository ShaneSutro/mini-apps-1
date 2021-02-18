import React from 'react'
import ReactDOM from 'react-dom'
import Row from './components/Row.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [1, 2, 1, 1, 2, 2, 1]
      ],
      turn: 1
    }
  }

  select(e) {
    var col = Number(e.target.dataset.x)
    var row = Number(e.target.dataset.y)
    var newBoard = this.state.board.slice();
    newBoard[row].splice(col, 1, this.state.turn)
    this.setState({board: newBoard})
    console.log('Column', e.target.dataset.x, 'Row', e.target.dataset.y)

    this.switchTurn()
  }

  switchTurn() {
    var newTurn = this.state.turn === 1 ? 2 : 1
    this.setState({turn: newTurn})
  }

  render() {
    return (
      <div>
        <h1>Connect 4</h1>
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
