## Problem(original)

A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view
of the surrounding terrain to send back to Earth.

A rover's position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify
navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

## Input(original)

The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.

## Some assumptions

- Since in the description it is said that the criteria is based on object oriented programming skills and has to input the data via and text file the architecture and flow was based heavily on that.
- If the oficial criteria were to make an web service with that in mind I would have chosen an layered architecture with `controller` -> `service`(or `usecase`) -> `repository`(using in memory "database", unless it is said to use some database) using some `SOLID` concepts as `dependency inversion`.
- Using `Rover` from internal attributes, and move logic.
- Using `Plateau` as the X-Y map of the location, using a grid for visual representation and quick check of another rover's, preveting for using the **n** `Rover`'s list to check(O(n)) everytime an insert or moving command's.
- Facing is the direction where the rover poiting, using here as number with Enum with each one of "main" directions(North, East, South, West), and using rest of division to make it full circle.

## More assumptions

At initial thinking:

### Rover

For controlling the rover attributes, using `Single-responsiblity Principle` and using `entities` of clean architecture(the entity cannot know and have responsibilities outside of himself), for example: not knowing the maximum limit of the coordinates.
His attributes:

- **positionX**
- **positionY**
- **facing**(degrees, using ENUM)
  Some methods are using `_` preffix for private methods and for better readability.
  For rotation logic is using plus and minus operations and using rest of division for "linked list" behavior.
  Is throwing some errors that can be handled elsewhere.

### Plateau

- **currentRoverPosition**: starting with 1, it's the actual rover, for a sequential list of commands use
- **grid**: for better viewing and control of the coordinates, an array of array MxN, empty position is presented as 0, every number is corresponding by his rover position
- **maxPositionX**
- **maxPositionY**
- **rovers**: list of rovers, for using in the sequential
  This is like a usecase "class", using a Rover as entity and using more robust logic, like preventing moving outside the Plateau's limit(min or max of `X` and `Y`).

## Commands

- **Unit and integration tests**: `yarn test` or `npm run test`
- **Execute**(input by file: `input.txt`, output: `output.txt`): `yarn build && yarn start` or `npm run build && npm run start`
  - A `output.txt` will be created on root folder with the final rover's position/result.
  - **Obs**: must be an `input.txt` file using the pattern(on root folder of project):

```
maxPositionX maxPositionY
firstRoverPositionX firstRoverPositionY firstRoverFacingSide
firstRoverCommandOne firstRoverCommandTwo
secondRoverPositionX secondRoverPositionY secondRoverFacingSide
secondRoverCommandOne secondRoverCommandTwo
```

A example:

```
6 6
3 2 E
RMRMR
```
