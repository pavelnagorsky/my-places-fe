import { Stack, SxProps, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import mailImage from "public/images/icons/mail.png";
import { Logo } from "@/components/Logo/Logo";
import MyLink from "@/components/NextMuiLink/NextMuiLink";
import { memo } from "react";
import { routerLinks } from "@/staticData/routerLinks";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import Media from "@/hoc/Media/Media";
import { useRouter } from "next/router";

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
  const bottomMenuPathNames = ["/administration"];
  const setBottomMargin = bottomMenuPathNames.some((link) =>
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
        <Image src={mailImage} alt={"Email"} />
        <Typography
          component={"a"}
          href="mailto:my-places@gmail.com"
          color={"secondary.main"}
          ml={"0.3em"}
          fontSize={"14px"}
        >
          my-places@gmail.com
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <WrappedContainer
      sx={{ pb: setBottomMargin ? { xs: "4em", md: 0 } : undefined }}
    >
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
