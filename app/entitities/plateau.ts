import Rover from "./rover";

export const errorMsgXNegative =
  '"Max Position X must be greater than or equal to 0 "';
export const errorMsgYNegative =
  '"Max Position Y must be greater than or equal to 0 "';

export type CommandProps = "L" | "R" | "M";

export function createEmptyGrid(x: number, y: number) {
  return Array(x + 1)
    .fill(0)
    .map(() => Array(y + 1).fill(0));
}

export default class Plateau {
  private currentRoverPosition = 1;
  private grid: number[][];

  constructor(
    private readonly maxPositionX: number,
    private readonly maxPositionY: number,

    private rovers: Rover[]
  ) {
    if (maxPositionX < 0) throw new Error(errorMsgXNegative);
    if (maxPositionY < 0) throw new Error(errorMsgYNegative);
    this.grid = createEmptyGrid(maxPositionX, maxPositionY);
  }

  private _checkIfSomeRoverAreThere(positionX: number, positionY: number) {
    return Boolean(this.grid[positionX][positionY]);
  }

  private _moveRover(currentRover: Rover) {
    const [[oldPositionX, oldPositionY], [nextMoveX, nextMoveY]] =
      currentRover.getCoordinateMovePosition();

    if (nextMoveX > this.maxPositionX) {
      return;
    }
    if (nextMoveX < 0) {
      return;
    }
    if (nextMoveY > this.maxPositionY) {
      return;
    }
    if (nextMoveY < 0) {
      return;
    }

    if (!this._checkIfSomeRoverAreThere(nextMoveX, nextMoveY)) {
      // Move to next position
      this.grid[nextMoveX][nextMoveY] = this.currentRoverPosition;
      // Remove from old one
      this.grid[oldPositionX][oldPositionY] = 0;
      // Move on rover class
      currentRover.move();
    }
  }

  getRoversQuantity() {
    return this.rovers.length;
  }

  getRoverByPosition(position: number) {
    if (position < 0) throw new Error("Wrong position");
    if (position > this.rovers.length) throw new Error("Wrong position");

    return this.rovers[position];
  }

  // Using on test cases, for expecting purposes
  // Getting the rovers on Plateau using the pattern: 'positionX-positionY-facingSide'
  getPositionsWithRovers() {
    let rovers = 0;
    let roversPositions: string[] = [];
    this.grid.forEach((line, lineIndex) => {
      line.forEach((column, columnIndex) => {
        if (column > 0) {
          rovers++;
          const content = `${lineIndex}-${columnIndex}-${this.rovers[
            this.currentRoverPosition - 2
          ].getMovePosition()}`;
          roversPositions.push(content);
        }
      });
    });
    return { rovers, roversPositions };
  }

  // For output purposes
  printGrid() {
    process.stdout.write(`* |`);
    new Array(this.maxPositionY + 1).fill(1).forEach((item, index) => {
      process.stdout.write(`${index}`);
    });
    // end index line
    process.stdout.write("\n");
    new Array(this.maxPositionY + 4).fill(1).forEach((item, index) => {
      process.stdout.write(`-`);
    });
    // end separator line
    process.stdout.write("\n");
    this.grid.forEach((line, lineIndex) => {
      process.stdout.write(`${lineIndex} |`);
      line.forEach((column) => {
        process.stdout.write(`${column > 0 ? column - 1 : column}`);
      });
      process.stdout.write("\n");
    });
  }

  insertRover(positionX: number, positionY: number, facing: number) {
    if (positionX < 0) return false;
    if (positionY < 0) return false;

    if (this._checkIfSomeRoverAreThere(positionX, positionY)) {
      return false;
    }

    const createdRover = new Rover(positionX, positionY, facing);
    this.rovers.push(createdRover);

    this.grid[positionX][positionY] = this.currentRoverPosition;
    this.currentRoverPosition++;
    return true;
  }

  outputRoversDetails() {
    return this.rovers.map((item) => {
      const [[positionX, positionY]] = item.getCoordinateMovePosition();
      const [facingLetter] = item.getMovePosition();
      return { positionX, positionY, facingLetter };
    });
  }

  executeCommand(command: CommandProps) {
    const currentRover = this.rovers[this.currentRoverPosition - 2];
    if (command === "M") {
      this._moveRover(currentRover);
      return;
    }

    currentRover.rotate(command);
  }
}
