export const bombGeneration = (board) => {
  //
  console.log("Board length:", board.length);
  let newBoard = [...board];
  if (newBoard.length === 64) {
    let bombMax = 10;
    let bombTotal = 0;
    while (bombTotal != bombMax) {
      // keeps running until all bomb are in place
      // pick random spots
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);
      let index = row * 8 + col; // the index to be checked
      if (newBoard[index] === 0) {
        // if there is no bomb
        newBoard[index] = "B"; // place a bomb
        bombTotal += 1; // increase bomb count
      }
    }
    for (let i = 0; i <= newBoard.length - 1; i++) {
      let row = Math.floor(i / 8);
      let col = i % 8;
      // access the position on the bomb-filled newBoard
      let tile = newBoard[i];
      if (newBoard[i] != "B") {
        // if this tile is a bomb, skip it
        let bombCount = 0; // total bombs surronding the current tile
        // checking up
        if (i - 8 >= 0 && newBoard[i - 8] === "B") {
          bombCount += 1;
        }
        //checking down
        if (i + 8 < 64 && newBoard[i + 8] === "B") {
          bombCount += 1;
        }
        //checking left
        if (col > 0 && newBoard[i - 1] === "B") {
          bombCount += 1;
        }
        //checking right
        if (col < 7 && newBoard[i + 1] === "B") {
          bombCount += 1;
        }
        //checking top left
        if (i - 8 >= 0 && col > 0 && newBoard[i - 9] === "B") {
          bombCount += 1;
        }

        //checking top right
        if (i - 8 >= 0 && col < 7 && newBoard[i - 7] === "B") {
          bombCount += 1;
        }
        //cehcking bottom left
        if (i + 8 < 64 && col > 0 && newBoard[i + 7] === "B") {
          bombCount += 1;
        }
        //checking bottom right
        if (i + 8 < 64 && col < 7 && newBoard[i + 9] === "B") {
          bombCount += 1;
        }
        newBoard[i] = bombCount;
      }
    }
    console.log(newBoard);
    return newBoard;
  }
};

export const printBoard = (board) => {
  for (let row = 0; row < 8; row++) {
    let rowStr = "";
    for (let col = 0; col < 8; col++) {
      const index = row * 8 + col;
      rowStr += board[index] + " ";
    }
    console.log(rowStr.trim());
  }
};

// later checks
//index - 8  (up)
// index + 8  (down)
// index - 1  (left)
// index + 1  (right)
// index - 9  (up-left)
// index - 7  (up-right)
// index + 7  (down-left)
// index + 9  (down-right)

// if the player clicks a tile with no neighboring bombs, nearby tiles are revealed
