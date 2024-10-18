import React, { useState } from "react";

type Player = "X" | "O" | null;

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | "Draw">(null);
    const [playerX, setPlayerX] = useState<string>("Player X");
    const [playerO, setPlayerO] = useState<string>("Player O");
    const [scoreX, setScoreX] = useState<number>(0);
    const [scoreO, setScoreO] = useState<number>(0);
    const [gameHistory, setGameHistory] = useState<string[]>([]);
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            if (gameWinner === "X") {
                setScoreX((prev) => prev + 1);
                setGameHistory((prev) => [...prev, `${playerX} wins!`]);
            } else if (gameWinner === "O") {
                setScoreO((prev) => prev + 1);
                setGameHistory((prev) => [...prev, `${playerO} wins!`]);
            }
        } else if (!newBoard.includes(null)) {
            setWinner("Draw");
            setGameHistory((prev) => [...prev, "It's a draw!"]);
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const calculateWinner = (board: Player[]): Player | null => {
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

        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    };

    const resetScores = () => {
        setScoreX(0);
        setScoreO(0);
        setGameHistory([]);
    };

    const toggleTheme = () => {
        setDarkTheme((prev) => !prev);
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${darkTheme ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-900 to-purple-800'} p-4`}>
            <h1 className="text-5xl font-bold mb-6 text-blue-400 drop-shadow-lg animate-pulse">
                Tic-Tac-Toe
            </h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Player X Name"
                    value={playerX}
                    onChange={(e) => setPlayerX(e.target.value)}
                    className="mr-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    placeholder="Player O Name"
                    value={playerO}
                    onChange={(e) => setPlayerO(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="grid grid-cols-3 gap-4 w-72">
                {board.map((value, index) => (
                    <button
                        key={index}
                        className="w-20 h-20 text-4xl font-bold flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors duration-300 rounded-lg transform hover:scale-105 shadow-lg"
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            {winner && (
                <div className="mt-6 text-center">
                    {winner === "Draw" ? (
                        <p className="text-2xl text-gray-300 animate-pulse">It's a Draw!</p>
                    ) : (
                        <p className="text-2xl text-green-400 animate-pulse">
                            {currentPlayer === "X" ? playerO : playerX} Wins!
                        </p>
                    )}
                    <button
                        onClick={resetGame}
                        className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md transform hover:scale-105"
                    >
                        Play Again
                    </button>
                </div>
            )}

            <div className="mt-4">
                <button
                    onClick={resetScores}
                    className="mt-4 px-6 py-2 mr-4 bg-gradient-to-r from-blue-700 to-purple-600 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-500 transition-colors duration-300 shadow-md transform hover:scale-105"
                >
                    Reset Scores
                </button>
                <button
                    onClick={toggleTheme}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-400 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 transition-colors duration-300 shadow-md transform hover:scale-105"
                >
                    Toggle Theme
                </button>
            </div>


            <div className="mt-6 text-white">
                <h2 className="text-2xl">Scoreboard</h2>
                <p>{playerX}: {scoreX}</p>
                <p>{playerO}: {scoreO}</p>
            </div>

            <div className="mt-4 text-white">
                <h2 className="text-xl">Game History</h2>
                <ul>
                    {gameHistory.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>

            <footer className="mt-auto text-lg text-white font-bold drop-shadow-lg">
                <p className="text-center">Created by OC-DAVE</p>
            </footer>
        </div>
    );
};

export default TicTacToe;
