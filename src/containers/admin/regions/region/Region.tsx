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
import { IRegionFormContext } from "@/containers/admin/regions/region/interfaces";
import regionsService from "@/services/regions-service/regions.service";
import RegionHeader from "./RegionHeader";
import BasicInfoTab from "@/containers/admin/regions/region/tabs/BasicInfoTab";

const Region = () => {
  const [tabValue, setTabValue] = useState(0);
  const [noItem, setNoItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const languages = useLanguages();
  const { query } = useRouter();
  const id = query.id as string;

  const formContext = useForm<IRegionFormContext>({
    defaultValues: {
      titleTranslations: languages.map((lang) => ({
        langId: lang.id,
        text: "",
      })),
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
    regionsService
      .getOneAdmin(id)
      .then(({ data }) => {
        setNoItem(false);
        formContext.reset({
          titleTranslations: data.titleTranslations.map((translation) => ({
            langId: translation.language,
            text: translation.text,
          })),
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
          Данная область не найдена!
        </Typography>
        <Button
          sx={{ mt: "2em" }}
          variant="outlined"
          linkTo={"/administration/regions"}
          color="inherit"
        >
          Список областей
        </Button>
      </Stack>
    );
  }

  return (
    <AdminLayout>
      <FormProvider {...formContext}>
        <Stack>
          <RegionHeader />
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

export default Region;
