import React, { useState } from 'react';
import './App.css';

// Define the interface for the state of a square
interface SquareState {
  value: string | null;
}

// Define the interface for the state of the board
interface BoardState {
  squares: SquareState[];
  xIsNext: boolean;
}

// Functional component for the Tic-Tac-Toe board
const Board: React.FC = () => {
  // Initialize the state of the board
  const [boardState, setBoardState] = useState<BoardState>({
    squares: Array(9).fill({ value: '-' }), // Array representing the squares of the board
    xIsNext: true, // Boolean indicating whether it's X's turn
  });

  const [msg, setMsg] = useState<string>('');

  // Function to handle click events on a square
  const handleClick = (index: number) => {

    setMsg("")
    // Make a copy of the squares array
    const newSquares = boardState.squares.slice();

    // If the game is already won or the square is already filled, return early
    var errorMsg: string;

    if (calculateWinner(newSquares)) {
        errorMsg = "The Game is Won";
        setMsg(errorMsg)
        console.log(errorMsg)
        return;
    }
    
    else if (newSquares[index].value !== '-') {
        errorMsg = "That space is already Taken"
        setMsg(errorMsg);
        console.log(errorMsg)
        return;
    }
    else{
        // Update the value of the clicked square based on whose turn it is
        newSquares[index] = { value: boardState.xIsNext ? 'X' : 'O' };

        // Update the state with the new squares array and toggle xIsNext
        setBoardState({
        squares: newSquares,
        xIsNext: !boardState.xIsNext,
        });
    }

    
  };

  // Function to render a single square
  const renderSquare = (index: number) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {boardState.squares[index].value}
      </button>
    );
  };

  // Determine the status of the game (e.g., winner or next player)
  let status: string;

  const winner = calculateWinner(boardState.squares);

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${boardState.xIsNext ? 'X' : 'O'}`;
  }

  // Render the board component
  return (
    <div className='board'>
        <div className="status">{status}</div>
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
        <div className='message'>&gt; {msg}</div>
    </div>
  );
};

// Function to calculate the winner of the game
const calculateWinner = (squares: SquareState[]): string | null => {
    // Define winning combinations
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

  // Iterate through the winning combinations
    for (const [a, b, c] of lines) {
        // Check if any winning combination is found
        if (
            squares[a].value &&
            squares[a].value === squares[b].value &&
            squares[a].value === squares[c].value &&
            squares[c].value !== '-'
        ) {
            return squares[a].value; // Return the winner ('X' or 'O')
        }
    }

    return null; // If no winner is found, return null
};

export default Board;
