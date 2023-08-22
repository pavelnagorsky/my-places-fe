import { useFormContext } from "react-hook-form-mui";
import { Fragment, SyntheticEvent, useState } from "react";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { Box, Grid, Typography } from "@mui/material";
import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";
import TabPanel from "@/containers/CreatePlace/Form/Tabs/TabPannel";
import dynamic from "next/dynamic";
import Tab1 from "@/containers/CreatePlace/Form/Tabs/Tab1";
import Tab3 from "@/containers/CreatePlace/Form/Tabs/Tab3";
import Tab2 from "@/containers/CreatePlace/Form/Tabs/Tab2";
import useCreatePlaceMeta from "@/containers/CreatePlace/Form/useCreatePlaceMeta";

const Navigation = dynamic(
  () => import("@/containers/CreatePlace/Form/Navigation"),
  { ssr: false }
);

const PlaceForm = () => {
  const { formState } = useFormContext<IPlaceFormContext>();
  const createPlaceMeta = useCreatePlaceMeta();

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Fragment>
      <WrappedContainer>
        <Breadcrumbs />
        <Box pt="1.5em" pb={{ xs: "1.5em", md: "2em" }}>
          <Typography
            component={"h1"}
            fontSize={{ xs: "25px", md: "32px" }}
            mb={"0.5em"}
          >
            Создание места:{" "}
            <Box display={"inline"} fontWeight={200} color={"secondary.main"}>
              Моё место
            </Box>
          </Typography>
          <Typography variant={"body2"} fontSize={{ md: "20px" }}>
            Создание нового места - это возможность рассказать о посещённом
            объекте. Здесь вы можете добавить описание, прикрепить фотографии, а
            также указать тип, локацию и адрес.
          </Typography>
        </Box>
        <Grid container spacing={"1em"} mb={"3em"}>
          <Grid item xs={12} md={2}>
            <Navigation activeTab={activeTab} handleChange={handleChangeTab} />
          </Grid>
          <Grid item xs={12} md={10}>
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
          </Grid>
        </Grid>
      </WrappedContainer>
    </Fragment>
  );
};

export default PlaceForm;
