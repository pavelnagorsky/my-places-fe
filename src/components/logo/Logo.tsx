import { Box, Hidden, Stack, Typography } from "@mui/material";
import logoImage from "public/images/logo/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

export function Logo({ small }: { small?: boolean }) {
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
      Знай свой край
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
          mr: "0.8em",
          height: "50px",
        }}
      >
        <Image
          src={logoImage}
          alt={"Знай свой край"}
          priority={true}
          width={52}
          height={52}
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
