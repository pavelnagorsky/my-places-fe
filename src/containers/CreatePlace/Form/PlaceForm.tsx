import { useFormContext } from "react-hook-form-mui";
import { Fragment, SyntheticEvent, useState } from "react";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";
import TabPanel from "@/containers/CreatePlace/Form/Tabs/TabPannel";
import dynamic from "next/dynamic";
import Tab1 from "@/containers/CreatePlace/Form/Tabs/Tab1";
import Tab3 from "@/containers/CreatePlace/Form/Tabs/Tab3";
import Tab2 from "@/containers/CreatePlace/Form/Tabs/Tab2";
import useCreatePlaceMeta from "@/containers/CreatePlace/Form/useCreatePlaceMeta";
import Tab4 from "@/containers/CreatePlace/Form/Tabs/Tab4";
import ButtonWithTooltip from "@/components/UI/Button/ButtonWithTooltip";
import utils from "@/shared/utils";

const Navigation = dynamic(
  () => import("@/containers/CreatePlace/Form/Navigation"),
  { ssr: false }
);

interface IPlaceFormProps {
  loading: boolean;
}

const PlaceForm = ({ loading }: IPlaceFormProps) => {
  const { formState, watch } = useFormContext<IPlaceFormContext>();
  const createPlaceMeta = useCreatePlaceMeta();
  const watchTitle = watch("title");

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Fragment>
      <WrappedContainer>
        <Breadcrumbs />
        <Box pt="1.5em" pb={{ xs: "1.5em", md: "2em" }}>
          <Stack
            direction={{ md: "row" }}
            gap={{ xs: "1.5em", md: "1em" }}
            justifyContent={"space-between"}
          >
            <Box overflow={"hidden"}>
              <Typography
                component={"h1"}
                fontSize={{ xs: "25px", md: "32px" }}
                mb={"0.5em"}
              >
                Создание места:{" "}
                <Box
                  display={"inline"}
                  fontWeight={200}
                  color={"secondary.main"}
                >
                  {watchTitle || "Моё место"}
                </Box>
              </Typography>
              <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                Создание нового места - это возможность рассказать о посещённом
                объекте. Здесь вы можете добавить описание, прикрепить
                фотографии, а также указать тип, локацию и адрес.
              </Typography>
            </Box>
            <div>
              <ButtonWithTooltip
                loading={loading}
                buttonText={"Создать"}
                tooltipText={"Не все обязательные поля формы заполнены!"}
                variant={"contained"}
                type={"submit"}
                disabled={
                  !formState.isValid ||
                  utils.isEmptyObject(formState.dirtyFields)
                }
                sx={{
                  color: "white",
                  py: "1em",
                  px: 0,
                  width: { xs: "230px", md: "210px" },
                }}
              />
            </div>
          </Stack>
        </Box>
        <Grid container spacing={"1em"} mb={"3em"}>
          <Grid item xs={12} md={3} lg={2}>
            <Navigation activeTab={activeTab} handleChange={handleChangeTab} />
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <TabPanel value={activeTab} index={0}>
              <Tab1 />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Tab2
                categories={createPlaceMeta.categories}
                placeTypes={createPlaceMeta.placeTypes}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <Tab3 />
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
              <Tab4 />
            </TabPanel>
          </Grid>
        </Grid>
      </WrappedContainer>
    </Fragment>
  );
};

export default PlaceForm;
