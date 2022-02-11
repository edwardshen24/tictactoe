const board = document.querySelector(".gameboard");

(function gameBoard(){ //module
    let gameBoard = [0,1,2,3,4,5,6,7,8];
    gameBoard.forEach(function (i) {
        const div = document.createElement("div");
        div.setAttribute("id", "cell");
        div.setAttribute("data-index", i);
        board.appendChild(div);
    });
})();

(function displayController(){ //module
    board.addEventListener('click', e => {
        if (player1.turn){
            e.target.innerHTML = player1.piece;
            player1.cell.push(e.target.getAttribute('data-index'));
            player1.turn = false;
        }
        else{
            e.target.innerHTML = player2.piece;
            player2.cell.push(e.target.getAttribute('data-index'));
            player1.turn = true;
        }
    });
})();

const createPlayer = (piece, cell, turn) => { //factory function
    return { piece, cell, turn};
};

const player1 = createPlayer("x",[], true);
const player2 = createPlayer("o",[], false);

