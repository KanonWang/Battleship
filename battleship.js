/**
 * Created by kanon on 2017/3/28.
 */
/*
 var location1=3;
 var location2=4;
 var location3=5;
 var guess;
 var hits=0;
 var guesses=0;
 var isSunk=false;

 while (isSunk==false){
 guess=prompt("ready,aim,fire!(enter a number 0-6):");
 if(guess<0||guess>6){
 alert("Please enter a valid cell number!");
 }else {
 guesses = guesses + 1;

 if (guess == location1 || guess==location2 || guess==location3) {
 alert("HIT!");
 hits = hits + 1;
 if (hits == 3) {
 isSunk = true;
 alert("You sank my battleship!")
 }
 }else{
 alert("MISS");
 }
 }
 }
 var statas="You took "+guesses+"guesses to sink the battleship,"+"shich means your shooting accuracy was "+(3/guesses);
 alert(statas);
 */


var view = {
    //this method takes a string message and displays it
    //in the message display area
    displayMessage: function (msg) {
        //code to be supplied in a bit!
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}],
    isSunk:function (ship) {
        for(var i=0;i<this.shipLength;i++){
            if(ship.hits[i]!=="hit"){
                return false;
            }
        }
        return true;
    },
    fire:function (guess) {
        for(var i=0;i<this.numShips;i++){
            var ship=this.ships[i];
            var index=ship.locations.indexOf(guess);
            if(index>=0){
                ship.hits[index]="hit";
                view.displayHit(guess);
                view.displayMessage("Hit!");
                if(this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false;
    }
};
var controller={
  guesses:0,
  processGuess:function (guess) {
      var alphabet=["A","B","C","D","E","F","G"];
      if(guess===null||guess.length!==2){
          alert("Oops,please enter a letter and a number on the board.");
      }else {
          var firstChar=guess.charAt(0);
          var row=alphabet.indexOf(firstChar);
          var column=guess.charAt(1);

          if(isNaN(row)||isNaN(column)){
              alert("Oops,that isn't on the board.");
          }else if (row<0||row>=model.boardSize||column<0||column>=model.boardSize){
              alert("Oops,that's off the board!");
          }else {
              return row+column;
          }
      }
      return null;
  }
};