import React, {Component} from 'react';
// import logo from './logo.svg';
import Board from './Board'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsPlayer: true
    }
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    
    if (this.calculateWinner(squares) || squares[i]) {
        return
    } else {
        squares[i] = this.state.xIsPlayer ? 'X' : 'O'
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsPlayer: !this.state.xIsPlayer            
        })
    }
}

jumpTo = (step) => {
  this.setState({
    stepNumber: step,
    xIsPlayer: (step % 2) === 0
  })
}

calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start'
      return (
      <li key={move}>
        <button className='statusButton' onClick={ () => this.jumpTo(move)} > {desc} </button>
      </li>
      )
    })

    let status
    if (winner) { 
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsPlayer ? 'X' : 'O'}`
    }

    return (
      <div >
        <h1>Tic Tac Toe</h1>
        <div className='game'>  
          <div className='gameBoard'>
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
