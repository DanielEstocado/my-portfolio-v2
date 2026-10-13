import ContributionsCell from "./ContributionsCell";
import NowPlayingCell from "./NowPlayingCell";
import TerminalCell from "./TerminalCell";

const LEFT_LINE_CLASS =
  "relative before:absolute before:top-0 before:right-0 before:-z-1 before:h-px before:w-[calc(100%+100vw)] before:bg-border";

// Small live bits: the GitHub contributions and what is playing stacked on the left above an empty row as tall as the space bands and no taller until the terminal is dragged taller, a terminal to poke at on the right. The lines between the left rows run out past the left edge of the page. Each one stands alone, so one can be swapped for another.
const CurrentlySection = () => {
  return (
    <section
      aria-label="Currently"
      className="screen-line-bottom grid grid-cols-1 lg:grid-cols-2"
    >
      <h2 className="sr-only">Currently</h2>
      {/* Small cells */}
      <div className="grid min-w-0 border-b border-dashed border-border lg:grid-rows-[auto_auto_minmax(calc(var(--spacing)*8),1fr)] lg:border-r lg:border-b-0">
        <ContributionsCell />
        <div className={LEFT_LINE_CLASS}>
          <NowPlayingCell />
        </div>
        <div aria-hidden="true" className={`${LEFT_LINE_CLASS} hidden lg:block`} />
      </div>
      {/* Terminal */}
      <div className="flex min-w-0 flex-col p-md">
        <TerminalCell />
      </div>
    </section>
  );
};

export default CurrentlySection;
