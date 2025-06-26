import { SxProps } from "@mui/material";
import { routerLinks } from "@/routing/routerLinks";
import useScrollThreshold from "@/hooks/useScrollThreshold";
import useRouterPathWithoutQuery from "@/hooks/useRouterPathWithoutQuery";

const useHeaderStyles = () => {
  const pathWithoutQuery = useRouterPathWithoutQuery();
  const isHomePage = pathWithoutQuery === routerLinks.home;
  const isScrolledDefault = useScrollThreshold(94);
  const isScrolledHomePage = useScrollThreshold(234);

  const defaultHeaderSx: SxProps = {
    background: "white",
    top: 0,
    zIndex: 1000,
    position: "sticky",
    mb: 1,
    "& .header-container": {
      transition: "padding 0.1s ease-in-out",
      py: {
        xs: isScrolledDefault ? "0.5em" : "1em",
        md: isScrolledDefault ? "1em" : "2em",
      },
    },
  };

  const homePageHeaderSx: SxProps = {
    background: isScrolledHomePage ? "white" : "transparent",
    transition: `background-color 0.35s ease, opacity 0.1s ease`,
    top: 0,
    zIndex: 1001,
    width: "100%",
    position: "sticky",
    "& .header-container": {
      transition: "padding 0.1s ease-in-out",
      py: {
        xs: isScrolledHomePage ? "0.5em" : "1em",
        md: isScrolledHomePage ? "1em" : "2em",
      },
    },
    "& .header-menu-toggle": isScrolledHomePage
      ? undefined
      : {
          borderColor: "transparent",
          backgroundColor: "transparent",
          "&:hover": {
            color: "secondary.dark",
            backgroundColor: "transparent",
          },
        },
    "& .MuiLink-root, .MuiButton-root": isScrolledHomePage
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
