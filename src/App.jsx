import { useState } from "react";

function Square({ valueProp, onSquareClick }) {

  return (
    <button onClick={onSquareClick} className="square">
      {valueProp}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setIsNext] = useState(true);
  const [square, setSquare] = useState(Array(9).fill(null));
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "winner is " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (square[i]) {
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquare(nextSquares);
    setIsNext(!xIsNext);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(0)} valueProp={square[0]} />
        <Square onSquareClick={() => handleClick(1)} valueProp={square[1]} />
        <Square onSquareClick={() => handleClick(2)} valueProp={square[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} valueProp={square[3]} />
        <Square onSquareClick={() => handleClick(4)} valueProp={square[4]} />
        <Square onSquareClick={() => handleClick(5)} valueProp={square[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} valueProp={square[6]} />
        <Square onSquareClick={() => handleClick(7)} valueProp={square[7]} />
        <Square onSquareClick={() => handleClick(8)} valueProp={square[8]} />
      </div>
    </>
  );
}

function calculateWinner(square) {
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
