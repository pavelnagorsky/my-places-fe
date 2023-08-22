import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";

import { Logo } from "../Logo/Logo";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderLink } from "./HeaderLink/HeaderLink";
import { useTranslation } from "next-i18next";
import { memo, useRef, useState } from "react";
import { routerLinks } from "@/staticData/routerLinks";
import { useHeaderMenu } from "@/components/Header/SliderMenu/useHeaderMenu";
import SliderMenu from "@/components/Header/SliderMenu/SliderMenu";
import { useRouter } from "next/router";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import CreateMenu from "@/components/Header/CreateMenu/CreateMenu";

const Header = () => {
  const { t } = useTranslation("common");
  const menu = useHeaderMenu();
  const router = useRouter();

  return (
    <Box
      sx={{
        background: "white",
        top: 0,
        zIndex: 1000,
        position: "sticky",
      }}
    >
      <WrappedContainer>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          mx={{ xs: "-1.5em", md: 0 }}
          px={{ xs: "1em", md: 0 }}
          py={{ xs: "0.5em", md: "1em" }}
          my={{ xs: "0.5em", md: "1em" }}
          alignItems={"center"}
        >
          <Box>
            <Logo />
          </Box>
          <Stack
            direction={"row"}
            sx={{ display: { xs: "none", md: "flex" }, columnGap: "0.5em" }}
          >
            <CreateMenu activePath={router.pathname} />
            <HeaderLink to={routerLinks.search} pathname={router.pathname}>
              {t("links.search")}
            </HeaderLink>
            <HeaderLink to={routerLinks.aboutUs} pathname={router.pathname}>
              {t("links.about")}
            </HeaderLink>
          </Stack>
          <IconButton
            onClick={menu.handleClick}
            sx={{
              p: "0.5em",
              backgroundColor: "#FF9D42",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            {menu.open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <SliderMenu
            pathname={router.pathname}
            open={menu.open}
            anchorEl={menu.anchorEl}
            onClose={menu.handleClose}
            id={menu.id}
          />
        </Stack>
      </WrappedContainer>
    </Box>
  );
};

export default memo(Header);
