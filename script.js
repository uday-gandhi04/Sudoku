// Get the rows of the Sudoku grid
let sudoku_row = Array.from(document.getElementsByClassName("sudoku-row"));

// Initialize the grid array
let grid = [];

for (let i = 0; i < sudoku_row.length; i++) {
    grid[i] = Array.from(sudoku_row[i].getElementsByClassName("sudoku-cell"));
}

// Utility function to get a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random order for numbers 1 to 9
function getRandomNumbers() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

// Check if num can be placed at grid[row][col] without breaking Sudoku rules
function isValid(row, col, num, board) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                let numbers = getRandomNumbers();
                for (let num of numbers) {
                    if (isValid(row, col, num, board)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Generate a complete Sudoku grid
function generateCompleteGrid() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

// Remove elements to create a puzzle
function createPuzzle(board, n) {
    let puzzle = board.map(row => row.slice());
    let count = n;
    while (count > 0) {
        let i = getRandomInt(0, 8);
        let j = getRandomInt(0, 8);
        if (puzzle[i][j] !== 0) {
            puzzle[i][j] = 0;
            count--;
        }
    }
    return puzzle;
}

// Initialize the Sudoku grid with a solvable puzzle
let completeGrid = generateCompleteGrid();
n=37;
let m=81-n;
let puzzle = createPuzzle(completeGrid, m);
// Fill the HTML grid with the puzzle values
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        grid[i][j].value = puzzle[i][j] === 0 ? '' : puzzle[i][j];
    }
}

// Event listener to check user input
grid.forEach((row, i) => {
    row.forEach((cell, j) => {
        cell.addEventListener('input', () => {
            if (parseInt(cell.value) !== completeGrid[i][j] && completeGrid[i][j] !== 0) {
                alert("Wrong");
                grid[i][j].value='';
            }
            else{
                m--;
                if(m==0){
                    alert("Congrats You Won");
                }
            }
        });
    });
});

// Solve the puzzle to get the solution board
let solutionBoard = puzzle.map(row => row.map(cell => cell));
solveSudoku(solutionBoard);

console.log(puzzle);

for(let i =0;i<9;i++){
    for(let j =0;j<9;j++){
        if(completeGrid[i][j]-solutionBoard[i][j]!=0)
        console.log(i+1,j+1,completeGrid[i][j]-solutionBoard[i][j]);
    }
}
console.log(solutionBoard);
console.log(completeGrid);
