export const computerPick = (
  board,
  computerSymbol,
  winningCombos,
  userSymbol
) => {
  // if there's a winning move take it

  //loop through the combos
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    const values = [board[a], board[b], board[c]];
    //counts how many of each combo the computer has so far
    const filledCount = values.filter((v) => v === computerSymbol).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (filledCount === 2 && emptyCount === 1) {
      const emptyIndex = values.indexOf(null);
      return combo[emptyIndex];
    }
  }
  //if there's a place to block an opponent about to win take it
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    const values = [board[a], board[b], board[c]];
    //counts how many of each combo the computer has so far
    const filledCount = values.filter((v) => v === userSymbol).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (filledCount === 2 && emptyCount === 1) {
      const emptyIndex = values.indexOf(null);
      return combo[emptyIndex];
    }
  }
  //if the center is open take it

  //if a corner is open take it
  //else take sides
  const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let move of preferredMoves) {
    if (board[move] === null) {
      return move;
    }
  }
  return;
};
