import {
  Box,
  Divider,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Logo } from "@/components/logo/Logo";
import MyLink from "@/components/next-mui-link/NextMuiLink";
import { memo } from "react";
import { routerLinks } from "@/routing/routerLinks";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Environment } from "@/shared/Environment";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@/components/UI/custom-icons/EmailIcon";

const linkSx: SxProps = {
  fontSize: "14px",
  color: "secondary.main",
  textDecoration: "none",
  "&.active": {
    color: "primary.main",
  },
  "&:hover": {
    color: "primary.main",
  },
};

const Footer = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();

  const linksSection = (
    <Stack
      direction={"row"}
      rowGap={2}
      flexWrap={"wrap"}
      columnGap={{ xs: 3, md: 6 }}
      py={"2em"}
      justifyContent={"center"}
    >
      <MyLink href={routerLinks.contactUs} sx={linkSx}>
        {t("links.contactUs")}
      </MyLink>
      <MyLink href={routerLinks.aboutUs} sx={linkSx}>
        {t("links.about")}
      </MyLink>
      <MyLink href={routerLinks.privacyPolicy} sx={linkSx}>
        {t("links.privacyPolicy")}
      </MyLink>
      <MyLink href={routerLinks.termsOfUse} sx={linkSx}>
        {t("links.termsOfUse")}
      </MyLink>
    </Stack>
  );

  const socialMediaSection = (
    <Stack direction={"row"} gap={1.5}>
      <IconButton
        component={"a"}
        target="_blank"
        href={Environment.telegram}
        sx={{
          background: `${theme.palette.secondary.main} !important`,
          color: "white",
        }}
      >
        <TelegramIcon />
      </IconButton>
      <IconButton
        component={"a"}
        target="_blank"
        href={Environment.instagram}
        sx={{
          background: `${theme.palette.secondary.main} !important`,
          color: "white",
        }}
      >
        <InstagramIcon />
      </IconButton>
    </Stack>
  );

  const footerText = (
    <Stack direction={"column"} alignItems={"center"}>
      <Stack direction={"row"} alignItems={"center"} gap={"0.8em"}>
        <EmailIcon sx={{ width: "30px", height: "30px" }} color={"secondary"} />
        <Typography
          component={"a"}
          sx={{ textDecoration: "none" }}
          href={`mailto:${Environment.email}`}
          color={"secondary.main"}
          fontSize={"14px"}
        >
          {Environment.email}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <WrappedContainer>
      <Stack
        gap={{ xs: "1.5em", md: 0 }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={"2em"}
      >
        <Box display={{ xs: "none", md: "block" }}>{socialMediaSection}</Box>
        <Logo small />
        {footerText}
      </Stack>
      <Divider variant={"middle"} sx={{ borderColor: "disabled" }} />
      {linksSection}
      <Stack
        display={{ xs: "flex", md: "none" }}
        alignItems={"center"}
        pb={"2em"}
      >
        {socialMediaSection}
      </Stack>
    </WrappedContainer>
  );
};

export default memo(Footer);
