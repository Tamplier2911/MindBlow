function mindBlow(grid, startX, startY, endX, endY) {
  // rebuild the grid as a matrix (since cannot modify primitive values)
  grid = grid.map((str) => [...str]);

  // create a collection to store results
  const result = [];

  // stepIn is going to be our stepper
  // that going to perform movements in all directions
  // marking certain steps as false aka visited
  // once we reach endpoint we do want to store result in array
  const stepIn = (grid, stepX, stepY, steps = 0) => {
    // base cases
    if (!grid[stepX]) return;
    if (!grid[stepX][stepY] || grid[stepX][stepY] === 'X') return;

    // result found
    if (stepX === endX && stepY === endY) {
      console.log('BINGO!');
      result.push(steps);
      return;
    }

    // mark position as visited to avoid endless iteration
    grid[stepX][stepY] = false;

    // 2 -x, 1 -y
    /*[
        '.X.',
        '.X.',
        '...'
    ]*/

    // step diagonally top right
    stepIn(grid, stepX - 1, stepY + 1, steps + 1);
    // step diagonally top left
    stepIn(grid, stepX - 1, stepY - 1, steps + 1);
    // step diagonally bot right
    stepIn(grid, stepX + 1, stepY + 1, steps + 1);
    // step diagonally bot left
    stepIn(grid, stepX + 1, stepY - 1, steps + 1);
    // step left
    stepIn(grid, stepX, stepY - 1, steps + 1);
    // step right
    stepIn(grid, stepX, stepY + 1, steps + 1);
    // step top
    stepIn(grid, stepX - 1, stepY, steps + 1);
    // step bottom
    stepIn(grid, stepX + 1, stepY, steps + 1);
  };

  // invoke stepper with initial START position
  stepIn(grid, startX, startY);

  // return minial steps required to reach position
  return Math.min(...result);
}

// . X . < - end
// . X .
// . . .
//    \
//     start

// returns 2
console.log(mindBlow(['.X.', '.X.', '...'], 2, 1, 0, 2));

// . X . . < - end
// . X . .
// . . . .
//  \
//   start

// returns 3
console.log(mindBlow(['.X..', '.X..', '....'], 2, 0, 0, 3));

//   start
//  /
// . X . . < - end
// . X . .
// . . . .
console.log(mindBlow(['.X..', '.X..', '....'], 0, 0, 0, 3));
