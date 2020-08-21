import * as GameBoard from './controller/build_board.js';
import * as Pieces from './controller/place_pieces.js';
import { Chess } from '../../node_modules/chess.js/chess.js';

let board = document.getElementById('chessBoard');

GameBoard.populateBoard(board);
Pieces.placePieces(board);

board.onclick = (evt) => {
    var focusSquare = GameBoard.getFocusSquare();
}

const chess = new Chess (Pieces.getStartingState());

console.log(chess.board());