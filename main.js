/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = [0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39]
const width = 15
const convertProp = {
    easy: 5000,
    medium: 800,
    hard: 200
}
/*----- state variables -----*/
let direction;
let currentShooterPos;
let currentAliens;
let interval;
let missileInterval;
let alienInterval;
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")
let cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
const buttonEls = document.querySelectorAll("button.difficulty")
const restartEl = document.querySelector(".restart")
/*----- event listeners -----*/
buttonEls.forEach(function(buttonEl) {
    buttonEl.addEventListener("click", handleClick)
})

restartEl.addEventListener("click", reset)

function reset() {
    clearInterval(missileInterval)
    clearInterval(alienInterval)
    clearGameboard()
    buttonEls.forEach(function(buttonEl) {
        buttonEl.addEventListener("click", handleClick)
    })
}
function handleClick(evt) {
    interval = convertProp[evt.target.innerText.toLowerCase()]
    init()
    buttonEls.forEach(function(buttonEl) {
        buttonEl.removeEventListener("click", handleClick)
    })
}

document.addEventListener("keydown", moveShooter)

function moveShooter(evt) {
    if (evt.key !== "ArrowLeft" && evt.key !== "ArrowRight") return;
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
    console.log(evt.key)
    let currentMissilePos = currentShooterPos
    function moveMissile() {
        cellElsArr[currentMissilePos].classList.remove("missile")
        if (currentMissilePos > width) {
            currentMissilePos -= width
            cellElsArr[currentMissilePos].classList.add("missile")
        } else return;
    }
    switch(evt.key) {
        case " ":
            missileInterval = setInterval(moveMissile, 100)
            break
    }
}
/*----- functions -----*/
function init() {
    createGameboard()
    currentAliens = [...startingAliens]
    // currentShooterPos = 202
    direction = 1
    cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
    renderAliens()
    // renderShooter()
    alienInterval = setInterval(moveAliens, interval)
}

// init()

function moveAliens() {
    //remove current aliens from screen
    removeAliens()
    //x position (column) of first and last alien
    const firstAlien = currentAliens[0]
    const lastAlien = currentAliens[currentAliens.length - 1]

    const firstAlienX = firstAlien % width
    const lastAlienX = lastAlien % width
    //checking if we will hit an edge
    const isEdge = firstAlienX + direction < 0 ||lastAlienX + direction > width - 1
    console.log(firstAlienX, lastAlienX, isEdge)

    if (isEdge) {
        direction = direction * (-1)
    }

    for(let i = 0; i < currentAliens.length; i++) {
        if (isEdge) {
            //if at an edge, then move aliens down one row (width)
            currentAliens[i] += width
        } else {
            //otherwise, move the aliens left/right (direction)
            currentAliens[i] += direction
        }
    }
    renderAliens()
    if (cellElsArr[currentShooterPos].classList.contains("alien", "shooter") || cellElsArr[currentAliens[currentAliens.length -1]] >= 210){
        console.log("game over")
        clearInterval(alienInterval)
    }
    console.log("aliens moved!")
// TODO if cell of shooter contains class of both alien and shooter, then render game over, clear interval
//TODO if cell of alien is in the last row of grid, render game over and clear interval
}

function renderAliens() {
    for (let i = 0; i < currentAliens.length; i++)
    cellElsArr[currentAliens[i]].classList.add("alien")
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

function clearGameboard() {
    while (gridEl.lastElementChild) {
        gridEl.removeChild(gridEl.lastElementChild)
    }
}