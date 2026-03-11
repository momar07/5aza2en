import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef  = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => { cursor.style.transform += " scale(2)"; follower.style.opacity = "0.5"; };
    const onLeave = () => { follower.style.opacity = "1"; };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{ background: "#C8973A" }}
      />
      <div ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
        style={{ border: "1.5px solid rgba(200,151,58,0.6)", background: "rgba(200,151,58,0.04)" }}
      />
    </>
  );
}
