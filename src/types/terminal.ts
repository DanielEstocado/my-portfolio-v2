export type TerminalCommand = {
  name: string;
  description: string;
  output: string[];
};

export type TerminalFile = {
  name: string;
  content: string[];
};

export type TerminalEntry = {
  command: string;
  lines: string[];
};

export type TerminalResult = {
  lines: string[];
  clear: boolean;
};
