//Gameboard
const Game = (()=>{

    let board = [null, null, null, null, null, null, null, null, null];

    function add(value, index) {
        this.board[index] = value
    }

    function reset() {
    this.board = [null, null, null, null, null, null, null, null, null]
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

    const appendHTML = (el) => {
        const o = ( `<span class="material-symbols-outlined kruzic" id=""> radio_button_unchecked  </span>`);
        const x = (`<span class="material-symbols-outlined"> close </span>`) ;     

        if (el === "x") {
            return x;
        } else if (el === "o") {
            return o;
        }
    }



    const update = (location) => {
        document.getElementById(location).insertAdjacentHTML("afterbegin", appendHTML(Game.board[location]))
    }

    const reset = () => {
        for (let index = 0; index < 9; index++) {
            const el = document.getElementById(`${index}`);
            el.innerHTML = "";
            
        }
    }

    return {update, reset}

})();
//Gameflow

const Controller =(()=>{
    let playerOne = Player("PlayerOne", "x")
    let playerTwo = Player("PlayerTwo", "o")
    let state = "playing";

    let turn = playerOne;

    const resetAll = () => {
        Game.reset(Game.board);
        View.reset();
        turn = playerOne;
        state = "playing"
    }

    const changeTurn = () => {
        if (turn === playerOne) {
            turn = playerTwo
        } else {
            turn = playerOne
        }
    }

    const evaluateState = () => {
        if (state === "playing") {
            console.log("playing");
        } else if (state === "win") {
            console.log("win")
        }else if(state==="draw") {
            console.log("draw")
        }
    }

    const checkResult = (e) => {
        let winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        let boardExcerpt = []
        let dividedBoard = []

        /** 
        Takes each combo with the current click, takes symbol value in
        Game.board and divides that into arrays with 3 children
        */
        winningCombos.forEach(element => {
            if (element.includes(parseInt(e.target.id))) {
                element.forEach(element => {
                    boardExcerpt.push(Game.board[element])
                });
            }
        });

        for (var i=0; i<boardExcerpt.length; i+=3) {
            dividedBoard.push(boardExcerpt.slice(i, i+3))
        }

        //Checks if every element in Array is the same
        dividedBoard.forEach(element => {
            if (element.every( (val, i, arr) => val === arr[0])) {
               state = "win"
            }
        });

        if ((Game.board.filter(element => element===null)).length == 0) {
            if(state === "playing") {
                state = "draw";
        }
        }

        evaluateState();
    }



    const playRound = (e) => {
        if(Game.board[e.target.id] === null){
            Game.add(turn.type, e.target.id)
            View.update(e.target.id)
            checkResult(e)
        } else {
            changeTurn();
        }

    }


    document.querySelector(".gameboard").addEventListener("click", (e)=>{
        playRound(e)
        changeTurn()
    }) 


    document.getElementById("resetgameboard").addEventListener("click", (e) => {
        resetAll();

    })



})();






//model
    //Gameboard
    //Player
//view
    //displayController

//controller