const Gameboard = (() => {
    //
    let gameboard = [];

    const resetGameboard = () => {
        gameboard = [null, null, null, null, null, null, null, null, null]
    }
    return {
       gameboard, resetGameboard
    }
})();

//event listener za klik
//

const Player = (name, type) => {
    //is the player with x or o
    //name of the player
    //wins
    //losses
    return {name, type}
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
            document.getElementById(`${index}`).insertAdjacentHTML("beforeend", appendHTML(el))
            
        });
    }

    return {updateBoard};
})();


const Gameflow = (() => {
    Gameboard.resetGameboard();
    displayController.updateBoard(Gameboard.gameboard)
    const o = Player("Neznam", "o")
    const x = Player("Bupubu", "x");
    //whose turn is it
    //track game
    //check if 3 are connected
    //check if the fields are full and none are connected

})();

