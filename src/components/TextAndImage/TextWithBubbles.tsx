import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

export function TextWithBubbles() {
  const { t } = useTranslation("homePage");

  return (
    <Box mx={{ xs: "-1.5em", md: "-3em", lg: "-7.5em" }} maxWidth={"100vw"}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #FFA653 37.92%, rgba(255, 166, 84, 0.47) 63.98%, rgba(255, 204, 157, 0.159719) 87.58%, rgba(255, 245, 235, 0.0806913) 96.31%, rgba(255, 255, 255, 0) 100%)",
          height: { xs: "300px", md: "240px" },
        }}
      >
        <Typography
          px={{ xs: "1.5em", md: "5em" }}
          pt={"2em"}
          textAlign={"center"}
          gutterBottom
          fontSize={{
            xs: "16px",
            sm: "20px",
          }}
          fontWeight={700}
          color={"primary.contrastText"}
          sx={{
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
          }}
          component={"h2"}
        >
          {t("bottomText")}
        </Typography>
      </Box>
    </Box>
  );
}
