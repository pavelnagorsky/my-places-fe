import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import TextAndImage from "@/components/text-and-image/TextAndImage";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { useTranslation } from "next-i18next";
import card1Image from "/public/images/about-us/card1.jpg";
import card2Image from "/public/images/about-us/card2.jpg";
import { Box, Stack, Typography } from "@mui/material";
import Faq from "@/containers/about-us/faq/Faq";

const AboutUs = () => {
  const { t } = useTranslation("about");

  return (
    <Stack mb={"2em"}>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <WrappedContainer>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <TextAndImage
              titleComponent={"h1"}
              sx={{
                mt: { xs: "1em", md: "2em" },
                "& .description": {
                  fontSize: { xs: "18px", md: "20px" },
                },
                "& .title": {
                  fontSize: { xs: "30px", md: "40px" },
                },
              }}
              title={t("title")}
              description={t("description1")}
              showImageMobile
              image={card1Image}
            />
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <TextAndImage
              sx={{
                "& .description": {
                  fontSize: { xs: "18px", md: "20px" },
                },
              }}
              description={t("description2")}
              showImageMobile
              reverse
              image={card2Image}
            />
          </motion.div>
        </WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack bgcolor={"#FFA654"}>
            <WrappedContainer bgColor={"#FFA654"}>
              <Stack
                direction={"row"}
                py={"2em"}
                gap={"2em"}
                alignItems={"center"}
                bgcolor={"#FFA654"}
              >
                <Typography
                  fontSize={"100px"}
                  color={"white"}
                  fontWeight={600}
                  display={{ xs: "none", sm: "block" }}
                >
                  !
                </Typography>
                <Typography fontSize={"20px"} color={"white"} fontWeight={600}>
                  {t("info")}
                </Typography>
              </Stack>
            </WrappedContainer>
          </Stack>
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <WrappedContainer>
            <Faq />
          </WrappedContainer>
        </motion.div>
      </motion.div>
    </Stack>
  );
};

export default AboutUs;
