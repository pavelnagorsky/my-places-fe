import { useEffect } from "react";
import { debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectScrollPosition } from "@/store/excursions-slice/excursions.selectors";
import { setScrollPosition } from "@/store/excursions-slice/excursions.slice";

const ScrollPositionTracker = () => {
  const scrollPosition = useAppSelector(selectScrollPosition);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (scrollPosition) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
        });
      }, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      dispatch(setScrollPosition(window.scrollY));
    }, 300);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default ScrollPositionTracker;
