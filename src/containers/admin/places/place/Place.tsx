import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import usePlace from "@/containers/admin/places/place/usePlace";
import PlaceHeader from "@/containers/admin/places/place/PlaceHeader";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import BasicInfoTab from "./tabs/basic-info/BasicInfoTab";
import PlaceReviewsTable from "@/containers/admin/places/place/tabs/reviews/table/PlaceReviewsTable";
import { useRouter } from "next/router";

const Place = () => {
  const { place, id, fetchPlace } = usePlace();
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const query = router.query as { id: string; tab?: string };
  function handleTabChange(event: SyntheticEvent, value: number) {
    setTabValue(value);
  }

  useEffect(() => {
    if (query.tab && [0, 1].includes(+query.tab)) {
      setTabValue(+query.tab);
    }
  }, [query]);

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
      <PlaceHeader id={id} title={place?.title} />
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
          <Box sx={{ display: tabValue !== 1 ? "none" : "block" }}>
            <PlaceReviewsTable />
          </Box>
        </Box>
      </Box>
      {loader}
    </AdminLayout>
  );
};

export default Place;
