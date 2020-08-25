import * as GameBoard from './controller/build_board.js';
import * as Pieces from './controller/place_pieces.js';
import * as Manipulator from './manipulators.js';
import { Chess } from '../../node_modules/chess.js/chess.js';

let board = document.getElementById('chessBoard');

GameBoard.populateBoard(board);
Pieces.placePieces(board);
var possiblePlaces = [];

board.onclick = (evt) => {
    //Resets the styling of the currently activated pieces on the board
    const resetStyling = () => {
        console.log(possiblePlaces);
        possiblePlaces.forEach(id => {
            document.getElementById(id).style.border = "";
        });
    }

    // Gets the piece that was clicked on.
    // Otherwise gets null if no piece was clicked.
    var focusSquare = GameBoard.getFocusSquare();

    let regexPattern = new RegExp('..\/images\/pieces\/([A-Z])(B|W).svg');

    let regexGroupings = regexPattern.exec(focusSquare.childNodes[0].src);

    if (focusSquare) {
        resetStyling();
        possiblePlaces = Manipulator.manipulate(focusSquare.id, Manipulator.getManipulators(regexGroupings[1], regexGroupings[2]));
    }

    //Checks to see the length of the current possible places to move to, this results in a green box for movement and a red box for attacking
    if (possiblePlaces.length != 0) {
        possiblePlaces.forEach(id => {
            var element = document.getElementById(id);
            element.style.boxSizing = "border-box";
            if(element.childNodes.length != 0) {
                //Attacking - Red
                element.style.border = "4px solid #b53737";
            } else {
                //Movement - Green
                element.style.border = "4px solid #06c258";
            }
        });
    }

    board.onclick = evt => {
        if(possiblePlaces.includes(evt.target.id)){
            var pieceImg = focusSquare.childNodes[0];
            focusSquare.removeChild(pieceImg);
            document.getElementById(evt.target.id).appendChild(pieceImg);
            pieceImg.style.border = "";
        }
    }
}



// console.log(chess.board());