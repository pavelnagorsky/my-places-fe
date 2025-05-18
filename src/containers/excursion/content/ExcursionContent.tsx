import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";
import PlaceGallery from "@/containers/place/content/gallery/PlaceGallery";
import ExcursionDescription from "@/containers/excursion/content/ExcursionDescription";
import ExcursionDetails from "@/containers/excursion/content/ExcursionDetails";
import dynamic from "next/dynamic";

const ExcursionMapSection = dynamic(
  () =>
    import("@/containers/excursion/content/map-section/ExcursionMapSection"),
  { ssr: false }
);
const ExcursionPlaces = dynamic(
  () =>
    import("@/containers/excursion/content/excursion-places/ExcursionPlaces"),
  { ssr: false }
);
const ExcursionStatistics = dynamic(
  () => import("@/containers/excursion/content/ExcursionStatistics"),
  { ssr: false }
);

const ExcursionContent = ({ excursion }: { excursion: IExcursion }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 4 }}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack gap={{ xs: 2, md: 4 }}>
          <Typography
            variant={"h1"}
            fontSize={{ xs: "27px", md: "35px" }}
            component={"h1"}
            mb={0}
          >
            {excursion.title}
          </Typography>
          <Stack>
            <PlaceGallery
              images={excursion.images.map((image, i) => ({
                src: image,
                alt: excursion.places[i]?.title || excursion.title,
              }))}
              mobileHeight={250}
              laptopHeight={380}
              desktopHeight={480}
            />
            <ExcursionStatistics
              views={excursion.viewsCount}
              createdAt={excursion.createdAt}
            />
          </Stack>
          <ExcursionDescription
            description={excursion.description}
            author={excursion.authorName}
          />
          <ExcursionPlaces items={excursion.places} />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <ExcursionDetails excursion={excursion} />
      </Grid>
      <Grid size={12}>
        <ExcursionMapSection excursion={excursion} />
      </Grid>
    </Grid>
  );
};

export default ExcursionContent;
