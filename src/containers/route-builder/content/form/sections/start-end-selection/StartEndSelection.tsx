import Grid from "@mui/material/Grid2";
import PlaceSelection from "@/containers/route-builder/content/form/sections/start-end-selection/PlaceSelection";
import { memo } from "react";

const StartEndSelection = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
        <PlaceSelection isRouteStart={true} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
        <PlaceSelection isRouteStart={false} />
      </Grid>
    </Grid>
  );
};

export default memo(StartEndSelection);
