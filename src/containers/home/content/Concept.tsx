import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";

const Concept = () => {
  const { t } = useTranslation("home");

  return (
    <Stack
      position={"relative"}
      bgcolor={primaryBackground}
      py={{ xs: "4.37em", md: "5.6em" }}
    >
      <WrappedContainer bgColor={primaryBackground}>
        <Stack gap={{ xs: "2.5em", md: "3.75em" }} textAlign={"center"}>
          <Typography
            color={"primary.main"}
            fontWeight={600}
            fontSize={{ xs: "14px", md: "16px" }}
            textTransform={"uppercase"}
          >
            {t("concept.title")}
          </Typography>
          <Typography
            color={"primary.main"}
            fontWeight={600}
            fontSize={{ xs: "20px", md: "32px" }}
            sx={{ "& span": { color: "primary.light" } }}
          >
            {t("concept.text1")}{" "}
            <Box component={"span"}>{t("concept.text2")}</Box>{" "}
            {t("concept.text3")}{" "}
            <Box component={"span"}>{t("concept.text4")}</Box>{" "}
            {t("concept.text5")}{" "}
            <Box component={"span"}>{t("concept.text6")}</Box>{" "}
            {t("concept.text7")}
          </Typography>
          <Typography
            color={"primary.main"}
            textTransform={"uppercase"}
            fontWeight={600}
            fontSize={{ xs: "14px", md: "16px" }}
          >
            {t("concept.footer")}
          </Typography>
        </Stack>
      </WrappedContainer>
    </Stack>
  );
};

export default Concept;
