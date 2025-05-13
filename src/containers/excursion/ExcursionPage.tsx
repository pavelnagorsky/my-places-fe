import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Box, Stack } from "@mui/material";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import ExcursionContent from "@/containers/excursion/content/ExcursionContent";

const ExcursionPage = ({ excursion }: { excursion: IExcursion }) => {
  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack mb={2} display={{ xs: "none", md: "flex" }}>
          <Breadcrumbs customEnding={excursion.title} />
        </Stack>
        <Box mb={8}>
          <ExcursionContent excursion={excursion} />
        </Box>
      </motion.div>
    </WrappedContainer>
  );
};

export default ExcursionPage;
