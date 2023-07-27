    // const isEdge = currentAliens[0] % width === 0 || currentAliens[currentAliens.length - 1] % width === width -1 
    // removeAliens()
    // if (isEdge) {
    //     for (let i = 0; i < currentAliens.length; i++) {
    //         currentAliens[i] += width
    //         direction = (direction)*(-1)
    //     }
    // }
    // for (let i = 0; i < currentAliens.length; i++) {
    //     currentAliens[i] += direction
    // }
    // console.log("aliens moved!")
    // renderAliens()

    // text-shadow: 0 0 0 transparent,
    // 0 0 10px #ff003c,
    // 0 0 20px rgba(255, 0, 60, 0.5),
    // 0 0 40px #ff003c,
    // 0 0 100px #ff003c,
    // 0 0 200px #ff003c,
    // 0 0 300px #ff003c,
    // 0 0 500px #ff003c,
    // 0 0 1000px #ff003c;

    // @keyframes glitch1 {
    //     0% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     7% {
    //       transform: skew(-0.5deg, -0.9deg);
    //       opacity: 0.75;
    //     }
    //     10% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     27% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     30% {
    //       transform: skew(0.8deg, -0.1deg);
    //       opacity: 0.75;
    //     }
    //     35% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     52% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     55% {
    //       transform: skew(-1deg, 0.2deg);
    //       opacity: 0.75;
    //     }
    //     50% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     72% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     75% {
    //       transform: skew(0.4deg, 1deg);
    //       opacity: 0.75;
    //     }
    //     80% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //     100% {
    //       transform: none;
    //       opacity: 1;
    //     }
    //   }
      
    //   @keyframes glitch2 {
    //     0% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     7% {
    //       transform: translate(-2px, -3px);
    //       opacity: 0.5;
    //     }
    //     10% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     27% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     30% {
    //       transform: translate(-5px, -2px);
    //       opacity: 0.5;
    //     }
    //     35% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     52% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     55% {
    //       transform: translate(-5px, -1px);
    //       opacity: 0.5;
    //     }
    //     50% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     72% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     75% {
    //       transform: translate(-2px, -6px);
    //       opacity: 0.5;
    //     }
    //     80% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //     100% {
    //       transform: none;
    //       opacity: 0.25;
    //     }
    //   }

    // function moveAliens() {
    //     //remove current aliens from screen
    //     removeAliens()
    //     //x position (column) of first and last alien
    //     const leftAlien = currentAliens[0]
    //     const rightAlien = currentAliens[currentAliens.length - 1]
    //     const leftAlienX = leftAlien % width
    //     const rightAlienX = rightAlien % width
    //     //checking if we will hit an edge
    //     const isEdge = leftAlienX + direction < 0 ||rightAlienX + direction > width - 1
    //     // console.log(leftAlienX, rightAlienX, isEdge)
    //     if (isEdge) {
    //         direction = direction * (-1)
    //     }
    //     for(let i = 0; i < currentAliens.length; i++) {
    //         if (isEdge) {
    //             //if at an edge, then move aliens down one row (width)
    //             currentAliens[i] += width
    //         } else {
    //             //otherwise, move the aliens left/right (direction)
    //             currentAliens[i] += direction
    //         }
    //     }
    //     renderAliens()
    //     checkWinner()
    //     checkLoser()
    // }