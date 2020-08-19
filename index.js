const mindBlow = (grid, startX, startY, endX, endY) => {
  // rebuild the grid as a matrix (since cannot modify primitive values)
  grid = grid.map((str) => [...str]);

  // create a collection to store results
  const result = [];

  // stepIn is going to be our stepper
  // that going to perform movements in all directions
  // marking certain steps as false aka visited
  // once we reach endpoint we do want to store result in result array
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

    // i decide to add this modification to count ALL possible ways
    // to reach end point, now i no longer mutate initially given grid,
    // but creating new grid for each step of eight steps i take.

    // i understand, that this is by far not perfect solution and each
    // recursion call will increase time complexity exponentially
    // in worst case each stepper call will make another 8 calls
    // creating another 8 grids respectively

    // deep cloning initial grid
    grid = JSON.parse(JSON.stringify(grid));

    // mark current position as visited to avoid endless iteration
    grid[stepX][stepY] = false;

    // 2 -x, 1 -y
    /*[
        ['.','X','.'],
        ['.','X','.'],
        ['.',false,'.']
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
};

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

// returns 4
console.log(mindBlow(['.X..', '.X..', '....'], 0, 0, 0, 3));

//   start
//  /
// . X . X . X . < - end
// . X . X . X .
// . . . . X . .

// returns 8
console.log(mindBlow(['.X.X.X.', '.X.X.X.', '....X..'], 0, 0, 0, 6));
