const populateBoard = board => {
    // Boolean that decides which color each square will be.
    let isBackgroundBlack = false;
    // String that will decide the column letter for each square.
    let coloumnLetter = '';
    // Creates 64 "squares" that will populate the board.
    for (let i = 1; i < 9; i++) {
        // Changes the background boolean to the opposite so that each new row has a different color to start.
        isBackgroundBlack = !isBackgroundBlack;

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
            coloumnLetter = coloumNameAssignment(z);

            // Assigns a column number as well as row number to the square's id.
            square.id = `${coloumnLetter}${i}`;

            // Calculates the width and height of the square using the parent div's width as reference.
            // let w = board.getBoundingClientRect().width / 12;
            // square.style.height = `${w}px`;

            // Sets overflow of the parent div to hidden.
            // board.style.display = 'grid';
            // Adds 'float left' to square's styling.
            // board.style.gridTemplateColumns = `${w}px ${w}px ${w}px ${w}px ${w}px ${w}px ${w}px ${w}px`;

            // Appends the square to the board div.
            board.appendChild(square);
        }
    }
}

const coloumNameAssignment = columnNumber => {
    // Initialize variable at the top of the function to be returned at the end.
    let letter = '';

    // Switch case to decide the coloum letter.
    switch (columnNumber) {
        case 1:
            letter = 'A';
            break;
        case 2:
            letter = 'B';
            break;
        case 3:
            letter = 'C';
            break;
        case 4:
            letter = 'D';
            break;
        case 5:
            letter = 'E';
            break;
        case 6:
            letter = 'F';
            break;
        case 7:
            letter = 'G';
            break;
        case 8:
            letter = 'H';
            break;
        default:
            console.log(`Could not assign the coloumn letter to square column "${i}"`)
            break;
    }

    return letter;
}

export { populateBoard };