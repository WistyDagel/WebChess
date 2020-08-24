import * as GameBoard from './controller/build_board.js';
import * as Pieces from './controller/place_pieces.js';
import { Chess } from '../../node_modules/chess.js/chess.js';

let board = document.getElementById('chessBoard');

GameBoard.populateBoard(board);
Pieces.placePieces(board);

const chess = new Chess(Pieces.getStartingState());

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
        possiblePlaces = manipulate(focusSquare.id, getManipulators(regexGroupings[1], regexGroupings[2]));
        switch(regexGroupings[1]) {
            case "P":
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

// Gets possibls ending locations based on piece color
// Index 0 is added to the piece column, Index 1 to the row
const getManipulators = (PieceType, pieceColor) => {
    let manipulators = [];

    // TODO Does this work properly?
    switch(PieceType) {
        case "P":
            // TODO debug black pawn movement after turn 1
            if (pieceColor == 'W') {
                manipulators = [
                    [0, 1],
                    [0, 2],
                    [-1, 1],
                    [1, 1]
                ];
            } else if (pieceColor == 'B') {
                manipulators = [
                    [0, -1],
                    [0, -2],
                    [-1, -1],
                    [1, -1]
                ];
            }
            break;
        case "R":
            manipulators = [
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5],
                [0, 6],
                [0, 7],

                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],

                [0, -1],
                [0, -2],
                [0, -3],
                [0, -4],
                [0, -5],
                [0, -6],
                [0, -7],

                [-1, 0],
                [-2, 0],
                [-3, 0],
                [-4, 0],
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ];
            break;
        case "N":
            manipulators = [
                [-1, 2],
                [1, 2],
                [-2, 1],
                [2, 1],
                [-1, -2],
                [1, -2],
                [-2, -1],
                [2, -1],
            ];
            break;
        case "B":
            manipulators = [
                [1, 1],
                [2, 2],
                [3, 3],
                [4, 4],
                [5, 5],
                [6, 6],
                [7, 7],

                [1, -1],
                [2, -2],
                [3, -3],
                [4, -4],
                [5, -5],
                [6, -6],
                [7, -7],

                [-1, 1],
                [-2, 2],
                [-3, 3],
                [-4, 4],
                [-5, 5],
                [-6, 6],
                [-7, 7],

                [-1, -1],
                [-2, -2],
                [-3, -3],
                [-4, -4],
                [-5, -5],
                [-6, -6],
                [-7, -7]
            ];
            break;
        case "K":
            manipulators = [
                [-1, -1],
                [0, -1],
                [1, -1],

                [-2, 0], // Castling
                [-1, 0],
                [1, 0],
                [2, 0], // Castling

                [-1, 1],
                [0, 1],
                [1, 1],
            ];
            break;
        case "Q":
            manipulators = [
                [1, 1],
                [2, 2],
                [3, 3],
                [4, 4],
                [5, 5],
                [6, 6],
                [7, 7],

                [1, -1],
                [2, -2],
                [3, -3],
                [4, -4],
                [5, -5],
                [6, -6],
                [7, -7],

                [-1, 1],
                [-2, 2],
                [-3, 3],
                [-4, 4],
                [-5, 5],
                [-6, 6],
                [-7, 7],

                [-1, -1],
                [-2, -2],
                [-3, -3],
                [-4, -4],
                [-5, -5],
                [-6, -6],
                [-7, -7],
                
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5],
                [0, 6],
                [0, 7],

                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],

                [0, -1],
                [0, -2],
                [0, -3],
                [0, -4],
                [0, -5],
                [0, -6],
                [0, -7],

                [-1, 0],
                [-2, 0],
                [-3, 0],
                [-4, 0],
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ];
            break;
        default:
            break;
    }

    return manipulators;
}

const manipulate = (squareId, manipulators) => {
    let possibleMovesArray = [];
    let col = squareId.charCodeAt(0); // D 68
    let row = parseInt(squareId.split('')[1]);

    // Iterate over all the coordinate manipulators
    manipulators.forEach(m => {
        // Manipulate the existing coordinate to get possible ending value
        let coordinate = `${String.fromCharCode(col + m[0])}${row + m[1]}`;
        // console.log(squareId.toLowerCase());
        // console.log(coordinate.toLowerCase());
        // If valid move
        if (chess.move({ from: squareId.toLowerCase(), to: coordinate.toLowerCase()})) {
            // Undo move
            chess.undo();
            // Add to possible moves array
            possibleMovesArray.push(coordinate);
        }
    });

    return possibleMovesArray;
}


// console.log(chess.board());