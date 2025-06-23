import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { debounce } from "@mui/material";

const useScrollThreshold = (threshold: number, hysteresis = 30) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const current = scrollY.get();
    setIsScrolled(current > threshold);
  }, [isMounted, scrollY, threshold]);

  useMotionValueEvent(
    scrollY,
    "change",
    debounce((latest) => {
      if (!isMounted) return;

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
