import Grid from "@mui/material/Grid2";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import PlaceInfoSection from "@/containers/admin/places/place/tabs/basic-info/sections/PlaceInfoSection";
import DeletePlaceSection from "@/containers/admin/places/place/tabs/basic-info/sections/DeletePlaceSection";
import PlaceStatusSection from "@/containers/admin/places/place/tabs/basic-info/sections/PlaceStatusSection";
import PlaceSlugSection from "@/containers/admin/places/place/tabs/basic-info/sections/PlaceSlugSection";

interface IBasicInfoTabProps {
  place: IMyPlace;
  fetchPlace: () => void;
}

const BasicInfoTab = ({ place, fetchPlace }: IBasicInfoTabProps) => {
  return (
    <Grid container spacing={"2em"}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={"2em"}>
          <Grid size={{ xs: 12 }}>
            <PlaceInfoSection place={place} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <PlaceSlugSection onReloadPlace={fetchPlace} place={place} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={"2em"}>
          <Grid size={{ xs: 12 }}>
            <PlaceStatusSection fetchPlace={fetchPlace} place={place} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DeletePlaceSection
              id={place.id}
              hasReviews={place.reviewsCount > 0}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BasicInfoTab;
