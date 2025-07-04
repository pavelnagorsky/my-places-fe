import { Box, IconButton, Stack } from "@mui/material";
import { Logo } from "../logo/Logo";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { routerLinks } from "@/routing/routerLinks";
import { useRouter } from "next/router";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import { HeaderLink } from "./header-link/HeaderLink";
import CreateMenu from "./create-menu/CreateMenu";
import SliderMenu from "@/components/header/slider-menu/SliderMenu";
import usePopover from "@/hooks/usePopover";
import useHeaderStyles from "@/components/header/logic/useHeaderStyles";
import MenuIcon from "../UI/custom-icons/MenuIcon";
import ProfileIcon from "@/components/UI/custom-icons/ProfileIcon";
import useRouterPathWithoutQuery from "@/hooks/useRouterPathWithoutQuery";

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
  const pathWithoutQuery = useRouterPathWithoutQuery();
  const isAuth = useAppSelector(selectIsAuth);
  const containerSx = useHeaderStyles();

  const getWrapperSx = () => {
    const isCatalogPage = [routerLinks.places, routerLinks.excursions].includes(
      pathWithoutQuery
    );
    if (isCatalogPage) {
      return {
        px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" },
      };
    }
    if (wideMode) {
      return { px: { xs: "1.5em", md: "3em" } };
    }
    return undefined;
  };

  return (
    <Box sx={containerSx}>
      <WrappedContainer wrapperSx={getWrapperSx()} bgColor={"transparent"}>
        <Stack
          className={"header-container"}
          justifyContent={"space-between"}
          direction={"row"}
          mx={{ xs: "-1.5em", md: 0 }}
          px={{ xs: "1em", md: 0 }}
          py={{ xs: "0.5em", md: "1em" }}
          alignItems={"center"}
        >
          <Box>
            <Logo />
          </Box>
          <Stack
            direction={"row"}
            sx={{ display: { xs: "none", md: "flex" }, columnGap: "0.5em" }}
          >
            <CreateMenu activePath={pathWithoutQuery} />
            {links.map((link) => (
              <HeaderLink
                key={link.path}
                to={link.path}
                pathname={pathWithoutQuery}
              >
                {t(link.i18nKey)}
              </HeaderLink>
            ))}
          </Stack>
          <IconButton
            className={"header-menu-toggle"}
            size={isAuth ? "small" : "medium"}
            onClick={menu.handleOpen}
          >
            {isAuth ? (
              <ProfileIcon sx={{ fontSize: "39px" }} />
            ) : (
              <MenuIcon sx={{ fontSize: "33px" }} />
            )}
          </IconButton>
          <SliderMenu
            pathname={pathWithoutQuery}
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
