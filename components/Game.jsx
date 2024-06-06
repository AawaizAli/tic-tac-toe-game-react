    import react from 'react'
    import reactDOM from 'react-dom'
    import { useState } from 'react'
    import './Game.css'

    function Square({ value, handleOnClick }) {
        return (
            <button className='square' onClick={handleOnClick}>
                {value}
            </button>
        );
    }

    function Board({ xIsNext, squares, onPlay }) {

        function calculateWinner(squares) {
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
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        }

        function handleOnClick(i) {

            if (squares[i] || calculateWinner(squares)) {
                return;
            }

            const futureSquares = squares.slice();

            if (xIsNext) {
                futureSquares[i] = 'X';
            } else {
                futureSquares[i] = 'O';
            }

            onPlay(futureSquares);
        }

        const winner = calculateWinner(squares);
        let status;

        if (winner) {
            status = "Winner is: " + winner;
        } else {
            status = "Next Player is: " + (xIsNext ? "X" : "O");
        }

        return (
            <>
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square value={squares[0]} handleOnClick={() => handleOnClick(0)} />
                    <Square value={squares[1]} handleOnClick={() => handleOnClick(1)} />
                    <Square value={squares[2]} handleOnClick={() => handleOnClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} handleOnClick={() => handleOnClick(3)} />
                    <Square value={squares[4]} handleOnClick={() => handleOnClick(4)} />
                    <Square value={squares[5]} handleOnClick={() => handleOnClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} handleOnClick={() => handleOnClick(6)} />
                    <Square value={squares[7]} handleOnClick={() => handleOnClick(7)} />
                    <Square value={squares[8]} handleOnClick={() => handleOnClick(8)} />
                </div>
            </>
        );
    }

    export default function Game() {

        const [xIsNext, setXIsNext] = useState(true);
        const [history, setHistory] = useState([Array(9).fill(null)]);
        const currentSquares = history[history.length - 1];

        function handlePlay(nextSquares) {
            setHistory([...history, nextSquares]);
            setXIsNext(!xIsNext);
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        );
    }
