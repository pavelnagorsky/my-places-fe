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
    threshold: 254, // Adjust based on image height
    disableHysteresis: true,
  });

  const homePageHeaderSx: SxProps = {
    bgcolor: isScrolled ? "white" : "transparent",
    transition: `background-color 0.35s ease, opacity 0.1s ease`,
    top: 0,
    zIndex: 1000,
    width: "100%",
    position: "sticky",
    "& .header-menu-toggle": isScrolled
      ? undefined
      : {
          borderColor: "transparent",
          backgroundColor: "transparent",
          "&:hover": {
            color: "secondary.dark",
            backgroundColor: "transparent",
          },
        },
    "& .MuiLink-root, .MuiButton-root": isScrolled
      ? undefined
      : {
          "&:hover": {
            color: "secondary.dark",
            backgroundColor: "transparent",
          },
        },
  };

  return isHomePage ? homePageHeaderSx : defaultHeaderSx;
};

export default useHeaderStyles;
