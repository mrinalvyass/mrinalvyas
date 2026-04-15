import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function handleMove(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    function handleOver(event) {
      const interactive = event.target.closest("a, button, input, textarea, .interactive");
      setIsHovering(Boolean(interactive));
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-core ${isHovering ? "hovering" : ""}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div
        className={`cursor-ring ${isHovering ? "hovering" : ""}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
    </>
  );
}
