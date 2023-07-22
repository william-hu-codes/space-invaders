/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = [0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39]
/*----- state variables -----*/
let direction;
let currentShooter;
let currentAliens;
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")

/*----- event listeners -----*/


/*----- functions -----*/
function init() {
    createGameboard()
    currentAliens = [...startingAliens]
    currentShooter = 205
}
// HERE TO OTHER NOTE MUST COME IN THIS ORDER FOR CONTROL FLOW TO WORK
init()

const cellElsArr = Array.from(document.querySelectorAll(".grid > div"))

function createAliens() {
    for (let i = 0; i < currentAliens.length; i++)
    cellElsArr[currentAliens[i]].classList.add("alien")
}
createAliens()
// HERE TO PREVIOUS NOTE MUST COME IN THIS ORDER FOR CONTROL FLOW TO WORK

createShooter()
//not sure if this function is needed or if it can just be one line in init function
function createShooter() {
    cellElsArr[currentShooter].classList.add("shooter")
}

function createGameboard() {
    startingGrid.forEach(function(cell, index) {
        let cellEl = document.createElement("div")
        cellEl.setAttribute("id", index)
        gridEl.appendChild(cellEl)
    })
}

function moveShooter(evt) {

}

function render() {
}