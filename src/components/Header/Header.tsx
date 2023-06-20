import {Box, IconButton, Stack} from "@mui/material";

import {Logo} from "../Logo/Logo";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {HeaderLink} from "./HeaderLink/HeaderLink";
import {useTranslation} from "next-i18next";
import {memo} from "react";
import {routerLinks} from "@/staticData/routerLinks";
import {useHeaderMenu} from "@/components/Header/SliderMenu/useHeaderMenu";
import SliderMenu from "@/components/Header/SliderMenu/SliderMenu";
import {useRouter} from "next/router";

const Header = () => {
    const {t} = useTranslation("common");
    const menu = useHeaderMenu()
    const router = useRouter()

    return (<Stack
        justifyContent={"space-between"}
        position={"sticky"}
        top={0}
        sx={{
            backgroundColor: "white"
        }}
        direction={"row"}
        mx={{ xs: "-1.5em", md: 0 }}
        px={{ xs: "1em", md: 0 }}
        zIndex={1000}
        py={{ xs: "0.5em", md: "1em" }}
        my={{ xs: "0.5em", md: "1em" }}
        alignItems={"center"}
    >
        <Box >
            <Logo />
        </Box>
        <Stack
            direction={"row"}
            sx={{ display: { xs: "none", md: "flex" }, columnGap: "0.5em" }}
        >
            <HeaderLink to={routerLinks.create} pathname={router.pathname}>
                {t("links.create")}
            </HeaderLink>
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
                    backgroundColor: "primary.main"
                }
            }}
        >
            {menu.open ? <CloseIcon /> : <MenuIcon  />}
        </IconButton>
        <SliderMenu
            pathname={router.pathname}
            open={menu.open}
            anchorEl={menu.anchorEl}
            onClose={menu.handleClose}
            id={menu.id}
        />
    </Stack>)
}

export default memo(Header)