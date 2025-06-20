import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { debounce } from "@mui/material";

const useScrollThreshold = (threshold: number, hysteresis = 30) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(
    scrollY,
    "change",
    debounce((latest) => {
      if (!isScrolled && latest > threshold + hysteresis) {
        setIsScrolled(true);
      } else if (isScrolled && latest < threshold - hysteresis) {
        setIsScrolled(false);
      }
    }, 50)
  );

  return isScrolled;
};

export default useScrollThreshold;
