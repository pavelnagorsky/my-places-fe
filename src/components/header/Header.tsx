import {
  Box,
  IconButton,
  Stack,
  SxProps,
  useScrollTrigger,
} from "@mui/material";
import { Logo } from "../logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";
import { memo, useEffect, useState } from "react";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import PersonIcon from "@mui/icons-material/Person";
import { HeaderLink } from "./header-link/HeaderLink";
import CreateMenu from "./create-menu/CreateMenu";
import SliderMenu from "@/components/header/slider-menu/SliderMenu";
import usePopover from "@/hooks/usePopover";
import useHeaderStyles from "@/components/header/logic/useHeaderStyles";

interface IHeaderProps {
  wideMode?: boolean;
}

const links = [
  { path: routerLinks.places, i18nKey: "links.search" },
  { path: routerLinks.excursions, i18nKey: "links.excursions" },
  { path: routerLinks.aboutUs, i18nKey: "links.about" },
];

const Header = ({ wideMode }: IHeaderProps) => {
  const { t } = useTranslation("common");
  const menu = usePopover("header-menu");
  const router = useRouter();
  const isAuth = useAppSelector(selectIsAuth);
  const containerSx = useHeaderStyles();

  return (
    <Box sx={containerSx}>
      <WrappedContainer
        wrapperSx={wideMode ? { px: { xs: "1.5em", md: "3em" } } : undefined}
        bgColor={"transparent"}
      >
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
            {links.map((link) => (
              <HeaderLink
                key={link.path}
                to={link.path}
                pathname={router.pathname}
              >
                {t(link.i18nKey)}
              </HeaderLink>
            ))}
          </Stack>
          <IconButton
            onClick={menu.handleOpen}
            sx={{
              p: isAuth ? "0.38em" : "0.5em",
              border: isAuth ? "1px solid #FF9D42" : "none",
              backgroundColor: isAuth ? "transparent" : "#FF9D42",
              "&:hover": {
                backgroundColor: isAuth ? "#FF9D4224" : "primary.main",
              },
            }}
          >
            {isAuth ? (
              <PersonIcon sx={{ fontSize: "27.8px", fill: "#FF9D42" }} />
            ) : menu.open ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <SliderMenu
            pathname={router.pathname}
            open={menu.open}
            anchorEl={menu.anchor}
            onClose={menu.handleClose}
            id={menu.id}
          />
        </Stack>
      </WrappedContainer>
    </Box>
  );
};

export default memo(Header);
