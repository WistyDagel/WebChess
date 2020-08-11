const { Chess } = require('../node_modules/chess.js')
const chess = new Chess();

while (!chess.game_over()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
}