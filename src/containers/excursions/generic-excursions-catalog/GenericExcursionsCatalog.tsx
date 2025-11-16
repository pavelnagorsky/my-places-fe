import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Stack, Typography } from "@mui/material";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import TotalResultsCount from "./content/TotalResultsCount";
import CardsSection from "./content/CardsSection";

interface IGenericExcursionsCatalogProps {
  title: string;
  items: IExcursionSearchItem[];
}

const GenericExcursionsCatalog = ({
  title,
  items,
}: IGenericExcursionsCatalogProps) => {
  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" } }}
      >
        <Stack mb={2} display={{ xs: "none", md: "flex" }}>
          <Breadcrumbs customEnding={title} />
        </Stack>
      </WrappedContainer>
      <Stack py={"1em"}>
        <WrappedContainer
          wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" } }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            gap={2}
            alignItems={{ md: "center" }}
          >
            <Typography mb={0} variant={"h1"}>
              {title}
            </Typography>
          </Stack>
        </WrappedContainer>
      </Stack>
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "2em", xl: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack
            direction={{ md: "row" }}
            alignItems={{ md: "center" }}
            justifyContent={{ md: "space-between" }}
            gap={"1em"}
            mb={{ xs: "1.5em", md: "2em" }}
            mt={{ xs: "0.5em", md: "1em" }}
          >
            <TotalResultsCount itemsCount={items.length} />
          </Stack>
          <CardsSection items={items} />
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
};

export default GenericExcursionsCatalog;
