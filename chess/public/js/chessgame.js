// chessgame.js

// Define getPieceUnicode function globally
const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♔",
        K: "♚",
        Q: "♛",
        R: "♜",
        B: "♝",
        N: "♞",
        P: "♟︎"
    };
    return unicodePieces[piece.type] || "";
};

// Initialization and socket handling
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded");

    const socket = io();
    const chess = new Chess();
    let playerRole = null;

    const boardElement = document.querySelector("#chessboard");

    let draggedPiece = null;
    let sourceSquare = null;

    // Socket event listeners
    socket.on("playerRole", (role) => {
        playerRole = role;
        renderBoard();
    });

    socket.on("move", (move) => {
        chess.move(move);
        renderBoard();
    });

    socket.on("boardState", (fen) => {
        chess.load(fen);
        renderBoard();
    });

    socket.on("spectatorRole", () => {
        playerRole = null;
        renderBoard();
    });

    // Render board function
    const renderBoard = () => {
        const board = chess.board();
        boardElement.innerHTML = "";

        board.forEach((row, rowIndex) => {
            row.forEach((square, colIndex) => {
                const squareElement = document.createElement("div");
                squareElement.classList.add(
                    "square",
                    (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
                );
                squareElement.dataset.row = rowIndex;
                squareElement.dataset.col = colIndex;

                if (square) {
                    const pieceElement = document.createElement("div");
                    pieceElement.classList.add(
                        "piece",
                        square.color === "w" ? "white" : "black"
                    );
                    pieceElement.innerText = getPieceUnicode(square);
                    pieceElement.draggable = playerRole === square.color;

                    pieceElement.addEventListener("dragstart", (e) => {
                        if (pieceElement.draggable) {
                            draggedPiece = pieceElement;
                            sourceSquare = { row: rowIndex, col: colIndex };
                            e.dataTransfer.setData("text/plain", "");
                        }
                    });

                    pieceElement.addEventListener("dragend", (e) => {
                        draggedPiece = null;
                        sourceSquare = null;
                    });

                    squareElement.appendChild(pieceElement);
                }

                squareElement.addEventListener("dragover", (e) => {
                    e.preventDefault();
                    if (draggedPiece) {
                        const targetSquare = {
                            row: parseInt(squareElement.dataset.row),
                            col: parseInt(squareElement.dataset.col),
                        };
                        handleMove(sourceSquare, targetSquare);
                    }
                });

                boardElement.appendChild(squareElement);
            });
        });

        // Adjust board orientation based on playerRole
        if (playerRole === "b") {
            boardElement.classList.add("player-black");
            boardElement.classList.add("flipped"); // Assuming flipped class should be added for black's turn
        } else {
            boardElement.classList.remove("player-black");
            boardElement.classList.remove("flipped"); // Remove flipped class for white's turn
        }
    };

    const handleMove = (source, target) => {
        const move = {
            from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
            to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
            promotion: "q",
        };
        socket.emit("move", move);
    };
});
