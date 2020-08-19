board = document.getElementById('chessBoard');

const populateBoard = board => {
    // Boolean that decides which color each square will be.
    let isBackgroundBlack = false;
    // String that will decide the column letter for each square.
    let coloumnLetter = '';
    // Creates 64 "squares" that will populate the board.
    for (let i = 0; i < 8; index++) {
        for (let z = 1; z < 9; z++) {
            let square = document.createElement('div');

            // Adds the background color to each square
            if (!isBackgroundBlack) {
                square.style.backgroundColor = '#656FAB';
                isBackgroundBlack = !isBackgroundBlack;
            } else {
                square.style.backgroundColor = '#E3F2FF';
                isBackgroundBlack = !isBackgroundBlack;
            }

            // Adds the class 'square' to make styling easier.
            square.className = 'square';

            // Passes in the column number to get back the column letter.
            coloumnLetter = coloumNameAssignment(i);

            // Assigns a column number as well as row number to the square's id.
            square.id = `${coloumnLetter}${z}`;
        }
    }
}

const coloumNameAssignment = columnNumber => {
    // Initialize variable at the top of the function to be returned at the end.
    let letter = '';

    // Switch case to decide the coloum letter.
    switch (i) {
        case 0:
            letter = 'A';
            break;
        case 1:
            letter = 'B';
            break;
        case 2:
            letter = 'C';
            break;
        case 3:
            letter = 'D';
            break;
        case 4:
            letter = 'E';
            break;
        case 5:
            letter = 'F';
            break;
        case 6:
            letter = 'G';
            break;
        case 7:
            letter = 'H';
            break;
        default:
            console.log(`Could not assign the coloumn letter to square column "${i}"`)
            break;
    }

    return letter;
}

const testBoardCreation = () => {
    board.childNodes.forEach(element => {
        console.log(element);
    });
}

populateBoard(board);
testBoardCreation();