import Grid from "@mui/material/Grid2";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import ExcursionInfoSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/ExcursionInfoSection";
import DeleteExcursionSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/DeleteExcursionSection";

interface IBasicInfoTabProps {
  excursion: IExcursion;
  fetchExcursion: () => void;
}

const BasicInfoTab = ({ excursion, fetchExcursion }: IBasicInfoTabProps) => {
  return (
    <Grid container spacing={"2em"}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={"2em"}>
          <Grid size={{ xs: 12 }}>
            <ExcursionInfoSection item={excursion} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            {/*<PlaceSlugSection onReloadPlace={fetchPlace} place={place} />*/}
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={"2em"}>
          <Grid size={{ xs: 12 }}>
            {/*<PlaceStatusSection fetchPlace={fetchPlace} place={place} />*/}
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DeleteExcursionSection id={excursion.id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicInfoTab;
