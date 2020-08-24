import * as GameBoard from './controller/build_board.js';
import * as Pieces from './controller/place_pieces.js';
import { Chess } from '../../node_modules/chess.js/chess.js';

let board = document.getElementById('chessBoard');

GameBoard.populateBoard(board);
Pieces.placePieces(board);

board.onclick = (evt) => {
    if (evt.target.id) {
        // A square that does not have a piece on it.
    } else {
        // A square that contains a piece.
    }

    // Gets the piece that was clicked on.
    // Otherwise gets null if no piece was clicked.
    var focusSquare = GameBoard.getFocusSquare();

    let regexPattern = new RegExp('..\/images\/pieces\/([A-Z])(B|W).svg');

    let possiblePlaces = [];

    let regexGroupings = regexPattern.exec(focusSquare.childNodes[0].src);

    if (focusSquare) {
        switch(regexGroupings[1]) {
            case "P":
                possiblePlaces = possiblePawnMoves(focusSquare.id, regexGroupings[2]);
                break;
            case "R":
                break;
            case "N":
                break;
            case "B":
                break;
            case "K":
                break;
            case "Q":
                break;
            default:
                console.log('Cannot find piece.');
                break;
        }
    }

    if (possiblePlaces.length != 0) {
        console.log(possiblePlaces);
    }
}

const possiblePawnMoves = (squareId, pieceColor) => {
    let possibleMovesArray = [];

    if (squareId.split('')[1] == 7 && pieceColor == 'W') {
        
    }

    return possibleMovesArray;
}

const chess = new Chess(Pieces.getStartingState());

// console.log(chess.board());