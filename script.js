
const createPlayer = (piece, cell, turn,win) => { //factory function
    return { piece, cell, turn, win};
};

const createControl = (previous, n, tie) => {
    return {previous, n, tie};
};

const player1 = createPlayer("x",[], true, false);
const player2 = createPlayer("o",[], false ,false);
const control = createControl(new Set(), 0, false);

(function gameBoard(){ //module
    let gameBoard = [1,2,3,4,5,6,7,8,9];
    gameBoard.forEach(function (i) {
        const div = document.createElement("div");
        div.setAttribute("id", "cell");
        div.setAttribute("data-index", i);
        document.querySelector(".gameboard").appendChild(div);
    });
})();


(function displayController(){ //module
    document.querySelector(".display").innerHTML = "Player 1's turn.";
    document.querySelector(".gameboard").addEventListener('click', e => {
        let i = parseInt(e.target.getAttribute('data-index'));
        
        if (((Array.from(control.previous)).indexOf(i) == -1 || control.n == 0) && !isNaN(i) && !player1.win && !player2.win){
    
            if (player1.turn){
                e.target.innerHTML = player1.piece;
                player1.cell.push(i);
                player1.turn = false;
                player2.turn = true;
                control.previous.add(i);
                document.querySelector(".display").innerHTML = "Player 2's turn.";
            } else if (player2.turn){
                e.target.innerHTML = player2.piece;
                player2.cell.push(i);
                player1.turn = true;
                player2.turn = false;
                control.previous.add(i);
                document.querySelector(".display").innerHTML = "Player 1's turn.";
                
            }
            control.n++;
        }
        if (control.previous.size == 9){
            control.tie = true;
            restart();
        }
        checkWin();
    });

})();

function checkWin(){
    const winarr = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    let checker = (a, target) => target.every(i => a.includes(i));
    let display = document.querySelector(".display");

    winarr.forEach(function (n) {
        if(checker(player1.cell, n)){
            display.innerHTML = "Player 1 wins."
            player1.win = true;
            restart();
        } else if (checker(player2.cell, n)){
            display.innerHTML = "Player 2 wins."
            player2.win = true;
            restart();
        }
    });

}

function restart(){
    let display = document.querySelector(".display");
    const restart = document.createElement("button");
    if (control.tie && !player1.win && !player2.win)
        document.querySelector(".display").innerHTML = "Tie."
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
       control.tie = false;
       elem.forEach(a =>{
           a.innerHTML = " ";
       })
   }
}