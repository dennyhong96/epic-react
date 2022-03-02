// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
import {useLocalStorageState} from "../utils";

function Board({squares, onSelectSquare}) {
  // const [squares, setSquares] = useLocalState(Array(9).fill(null), "squares");

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSelectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  // States
  const [history, setHistory] = useLocalStorageState("tic-tac-toe:history", [
    Array(9).fill(null),
  ]);
  const [currStep, setCurrStep] = useLocalStorageState(
    "tic-tac-toe:currStep",
    0,
  );

  // Derived states:
  const currentSquares = history[currStep]; // current currentSquares
  const nextValue = calculateNextValue(currentSquares); // ('X' or 'O')
  const winner = calculateWinner(currentSquares); // ('X', 'O', or null)
  const status = calculateStatus(winner, currentSquares, nextValue); // (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)

  function handleSelectSquare(squareIndex) {
    if (winner || currentSquares[squareIndex]) return;

    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    const newSquares = [...currentSquares];
    newSquares[squareIndex] = nextValue;
    // setSquares(newSquares);
    const newHistory = history.slice(0, currStep + 1); // supports time travel
    setHistory([...newHistory, newSquares]);
    setCurrStep(prev => prev + 1);
  }

  function restart() {
    // setSquares(Array(9).fill(null));
    setCurrStep(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((step, i) => (
    <li key={`${i}-${JSON.stringify(step)}`}>
      <button disabled={i === currStep} onClick={() => setCurrStep(i)}>
        {i === 0 ? `Go to game start` : `Go to move #${i}`}
        {i === currStep && "(current)"}
      </button>
    </li>
  ));

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onSelectSquare={handleSelectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>

      {/* History */}
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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

function App() {
  return <Game />;
}

export default App;
