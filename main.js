/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = [0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39]
const width = 15
const convertProp = {
    easy: 5000,
    medium: 400,
    hard: 100
}
/*----- state variables -----*/
let direction;
let currentShooterPos;
let currentAliens;
let interval;
// let missileInterval;
let alienInterval;
let aliensKilled;
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")
let cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
const buttonEls = document.querySelectorAll("button.difficulty")
const restartEl = document.querySelector(".restart")
const infoEl = document.querySelector(".infoMessage")
/*----- event listeners -----*/
buttonEls.forEach(function(buttonEl) {
    buttonEl.addEventListener("click", handleClick)
})

restartEl.addEventListener("click", reset)

function reset() {
    // clearInterval(missileInterval)
    clearInterval(alienInterval)
    clearGameboard()
    gridEl.style.backgroundColor = "black"
    document.addEventListener("keydown", moveShooter)
    document.addEventListener("keydown", launchMissile)
    buttonEls.forEach(function(buttonEl) {
        buttonEl.addEventListener("click", handleClick)
    })
    infoEl.textContent = "Select difficulty level to start:"
}
function handleClick(evt) {
    infoEl.textContent = "Good luck!"
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
    let missileInterval
    console.log(evt.key)
    let currentMissilePos = currentShooterPos
    function moveMissile() {
        cellElsArr[currentMissilePos].classList.remove("missile")
        if (currentMissilePos < width) return
        currentMissilePos -= width
        cellElsArr[currentMissilePos].classList.add("missile")
        if (cellElsArr[currentMissilePos].classList.contains("alien")) {
            clearInterval(missileInterval)
            cellElsArr[currentMissilePos].classList.remove("missile")
            cellElsArr[currentMissilePos].classList.remove("alien")
            let shotAlienIndex = currentAliens.indexOf(currentMissilePos)
            currentAliens.splice(shotAlienIndex, 1)
        }
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
    aliensKilled = []
    currentShooterPos = 202
    direction = 1
    cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
    renderAliens()
    renderShooter()
    alienInterval = setInterval(moveAliens, interval)
}
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
    // console.log(firstAlienX, lastAlienX, isEdge)

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
    checkWinner()
    checkLoser()
    renderAliens()
}
    // console.log("aliens moved!")


function renderAliens() {
    for (let i = 0; i < currentAliens.length; i++)
    if (!aliensKilled.includes(i)) {
        cellElsArr[currentAliens[i]].classList.add("alien")
    }
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
function checkLoser() {
    if (cellElsArr[currentShooterPos].classList.contains("alien", "shooter") || currentAliens[currentAliens.length - 1] >= 210){
        console.log("game over")
        infoEl.textContent = "GAME OVER!"
        clearInterval(alienInterval)
        document.removeEventListener("keydown", moveShooter)
        document.removeEventListener("keydown", launchMissile)
    }    
}   
function checkWinner() {
    if (currentAliens.length === 0) {
    console.log("Winner!")
    infoEl.textContent = "Great work! You prevented an alien invasaion!"
    clearInterval(alienInterval)
    document.removeEventListener("keydown", moveShooter)
    document.removeEventListener("keydown", launchMissile)
    gridEl.style.backgroundColor = "blue"
    }
}