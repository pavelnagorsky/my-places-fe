import { Hidden, Stack, SxProps, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Logo } from "@/components/logo/Logo";
import MyLink from "@/components/next-mui-link/NextMuiLink";
import { memo } from "react";
import { routerLinks } from "@/routing/routerLinks";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Environment } from "@/shared/Environment";

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

  const linksSection = (
    <Hidden mdDown implementation="css">
      <Stack direction={"row"} gap={"3em"}>
        <Stack gap={"0.5em"}>
          <MyLink href={routerLinks.contactUs} sx={linkSx}>
            {t("links.contactUs")}
          </MyLink>
          <MyLink href={routerLinks.aboutUs} sx={linkSx}>
            {t("links.about")}
          </MyLink>
        </Stack>
        <Stack gap={"0.5em"}>
          <MyLink href={routerLinks.privacyPolicy} sx={linkSx}>
            {t("links.privacyPolicy")}
          </MyLink>
          <MyLink href={routerLinks.termsOfUse} sx={linkSx}>
            {t("links.termsOfUse")}
          </MyLink>
        </Stack>
      </Stack>
    </Hidden>
  );

  const footerText = (
    <Stack direction={"column"} alignItems={"center"}>
      <Typography color={"#727272"} fontSize={"14px"} mb={"0.2em"}>
        {t("footer.title")}
      </Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <MailOutlineIcon
          sx={({ palette }) => ({
            borderRadius: "50%",
            color: palette.secondary.main,
            p: "0.1em",
            mt: "0.2em",
            border: `1px solid ${palette.secondary.main}`,
          })}
        />
        <Typography
          component={"a"}
          href={`mailto:${Environment.email}`}
          color={"secondary.main"}
          ml={"0.3em"}
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
        mb={"2em"}
      >
        {linksSection}
        <Logo small />
        {footerText}
      </Stack>
    </WrappedContainer>
  );
};

export default memo(Footer);
