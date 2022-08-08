const Gameboard = (() => {
    //
    let gameboard = [null, null, null, null, null, null, null, null, null] ;

    const resetGameboard = (gb) => {
        //for some reason {gb=[]} doesn't work
        gb.splice(0, gb.length)
    }

    const add = (el, index) => {
        gameboard[index] = el;
    }
    return {
       gameboard, resetGameboard, add
    }
})();



const Player = (name, type) => {
    let position = null;
    const play = (pos) => {
        position = pos;
        return {type, position};
    }

    return {name, type, play, position}
}

const displayController = (() => {
    //Update the DOM on click
    const appendHTML = (element) => {
        const o = ( `<span class="material-symbols-outlined" id="kruzic"> radio_button_unchecked  </span>`);
        const x = (`<span class="material-symbols-outlined"> close </span>`) ;     
        if (element == "x") {
            return x
        } else if (element == "o") {
            return o
        } else {
            return ""
        }
    }

    const updateBoard = (gameboard, clicked) => {
         document.getElementById(`${clicked}`).insertAdjacentHTML("beforeend", appendHTML(gameboard[clicked].type))


    }

    const reset = () => {
        for (let index = 0; index < 9; index++) {
            const el = document.getElementById(`${index}`);
            el.innerHTML = "";
            
        }
    }

    return {updateBoard, reset};
})();


const Gameflow = (() => {

    const playerOne = Player("PlayerOne", "x")
    const playerTwo = Player("PlayerTwo", "o")

    let turn = playerOne;

    const checkState = (currPlayer, gameboard) => {
         //draw
        console.log("checkingstate")

        let winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        let currCombos = [];
        let currSymbols =[];

        let temporaryArr = [];

        const helperFunc = (arr1, arr2, arr3) => {
            if(arr1.every( (val, i, arr) => val === arr[0] )) {
                console.log("Win for")
            }
            if(arr2.every( (val, i, arr) => val === arr[0] )) {
                console.log("Win for")
            }
            if(arr3.every( (val, i, arr) => val === arr[0] )) {
                console.log("Win for")
            }
        }

        //import currentClick and the symbol
        //select the arrays that contain the position number
        //loop through them and check if they all contain symbol
        //ako je onda WIN
        //ako ne dalje igra dok ne bude sve puno

        winningCombos.forEach(element => {
            if(element.includes(parseInt(currPlayer.position))) {
               currCombos.push(element)
 
            } 
        });

        currCombos.forEach(element => {
            element.forEach(element => {
                currSymbols.push(gameboard[element])
            });
        });

       for (var i=0; i<currSymbols.length; i+=3) {
        temporaryArr.push(currSymbols.slice(i, i+3))
       }

        console.log(currCombos, currSymbols, temporaryArr)
       
        //win
    }


    const changeTurn = () => {
        if(turn == playerTwo) {
            turn = playerOne;
        }else if (turn == playerOne) {
            turn = playerTwo;
        }
    }

    const checkLegal = (array, position, currPlayer, clickPosition) => {
        //we get your position
        if(array[position] === null) {
            Gameboard.add(currPlayer, clickPosition)
            displayController.updateBoard(Gameboard.gameboard, clickPosition)

        } else {
            changeTurn();
        }

    }



    document.querySelector(".gameboard").addEventListener("click", (e) => {
        let clickPosition = e.target.id
        console.log(e.target.id)
        let currPlayer = turn.play(clickPosition);
        checkLegal(Gameboard.gameboard, currPlayer.position, currPlayer, clickPosition)
        console.log(currPlayer)
        //displayController.updateBoard(Gameboard.gameboard, clickPosition)
        checkState(currPlayer, Gameboard.gameboard);
        changeTurn();

    })

})();
