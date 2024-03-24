import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import usePlace from "@/containers/admin/places/place/usePlace";
import PlaceHeader from "@/containers/admin/places/place/PlaceHeader";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { SyntheticEvent, useState } from "react";
import BasicInfoTab from "./tabs/basic-info/BasicInfoTab";

const Place = () => {
  const { place, id, fetchPlace } = usePlace();
  const [tabValue, setTabValue] = useState(0);
  function handleTabChange(event: SyntheticEvent, value: number) {
    setTabValue(value);
  }

  const loader = !place ? (
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
  ) : null;

  return (
    <AdminLayout>
      <PlaceHeader title={place?.title} />
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
          <Tab sx={{ height: "64px" }} label="Информация" />
          <Tab sx={{ height: "64px" }} label="Заметки" />
        </Tabs>
        <Box p={{ xs: "1em", sm: "1.5em" }}>
          <Box sx={{ display: tabValue !== 0 ? "none" : "block" }}>
            {place && <BasicInfoTab place={place} fetchPlace={fetchPlace} />}
          </Box>
        </Box>
      </Box>
      {loader}
    </AdminLayout>
  );
};

export default Place;
