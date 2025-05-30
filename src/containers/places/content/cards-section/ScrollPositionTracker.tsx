import { useEffect } from "react";
import { debounce } from "@mui/material";
import {
  selectScrollPosition,
  setScrollPosition,
} from "@/store/search-slice/search.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
