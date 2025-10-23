import { useEffect } from "react";
import { debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectScrollPosition } from "@/store/excursions-slice/excursions.selectors";
import { setScrollPosition } from "@/store/excursions-slice/excursions.slice";
import { useRouter } from "next/router";

const ScrollPositionTracker = () => {
  const scrollPosition = useAppSelector(selectScrollPosition);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (scrollPosition && Object.keys(router.query).length === 0) {
      console.log("error");
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
        });
      }, 0);
    }
  }, [router.isReady]);

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
