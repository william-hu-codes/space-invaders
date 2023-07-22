/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = [0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39]
/*----- state variables -----*/
let direction;
let currentShooterPos;
let currentAliens;
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")

/*----- event listeners -----*/
document.addEventListener("keydown", moveShooter)

function moveShooter(evt) {
    cellElsArr[currentShooterPos].classList.remove("shooter")
    switch(evt.key) {
        case "ArrowLeft": 
            if (currentShooterPos % 15 !== 0) {currentShooterPos -= 1}
            break
        case "ArrowRight":
            //not sure how to check if it is on the very right side of grid
            currentShooterPos += 1
            break
    }
    renderShooter()
}
/*----- functions -----*/
function init() {
    createGameboard()
    currentAliens = [...startingAliens]
    currentShooterPos = 202
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

renderShooter()

function renderShooter() {
    cellElsArr[currentShooterPos].classList.add("shooter")
}

function createGameboard() {
    startingGrid.forEach(function(cell, index) {
        let cellEl = document.createElement("div")
        cellEl.setAttribute("id", index)
        gridEl.appendChild(cellEl)
    })
}

function render() {
}