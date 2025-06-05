import { SxProps, useScrollTrigger } from "@mui/material";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";

const defaultHeaderSx: SxProps = {
  background: "white",
  top: 0,
  zIndex: 1000,
  position: "sticky",
};

const useHeaderStyles = () => {
  const router = useRouter();
  const isHomePage = router.asPath === routerLinks.home;

  const isScrolled = useScrollTrigger({
    threshold: 374, // Adjust based on image height
  });

  const homePageHeaderSx: SxProps = {
    bgcolor: isScrolled ? "white" : "transparent",
    transition: `background-color .${isScrolled ? 3 : 1}s ease`,
    top: 0,
    zIndex: 1000,
    width: "100%",
    position: "sticky",
  };

  return isHomePage ? homePageHeaderSx : defaultHeaderSx;
};

export default useHeaderStyles;
