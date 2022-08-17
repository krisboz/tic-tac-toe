const Gameboard = (() => {
    //

    let gameboard = [null, null, null, null, null, null, null, null, null] ;

    const reset = () => {
        gameboard = [null, null, null, null, null, null, null, null, null]
     }



    const add = (el, index) => {
        gameboard[index] = el.type;
    }
    return {
       gameboard, reset, add
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
         document.getElementById(`${clicked}`).insertAdjacentHTML("afterbegin", appendHTML(gameboard[clicked]))


    }

    const updateNames = (name, turn) => {

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
    let result = "";
    
    document.getElementById("btnOne").addEventListener("click", (e => {
        let name = document.getElementById("playerOne").value;
        playerOne.name = name
        console.log(playerOne) 
        document.getElementById("nameOne").innerHTML = playerOne.name
    }))
    document.getElementById("btnTwo").addEventListener("click", (e => {
        let name = document.getElementById("playerTwo").value;
        playerTwo.name = name
        console.log(playerTwo) 
        document.getElementById("nameTwo").innerHTML = playerTwo.name
    
    }))
    let turn = playerOne;

    const checkState = (currPlayer, gameboard) => {



        let winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        let currCombos = [];
        let currSymbols =[];

        let temporaryArr = [];


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

       temporaryArr.forEach(element => {

        //Check if array elements are equal
        if (element.every( (val, i, arr) => val === arr[0] )) {
            result = "win";



        } else result =""
       });

       
        ////win
        return result;


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

    const testFuncy = (e) => {

        let clickPosition = e.target.id
        let currPlayer = turn.play(clickPosition);
        checkLegal(Gameboard.gameboard, currPlayer.position, currPlayer, clickPosition)

    }



    document.querySelector(".gameboard").addEventListener("click", (e) => {
        let clickPosition = e.target.id
        let currPlayer = turn.play(clickPosition);
        checkLegal(Gameboard.gameboard, currPlayer.position, currPlayer, clickPosition)
        //checkState(currPlayer, Gameboard.gameboard);
         checkState(currPlayer, Gameboard.gameboard);
 
        if(result === "win" || result === "draw") {
            displayController.reset();
            Gameboard.gameboard = [null, null, null, null, null, null, null, null, null]
            result = ""
        } else if (result !== "win") {
            console.log("it should work")
            result = ""
        }

        console.log(result, Gameboard.gameboard, currPlayer)
        changeTurn();


    })


})();

