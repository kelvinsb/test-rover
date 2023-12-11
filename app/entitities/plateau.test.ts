import Plateau, { CommandProps, createEmptyGrid } from "./plateau";
import Rover, { errorMsgXNegative, errorMsgYNegative } from "./rover";

describe("Plateau", () => {
  describe("create", () => {
    describe("error", () => {
      describe("negative", () => {
        it("max x position", () => {
          // Arrange
          const maxPositionX = -1;
          const maxPositionY = 2;
          const rovers: Rover[] = [];

          // Act
          const createdPlateauFunction = () =>
            new Plateau(maxPositionX, maxPositionY, rovers);

          // Assert
          expect(createdPlateauFunction).toThrow(
            "Max Position X must be greater than or equal to 0"
          );
        });

        it("max y position", () => {
          // Arrange
          const maxPositionX = 2;
          const maxPositionY = -1;
          const rovers: Rover[] = [];

          // Act
          const createdPlateauFunction = () =>
            new Plateau(maxPositionX, maxPositionY, rovers);

          // Assert
          expect(createdPlateauFunction).toThrow(
            "Max Position Y must be greater than or equal to 0"
          );
        });
      });

      describe("rover", () => {
        describe("negative", () => {
          it("x position", () => {
            // Arrange
            const maxPositionX = -1;
            const maxPositionY = 2;
            const rovers: Rover[] = [];

            // Act
            const createRoverFunction = () =>
              new Plateau(maxPositionX, maxPositionY, rovers);

            // Assert
            expect(createRoverFunction).toThrow(
              "Position X must be greater than or equal to 0"
            );
          });

          it("y position", () => {
            // Arrange
            const maxPositionX = 2;
            const maxPositionY = -1;
            const rovers: Rover[] = [];

            // Act
            const createRoverFunction = () =>
              new Plateau(maxPositionX, maxPositionY, rovers);

            // Assert
            expect(createRoverFunction).toThrow(
              "Position Y must be greater than or equal to 0"
            );
          });
        });
      });
    });
  });
  it("success", () => {
    // Arrange
    const maxPositionX = 2;
    const maxPositionY = 2;
    const rovers: Rover[] = [];

    // Act
    const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

    // Assert
    expect(createdPlateau).toEqual({
      maxPositionX,
      maxPositionY,
      rovers,
      currentRoverPosition: 1,
      grid: createEmptyGrid(maxPositionX, maxPositionY),
    });
  });

  describe("insertRover()", () => {
    describe("error", () => {
      it("negative x position", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = -2;
        const roverPositiony = 2;
        const roverFacing = 90;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(false);
        expect(hasRovers).toBe(0);
      });

      it("negative y position", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 2;
        const roverPositiony = -2;
        const roverFacing = 90;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(false);
        expect(hasRovers).toBe(0);
      });
    });

    describe("success", () => {
      it("x:1, y:1", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 1;
        const roverPositiony = 1;
        const roverFacing = 90;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("1-1-East");
      });
    });

    it("insert one rover", () => {
      // Arrange
      const maxPositionX = 2;
      const maxPositionY = 2;
      const rovers: Rover[] = [];
      const roverPositionX = 2;
      const roverPositionY = 2;
      const roverFacing = 90;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });

      createdPlateau.insertRover(roverPositionX, roverPositionY, roverFacing);
      expect(createdPlateau.getRoversQuantity()).toBe(1);
      expect(createdPlateau.getRoverByPosition(0)).toEqual({
        positionX: roverPositionX,
        positionY: roverPositionY,
        facing: roverFacing,
      });
    });
  });

  describe("command rotate", () => {
    it("x:1, y:1, rotate Right", () => {
      // Arrange
      const maxPositionX = 2;
      const maxPositionY = 2;
      const rovers: Rover[] = [];
      const roverPositionX = 1;
      const roverPositiony = 1;
      const roverFacing = 270;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });
      const hasInserted = createdPlateau.insertRover(
        roverPositionX,
        roverPositiony,
        roverFacing
      );
      const hasRovers = createdPlateau.getRoversQuantity();

      expect(hasInserted).toBe(true);

      createdPlateau.executeCommand("R");
      expect(hasRovers).toBe(1);
      const { rovers: roversAdd, roversPositions } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAdd).toBe(1);
      expect(roversPositions?.[0]).toBe("1-1-North");
    });

    it("x:1, y:1, rotate Left", () => {
      // Arrange
      const maxPositionX = 2;
      const maxPositionY = 2;
      const rovers: Rover[] = [];
      const roverPositionX = 1;
      const roverPositiony = 1;
      const roverFacing = 270;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });
      const hasInserted = createdPlateau.insertRover(
        roverPositionX,
        roverPositiony,
        roverFacing
      );
      const hasRovers = createdPlateau.getRoversQuantity();

      expect(hasInserted).toBe(true);

      createdPlateau.executeCommand("L");
      expect(hasRovers).toBe(1);
      const { rovers: roversAdd, roversPositions } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAdd).toBe(1);
      expect(roversPositions?.[0]).toBe("1-1-South");
    });
  });

  describe("command move", () => {
    describe("not move", () => {
      it("x:0 -> 0, y:0", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 0;
        const roverPositiony = 0;
        const roverFacing = 270;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("0-0-West");
      });

      it("x:0, y:0 -> 0", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 0;
        const roverPositiony = 0;
        const roverFacing = 180;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("0-0-South");
      });
    });
    describe("success", () => {
      it("x:1 -> 0, y:1", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 1;
        const roverPositiony = 1;
        const roverFacing = 270;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("0-1-West");
      });

      it("x:1, y:1 -> 0", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 1;
        const roverPositiony = 1;
        const roverFacing = 180;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("1-0-South");
      });

      it("x:1 -> 2, y:1", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 1;
        const roverPositiony = 1;
        const roverFacing = 90;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("2-1-East");
      });

      it("x:1, y:1 -> 2", () => {
        // Arrange
        const maxPositionX = 2;
        const maxPositionY = 2;
        const rovers: Rover[] = [];
        const roverPositionX = 1;
        const roverPositiony = 1;
        const roverFacing = 0;

        // Act
        const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

        // Assert
        expect(createdPlateau).toEqual({
          maxPositionX,
          maxPositionY,
          rovers,
          currentRoverPosition: 1,
          grid: createEmptyGrid(maxPositionX, maxPositionY),
        });
        const hasInserted = createdPlateau.insertRover(
          roverPositionX,
          roverPositiony,
          roverFacing
        );
        const hasRovers = createdPlateau.getRoversQuantity();

        expect(hasInserted).toBe(true);

        createdPlateau.executeCommand("M");
        expect(hasRovers).toBe(1);
        const { rovers: roversAdd, roversPositions } =
          createdPlateau.getPositionsWithRovers();
        expect(roversAdd).toBe(1);
        expect(roversPositions?.[0]).toBe("1-2-North");
      });
    });
  });
  describe("series of events", () => {
    it("x:1, y:2, LMLMLMLMM", () => {
      // Arrange
      const maxPositionX = 5;
      const maxPositionY = 5;
      const rovers: Rover[] = [];
      const roverPositionX = 1;
      const roverPositiony = 2;
      const roverFacing = 0;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });
      const hasInserted = createdPlateau.insertRover(
        roverPositionX,
        roverPositiony,
        roverFacing
      );
      const hasRovers = createdPlateau.getRoversQuantity();

      expect(hasInserted).toBe(true);
      const input = "LMLMLMLMM".split("");
      input.forEach((item) => {
        createdPlateau.executeCommand(item as CommandProps);
      });

      expect(hasRovers).toBe(1);
      const { rovers: roversAdd, roversPositions } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAdd).toBe(1);
      expect(roversPositions?.[0]).toBe("1-3-North");
    });

    it("x:3, y:3; MMRMMRMRRM", () => {
      // Arrange
      const maxPositionX = 5;
      const maxPositionY = 5;
      const rovers: Rover[] = [];
      const roverPositionX = 3;
      const roverPositiony = 3;
      const roverFacing = 90;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });
      const hasInserted = createdPlateau.insertRover(
        roverPositionX,
        roverPositiony,
        roverFacing
      );
      const hasRovers = createdPlateau.getRoversQuantity();

      expect(hasInserted).toBe(true);
      const input = "MMRMMRMRRM".split("");
      input.forEach((item) => {
        createdPlateau.executeCommand(item as CommandProps);
      });

      expect(hasRovers).toBe(1);
      const { rovers: roversAdd, roversPositions } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAdd).toBe(1);
      expect(roversPositions?.[0]).toBe("5-1-East");
    });

    it("LMLMLMLMM; MMRMMRMRRM", () => {
      // Arrange
      const maxPositionX = 5;
      const maxPositionY = 5;
      const rovers: Rover[] = [];
      const roverPositionX = 1;
      const roverPositiony = 2;
      const roverFacing = 0;
      const roverTwoPositionX = 3;
      const roverTwoPositiony = 3;
      const roverTwoFacing = 90;

      // Act
      const createdPlateau = new Plateau(maxPositionX, maxPositionY, rovers);

      // Assert
      expect(createdPlateau).toEqual({
        maxPositionX,
        maxPositionY,
        rovers,
        currentRoverPosition: 1,
        grid: createEmptyGrid(maxPositionX, maxPositionY),
      });
      const hasInserted = createdPlateau.insertRover(
        roverPositionX,
        roverPositiony,
        roverFacing
      );
      const hasRovers = createdPlateau.getRoversQuantity();
      expect(hasRovers).toBe(1);

      expect(hasInserted).toBe(true);
      const input = "LMLMLMLMM".split("");
      input.forEach((item) => {
        createdPlateau.executeCommand(item as CommandProps);
      });

      const { rovers: roversAdd, roversPositions } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAdd).toBe(1);
      expect(roversPositions?.[0]).toBe("1-3-North");

      const hasInsertedTwo = createdPlateau.insertRover(
        roverTwoPositionX,
        roverTwoPositiony,
        roverTwoFacing
      );
      const hasRoversTwo = createdPlateau.getRoversQuantity();
      expect(hasRoversTwo).toBe(2);

      expect(hasInsertedTwo).toBe(true);
      const inputTwo = "MMRMMRMRRM".split("");
      inputTwo.forEach((item) => {
        createdPlateau.executeCommand(item as CommandProps);
      });

      const { rovers: roversAddTwo, roversPositions: roversPositionsTwo } =
        createdPlateau.getPositionsWithRovers();
      expect(roversAddTwo).toBe(2);
      expect(roversPositionsTwo?.[1]).toBe("5-1-East");
    });
  });
});
