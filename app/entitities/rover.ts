export enum Facing {
  North = 0,
  East = 90,
  South = 180,
  West = 270,
}
const fullCircle = 360;

type DirectionProps = "L" | "R";

export const errorMsgXNegative =
  "Position X must be greater than or equal to 0 ";
export const errorMsgYNegative =
  "Position Y must be greater than or equal to 0 ";

export default class Rover {
  constructor(
    private positionX: number,
    private positionY: number,
    private facing: Facing
  ) {
    if (positionX < 0) throw new Error(errorMsgXNegative);
    if (positionY < 0) throw new Error(errorMsgYNegative);
  }

  private _getNewXPosition() {
    const newPositionDirection = this.getMovePosition();
    let newPosition = this.positionX;
    if (newPositionDirection === "East") {
      newPosition = this.positionX + 1;
    }
    if (newPositionDirection === "West") {
      newPosition = this.positionX - 1;
    }

    return newPosition;
  }

  private _getNewYPosition() {
    const newPositionDirection = this.getMovePosition();
    let newPosition = this.positionY;
    if (newPositionDirection === "North") {
      newPosition = this.positionY + 1;
    }
    if (newPositionDirection === "South") {
      newPosition = this.positionY - 1;
    }

    return newPosition;
  }

  rotate(direction: DirectionProps) {
    const facingNormalizer = this.facing === 0 ? 360 : this.facing;

    if (direction === "R") {
      this.facing = (facingNormalizer + 90) % fullCircle;
      return;
    }
    this.facing = Math.abs(facingNormalizer - 90) % fullCircle;
  }

  move() {
    const [[_, __], [newPositionX, newPositionY]] =
      this.getCoordinateMovePosition();

    if (newPositionX < 0) throw new Error(errorMsgXNegative);
    if (newPositionY < 0) throw new Error(errorMsgYNegative);

    this.positionX = newPositionX;
    this.positionY = newPositionY;
  }

  getMovePosition() {
    return Facing[this.facing];
  }

  getCoordinateMovePosition() {
    const newXPosition = this._getNewXPosition();
    const newYPosition = this._getNewYPosition();

    const oldPositionList = [this.positionX, this.positionY];
    const newPositionList = [newXPosition, newYPosition];

    return [oldPositionList, newPositionList];
  }
}
