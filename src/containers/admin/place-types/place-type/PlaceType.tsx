import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AdminLayout from "../../layout/AdminLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form-mui";
import useLanguages from "@/hooks/useLanguages";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/button/Button";
import { IPlaceTypeFormContext } from "@/containers/admin/place-types/place-type/interfaces";
import placeTypesService from "@/services/place-types-service/place-types.service";
import PlaceTypeHeader from "@/containers/admin/place-types/place-type/PlaceTypeHeader";
import BasicInfoTab from "@/containers/admin/place-types/place-type/tabs/BasicInfoTab";

const PlaceType = () => {
  const [tabValue, setTabValue] = useState(0);
  const [noItem, setNoItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const languages = useLanguages();
  const { query } = useRouter();
  const id = query.id as string;

  const formContext = useForm<IPlaceTypeFormContext>({
    defaultValues: {
      titleTranslations: languages.map((lang) => ({
        langId: lang.id,
        text: "",
      })),
      commercial: false,
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
    placeTypesService
      .getOneAdmin(id)
      .then(({ data }) => {
        setNoItem(false);
        formContext.reset({
          titleTranslations: data.titleTranslations.map((translation) => ({
            langId: translation.language,
            text: translation.text,
          })),
          commercial: data.commercial,
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
   * Show Message if the requested item is not exists
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
          Данный тип не найден!
        </Typography>
        <Button
          sx={{ mt: "2em" }}
          variant="outlined"
          linkTo={"/administration/place-types"}
          color="inherit"
        >
          Список типов
        </Button>
      </Stack>
    );
  }

  return (
    <AdminLayout>
      <FormProvider {...formContext}>
        <Stack>
          <PlaceTypeHeader />
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

export default PlaceType;
