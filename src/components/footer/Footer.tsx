import { Stack, SxProps, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Logo } from "@/components/logo/Logo";
import MyLink from "@/components/next-mui-link/NextMuiLink";
import { memo } from "react";
import { routerLinks } from "@/routing/routerLinks";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Media from "@/hoc/media/Media";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const noFooterPathNames = [
    routerLinks.administrationBasePath,
    routerLinks.personalAreaBasePath,
    routerLinks.moderationBasePath,
  ];
  const hideFooter = noFooterPathNames.some((link) =>
    router.pathname.includes(link)
  );

  const linksSection = (
    <Media xs={"none"} md={"block"}>
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
            Политика конфиденциальности
          </MyLink>
          <MyLink href={routerLinks.termsOfUse} sx={linkSx}>
            Пользовательское соглашение
          </MyLink>
        </Stack>
      </Stack>
    </Media>
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

  return hideFooter ? null : (
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
