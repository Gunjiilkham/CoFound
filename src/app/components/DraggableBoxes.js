import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function DraggableBox() {
  const [currentBox, setCurrentBox] = useState(1);
  const controls = useAnimation();

  // Handle drag end
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -100) {
      handleSwipeLeft();
    } else if (info.offset.x > 100) {
      handleSwipeRight();
    }
  };

  const handleSwipeLeft = async () => {
    await controls.start({ x: "-100vw", opacity: 0 });
    setCurrentBox((prev) => (prev === 1 ? 2 : 1));
    await controls.start({ x: 0, opacity: 1 });
  };

  const handleSwipeRight = async () => {
    await controls.start({ x: "100vw", opacity: 0 });
    setCurrentBox((prev) => (prev === 1 ? 2 : 1));
    await controls.start({ x: 0, opacity: 1 });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <motion.div
        className="w-96 h-64 bg-slate-300 flex flex-col justify-between items-center text-white font-bold text-lg cursor-pointer rounded-lg shadow-lg transition-transform z-10 p-4 relative"
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {/* Box Content */}
        <div className="flex-grow flex justify-center items-center">
          {currentBox === 1 ? "Box 1" : "Box 2"}
        </div>

        {/* Buttons at the Bottom */}
        <div className="flex justify-between w-full pb-2 px-4">
          <button
            className="px-4 py-2 bg-transparent rounded-md hover:bg-red-600 transition w-1/3"
            onClick={handleSwipeLeft}
          >
            ⬅
          </button>

          <button
            className="px-4 py-2 bg-transparent rounded-md hover:bg-green-600 transition w-1/3"
            onClick={handleSwipeRight}
          >
            ➡
          </button>
        </div>
      </motion.div>
    </div>
  );
}
