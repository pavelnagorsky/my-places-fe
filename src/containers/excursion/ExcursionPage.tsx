import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";

const ExcursionPage = ({ excursion }: { excursion: IExcursion }) => {
  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack mb={2}>
          <Breadcrumbs customEnding={excursion.title} />
        </Stack>
        <Grid container spacing={2}></Grid>
      </motion.div>
    </WrappedContainer>
  );
};

export default ExcursionPage;
