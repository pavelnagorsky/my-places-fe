import {
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import mailImage from "public/images/icons/mail.png";
import { Logo } from "@/components/Logo/Logo";
import MyLink from "@/components/NextMuiLink/NextMuiLink";
import { memo } from "react";
import { routerLinks } from "@/staticData/routerLinks";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const linksSection = (
    <Stack direction={"row"} gap={"3em"}>
      <MyLink href={routerLinks.contactUs} sx={linkSx}>
        {t("links.contactUs")}
      </MyLink>
      <MyLink href={routerLinks.aboutUs} sx={linkSx}>
        {t("links.about")}
      </MyLink>
    </Stack>
  );

  const footerText = (
    <Stack direction={"column"} alignItems={"center"}>
      <Typography color={"#727272"} fontSize={"14px"} mb={"0.2em"}>
        {t("footer.title")}
      </Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <Image src={mailImage} alt={"Email"} />
        <Typography color={"secondary.main"} ml={"0.3em"} fontSize={"14px"}>
          pavelnagorsky@mail.ru
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <WrappedContainer>
      <Stack
        gap={isMobile ? "1.5em" : undefined}
        direction={"row"}
        alignItems={"center"}
        justifyContent={{ xs: "start", md: "space-between" }}
        mb={"2em"}
      >
        {isMobile ? null : linksSection}
        <Logo small={isMobile} />
        {footerText}
      </Stack>
    </WrappedContainer>
  );
};

export default memo(Footer);
