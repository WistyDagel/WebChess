//PREVIOUS CODE USED FOR CHESS 960 PROJECT 
// Between min (inclusive) and max (exclusive)
const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// Return a new string where the character at index is replaced by char
const sub = (string, index, char) => {
    return `${string.substr(0, index)}${char}${string.substr(index + 1, string.length)}`;
}

// Returns a list of empty squares in a rank
const getEmptySquares = string => {
    let squares = [];
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == '-') squares.push(i);
    }
    return squares;
}

// Selects a random empty square in a rank
const getRandomEmpty = string => {
    let squares = getEmptySquares(string);
    return squares[between(0, squares.length)];
}

//PREVIOUS CODE USED FOR CHESS 960 PROJECT 
const get960 = () => {
    // Initialize one rank in FEN
    // Declare empty rank to hold black pieces
    let black = '--------';

    // Place bishops randomly in alternate square colors
    black = sub(black, [0,2,4,6][between(0,4)], 'b');
    black = sub(black, [1,3,5,7][between(0,4)], 'b');

    // Place queen randomly in empty square
    black = sub(black, getRandomEmpty(black), 'q')

    // Place knights randomly on empty squares
    black = sub(black, getRandomEmpty(black), 'n');
    black = sub(black, getRandomEmpty(black), 'n');
    
    // Place king in center of the three remaining squares
    black = sub(black, getEmptySquares(black)[1], 'k');

    // Place rooks in remaining two squares
    black = sub(black, getEmptySquares(black)[0], 'r');
    black = sub(black, getEmptySquares(black)[0], 'r');

    // Convert pieces to white
    let white = black.toUpperCase();

    return `${black}/pppppppp/8/8/8/8/PPPPPPPP/${white}`;
}

// let starting_state = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let starting_state = 'nbbrqknr/pppppppp/8/8/8/8/PPPPPPPP/NBBRQKNR';

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
    var fen = ' w - - 0 1';
    return starting_state + fen;
}

export { placePieces, getStartingState };