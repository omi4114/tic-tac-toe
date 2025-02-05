document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const playerVsPlayerButton = document.getElementById("player-vs-player");
    const playerVsAIButton = document.getElementById("player-vs-ai");
    
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    let isAgainstAI = false;

    function createBoard() {
        board.innerHTML = "";
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            cellElement.addEventListener("click", handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add("disabled");

            if (checkWinner(currentPlayer)) {
                status.textContent = `${currentPlayer} Wins!`;
                gameActive = false;
                return;
            }

            if (!gameBoard.includes("")) {
                status.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            
            if (isAgainstAI && currentPlayer === "O" && gameActive) {
                aiMove();
            }
        }
    }

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]  
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => gameBoard[index] === player)
        );
    }

    function aiMove() {
        let availableCells = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        if (availableCells.length > 0) {
            let aiChoice = availableCells[Math.floor(Math.random() * availableCells.length)];
            gameBoard[aiChoice] = "O";

            let cells = document.querySelectorAll(".cell");
            cells[aiChoice].textContent = "O";
            cells[aiChoice].classList.add("disabled");

            if (checkWinner("O")) {
                status.textContent = "O Wins!";
                gameActive = false;
                return;
            }

            if (!gameBoard.includes("")) {
                status.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            currentPlayer = "X";
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        status.textContent = "";
        createBoard();
    }

    playerVsPlayerButton.addEventListener("click", () => {
        isAgainstAI = false;
        resetGame();
    });

    playerVsAIButton.addEventListener("click", () => {
        isAgainstAI = true;
        resetGame();
    });

    resetButton.addEventListener("click", resetGame);

    createBoard();
});
