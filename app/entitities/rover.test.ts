import Rover, { errorMsgXNegative, errorMsgYNegative } from "./rover";

describe("Rover", () => {
  describe("create", () => {
    it("success", () => {
      // Arrange
      const positionX = 2;
      const positionY = 3;
      const facing = 0;

      // Act
      const createdRover = new Rover(positionX, positionY, facing);

      // Assert
      expect(createdRover).toEqual({
        positionX,
        positionY,
        facing,
      });
    });

    describe("error", () => {
      it("x(minus)", () => {
        // Arrange
        const positionX = -2;
        const positionY = 3;
        const facing = 0;

        const createFunction = () => new Rover(positionX, positionY, facing);

        expect(createFunction).toThrow(errorMsgXNegative);
      });

      it("y(minus)", () => {
        // Arrange
        const positionX = 2;
        const positionY = -3;
        const facing = 0;

        const createFunction = () => new Rover(positionX, positionY, facing);

        expect(createFunction).toThrow(errorMsgYNegative);
      });
    });
  });

  describe("rotate R", () => {
    describe("initial: 0", () => {
      const rotation = "R";

      it("step 1", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 0;
        const newFacing = 90;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 2", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 90;
        const newFacing = 180;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 3", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 180;
        const newFacing = 270;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 4", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 270;
        const newFacing = 0;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });
    });
  });

  describe("rotate L", () => {
    describe("initial: 0", () => {
      const rotation = "L";
      it("step 1", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 0;
        const newFacing = 270;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 2", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 270;
        const newFacing = 180;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 3", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 180;
        const newFacing = 90;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });

      it("step 4", () => {
        // Arrange
        const positionX = 2;
        const positionY = 3;
        const facing = 90;
        const newFacing = 0;

        // Act
        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.rotate(rotation);

        // Assert
        expect(createdRover).toEqual({
          positionX,
          positionY,
          facing: newFacing,
        });
      });
    });
  });

  describe("getMovePosition()", () => {
    it("East", () => {
      const positionX = 2;
      const positionY = 3;
      const facing = 90;

      const createdRover = new Rover(positionX, positionY, facing);
      expect(createdRover.getMovePosition()).toBe("East");
    });

    it("South", () => {
      const positionX = 2;
      const positionY = 3;
      const facing = 180;

      const createdRover = new Rover(positionX, positionY, facing);
      expect(createdRover.getMovePosition()).toBe("South");
    });

    it("West", () => {
      const positionX = 2;
      const positionY = 3;
      const facing = 270;

      const createdRover = new Rover(positionX, positionY, facing);
      expect(createdRover.getMovePosition()).toBe("West");
    });

    it("North", () => {
      const positionX = 2;
      const positionY = 3;
      const facing = 0;

      const createdRover = new Rover(positionX, positionY, facing);
      expect(createdRover.getMovePosition()).toBe("North");
    });
  });

  describe("move()", () => {
    describe("move", () => {
      it("x: 0, y: 0 -> 1, f: north", () => {
        const positionX = 0;
        const positionY = 0;
        const facing = 0;
        const newPositionY = 1;

        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.move();
        expect(createdRover).toEqual({
          facing,
          positionX,
          positionY: newPositionY,
        });
      });

      it("x: 0 -> 1, y: 0, f: east", () => {
        const positionX = 0;
        const positionY = 0;
        const facing = 90;
        const newPositionX = 1;

        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.move();
        expect(createdRover).toEqual({
          facing,
          positionX: newPositionX,
          positionY,
        });
      });

      it("x: 0, y: 1 -> 0, f: south", () => {
        const positionX = 0;
        const positionY = 1;
        const facing = 180;
        const newPositiony = 0;

        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.move();
        expect(createdRover).toEqual({
          facing,
          positionX,
          positionY: newPositiony,
        });
      });

      it("x: 1 -> 0, y: 0, f: west", () => {
        const positionX = 1;
        const positionY = 0;
        const facing = 270;
        const newPositionX = 0;

        const createdRover = new Rover(positionX, positionY, facing);
        createdRover.move();
        expect(createdRover).toEqual({
          facing,
          positionX: newPositionX,
          positionY,
        });
      });
    });

    describe("not move", () => {
      it("x: 0, y: 0 -> 0, f: south", () => {
        const positionX = 0;
        const positionY = 0;
        const facing = 180;

        const createdRover = new Rover(positionX, positionY, facing);
        const roverMove = () => createdRover.move();
        expect(roverMove).toThrow(
          "Position Y must be greater than or equal to 0"
        );
      });

      it("x: 0 -> 0, y: 0, f: west", () => {
        const positionX = 0;
        const positionY = 0;
        const facing = 270;

        const createdRover = new Rover(positionX, positionY, facing);
        const roverMove = () => createdRover.move();
        expect(roverMove).toThrow(
          "Position X must be greater than or equal to 0"
        );
      });
    });
  });
});
