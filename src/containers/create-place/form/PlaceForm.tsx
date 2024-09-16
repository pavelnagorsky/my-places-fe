import { useFormContext } from "react-hook-form-mui";
import { Fragment, SyntheticEvent, useState } from "react";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import TabPanel from "@/containers/create-place/form/tabs/TabPannel";
import dynamic from "next/dynamic";
import Tab1 from "@/containers/create-place/form/tabs/Tab1";
import Tab3 from "@/containers/create-place/form/tabs/Tab3";
import Tab2 from "@/containers/create-place/form/tabs/Tab2";
import useCreatePlaceMeta from "@/containers/create-place/form/useCreatePlaceMeta";
import Tab4 from "@/containers/create-place/form/tabs/Tab4";
import ButtonWithTooltip from "@/components/UI/button/ButtonWithTooltip";
import { AnimatePresence, motion, Variants } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { useTranslation } from "next-i18next";

const Navigation = dynamic(
  () => import("@/containers/create-place/form/Navigation"),
  { ssr: false }
);

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

interface IPlaceFormProps {
  loading: boolean;
}

const PlaceForm = ({ loading }: IPlaceFormProps) => {
  const { t } = useTranslation(["place-management", "common"]);
  const { formState } = useFormContext<IPlaceFormContext>();
  const createPlaceMeta = useCreatePlaceMeta();

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Breadcrumbs />
          <Box pt="1.5em" pb={{ xs: "1.5em", md: "2em" }}>
            <Stack
              direction={{ md: "row" }}
              gap={{ xs: "1.5em", md: "1em" }}
              justifyContent={"space-between"}
            >
              <Box overflow={"hidden"}>
                <Typography
                  variant={"h1"}
                  //fontSize={{ xs: "25px", md: "32px" }}
                  mb={"0.5em"}
                >
                  {t("creation.title")}
                </Typography>
                <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                  {t("creation.description")}
                </Typography>
              </Box>
              <div>
                <ButtonWithTooltip
                  loading={loading}
                  buttonText={t("buttons.create", { ns: "common" })}
                  tooltipText={t("errors.allFieldsRequired", { ns: "common" })}
                  variant={"contained"}
                  type={"submit"}
                  disabled={!formState.isValid}
                  sx={{
                    fontWeight: 700,
                    py: "1em",
                    px: 0,
                    width: { xs: "230px", md: "210px" },
                  }}
                />
              </div>
            </Stack>
          </Box>
        </motion.div>
        <Grid container spacing={"1em"} mb={"3em"}>
          <Grid item xs={12} md={3} lg={2}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Navigation
                activeTab={activeTab}
                handleChange={handleChangeTab}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <AnimatePresence mode={"sync"}>
                <motion.div
                  key={0}
                  variants={tabContentVariant}
                  animate={activeTab === 0 ? "active" : "inactive"}
                  initial="inactive"
                >
                  <TabPanel value={activeTab} index={0}>
                    <Tab1 />
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
                    <Tab3 canDeleteByAPI />
                  </TabPanel>
                </motion.div>
                <motion.div
                  key={3}
                  variants={tabContentVariant}
                  animate={activeTab === 3 ? "active" : "inactive"}
                  initial="inactive"
                >
                  <TabPanel value={activeTab} index={3}>
                    <Tab4 />
                  </TabPanel>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Grid>
        </Grid>
      </WrappedContainer>
    </motion.div>
  );
};

export default PlaceForm;
