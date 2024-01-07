import { Box, Stack, Typography } from "@mui/material";

import logoImage from "public/images/logo/logo.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import Media from "@/hoc/media/Media";

export function Logo({ small }: { small?: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();

  const logoText = (
    <Typography
      variant={"h1"}
      component={"p"}
      fontSize={"24px"}
      fontWeight={500}
      mb={0}
      letterSpacing={0}
    >
      {t("logo")}
    </Typography>
  );

  return (
    <Stack
      onClick={() => router.push("/")}
      direction={"row"}
      alignItems={"center"}
      sx={{ cursor: "pointer" }}
    >
      <Box
        sx={{
          mr: "1em",
          height: "50px",
        }}
      >
        <Image
          src={logoImage}
          alt={t("logo")}
          priority={true}
          width={50}
          height={50}
        />
      </Box>
      {small ? (
        <Media xs={"none"} md="block">
          {logoText}
        </Media>
      ) : (
        logoText
      )}
    </Stack>
  );
}
