import Grid from "@mui/material/Grid2";
import PlaceSelection from "@/containers/route-builder/content/form/sections/start-end-selection/PlaceSelection";
import { memo } from "react";

const StartEndSelection = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <PlaceSelection isRouteStart={true} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <PlaceSelection isRouteStart={false} />
      </Grid>
    </Grid>
  );
};

export default memo(StartEndSelection);
