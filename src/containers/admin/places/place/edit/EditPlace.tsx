import { AnimatePresence, motion, Variants } from "framer-motion";
import useCreatePlaceMeta from "@/containers/create-place/form/useCreatePlaceMeta";
import { SyntheticEvent, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import animationVariants from "@/shared/animation-variants";
import { FormContainer, FormProvider } from "react-hook-form-mui";
import UpdateTranslations from "@/containers/personal-area/edit-my-place/UpdateTranslations";
import ButtonWithTooltip from "@/components/UI/button/ButtonWithTooltip";
import Navigation from "@/containers/create-place/form/Navigation";
import TabPanel from "@/containers/create-place/form/tabs/TabPannel";
import Tab1 from "@/containers/create-place/form/tabs/Tab1";
import Tab2 from "@/containers/create-place/form/tabs/Tab2";
import Tab3 from "@/containers/create-place/form/tabs/Tab3";
import Tab4 from "@/containers/create-place/form/tabs/Tab4";
import useEditPlace from "@/containers/admin/places/place/edit/useEditPlace";
import AdminLayout from "@/containers/admin/layout/AdminLayout";

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

const EditPlace = () => {
  const logic = useEditPlace();
  const createPlaceMeta = useCreatePlaceMeta();

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const formState = logic.form.formState;
  const loading = logic.submitLoading;

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={logic.loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <AdminLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        style={{ padding: "1em" }}
        animate="show"
      >
        {loader}
        <FormProvider {...logic.form}>
          <FormContainer formContext={logic.form} onSuccess={logic.onSubmit}>
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
                          Назад
                        </Button>
                      </Box>
                      <Typography
                        variant={"h1"}
                        mb={0}
                        fontSize={{ xs: "24px", sm: "30px", md: "40px" }}
                      >
                        Редактирование места
                      </Typography>
                    </Stack>
                    <UpdateTranslations mt={"0.5em"} />
                  </Box>
                  <div>
                    <ButtonWithTooltip
                      loading={loading}
                      buttonText={"Обновить"}
                      tooltipText={"Не все обязательные поля формы заполнены!"}
                      variant={"contained"}
                      type={"submit"}
                      disabled={!formState.isValid || !formState.isDirty}
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
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Grid container spacing={"1em"} mb={"3em"}>
                <Grid item xs={12}>
                  <Navigation
                    alwaysHorizontal
                    activeTab={activeTab}
                    handleChange={handleChangeTab}
                  />
                </Grid>
                <Grid item xs={12}>
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
                        <Tab3 />
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
                </Grid>
              </Grid>
            </motion.div>
          </FormContainer>
        </FormProvider>
      </motion.div>
    </AdminLayout>
  );
};

export default EditPlace;
