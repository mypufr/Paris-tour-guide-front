import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";



function Cursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });



  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-20 h-20 bg-secondary-200 rounded-full pointer-events-none z-[400]"
      style={{
        backgroundImage: "url('/images/website_logo.png')", 
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      animate={{
        x: cursorPos.x,
        y: cursorPos.y,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    />
  );
}

export default Cursor;
