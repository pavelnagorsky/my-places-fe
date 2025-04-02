import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useExcursion from "@/containers/admin/excursions/excursion/useExcursion";
import ExcursionHeader from "@/containers/admin/excursions/excursion/ExcursionHeader";
import BasicInfoTab from "./tabs/basic-info/BasicInfoTab";

const Excursion = () => {
  const { excursion, id, fetchExcursion } = useExcursion();
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const query = router.query as { id: string; tab?: string };
  function handleTabChange(event: SyntheticEvent, value: number) {
    setTabValue(value);
  }

  useEffect(() => {
    if (query.tab && [0].includes(+query.tab)) {
      setTabValue(+query.tab);
    }
  }, [query]);

  const loader = !excursion ? (
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
      <ExcursionHeader id={id} title={excursion?.title} />
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
        </Tabs>
        <Box p={{ xs: "1em", sm: "1.5em" }}>
          <Box sx={{ display: tabValue !== 0 ? "none" : "block" }}>
            {excursion && (
              <BasicInfoTab
                excursion={excursion}
                fetchExcursion={fetchExcursion}
              />
            )}
          </Box>
        </Box>
      </Box>
      {loader}
    </AdminLayout>
  );
};

export default Excursion;
