//Gameboard
const Game = (()=>{

    let board = [null, null, null, null, null, null, null, null, null];
    const add = (value, index) =>{
        board[index] = value;
    }

    const reset = () => {
     let arr = new Array(9).fill(null)
     board = arr
    }



    return {board, add, reset}


})();
//Player
const Player = (name, type) => {

    const play = () => {

    }

    return {name, type, play}
}
//displayController
const View =(()=>{

    const o = ( `<span class="material-symbols-outlined kruzic" id=""> radio_button_unchecked  </span>`);
    const x = (`<span class="material-symbols-outlined"> close </span>`) ;     

    const updateBoard = (id, symbol) => {

    }

    return [{updateBoard}]

})();
//Gameflow

const Controller =(()=>{
    let playerOne = Player("PlayerOne", "x")
    let playerTwo = Player("PlayerTwo", "o")

    let turn = playerOne;

    const changeTurn = () => {
        if (turn === playerOne) {
            turn = playerTwo
        } else {
            turn = playerOne
        }
    }

    const playRound = (e) => {
        if(e.target.classList.contains("gametile")) {
            if(Game.board[e.target.id] === null){
                Game.add(turn.type, e.target.id)
                console.log(Game.board)
            } else {
                changeTurn();
            }

        }
    }


    document.querySelector(".gameboard").addEventListener("click", (e)=>{
        playRound(e)
        changeTurn()
    }) 


    document.getElementById("resetgameboard").addEventListener("click", (e) => {
        Game.reset(Game.board);
        console.log(Game.board)
        //Game.board = [null, null, null, null, null, null, null, null, null]
        //console.log(Game.board)
    })



})();






//model
    //Gameboard
    //Player
//view
    //displayController

//controller