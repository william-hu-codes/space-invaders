/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = [0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39]
const width = 15
/*----- state variables -----*/
let direction;
let currentShooterPos;
let currentAliens;
let interval = 500
let missileIndex
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")
let cellElsArr = Array.from(document.querySelectorAll(".grid > div"))

/*----- event listeners -----*/
document.addEventListener("keydown", moveShooter)

function moveShooter(evt) {
    cellElsArr[currentShooterPos].classList.remove("shooter")
    switch(evt.key) {
        case "ArrowLeft": 
            if (currentShooterPos % width !== 0) {currentShooterPos -= 1}
            break
        case "ArrowRight":
            if (currentShooterPos % width < width - 1) {currentShooterPos += 1}
            break
    }
    renderShooter()
}
document.addEventListener("keydown", launchMissile)
function launchMissile(evt) {
    missileIndex = currentShooterPos
    moveMissile()
    switch(evt.key) {
        case " ":
            reRender = setInterval(moveMissile, 900)
    }
}
/*----- functions -----*/
function init() {
    createGameboard()
    currentAliens = [...startingAliens]
    currentShooterPos = 202
    direction = -1
    cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
    renderAliens()
}

init()


function renderAliens() {
    for (let i = 0; i < currentAliens.length; i++)
    cellElsArr[currentAliens[i]].classList.add("alien")
}

renderShooter()

function moveAliens() {
    const isEdge = currentAliens[0] % width === 0 || currentAliens[currentAliens.length - 1] % width === width -1 
    removeAliens()
    if (isEdge) {
        for (let i = 0; i < currentAliens.length; i++) {
            currentAliens[i] += width
            direction = (direction)*(-1)
        }
    }
    for (let i = 0; i < currentAliens.length; i++) {
        currentAliens[i] += direction
    }
    console.log("aliens moved!")
    renderAliens()
// TODO if cell of shooter contains class of both alien and shooter, then render game over, clear interval
}

function removeAliens() {
    for (let i = 0; i < currentAliens.length; i++)
    cellElsArr[currentAliens[i]].classList.remove("alien")
}

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

//not sure if this function is needed or if it can just be added into movemissile function
function renderMissile() {
    cellElsArr[missileIndex].classList.add("missile")
}

function moveMissile() {
    cellElsArr[missileIndex].classList.remove("missile")
    missileIndex -= width
    renderMissile()
}
// setInterval(moveAliens, 100)