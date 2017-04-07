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
    ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]}],
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Hit!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false;
    },
    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);//1 or 2
        var row, col;

        if (direction === 1) {
            //generate a starting location for a horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            //generate a starting location for a vertical ship
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                //add location to array for new horizontal ship
                newShipLocations.push(row + "" + (col + i));
            } else {
                //add location to array for new vertical ship
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    generateShipLocation: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    }
};
var controller = {
    guesses: 0,
    parseGuess: function (guess) {//生成最终的坐标，对应表格单元格的id
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2) {
            alert("Oops,please enter a letter and a number on the board.");
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);

            if (isNaN(row) || isNaN(column)) {
                alert("Oops,that isn't on the board.");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Oops,that's off the board!");
            } else {
                return row + column;
            }
        }
        return null;
    },
    processGuess: function (guess) {
        if (isNaN(guess)) {
            var location = this.parseGuess(guess);
        }
        else {
            location = guess;
        }
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleship, in " + this.guesses + " guesses");
            }
        }
    }
};

function handleClick(eventObj) {
    var cell = eventObj.target;
    var location = cell.id;
    controller.processGuess(location);
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";//Delete what you enter before next guess
}
function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocation();

    var locations = document.getElementsByTagName("td");
    for (var i = 0; i < locations.length; i++) {
        locations[i].onclick = handleClick;
    }
}

window.onload = init;
