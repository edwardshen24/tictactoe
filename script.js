
(function gameBoard(){
    const board = document.querySelector(".gameboard");
    let gameBoard = [0,1,2,3,4,5,6,7,8];
    gameBoard.forEach(function (i) {
        const div = document.createElement("div");
        div.setAttribute("id", "cell");
        div.setAttribute("data-index", i);
        board.appendChild(div);
    });
    return {div}
}());

function displayController(){

}

const player = () =>{

}