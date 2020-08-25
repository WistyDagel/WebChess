// let starting_state = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let starting_state = 'rnbqkbnr/pppppppp/8/8/8/8/8/RNBQKBNR';

const placePieces = (board) => {
    // Counter that will keep track of when to place pieces.
    let counter = 0;

    // Counter that keeps track of the square that is on.
    let square_counter = 0;

    // Splits the starting state string into 8 pieces and loops through those
    // to place each piece on the board.
    starting_state.split('/').forEach(string => {
        // Splits the new string into single characters and uses that to place pieces.
        string.split('').forEach(s => {
            // Creates IMG tag
            let img = document.createElement('img');
            switch (counter) {
                case 0:
                    // Gives the img a src.
                    img.src = `../images/pieces/${s.toUpperCase()}B.svg`;

                    board.childNodes[square_counter].appendChild(img);
                    break;
                case 1:
                    // Gives the img a src.
                    img.src = `../images/pieces/${s.toUpperCase()}B.svg`;

                    board.childNodes[square_counter].appendChild(img);
                    break;
                case 6:
                    // Gives the img a src.
                    img.src = `../images/pieces/${s.toUpperCase()}W.svg`;

                    board.childNodes[square_counter].appendChild(img);
                    break;
                case 7:
                    // Gives the img a src.
                    img.src = `../images/pieces/${s.toUpperCase()}W.svg`;

                    board.childNodes[square_counter].appendChild(img);
                    break;
                default:
                    break;
            }

            // Makes sure to keep the correct square placement even when there are empty rows.
            if (s == 8) {
                square_counter += 8;
            } else {
                square_counter += 1;
            }
        });
        // Adds to the counter
        counter += 1;
    });
}

const getStartingState = () => {
    var fen = ' w KQkq - 0 1';
    return starting_state + fen;
}

export { placePieces, getStartingState };