import { motion } from "framer-motion";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import animationVariants from "@/shared/animation-variants";
import { FormProvider, useFieldArray } from "react-hook-form-mui";
import UpdateTranslations from "@/containers/personal-area/my-places/edit-my-place/UpdateTranslations";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import useEditMyExcursion from "@/containers/personal-area/my-excursions/edit-excursion/logic/useEditMyExcursion";
import ExcursionPlacesFieldArrayProvider from "@/containers/excursion-builder/content/form/content/excursion-places/context/ExcursionPlacesFieldArrayProvider";
import Details from "@/containers/excursion-builder/content/details/Details";
import MapSection from "@/containers/excursion-builder/content/map-section/MapSection";

const Form = dynamic(
  () => import("@/containers/excursion-builder/content/form/Form"),
  {
    ssr: false,
  }
);

const EditExcursion = () => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const { form, loading, onGoBack } = useEditMyExcursion();
  const fieldArray = useFieldArray({
    control: form.control,
    keyName: "key",
    name: "places",
  });

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <AdminLayout paperProps={{ elevation: 0 }}>
      {loader}
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <FormProvider {...form}>
          <ExcursionPlacesFieldArrayProvider {...(fieldArray as any)}>
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
          </ExcursionPlacesFieldArrayProvider>
        </FormProvider>
      </motion.div>
    </AdminLayout>
  );
};

export default EditExcursion;
