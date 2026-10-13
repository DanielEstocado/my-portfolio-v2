import { type FormEvent, type KeyboardEvent, useState } from "react";
import { runTerminalCommand } from "@/lib/runTerminalCommand";
import {
  type TerminalCommand,
  type TerminalEntry,
  type TerminalFile,
} from "@/types/terminal";

// The terminal's state: what was typed and printed so far, the current input, and the up and down arrow recall of earlier commands, which survive a screen clear like they do in a real command prompt.
export function useTerminal(commands: TerminalCommand[], files: TerminalFile[]) {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [typed, setTyped] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [recallIndex, setRecallIndex] = useState<number | null>(null);

  // Runs a command, adds it and its output to the screen, and clears the input.
  const run = (command: string) => {
    const result = runTerminalCommand(command, commands, files);
    setInput("");
    setRecallIndex(null);
    if (command.trim() !== "") setTyped((current) => [...current, command]);
    if (result.clear) {
      setHistory([]);
      return;
    }
    setHistory((current) => [...current, { command, lines: result.lines }]);
  };

  // Runs whatever is typed when the form is submitted.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(input);
  };

  // Steps through earlier commands with the arrow keys.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (typed.length === 0) return;

    const last = typed.length - 1;
    const next =
      event.key === "ArrowUp"
        ? Math.max(0, (recallIndex ?? typed.length) - 1)
        : recallIndex === null || recallIndex >= last
          ? null
          : recallIndex + 1;

    setRecallIndex(next);
    setInput(next === null ? "" : typed[next]);
  };

  return { history, input, setInput, handleSubmit, handleKeyDown };
}
