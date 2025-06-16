import TextAndMainImage from "@/containers/home/content/TextAndMainImage";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import PlaceCreationSection from "./content/PlaceCreationSection";
import PlacesSection from "@/containers/home/content/places-section/PlacesSection";
import ExcursionsSection from "@/containers/home/content/excursions-section/ExcursionsSection";
import Concept from "@/containers/home/content/Concept";
import { IPlacesCountByTypes } from "@/services/search-service/interfaces/places-count-by-types.interface";

const HomePage = ({ placesCount }: { placesCount: IPlacesCountByTypes }) => {
  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <TextAndMainImage />
      <motion.div variants={animationVariants.defaultItemVariant}>
        <PlacesSection placesCount={placesCount} />
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
