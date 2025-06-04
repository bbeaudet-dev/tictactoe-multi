import { useState } from 'react'
import './App.css'
import { initialGameState, move, type CellIndex } from './game'


function App() {
  const [game, setGame] = useState(initialGameState())
  const [message, setMessage] = useState('')

  const cellClick = (index: CellIndex) => {
    if (game.endState) return
    setGame(prev => move(prev, index))
  }

  // just for practice
  const getStuff = () => {
    fetch('http://localhost:3000/api/test')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMessage(response.message)
      })
  }

  // just for practice
  const postStuff = () => {
    fetch('http://localhost:3000/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testData: 'hello from client' })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMessage(response.testData)
      })
  }

  
  return (
    <div className="game-board">
      <h1>Tic-Tac-Toe</h1>
      <div className="board-row">
        <div onClick={() => cellClick(0)} className="cell">{game.board[0]}</div>
        <div onClick={() => cellClick(1)} className="cell">{game.board[1]}</div>
        <div onClick={() => cellClick(2)} className="cell">{game.board[2]}</div>
      </div>
      <div className="board-row">
        <div onClick={() => cellClick(3)} className="cell">{game.board[3]}</div>
        <div onClick={() => cellClick(4)} className="cell">{game.board[4]}</div>
        <div onClick={() => cellClick(5)} className="cell">{game.board[5]}</div>
      </div>
      <div className="board-row">
        <div onClick={() => cellClick(6)} className="cell">{game.board[6]}</div>
        <div onClick={() => cellClick(7)} className="cell">{game.board[7]}</div>
        <div onClick={() => cellClick(8)} className="cell">{game.board[8]}</div>
      </div>
      {game.endState && <div>{game.endState}</div>}
      <div>
        <p>Practice Buttons:</p>
        <button id="practice" onClick={getStuff}>{message}</button>
        <button id="practice" onClick={postStuff}>{message}</button>
      </div>
    </div >
  )
}

export default App