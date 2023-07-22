/*----- constants -----*/
const startingGrid = [...new Array(225)]

/*----- state variables -----*/

/*----- cached elements  -----*/
const gridEl = document.querySelector(".grid")


/*----- event listeners -----*/

/*----- functions -----*/
function init() {
    startingGrid.forEach(function(cell, index) {
        let cellEl = document.createElement("div")
        cellEl.setAttribute("id", index)
        gridEl.appendChild(cellEl)
    })
}

init()