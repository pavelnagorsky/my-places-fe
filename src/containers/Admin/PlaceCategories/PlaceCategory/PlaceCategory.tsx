import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AdminLayout from "../../Layout/AdminLayout";
import PlaceCategoryHeader from "@/containers/Admin/PlaceCategories/PlaceCategory/PlaceCategoryHeader";
import { SyntheticEvent, useEffect, useState } from "react";
import BasicInfoTab from "@/containers/Admin/PlaceCategories/PlaceCategory/tabs/BasicInfoTab";
import { FormProvider, useForm } from "react-hook-form-mui";
import { IPlaceCategoryFormContext } from "@/containers/Admin/PlaceCategories/PlaceCategory/interfaces";
import useLanguages from "@/hooks/useLanguages";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button/Button";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

const PlaceCategory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [noItem, setNoItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const languages = useLanguages();
  const { query } = useRouter();
  const id = query.id as string;

  const formContext = useForm<IPlaceCategoryFormContext>({
    defaultValues: {
      titleTranslations: languages.map((lang) => ({
        langId: lang.id,
        text: "",
      })),
      image: null,
      image2: null,
    },
    mode: "onChange",
  });

  function handleTabChange(event: SyntheticEvent, value: number) {
    setTabValue(value);
  }
  useEffect(() => {
    if (!id || id === "new") {
      setLoading(false);
      return;
    }
    placeCategoriesService
      .getOneAdmin(id)
      .then(({ data }) => {
        setNoItem(false);
        formContext.reset({
          titleTranslations: data.titleTranslations.map((translation) => ({
            langId: translation.language,
            text: translation.text,
          })),
          image: data.image,
          image2: data.image2,
        });
        setLoading(false);
      })
      .catch(() => {
        setNoItem(true);
        setLoading(false);
      });
  }, [id]);

  /**
   * Wait while item data is loading and form is setted
   */
  if (loading) {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.5em"}
        height={"50vh"}
      >
        <CircularProgress size={30} />
        <Typography fontSize={"18px"} color={"secondary.main"} fontWeight={600}>
          Загрузка...
        </Typography>
      </Stack>
    );
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noItem) {
    return (
      <Stack
        component={motion.div}
        flexGrow={1}
        alignItems={"center"}
        height={"50vh"}
        justifyContent={"center"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
      >
        <Typography color="text.secondary" variant="h5">
          Данная категория не найдена!
        </Typography>
        <Button
          sx={{ mt: "2em" }}
          variant="outlined"
          linkTo={"/administration/place-categories"}
          color="inherit"
        >
          Список категорий
        </Button>
      </Stack>
    );
  }

  return (
    <AdminLayout>
      <FormProvider {...formContext}>
        <Stack>
          <PlaceCategoryHeader />
          <Box>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                width: "100%",
                height: "64px",
              }}
            >
              <Tab sx={{ height: "64px" }} label="Основная информация" />
            </Tabs>
            <Box p={{ xs: "1em", sm: "1.5em" }}>
              <Box sx={{ display: tabValue !== 0 ? "none" : "block" }}>
                <BasicInfoTab />
              </Box>
            </Box>
          </Box>
        </Stack>
      </FormProvider>
    </AdminLayout>
  );
};

export default PlaceCategory;
