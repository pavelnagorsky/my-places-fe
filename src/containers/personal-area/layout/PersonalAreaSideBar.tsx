import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Hidden,
  Paper,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";
import { Fragment } from "react";
import usePersonalAreaMenu from "@/containers/personal-area/layout/usePersonalAreaMenu";

const PersonalAreaSideBar = () => {
  const router = useRouter();
  const userLinks = usePersonalAreaMenu();

  const customPathname = router.asPath
    .split("/")
    .filter((p, i) => {
      return i <= 2;
    })
    .join("/");

  const mobileNavigation = (
    <Paper
      sx={{
        position: "fixed",
        py: "0.2em",
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: "auto",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={userLinks.findIndex((l) => l.href === customPathname)}
        onChange={(event, newValue) => {
          router.push(userLinks[newValue]?.href || "/");
        }}
      >
        {userLinks.map((l) => (
          <BottomNavigationAction key={l.href} label={l.title} icon={l.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );

  const desktopNavigation = (
    <Stack
      position={"sticky"}
      top={"5.2em"}
      px={"1em"}
      py={"1.5em"}
      border={"2px solid rgb(225, 228, 241)"}
      borderRadius={"10px"}
      width={"100%"}
    >
      {userLinks.map((option, i) => (
        <Box key={i}>
          <NextMuiLink
            href={option.href}
            sx={{
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "18px",
              color:
                option.href === customPathname
                  ? "secondary.dark"
                  : "primary.main",
            }}
          >
            {option.title}
          </NextMuiLink>
          <Divider
            sx={{
              my: "1em",
              opacity: 0.5,
              display: i === userLinks.length - 1 ? "none" : "block",
            }}
          />
        </Box>
      ))}
    </Stack>
  );

  return (
    <Fragment>
      <Hidden mdUp>{mobileNavigation}</Hidden>
      <Hidden mdDown>{desktopNavigation}</Hidden>
    </Fragment>
  );
};

export default PersonalAreaSideBar;
