import { useEffect, useRef } from "react";
import {
  TERMINAL_COMMANDS,
  TERMINAL_FILES,
  TERMINAL_PROMPT,
  TERMINAL_WELCOME,
} from "../constant";
import { useResizeHandle } from "../hooks/useResizeHandle";
import { useTerminal } from "../hooks/useTerminal";

// A little command prompt visitors can type into, in a window with a title bar, its screen scrolls and a handle along the bottom drags it taller or shorter.
const TerminalCell = () => {
  const { history, input, setInput, handleSubmit, handleKeyDown } = useTerminal(
    TERMINAL_COMMANDS,
    TERMINAL_FILES,
  );
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resize = useResizeHandle(outputRef);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);

  // Puts the cursor in the input without scrolling the page to it.
  const handleFocusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Window */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-white dark:bg-black">
        {/* Title bar */}
        <div className="flex items-center gap-sm border-b border-primary bg-primary px-sm py-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-background/40" />
            <span className="size-2.5 rounded-full bg-background/40" />
            <span className="size-2.5 rounded-full bg-background/40" />
          </span>
          <span className="font-mono text-caption font-semibold text-background">
            Command Prompt
          </span>
        </div>
        {/* Screen */}
        <div
          ref={outputRef}
          data-lenis-prevent
          onClick={handleFocusInput}
          className="max-h-[150svh] min-h-56 flex-1 basis-0 cursor-text overflow-auto overscroll-contain p-sm font-mono text-caption"
        >
          {TERMINAL_WELCOME.map((line, index) => (
            <p key={index} className="whitespace-pre-wrap text-foreground">
              {line || " "}
            </p>
          ))}
          {history.map((entry, index) => (
            <div key={index} className="mt-xs">
              <p className="break-all">
                <span className="text-primary">{TERMINAL_PROMPT}</span>
                {entry.command}
              </p>
              {entry.lines.map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className="whitespace-pre-wrap text-foreground"
                >
                  {line || " "}
                </p>
              ))}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="mt-xs flex">
            <span aria-hidden="true" className="shrink-0 text-primary">
              {TERMINAL_PROMPT}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Command prompt"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </form>
        </div>
        {/* Resize handle */}
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize the terminal"
          tabIndex={0}
          onPointerDown={resize.handlePointerDown}
          onPointerMove={resize.handlePointerMove}
          onPointerUp={resize.handlePointerUp}
          onPointerCancel={resize.handlePointerUp}
          onKeyDown={resize.handleKeyDown}
          className="grid h-4 cursor-row-resize touch-none place-items-center border-t border-border outline-none hover:bg-muted focus-visible:bg-muted"
        >
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-muted-foreground/40" />
        </div>
      </div>
    </div>
  );
};

export default TerminalCell;
