import { getManilaClock } from "@/lib/manilaTime";
import {
  type TerminalCommand,
  type TerminalFile,
  type TerminalResult,
} from "@/types/terminal";

const COLUMN_WIDTH = 12;
const DIRECTORY = "C:\\Users\\Daniel";
const BUILT_IN_HELP = [
  { name: "CD", description: "Shows the current folder." },
  { name: "CLS", description: "Clears the screen." },
  { name: "DATE", description: "Shows the date in Cavite." },
  { name: "DIR", description: "Lists the files in this folder." },
  { name: "ECHO", description: "Prints a message." },
  { name: "TIME", description: "Shows the time in Cavite." },
  { name: "TREE", description: "Draws the folder as a tree." },
  { name: "TYPE", description: "Prints the contents of a file." },
];

// Wraps some lines as a normal result that leaves the screen as it is.
function print(...lines: string[]): TerminalResult {
  return { lines, clear: false };
}

// Lists every command in a two column table, the built in ones first and then the ones from the data.
function listHelp(commands: TerminalCommand[]) {
  const rows = [
    ...BUILT_IN_HELP,
    ...commands.map((command) => ({
      name: command.name.toUpperCase(),
      description: command.description,
    })),
  ].sort((a, b) => a.name.localeCompare(b.name));

  return print(
    "These are the commands you can run:",
    "",
    ...rows.map((row) => `${row.name.padEnd(COLUMN_WIDTH)}${row.description}`),
  );
}

// Prints a file's lines, or says why it cannot.
function typeFile(argument: string, files: TerminalFile[]) {
  if (argument === "") return print("The syntax of the command is incorrect.");
  const file = files.find((item) => item.name === argument.toLowerCase());
  return file
    ? print(...file.content)
    : print("The system cannot find the file specified.");
}

// Lists the files like a folder listing.
function listDirectory(files: TerminalFile[]) {
  return print(
    ` Directory of ${DIRECTORY}`,
    "",
    ...files.map((file) => file.name),
    `${String(files.length).padStart(8)} File(s)`,
  );
}

// Draws the files as a tree under the folder.
function drawTree(files: TerminalFile[]) {
  return print(
    DIRECTORY,
    ...files.map(
      (file, index) => `${index === files.length - 1 ? "└── " : "├── "}${file.name}`,
    ),
  );
}

// Handles the folder command, there is only one folder and nothing above it to see.
function changeDirectory(argument: string) {
  if (argument === "") return print(DIRECTORY);
  if (argument === ".." || argument === "\\") return print("Access is denied.");
  return print("The system cannot find the path specified.");
}

// Works out what the terminal should print for a typed command, in the style of the Windows command prompt.
export function runTerminalCommand(
  input: string,
  commands: TerminalCommand[],
  files: TerminalFile[],
  now: Date = new Date(),
): TerminalResult {
  const text = input.trim().replace(/\s+/g, " ");
  if (text === "") return print();

  const [word, ...rest] = text.split(" ");
  const name = word.toLowerCase();
  const argument = rest.join(" ");
  const clock = getManilaClock(now);

  if (name === "cls" || name === "clear") return { lines: [], clear: true };
  if (name === "help") return listHelp(commands);
  if (name === "echo") return print(argument || "ECHO is on.");
  if (name === "type") return typeFile(argument, files);
  if (name === "dir" || name === "ls") return listDirectory(files);
  if (name === "tree") return drawTree(files);
  if (name === "cd") return changeDirectory(argument.toLowerCase());
  if (name === "date") return print(`The current date is: ${clock.day} (Cavite)`);
  if (name === "time") {
    return print(`The current time is: ${clock.time} ${clock.period} (Cavite)`);
  }

  const match = commands.find((command) => command.name === text.toLowerCase());
  if (match) return print(...match.output);

  return print(
    `'${word}' is not recognized as a command or a file here.`,
    "Type HELP to list the commands.",
  );
}
