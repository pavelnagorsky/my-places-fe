import { Box, Hidden, Stack, Typography } from "@mui/material";

import logoImage from "public/images/logo/logo.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

export function Logo({ small }: { small?: boolean }) {
  const { t } = useTranslation("common");
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
        <Hidden mdDown implementation={"css"}>
          {logoText}
        </Hidden>
      ) : (
        logoText
      )}
    </Stack>
  );
}
