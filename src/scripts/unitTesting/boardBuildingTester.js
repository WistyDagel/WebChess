import { populateBoard } from './controller/build_board.js';

let board = document.getElementById('chessBoard');

const testBoardCreation = () => {
    populateBoard(board);

    // Makes sure each div is created.
    board.childNodes.forEach(element => {
        console.log(element);
    });

    // Counts the divs.
    console.log(board.childNodes.length);
}

testBoardCreation();