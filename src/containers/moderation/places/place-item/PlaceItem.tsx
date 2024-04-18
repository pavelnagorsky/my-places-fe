import {
  Box,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";

interface IPlaceItemProps {
  place: IModerationPlace;
}

const PlaceItem = ({ place }: IPlaceItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation(["moderation", "common"]);
  const dateFnsLocale = useDateFnsLocale();
  const router = useRouter();

  const onClick = () => {
    router.push(routerLinks.placeModeration(place.id));
  };

  const placeTitleBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{place.title}</Typography>
      <Typography
        variant={"body1"}
        color={"secondary.main"}
        sx={{ textDecoration: "underline #565656", wordBreak: "break-word" }}
      >
        {place.slug}
      </Typography>
    </Stack>
  );

  const placeTypeBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"} sx={{ wordBreak: "break-word" }}>
        {place.type}
      </Typography>
    </Stack>
  );

  const advertisementBox = (
    <Box>
      <Typography variant={"body1"}>
        {place.advertisement
          ? t("buttons.yes", { ns: "common" })
          : t("buttons.no", { ns: "common" })}
      </Typography>
    </Box>
  );

  const createdAtInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(place.createdAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const updatedAtInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(place.updatedAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const placeAuthorInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{place.authorName}</Typography>
      <Typography variant={"body2"} sx={{ wordBreak: "break-word" }}>
        {place.authorEmail}
      </Typography>
    </Stack>
  );

  const mobileView = (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        mb: "2em",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        p: "1.5em",
        borderRadius: "20px",
        "& label": {
          mb: "0.3em",
        },
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Stack direction={"row"}>
        <Grid container spacing={"1em"}>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.title")}</CustomLabel>
            {placeTitleBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.type")}</CustomLabel>
            {placeTypeBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.author")}</CustomLabel>
            {placeAuthorInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.commercial")}</CustomLabel>
            {advertisementBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.createdAt")}</CustomLabel>
            {createdAtInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.updatedAt")}</CustomLabel>
            {updatedAtInfoBox}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );

  const desktopView = (
    <Box
      onClick={onClick}
      py={"1em"}
      px={"0em"}
      sx={{
        cursor: "pointer",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
        paddingInlineStart: "1em",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Grid container spacing={"1em"} alignItems={"center"}>
        <Grid item xs={2.5}>
          {placeTitleBox}
        </Grid>
        <Grid item xs={1.5}>
          {placeTypeBox}
        </Grid>
        <Grid item xs={2.5}>
          {placeAuthorInfoBox}
        </Grid>
        <Grid item xs={1.5}>
          {advertisementBox}
        </Grid>
        <Grid item xs={2}>
          {createdAtInfoBox}
        </Grid>
        <Grid item xs={2}>
          {updatedAtInfoBox}
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default PlaceItem;
