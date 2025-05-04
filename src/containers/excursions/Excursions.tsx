import { Stack, Typography } from "@mui/material";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { FormProvider } from "react-hook-form-mui";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import useExcursions from "@/containers/excursions/logic/useExcursions";
import Filters from "@/containers/excursions/content/filters/Filters";
import TotalResultsCount from "./content/TotalResultsCount";
import CardsSection from "./content/cards-section/CardsSection";
import OrderBySelector from "./content/filters/content/order-by-selector/OrderBySelector";
import { useTranslation } from "next-i18next";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

function Excursions() {
  const { form, onSubmit } = useExcursions();
  const { t } = useTranslation("excursion-management");

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer
        wrapperSx={{ px: { xs: "1.5em", md: "3em", lg: "7.5em" } }}
      >
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack mb={2} display={{ xs: "none", md: "flex" }}>
            <Breadcrumbs />
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            gap={2}
            alignItems={{ md: "center" }}
          >
            <Typography mb={0} variant={"h1"}>
              {t("search.title")}
            </Typography>
            <FormProvider {...form}>
              <Filters onSubmit={onSubmit} />
            </FormProvider>
          </Stack>
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Stack
            direction={{ md: "row" }}
            alignItems={{ md: "center" }}
            justifyContent={{ md: "space-between" }}
            gap={"1em"}
            my={{ xs: "1.5em", md: "2em" }}
          >
            <TotalResultsCount />
            <FormProvider {...form}>
              <OrderBySelector onSubmit={onSubmit} />
            </FormProvider>
          </Stack>
          <CardsSection onSubmit={onSubmit} />
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
}

export default Excursions;
