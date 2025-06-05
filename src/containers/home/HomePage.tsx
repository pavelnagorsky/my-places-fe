import { useTranslation } from "next-i18next";
import TextAndMainImage from "@/containers/home/content/TextAndMainImage";
import TextAndImage from "@/components/text-and-image/TextAndImage";
import card1Image from "../../../public/images/home-page/card1.jpg";
import card2Image from "../../../public/images/home-page/card2.jpg";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { routerLinks } from "@/routing/routerLinks";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import PlaceCreationSection from "@/containers/home/content/PlaceCreationSection";

const HomePage = () => {
  const { t } = useTranslation("home");
  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <TextAndMainImage />
      <WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            title={t("card1.title")}
            description={t("card1.description")}
            btnText={t("card1.link")}
            linkTo={routerLinks.places}
            showImageMobile
            image={card1Image}
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            sx={{
              mb: "0 !important",
            }}
            reverse
            title={t("card2.title")}
            description={t("card2.description")}
            btnText={t("card2.link")}
            linkTo={routerLinks.createPlace}
            showImageMobile
            image={card2Image}
          />
        </motion.div>
      </WrappedContainer>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <PlaceCreationSection />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
