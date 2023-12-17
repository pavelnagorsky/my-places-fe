import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { FormProvider } from "react-hook-form-mui";
import InfiniteScroll from "react-infinite-scroll-component";
import useMyPlaces from "@/containers/PersonalArea/MyPlaces/useMyPlaces";
import PersonalAreaLayout from "@/containers/PersonalArea/Layout/PersonalAreaLayout";
import { BoxPlaceholder } from "@/components/UI/Placeholders/BoxPlaceholder";
import PlaceItem from "@/containers/PersonalArea/MyPlaces/PlaceItem/PlaceItem";
import PlaceItemsTableHead from "@/containers/PersonalArea/MyPlaces/PlaceItem/PlaceItemsTableHead";
import Filters from "./Filters/Filters";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/UI/Button/Button";
import { routerLinks } from "@/staticData/routerLinks";

const MyPlacesPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logic = useMyPlaces();

  return (
    <PersonalAreaLayout>
      <Box mb={"1em"}>
        <Stack
          mb={"30px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography mb={0} variant={"h1"}>
            Мои места
          </Typography>
          {isMobile ? (
            <IconButton
              href={routerLinks.createPlace}
              size={"small"}
              color={"primary"}
              sx={{ border: `1px solid ${theme.palette.primary.main}` }}
            >
              <AddIcon color={"primary"} />
            </IconButton>
          ) : (
            <Button linkTo={routerLinks.createPlace} sx={{ color: "primary" }}>
              Новое место
            </Button>
          )}
        </Stack>
        <FormProvider {...logic.formContext}>
          <Filters onSubmit={logic.onSubmit} />
        </FormProvider>
        <Box my={{ xs: "1.5em", md: "2.5em" }}>
          {logic.noPlaces && (
            <Typography
              variant={"body1"}
              fontWeight={700}
              fontSize={{ xs: "16px", md: "20px" }}
            >
              Пользовательские места не найдены
            </Typography>
          )}
          <PlaceItemsTableHead
            orderBy={logic.orderBy}
            orderDirection={logic.orderDirection}
            show={!logic.noPlaces}
            onChangeOrderBy={logic.setOrderBy}
            onChangeOrderDirection={logic.toggleOrderDirection}
          />
          <InfiniteScroll
            style={{
              padding: "1em 0.5em 0.5em 0.5em",
              overflowX: "hidden",
            }}
            dataLength={logic.places.length}
            next={() => logic.onSubmit(false)}
            hasMore={logic.hasMore}
            loader={<BoxPlaceholder sx={{ mt: "2em" }} />}
          >
            {logic.places.map((place, index) => (
              <PlaceItem key={place.id} place={place} />
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </PersonalAreaLayout>
  );
};

export default MyPlacesPage;
