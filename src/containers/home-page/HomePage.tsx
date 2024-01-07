import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import TextAndMainImage from "@/components/text-and-image/TextAndMainImage";
import mainImageMd from "public/images/home-page/main-image-md.jpg";
import mainImageXs from "public/images/home-page/main-image-xs.png";
import TextAndImage from "@/components/text-and-image/TextAndImage";
import card1Image from "public/images/home-page/card1.jpg";
import card2Image from "public/images/home-page/card2.jpg";
import BoxWithCircles from "@/components/UI/box-with-circles/BoxWithCircles";
import TextWithBubbles from "@/components/text-and-image/TextWithBubbles";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { routerLinks } from "@/routing/routerLinks";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";

const HomePage = () => {
  const { t } = useTranslation("homePage");
  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndMainImage
            title={t("title")}
            description={t("description")}
            showMobile
            imageUrlMd={mainImageMd}
            imageUrlXs={mainImageXs}
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            title={t("card1.title")}
            description={t("card1.description")}
            btnText={t("card1.link")}
            linkTo={routerLinks.search}
            showImageMobile
            image={card1Image}
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            sx={{ mb: "0 !important" }}
            reverse
            title={t("card2.title")}
            description={t("card2.description")}
            btnText={t("card2.link")}
            linkTo={routerLinks.createReview}
            showImageMobile
            image={card2Image}
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <BoxWithCircles />
        </motion.div>
      </WrappedContainer>
      <TextWithBubbles />
    </motion.div>
  );
};

export default HomePage;
