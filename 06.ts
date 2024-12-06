import * as fs from 'fs';

enum Tile {
    EMPTY = '.',
    VISITED = 'X',
    OBSTACLE = "#",
    GUARD = "^",
    VISITED_UP= "U",
    VISITED_DOWN = "D",
    VISITED_LEFT = "L",
    VISITED_RIGHT = "R",
    FAKE_OBSTACLE = "O",
}

enum Directions {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

function parseInput(input: string): string[][] {
    return input.trim().split('\n').map((line) => line.split(''));
}

function printGrid(grid: string[][]): void {
    console.log(grid.map((line) => line.join('')).join('\n'));
}

function isOutOfBounds(grid: string[][], x: number, y: number): boolean {
    return x < 0 || y < 0 || y >= grid.length || x >= grid[y].length;
}

function isObstacle(grid: string[][], x: number, y: number): boolean {
    return grid[y][x] === Tile.OBSTACLE || grid[y][x] === Tile.FAKE_OBSTACLE;
}

function isVisited(grid: string[][], x: number, y: number): boolean {
    return grid[y][x] === Tile.VISITED || grid[y][x] === Tile.VISITED_UP || grid[y][x] === Tile.VISITED_DOWN || grid[y][x] === Tile.VISITED_LEFT || grid[y][x] === Tile.VISITED_RIGHT;
}

function isTileEmpty(grid: string[][], x: number, y: number): boolean {
    return grid[y][x] === Tile.EMPTY;
}

function markVisited(grid: string[][], x: number, y: number, direction: Directions): void {
    switch (direction) {
        case Directions.UP:
            grid[y][x] = Tile.VISITED_UP;
            break;
        case Directions.DOWN:
            grid[y][x] = Tile.VISITED_DOWN;
            break;
        case Directions.LEFT:
            grid[y][x] = Tile.VISITED_LEFT;
            break;
        case Directions.RIGHT:
            grid[y][x] = Tile.VISITED_RIGHT;
            break;
    }
}

const input: string = fs.readFileSync('input.txt','utf8')
const grid = parseInput(input);
printGrid(grid);

let guardDirection: Directions = Directions.UP;

function findGuard(grid: string[][]): [number, number] {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === Tile.GUARD) {
                return [x, y];
            }
        }
    }
    return [-1, -1];
}

function turnGuardClockwise(): void {
    switch (guardDirection) {
        case Directions.UP:
            guardDirection = Directions.RIGHT;
            break;
        case Directions.DOWN:
            guardDirection = Directions.LEFT;
            break;
        case Directions.LEFT:
            guardDirection = Directions.UP;
            break;
        case Directions.RIGHT:
            guardDirection = Directions.DOWN;
            break;
    }
}

function advanceGuard(grid: string[][], x: number, y: number): [number, number] {
    switch (guardDirection) {
        case Directions.UP:
            if (isOutOfBounds(grid, x, y - 1)) {
                return [-1, -1];
            }
            if (!isObstacle(grid, x, y - 1)) {
                return [x, y - 1];
            }
            break;
        case Directions.DOWN:
            if (isOutOfBounds(grid, x, y + 1)) {
                return [-1, -1];
            }
            if (!isObstacle(grid, x, y + 1)) {
                return [x, y + 1];
            }
            break;
        case Directions.LEFT:
            if (isOutOfBounds(grid, x - 1, y)) {
                return [-1, -1];
            }
            if (!isObstacle(grid, x - 1, y)) {
                return [x - 1, y];
            }
            break;
        case Directions.RIGHT:
            if (isOutOfBounds(grid, x + 1, y)) {
                return [-1, -1];
            }
            if (!isObstacle(grid, x + 1, y)) {
                return [x + 1, y];
            }
            break;
    }
    turnGuardClockwise();
    console.log(`Guard turned to direction: ${guardDirection}`);
    return advanceGuard(grid, x, y);
}

let visitedTiles = 0;

while (JSON.stringify(findGuard(grid)) !== JSON.stringify([-1, -1])) {
    const [x, y] = findGuard(grid);
    console.log(`Guard found at: [${x}, ${y}]`);
    const [newX, newY] = advanceGuard(grid, x, y);
    if (JSON.stringify([newX, newY]) === JSON.stringify([-1, -1])) {
        console.log('Guard is out of bounds');
        markVisited(grid, x, y, guardDirection);
        printGrid(grid);
        break;
    }
    console.log(`Guard moved to: [${newX}, ${newY}]`);

    grid[y][x] = Tile.EMPTY; // Mark the old position as empty
    grid[newY][newX] = Tile.GUARD; // Mark the new position with the guard
    markVisited(grid, x, y, guardDirection);
    printGrid(grid);
}

console.log('Loop ended');

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (isVisited(grid, x, y)) {
            visitedTiles++;
        }
    }
}

console.log(`Visited tiles: ${visitedTiles}`);