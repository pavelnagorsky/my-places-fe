import Grid from "@mui/material/Grid2";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import ExcursionInfoSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/ExcursionInfoSection";
import DeleteExcursionSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/DeleteExcursionSection";
import ExcursionSlugSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/ExcursionSlugSection";
import ExcursionStatusSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/ExcursionStatusSection";
import PrimaryPlaceSection from "@/containers/admin/excursions/excursion/tabs/basic-info/sections/PrimaryPlaceSection";

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
            <ExcursionSlugSection
              excursion={excursion}
              onReloadExcursion={fetchExcursion}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={"2em"}>
          <Grid size={{ xs: 12 }}>
            <ExcursionStatusSection
              excursion={excursion}
              onReloadExcursion={fetchExcursion}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <PrimaryPlaceSection excursion={excursion} />
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
