import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { motion } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useTranslation } from "next-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy-policy");

  return (
    <WrappedContainer>
      <Breadcrumbs />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
      >
        <Stack gap={"1.5em"} mt={"1em"} mb={"3em"}>
          <Box>
            <Typography variant={"h1"} component={"h1"}>
              {t("title")}
            </Typography>
            <Typography variant={"body1"} fontSize={"18px"}>
              {t("description")}
            </Typography>
          </Box>
          {Array.from(Array(8).keys()).map((index) => (
            <Box key={index}>
              <Typography
                variant={"h3"}
                fontSize={{ xs: "1.3em", md: "1.5em" }}
              >
                {t(`data.${index + 1}.title`)}
              </Typography>
              <Typography variant={"body2"}>
                {t(`data.${index + 1}.description`)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </motion.div>
    </WrappedContainer>
  );
};

export default PrivacyPolicy;
