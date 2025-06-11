import TextAndMainImage from "@/containers/home/content/TextAndMainImage";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import PlaceCreationSection from "./content/PlaceCreationSection";
import PlacesSection from "@/containers/home/content/places-section/PlacesSection";
import ExcursionsSection from "@/containers/home/content/excursions-section/ExcursionsSection";
import Concept from "@/containers/home/content/Concept";

const HomePage = () => {
  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <TextAndMainImage />
      <motion.div variants={animationVariants.defaultItemVariant}>
        <PlacesSection />
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <PlaceCreationSection />
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <ExcursionsSection />
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <Concept />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
