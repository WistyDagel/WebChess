import { populateBoard } from './controller/build_board.js';
import { placePieces } from './controller/place_pieces.js';

let board = document.getElementById('chessBoard');

populateBoard(board);
placePieces(board);