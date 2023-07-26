/*----- constants -----*/
const startingGrid = [...new Array(225)]
const startingAliens = 
    [0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39]
const width = 15
const convertProp = {
    easy: 300,
    medium: 200,
    hard: 100
}
const points = {
    easy: 200,
    medium: 400,
    hard: 500
}
/*----- state variables -----*/
let direction;
let currentShooterPos;
let currentAliens;
let interval;
let currentScore;
let hiScore=0
let aliensKilled;
let alienInterval;
/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")
let cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
const buttonEls = document.querySelectorAll("button.difficulty")
const restartEl = document.querySelector(".restart")
const infoEl = document.querySelector(".infoMessage")
const textEls = document.querySelectorAll(".text")
const currentScoreEl = document.querySelector(".current-score")
const hiScoreEl = document.querySelector(".hi-score")
/*----- event listeners -----*/
buttonEls.forEach(function(buttonEl) {
    buttonEl.addEventListener("click", handleClick)
})

restartEl.addEventListener("click", reset)

document.addEventListener("keydown", moveShooter)

document.addEventListener("keydown", launchMissile)

/*----- functions -----*/
function init() {
    createGameboard()
    currentAliens = [...startingAliens]
    aliensKilled = []
    currentScore = 0
    currentShooterPos = 202
    direction = 1
    cellElsArr = Array.from(document.querySelectorAll(".grid > div"))
    renderScores()
    renderAliens()
    renderShooter()
    alienInterval = setInterval(moveAliens, interval)
}
function moveAliens() {
    //remove current aliens from screen
    removeAliens()
    //x position (column) of first and last alien


    const leftAlien = currentAliens[0]
    const rightAlien = currentAliens[currentAliens.length - 1]
    const leftAlienX = leftAlien % width
    const rightAlienX = rightAlien % width
    //checking if we will hit an edge
    const isEdge = leftAlienX + direction < 0 ||rightAlienX + direction > width - 1
    // console.log(leftAlienX, rightAlienX, isEdge)
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

    
    // for (i = 0; i < currentAliens.length; i++) {
    //     let direction = 1
    //     if (edgeIndexes.includes(currentAliens[i])) {
    //         currentAliens[i] += (width + direction)
    //     }else {
    //         currentAliens[i] += direction
    //     }
    // }   direction = direction *-1

    renderAliens()
    checkWinner()
    checkLoser()
}

function renderAliens() {
    for (let i = 0; i < currentAliens.length; i++) {
        if (!aliensKilled.includes(i)) {
            cellElsArr[currentAliens[i]].classList.add("alien")
        }
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
    if ((cellElsArr[currentShooterPos].classList.contains("alien")) || (currentAliens[currentAliens.length - 1] >= 210)){
        console.log("game over")
        clearInterval(alienInterval)
        document.removeEventListener("keydown", moveShooter)
        document.removeEventListener("keydown", launchMissile)
        renderLoser()
    }    
}   
function checkWinner() {
    if (aliensKilled.length === 30) {
        console.log("Winner!")
        clearInterval(alienInterval)
        document.removeEventListener("keydown", moveShooter)
        document.removeEventListener("keydown", launchMissile)
        renderWinner()
    }
}

function renderWinner() {
    infoEl.textContent = "Great work! You prevented an alien invasaion!"
    textEls.forEach(function(textEl) {
        textEl.style.textShadow = "0 0 5px #fff, 0 0 10px #fff, 0 0 15px green, 0 0 20px green, 0 0 25px green, 0 0 30px green, 0 0 35px green"
    })
    gridEl.style.backgroundImage = "url('assets/spaceBackground.gif')"
}

function renderLoser() {
    infoEl.textContent = "GAME OVER!"
    textEls.forEach(function(textEl) {
        textEl.style.textShadow = "0 0 5px #fff, 0 0 10px #fff, 0 0 15px red, 0 0 20px red, 0 0 25px red, 0 0 30px red, 0 0 35px red"
    })
}


// EVENT LISTENER CALLBACK FUNCTIONS
function reset() {
    clearInterval(alienInterval)
    clearGameboard()
    gridEl.style.backgroundImage = ""
    gridEl.style.backgroundColor = "black"
    document.addEventListener("keydown", moveShooter)
    document.addEventListener("keydown", launchMissile)
    buttonEls.forEach(function(buttonEl) {
        buttonEl.removeAttribute("disabled")
    })
    gridEl.style.backgroundImage = "url('assets/starsbackgroundgif.gif')"
    infoEl.textContent = "Select difficulty level to start:"
    textEls.forEach(function(textEl) {
        textEl.style.textShadow = "0 0 5px #fff, 0 0 10px #fff, 0 0 15px purple, 0 0 20px purple, 0 0 25px purple, 0 0 30px purple, 0 0 35px purple"
    })
}

function handleClick(evt) {
    infoEl.textContent = "Good luck!"
    interval = convertProp[evt.target.innerText.toLowerCase()]
    difficulty=evt.target.innerText.toLowerCase()
    init()
    buttonEls.forEach(function(buttonEl) {
        buttonEl.setAttribute("disabled", "true")
    })
}

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
            aliensKilled.push(shotAlienIndex)
            console.log(aliensKilled)
            // currentAliens.splice(shotAlienIndex, 1)
            currentScore += points[difficulty]
            renderScores()
        }
    }
    switch(evt.key) {
        case " ":
            missileInterval = setInterval(moveMissile, 100)
            break
    }
}
function renderScores() {
    renderCurrentScore()
    renderHiScore()
}
function renderCurrentScore() {
    currentScoreEl.textContent = `Current score: ${currentScore}`
}


function renderHiScore() {
    if (currentScore > hiScore) {
        hiScore = currentScore
    }
    hiScoreEl.textContent = `Hi-score: ${hiScore}`
}
