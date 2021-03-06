import * as GameBoard from './controller/build_board.js';
import * as Pieces from './controller/place_pieces.js';
import * as Manipulator from './manipulators.js';
import { Chess } from '../../node_modules/chess.js/chess.js';

let gameType = document.getElementById('gameType').innerText;
var isChess = !gameType.includes('960');

let board = document.getElementById('chessBoard');

GameBoard.populateBoard(board);
Pieces.placePieces(board, isChess);
const chess = new Chess(Pieces.getStartingState());
var possiblePlaces = [];
var selectedSquare;
var selected = false;

console.log(chess.ascii());

//Adds the pieces to the black's capture point
const updateBlackCaptures = (node) => {
    document.getElementById('blackCaptures').appendChild(node);
}

//Adds the pieces to the white's capture point
const updateWhiteCaptures = (node) => {
    document.getElementById('whiteCaptures').appendChild(node);
}

//Updates the console with the current turn
const updateTurn = () => {
    if(chess.turn() == 'w'){
        document.getElementById('white').style.boxSizing = "border-box";
        document.getElementById('white').style.border =  "6px solid #06c258";
        document.getElementById('black').style.border =  "";
    } else {
        document.getElementById('black').style.boxSizing = "border-box";
        document.getElementById('black').style.border =  "6px solid #06c258";
        document.getElementById('white').style.border =  "";
    }
}

//Sets the initial turn of the game
updateTurn();

//Captures the target node (piece) and places it in their respective capture zones
const capture = (square, color) => {
    let piece = square.childNodes[0];
    square.removeChild(piece);
    if (color == 'W') {
        updateBlackCaptures(piece);
    } else {
        updateWhiteCaptures(piece);
    }
}

const checkForWin = () => {
    if (chess.game_over()) {
        var turn = (chess.turn() == 'w')? 'Black' : 'White';
        alert(`The ${turn} side won!\nThe game is over, please click okay to restart your game.`);
        location.reload();
    }
}

board.onclick = evt => {
    //Resets the styling of the currently activated pieces on the board
    const resetStyling = () => {
        let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        rows.forEach(r => {
            for (let i = 1; i <= 8; i++) {
                let piece = document.getElementById(`${r}${i}`);
                piece.style.border = "";
                piece.style.boxSizing = "border-box";
                if (piece.childNodes[0]) {
                    piece.childNodes[0].style.border = "";
                    piece.childNodes[0].style.boxSizing = "border-box";
                }
            }
        });
    }

    // Gets the piece that was clicked on.
    // Otherwise gets null if no piece was clicked.
    var focusSquare = GameBoard.getFocusSquare();
    var targetSquare = (evt.target.nodeName == "IMG")? evt.target.parentElement : evt.target;
    var turn = chess.turn().toUpperCase();
    
    let regexPattern = new RegExp('..\/images\/pieces\/([A-Z])(B|W).svg');
    let regexGroupings = regexPattern.exec(focusSquare.childNodes[0].src);

    if (targetSquare.childNodes[0] && regexGroupings[2] == turn) {
        resetStyling();
        possiblePlaces = Manipulator.manipulate(focusSquare.id, Manipulator.getManipulators(regexGroupings[1], regexGroupings[2]));
        selectedSquare = focusSquare;
        selectedSquare.style.border =  "4px solid #ff1dce";
        selected = true;
        
        
        //Checks to see the length of the current possible places to move to, this results in a green box for movement and a red box for attacking
        if (possiblePlaces.length != 0) {
            possiblePlaces.forEach(id => {
                var element = document.getElementById(id);
                let passant = chess.fen().split(' ')[3].toUpperCase();
                if(element.childNodes.length != 0 || id == passant) {
                    //Attacking - Red
                    element.style.border = "4px solid #b53737";
                } else {
                    //Movement - Green
                    element.style.border = "4px solid #06c258";
                }
            });
        }

        checkForWin();
    }

    if (possiblePlaces.includes(targetSquare.id) && selected) {
        resetStyling();
        
        // If the move is a capture, remove the target image first
        if (targetSquare.childNodes[0]) {
            capture(targetSquare, regexGroupings[2]);
        }
        
        // En Passant Pawn Capture
        let passant = chess.fen().split(' ')[3].toUpperCase();
        if (targetSquare.id == passant) {
            let manipulator = (regexGroupings[2] == 'W')? [0, -1] : [0, 1];
            let square = document.getElementById(Manipulator.getRelativeSquareId(passant, manipulator));
            capture(square, (regexGroupings[2] == 'W'? 'B' : 'W'));
        }
        
        // Move the piece image from focus square to target square
        var pieceImg = selectedSquare.childNodes[0];
        selectedSquare.removeChild(pieceImg);
        targetSquare.appendChild(pieceImg);
        
        // Updates the back-end chess object
        chess.move({ from: selectedSquare.id.toLowerCase(), to: targetSquare.id.toLowerCase() });
        updateTurn();
        // console.log(chess.ascii());
        // console.log(chess.fen());
        selected = false;
    }
}

// TODO Doesn't seem to return anything?
const getChildImg = (square) => {
    square.childNodes.forEach(child => {
        if (child.nodeName == 'IMG') {
            return child;
        }
    });
}

export { chess };