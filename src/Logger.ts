import { State } from "./classifyState";
import { Line } from "./Line";
import { GraphemeStrategy } from "./strategies/graphemeTypeMaps";
import { Word } from "./Word";
import fs from "fs";
import path from "path";

if (process.env.LOGGING === "file") {
  console.log("Logging Mode set to file");
}

const FILE_NAME = "logFile.txt";
const DIR_PATH = path.join(__dirname, "..", FILE_NAME);

type Transport = "file" | "console";
type WriteMode = "append" | "overwrite";

type LoggerConfig =
  | {
      transport: "console";
    }
  | {
      transport: "file";
      filePath: string;
      writeMode: WriteMode;
    };

class Logger {
  private str: string = "";
  private transport: Transport;
  private filePath?: string;
  private writeMode?: WriteMode;

  constructor(config: LoggerConfig) {
    this.str = "---- LOG START ----\n";
    this.transport = config.transport;
    if (config.transport === "file") {
      this.filePath = config.filePath;
      this.writeMode = config.writeMode;
    }
  }

  append(str: string) {
    this.str += `\n${str}`;
  }

  log() {
    switch (this.transport) {
      case "console":
        console.log(this.str);
        break;
      case "file":
        fs.appendFileSync(this.filePath!, this.str);
        break;

      default:
        console.warn("Invalid transport for logger");
        break;
    }
  }
}

export function log(
  word: Word,
  line: Line,
  lines: Line[],
  stateStr: State,
  strategy: GraphemeStrategy
) {
  let str = `
word: ${word.val}
line: ${line.val}
lines: ${lines}
`;

  fs.appendFileSync(dirPath, str);

  console.log("word: ", word.val);
  console.log("line: ", line.val);
  console.log("lines: ", lines);
}

process.on("exit", () => {
  // Perform cleanup tasks here, such as closing database connections, etc.
  console.log("Shutting down process...");
});
