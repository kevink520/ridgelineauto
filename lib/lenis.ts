import type Lenis from "lenis";

// Shared handle so any client component can drive the smooth scroller.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
