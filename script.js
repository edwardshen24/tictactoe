const board = document.querySelector(".gameboard");

(function gameBoard(){ //module
    let gameBoard = [1,2,3,4,5,6,7,8,9];
    gameBoard.forEach(function (i) {
        const div = document.createElement("div");
        div.setAttribute("id", "cell");
        div.setAttribute("data-index", i);
        board.appendChild(div);
    });
})();

(function displayController(){ //module
    let previous = new Set();
    let n = 0
    board.addEventListener('click', e => {
        let i = parseInt(e.target.getAttribute('data-index'));
        console.log(i)
        if (((Array.from(previous)).indexOf(i) == -1 || n == 0) && i != null){
            if (player1.turn ){
                e.target.innerHTML = player1.piece;
                player1.cell.push(i);
                player1.turn = false;
                player2.turn = true;
                previous.add(i);
            }
            else if (player2.turn ){
                e.target.innerHTML = player2.piece;
                player2.cell.push(i);
                player1.turn = true;
                player2.turn = false;
                previous.add(i);
            }
            n++;
        }
        checkWin();
    });
})();



function checkWin(){
    const winarr = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,6,7]]
    let checker = (arr, target) => target.every(i => arr.includes(i));

    winarr.forEach(function (n) {
        console.log(checker(n,player1.cell))
    });
}

const createPlayer = (piece, cell, turn) => { //factory function
    return { piece, cell, turn};
};

const player1 = createPlayer("x",[], true);
const player2 = createPlayer("o",[], false);

