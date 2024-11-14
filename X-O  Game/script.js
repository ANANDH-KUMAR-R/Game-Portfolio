
const cells = Array.from(document.querySelectorAll(".cell"));
const moveSoundX = document.getElementById("moveSoundX");
const moveSoundO = document.getElementById("moveSoundO");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWin = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes("") ? null : "draw";
};

const makeMove = (index) => {
    if (boardState[index] !== "" || !gameActive) return;
    boardState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    // Play move sound based on current player
    if (currentPlayer === "X") {
        moveSoundX.play();
    } else {
        moveSoundO.play();
    }

    const result = checkWin();
    if (result) {
        gameActive = false;
        setTimeout(() => {
            if (result === "draw") {
                drawSound.play();
                alert("It's a draw!");
            } else {
                winSound.play();
                alert(`${result} wins!`);
            }
            setTimeout(resetGame, 1000); // Auto-restart after 1 seconds
        }, 10);
        return;
    }

    // Delay to let the O sound play before switching to the next turn
    setTimeout(() => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") aiMove();
    }, 400); // Slight delay to ensure sound plays fully
};

const minimax = (newBoard, player) => {
    const availableCells = newBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);

    if (checkWin() === "X") return { score: -10 };
    if (checkWin() === "O") return { score: 10 };
    if (availableCells.length === 0) return { score: 0 };

    const moves = [];

    availableCells.forEach(index => {
        let move = {};
        move.index = index;
        newBoard[index] = player;

        if (player === "O") {
            const result = minimax(newBoard, "X");
            move.score = result.score;
        } else {
            const result = minimax(newBoard, "O");
            move.score = result.score;
        }

        newBoard[index] = "";
        moves.push(move);
    });

    let bestMove;
    if (player === "O") {
        let bestScore = -Infinity;
        moves.forEach(move => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach(move => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }
    return bestMove;
};

const aiMove = () => {
    const bestMove = minimax(boardState, "O");
    makeMove(bestMove.index);
};

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
});

const resetGame = () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.innerText = ""));
    currentPlayer = "X";
    gameActive = true;
};
