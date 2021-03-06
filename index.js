const mindBlow = (grid, startX, startY, endX, endY) => {
  // rebuild the grid as a matrix (since cannot modify primitive values)
  grid = grid.map((str) => [...str]);

  // create a collection to store results
  // const result = [];

  // no need collection if we not collecting values
  let minResultVal = Infinity;

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
      // console.log('BINGO!');
      // result.push(steps);
      minResultVal = Math.min(minResultVal, steps);
      return;
    }

    /* 20.08 4:30*/
    // so i thought, what if i don't need to know ALL posible ways, what if
    // i could reduce amount of stack frames comparing steps with max value
    // i get from current result, filtering out unnecessary values
    // and that is what i end up with

    // const minResultVal = Math.min(...result);
    if (steps >= minResultVal) return;

    // and here is measure optimization i achieved:

    // PRE OPTIMIZATION
    // case 1 - 11 iterations - return 2
    // case 2 - 125 iterations - return 3
    // case 3 - 124 iterations - return 4
    // case 4 - 88 iterations - return 8

    // POST OPTIMIZATION
    // case 1 - 5 iterations - return 2
    // case 2 - 8 iterations - return 3
    // case 3 - 8 iterations - return 4
    // case 4 - 56 iterations - return 8

    /* 19.08 20:00*/
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
  // return Math.min(...result);
  return minResultVal;
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
