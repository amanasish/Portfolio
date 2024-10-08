// Constants
const N_SIZE = 3;
const EMPTY = '';  // Changed from '&nbsp;' to empty string

// Game state variables
let boxes = [];
let turn = 'X';
let moves;

function init() {
    const board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);
    
    for (let i = 0; i < N_SIZE; i++) {
        const row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < N_SIZE; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            if (i === j) {
                cell.classList.add('diagonal0');
            }
            if (j === N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
        }
    }
    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

function startNewGame() {
    moves = 0;
    turn = 'X';
    boxes.forEach(square => {
        square.innerHTML = EMPTY;
        square.classList.remove('x', 'o', 'win');
    });
    updateTurnDisplay();
}

function updateTurnDisplay() {
    document.getElementById('turn').textContent = 'Player ' + turn;
}

function checkWin() {
    // Check rows
    for (let i = 0; i < N_SIZE; i++) {
        if (checkLine(boxes.slice(i * N_SIZE, (i + 1) * N_SIZE))) return true;
    }
    
    // Check columns
    for (let i = 0; i < N_SIZE; i++) {
        const column = [boxes[i], boxes[i + N_SIZE], boxes[i + (2 * N_SIZE)]];
        if (checkLine(column)) return true;
    }
    
    // Check diagonals
    const diagonal1 = [boxes[0], boxes[4], boxes[8]];
    const diagonal2 = [boxes[2], boxes[4], boxes[6]];
    return checkLine(diagonal1) || checkLine(diagonal2);
}

function checkLine(cells) {
    const firstClass = cells[0].classList.contains('x') ? 'x' : 
                       cells[0].classList.contains('o') ? 'o' : null;
    
    if (!firstClass) return false;
    
    const win = cells.every(cell => cell.classList.contains(firstClass));
    
    if (win) {
        cells.forEach(cell => cell.classList.add('win'));
    }
    
    return win;
}

function set() {
    if (this.classList.contains('x') || this.classList.contains('o')) {
        return;
    }
    
    this.innerHTML = EMPTY;  // Keep the cell text empty
    this.classList.add(turn.toLowerCase());
    moves++;
    
    if (checkWin()) {
        setTimeout(() => {
            alert('Winner: Player ' + turn);
            startNewGame();
        }, 100);
    } else if (moves === N_SIZE * N_SIZE) {
        setTimeout(() => {
            alert('Draw');
            startNewGame();
        }, 100);
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        updateTurnDisplay();
    }
}

// Theme toggle handler
document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark', this.checked);
});

// Initialize the game
init();