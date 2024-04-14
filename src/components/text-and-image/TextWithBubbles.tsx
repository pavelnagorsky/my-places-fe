import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { DefaultContainer } from "@/hoc/wrappers/DefaultContainer";

const GRADIENT =
  "linear-gradient(180deg, #FFA653 37.92%, rgba(255, 166, 84, 0.47) 63.98%, rgba(255, 204, 157, 0.159719) 87.58%, rgba(255, 245, 235, 0.0806913) 96.31%, rgba(255, 255, 255, 0) 100%)";

function TextWithBubbles() {
  const { t } = useTranslation("home");

  return (
    <Box maxWidth={"100vw"}>
      <Box
        sx={{
          background: GRADIENT,
          height: { xs: "300px", md: "240px" },
        }}
      >
        <DefaultContainer sx={{ background: "transparent" }}>
          <Typography
            px={{ xs: "2.5em", md: "6em" }}
            pt={{ xs: "1.5em", md: "2em" }}
            textAlign={"center"}
            gutterBottom
            fontSize={{
              xs: "16px",
              sm: "20px",
            }}
            fontWeight={600}
            color={"primary.contrastText"}
            // sx={{
            //   textShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
            // }}
            component={"h2"}
          >
            {t("bottomText")}
          </Typography>
        </DefaultContainer>
      </Box>
    </Box>
  );
}

export default TextWithBubbles;
