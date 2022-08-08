const Gameboard = (() => {
    //
    let gameboard = [] ;

    const resetGameboard = (gb) => {
        //for some reason {gb=[]} doesn't work
        gb.splice(0, gb.length)
    }

    const add = (el) => {
        gameboard.push(el)
    }
    return {
       gameboard, resetGameboard, add
    }
})();



const Player = (name, type) => {
    //is the player with x or o
    let position = null;
    const play = (pos) => {
        position = pos;
        console.log(Gameboard.gameboard)
        return {type, position};
    }
    //wins
    //losses
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

   //on illegal move
    //on win/lose
    const updateBoard = (gameboard) => {
        gameboard.forEach((el, index) => {
            document.getElementById(`${el.position}`).insertAdjacentHTML("beforeend", appendHTML(el.type))
            
        });
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

    const o = Player("Neznam", "o")
    const x = Player("Bupubu", "x");
    let turn = x;

    const checkState = () => {
        if (Gameboard.gameboard.length >= 9) {
            Gameboard.resetGameboard(Gameboard.gameboard);
            displayController.reset();
            setTimeout(()=>{
                window.alert("It's a draw")
            }, 3000)
            //window.alert("It's a draw")

        }
    }


    const changeTurn = () => {
        if(turn == o) {
            turn = x;
        }else if (turn == x) {
            turn = o;
        }
    }

    const checkLegal = (array, position) => {
        //we get your position
        console.log(array, position)

        array.forEach(element => {
            if(element.position == position) {
                console.log("Illegal")
            } else {
                console.log("Legal")
            }
        });


    }


    document.querySelector(".gameboard").addEventListener("click", (e) => {
        let currPlayer = turn.play(e.target.id);
        checkLegal(Gameboard.gameboard, currPlayer.position)
        Gameboard.add(currPlayer)
        
    

        displayController.reset()
        displayController.updateBoard(Gameboard.gameboard)
        changeTurn();
        checkState();

    })

})();

