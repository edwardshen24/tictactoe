const board = document.querySelector(".gameboard");

const createPlayer = (piece, cell, turn,win) => { //factory function
    return { piece, cell, turn, win};
};

const createControl = (previous, n) => {
    return {previous, n};
};

const player1 = createPlayer("x",[], true, false);
const player2 = createPlayer("o",[], false ,false);
const control = createControl(new Set(), 0);

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

    board.addEventListener('click', e => {
        let i = parseInt(e.target.getAttribute('data-index'));
        
        if (((Array.from(control.previous)).indexOf(i) == -1 || n == 0) && !isNaN(i) && control.previous.size != 9 && !player1.win && !player2.win){
            if (player1.turn){
                e.target.innerHTML = player1.piece;
                player1.cell.push(i);
                player1.turn = false;
                player2.turn = true;
                control.previous.add(i);
            }
            else if (player2.turn){
                e.target.innerHTML = player2.piece;
                player2.cell.push(i);
                player1.turn = true;
                player2.turn = false;
                control.previous.add(i);
            }
            control.n++;
        }
        checkWin();
    });

})();

function checkWin(){
    const winarr = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    let checker = (arr, target) => target.every(i => arr.includes(i));
    let display = document.querySelector(".display");

    winarr.forEach(function (n) {
        if(checker(player1.cell, n)){
            display.innerHTML = "Player 1 wins."
            player1.win = true;
            restart();
        }
        else if (checker(player2.cell, n)){
            display.innerHTML = "Player 2 wins."
            player2.win = true;
            restart();
        }
    });

}

function restart(){
    let display = document.querySelector(".display");
    const restart = document.createElement("button");
    restart.innerHTML = "Restart";
    restart.setAttribute("id","restart");
    display.appendChild(restart);
}

document.addEventListener( "click", listen );

function listen(e){
   if(e.target.id === "restart"){
       player1.win = false;
       player2.win = false;
       player1.cell = [];
       player2.cell = [];
       player1.turn = true;
       player2.turn = false;
       control.previous.clear();
       control.n = 0;
       document.querySelector(".display").innerHTML = "";
       const elem = document.querySelectorAll("[data-index]");
       elem.forEach(a =>{
           a.innerHTML = " ";
       })
   }
}