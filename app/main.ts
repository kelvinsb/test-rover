import fs from "node:fs";
import Plateau, { CommandProps } from "./entitities/plateau";
import { Facing } from "./entitities/rover";

function getMaximumPositions(firstLine: string) {
  const [maxX, maxY] = firstLine.split(" ");
  const maxPositionNumberX = Number(maxX);
  const maxPositionNumberY = Number(maxY);

  if (isNaN(maxPositionNumberX)) {
    console.error("[ERROR] Please provide an maximum X position as number");
    process.exit(1);
  }

  if (isNaN(maxPositionNumberY)) {
    console.error("[ERROR] Please provide an maximum Y position as number");
    process.exit(1);
  }
  return { maxPositionNumberX, maxPositionNumberY };
}
const facingAdapterLiteral = {
  N: Facing.North,
  E: Facing.East,
  S: Facing.South,
  W: Facing.West,
};

function facingAdapter(intro: keyof typeof facingAdapterLiteral) {
  return facingAdapterLiteral[intro] ?? 0;
}

function checkingFacingString(facing: string) {
  if (["N", "E", "S", "W"].includes(facing)) {
    return facingAdapter(facing as any);
  }
  console.error(
    "[ERROR] Please provide an correct facing direction(N, or E or S or W)"
  );
  process.exit(1);
}

function readAndOperate(restOfLines: string[], plateau: Plateau) {
  if (!restOfLines || !restOfLines.length) {
    plateau.printGrid();
    return;
  }

  const [firstLine, secondLine, ...rest] = restOfLines;

  const [posX, posY, facing] = firstLine.split(" ");
  const positionX = Number(posX);
  const positionY = Number(posY);

  const facingNormalized = checkingFacingString(facing);

  plateau.insertRover(positionX, positionY, facingNormalized);

  const commands = secondLine.split("");
  commands.forEach((command) => {
    plateau.executeCommand(command as CommandProps);
  });
  readAndOperate(rest, plateau);
}
const isErrorWithCode = (err: unknown): err is Error & { code: unknown } => {
  return err instanceof Error && "code" in (err as any);
};

try {
  const data = fs.readFileSync(__dirname + "/../input.txt", "utf8");
  const lines = data.split(/\r?\n/);

  const [firstLine, ...restOfLines] = lines;
  const { maxPositionNumberX, maxPositionNumberY } =
    getMaximumPositions(firstLine);

  const plateauCreated = new Plateau(
    maxPositionNumberX,
    maxPositionNumberY,
    []
  );

  readAndOperate(restOfLines, plateauCreated);

  const roversDetails = plateauCreated.outputRoversDetails();
  const formattedOutput = roversDetails
    .map((item) => `${item.positionX} ${item.positionY} ${item.facingLetter}`)
    .join("\n");
  fs.writeFileSync(__dirname + "/../output.txt", formattedOutput);
} catch (err) {
  if (isErrorWithCode(err) && err.code === "ENOENT") {
    console.error("Missing input file.");
    process.exit(1);
  }
  console.error("Your input file is in incorrect pattern.");
  console.log(err);
}
