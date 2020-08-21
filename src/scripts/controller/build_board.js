const populateBoard = board => {
    // Boolean that decides which color each square will be.
    let isBackgroundBlack = false;
    // String that will decide the column letter for each square.
    let coloumnLetter = '';
    // Creates 64 "squares" that will populate the board.
    for (let i = 0; i < 8; i++) {
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
            coloumnLetter = coloumNameAssignment(i);

            // Assigns a column number as well as row number to the square's id.
            square.id = `${coloumnLetter}${z}`;

            //Add event listener for when the square is clicked
            square.onclick = changeState;

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

    //Adds dragula component for each 'sqaure' div - this is so the pieces can be moved accross the board.
    // dragula([].slice.call(document.querySelectorAll("sqaure")));
}

const coloumNameAssignment = columnNumber => {
    // Initialize variable at the top of the function to be returned at the end.
    let letter = '';

    // Switch case to decide the coloum letter.
    switch (columnNumber) {
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

var focusSquare = null;

const changeState = evt => {
    if(!(evt.target.parentElement.id == "chessBoard")){
        if(focusSquare){
            focusSquare.childNodes[0].style.border = "";
        } 
    
        // if(focusSquare.childNodes[0] == evt.target){
        //     focusSquare = null;
        // } else {
        //     focusSquare = evt.target.parentElement;
        //     focusSquare.childNodes[0].style.border =  "2px solid #06c258";
    
        // }
    
        focusSquare = evt.target.parentElement;
        focusSquare.childNodes[0].style.border =  "2px solid #06c258";
    }    
}

const getFocusSquare = () => {
    return focusSquare;
}

export { populateBoard, getFocusSquare };
