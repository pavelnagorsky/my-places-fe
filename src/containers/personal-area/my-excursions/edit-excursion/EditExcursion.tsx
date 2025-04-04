import { useTranslation } from "next-i18next";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { FormProvider, useFieldArray } from "react-hook-form-mui";
import Grid from "@mui/material/Grid2";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import useEditMyExcursion from "@/containers/personal-area/my-excursions/edit-excursion/logic/useEditMyExcursion";
import Details from "@/containers/excursion-builder/content/details/Details";
import MapSection from "@/containers/excursion-builder/content/map-section/MapSection";
import UpdateTranslations from "@/containers/personal-area/my-places/edit-my-place/UpdateTranslations";

const Form = dynamic(
  () => import("@/containers/excursion-builder/content/form/Form"),
  {
    ssr: false,
  }
);

const EditExcursion = () => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const { form, loading, onGoBack } = useEditMyExcursion();

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <PersonalAreaLayout>
      {loader}
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <FormProvider {...form}>
          <Grid container spacing={4} mb={"4em"}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <motion.div variants={animationVariants.defaultItemVariant}>
                <Stack mb={3} gap={{ xs: 1, sm: 2 }}>
                  <Stack
                    direction={{ sm: "row" }}
                    gap={2}
                    alignItems={{ sm: "center" }}
                  >
                    <Box>
                      <Button
                        onClick={onGoBack}
                        sx={{
                          borderRadius: "10px",
                          textTransform: "none",
                        }}
                        variant={"outlined"}
                        size={"small"}
                        color={"secondary"}
                      >
                        {t("buttons.back", { ns: "common" })}
                      </Button>
                    </Box>
                    <Typography variant={"h1"} mb={0}>
                      {t("seo.edit.title")}
                    </Typography>
                  </Stack>
                  <UpdateTranslations />
                </Stack>
                <Form />
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Details />
            </Grid>
            <Grid size={12}>
              <motion.div variants={animationVariants.defaultItemVariant}>
                <MapSection />
              </motion.div>
            </Grid>
          </Grid>
        </FormProvider>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default EditExcursion;
