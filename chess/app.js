const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const chess = new Chess();
let players = {
  white: null,
  black: null
};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectatorRole");
  }

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    if (socket.id === players.white) {
      players.white = null;
    } else if (socket.id === players.black) {
      players.black = null;
    }
  });

  socket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid move:", move);
        socket.emit("invalidMove", move);
      }
    } catch (error) {
      console.error("Error:", error);
      socket.emit("invalidMove", move);
    }
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
