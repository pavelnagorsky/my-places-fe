import { FormContainer, FormProvider } from "react-hook-form-mui";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AnimatePresence, motion, Variants } from "framer-motion";
import TabPanel from "@/containers/create-place/form/tabs/TabPannel";
import Tab1 from "@/containers/create-place/form/tabs/Tab1";
import Tab2 from "@/containers/create-place/form/tabs/Tab2";
import Tab3 from "@/containers/create-place/form/tabs/Tab3";
import Tab4 from "@/containers/create-place/form/tabs/Tab4";
import useCreatePlaceMeta from "@/containers/create-place/form/useCreatePlaceMeta";
import { SyntheticEvent, useState } from "react";
import Navigation from "@/containers/create-place/form/Navigation";
import animationVariants from "@/shared/animation-variants";
import usePlaceModeration from "@/containers/moderation/places/place-moderation/usePlaceModeration";
import ModerationLayout from "@/containers/moderation/layout/ModerationLayout";
import ModerationForm from "@/containers/moderation/places/place-moderation/ModerationForm";
import { useTranslation } from "next-i18next";

const tabContentVariant: Variants = {
  active: {
    display: "block",
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  inactive: {
    display: "none",
    opacity: 0,
    x: -20,
  },
};

const PlaceModeration = () => {
  const { t } = useTranslation(["moderation", "common"]);
  const logic = usePlaceModeration();
  const createPlaceMeta = useCreatePlaceMeta();

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={logic.loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <ModerationLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        {loader}
        <FormProvider {...logic.form}>
          <FormContainer formContext={logic.form} onSuccess={() => {}}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box pb={{ xs: "1.5em", md: "1em" }}>
                <Stack
                  direction={{ md: "row" }}
                  gap={{ xs: "1.5em", md: "1em" }}
                  justifyContent={"space-between"}
                >
                  <Box overflow={"hidden"}>
                    <Stack
                      direction={{ sm: "row" }}
                      columnGap={"1em"}
                      rowGap={"0.5em"}
                      alignItems={{ sm: "center" }}
                      mb={{ xs: "1em", md: "1.5em" }}
                    >
                      <Box order={{ xs: 1, sm: 0 }}>
                        <Button
                          onClick={logic.onGoBack}
                          sx={{ borderRadius: "10px", textTransform: "none" }}
                          variant={"outlined"}
                          color={"secondary"}
                        >
                          {t("buttons.back", { ns: "common" })}
                        </Button>
                      </Box>
                      <Typography
                        variant={"h1"}
                        mb={0}
                        fontSize={{ xs: "24px", sm: "30px", md: "40px" }}
                      >
                        {t("form.titlePlace")}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <ModerationForm mode={"place"} id={logic.placeId as number} />
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Grid container spacing={"1em"} mb={"3em"}>
                <Grid size={{ xs: 12 }}>
                  <Navigation
                    alwaysHorizontal
                    activeTab={activeTab}
                    handleChange={handleChangeTab}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <AnimatePresence mode={"sync"}>
                    <motion.div
                      key={0}
                      variants={tabContentVariant}
                      animate={activeTab === 0 ? "active" : "inactive"}
                      initial="inactive"
                    >
                      <TabPanel value={activeTab} index={0}>
                        <Tab1 readonly />
                      </TabPanel>
                    </motion.div>
                    <motion.div
                      key={1}
                      variants={tabContentVariant}
                      animate={activeTab === 1 ? "active" : "inactive"}
                      initial="inactive"
                    >
                      <TabPanel value={activeTab} index={1}>
                        <Tab2
                          readonly
                          categories={createPlaceMeta.categories}
                          placeTypes={createPlaceMeta.placeTypes}
                        />
                      </TabPanel>
                    </motion.div>
                    <motion.div
                      key={2}
                      variants={tabContentVariant}
                      animate={activeTab === 2 ? "active" : "inactive"}
                      initial="inactive"
                    >
                      <TabPanel value={activeTab} index={2}>
                        <Tab3 readonly />
                      </TabPanel>
                    </motion.div>
                    <motion.div
                      key={3}
                      variants={tabContentVariant}
                      animate={activeTab === 3 ? "active" : "inactive"}
                      initial="inactive"
                    >
                      <TabPanel value={activeTab} index={3}>
                        <Tab4 readonly />
                      </TabPanel>
                    </motion.div>
                  </AnimatePresence>
                </Grid>
              </Grid>
            </motion.div>
          </FormContainer>
        </FormProvider>
      </motion.div>
    </ModerationLayout>
  );
};

export default PlaceModeration;
