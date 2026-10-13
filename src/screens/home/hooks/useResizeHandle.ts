import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useEffect,
  useRef,
} from "react";

const EDGE = 36;
const MAX_SCROLL_SPEED = 5;
const DRAG_START = 6;
const KEY_STEP = 32;

type Drag = {
  pointerY: number;
  startY: number;
  scrolled: number;
  startHeight: number;
};

// Makes an element taller or shorter by dragging a handle, and scrolls the page along when the pointer is held near the bottom of the window, which the browser's own resize corner does not do.
export function useResizeHandle(targetRef: RefObject<HTMLElement | null>) {
  const dragRef = useRef<Drag | null>(null);
  const frameRef = useRef(0);
  const defaultHeightRef = useRef<number | null>(null);

  // Sets a height inside the element's own min and max height.
  const setHeight = (height: number) => {
    const target = targetRef.current;
    if (!target) return;
    const style = getComputedStyle(target);
    const min = defaultHeightRef.current ?? (parseFloat(style.minHeight) || 0);
    const max = parseFloat(style.maxHeight) || Infinity;
    target.style.flex = "none";
    target.style.height = `${Math.min(max, Math.max(min, height))}px`;
  };

  // Works out the height from how far the pointer has moved since the drag began plus the scrolling done for it, the page shrinking under the pointer is not counted.
  const update = () => {
    const drag = dragRef.current;
    if (!drag) return;
    const moved = drag.pointerY - drag.startY + drag.scrolled;
    setHeight(drag.startHeight + moved);
  };

  // Keeps scrolling the page down while the pointer rests near the bottom edge of the window, so the handle can keep growing past it.
  const tick = () => {
    const drag = dragRef.current;
    if (!drag) return;
    const dragging = drag.pointerY - drag.startY > DRAG_START;
    const fromBottom = window.innerHeight - drag.pointerY;
    if (dragging && fromBottom < EDGE) {
      const before = window.scrollY;
      window.scrollBy({ top: Math.min(MAX_SCROLL_SPEED, (EDGE - fromBottom) / 10), behavior: "instant" });
      drag.scrolled += window.scrollY - before;
    }
    update();
    frameRef.current = requestAnimationFrame(tick);
  };

  // Remembers the height it started at as the smallest it may get, the first time it is touched.
  const rememberDefault = () => {
    const target = targetRef.current;
    if (target && defaultHeightRef.current === null) {
      defaultHeightRef.current = target.getBoundingClientRect().height;
    }
  };

  // Starts a drag and captures the pointer so it keeps reporting outside the handle.
  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    const target = targetRef.current;
    if (!target) return;
    rememberDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerY: event.clientY,
      startY: event.clientY,
      scrolled: 0,
      startHeight: target.getBoundingClientRect().height,
    };
    document.body.style.userSelect = "none";
    frameRef.current = requestAnimationFrame(tick);
  };

  // Follows the pointer while dragging.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (dragRef.current) dragRef.current.pointerY = event.clientY;
  };

  // Ends the drag.
  const handlePointerUp = () => {
    dragRef.current = null;
    cancelAnimationFrame(frameRef.current);
    document.body.style.userSelect = "";
  };

  // Lets the arrow keys change the height in steps, so the handle works without a mouse.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = targetRef.current;
    if (!target) return;
    rememberDefault();
    if (event.key === "ArrowDown") setHeight(target.getBoundingClientRect().height + KEY_STEP);
    else if (event.key === "ArrowUp") setHeight(target.getBoundingClientRect().height - KEY_STEP);
    else return;
    event.preventDefault();
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { handlePointerDown, handlePointerMove, handlePointerUp, handleKeyDown };
}
