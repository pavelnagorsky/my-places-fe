import { Button, Stack } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";

const NavigatorControls = ({ excursion }: { excursion: IExcursion }) => {
  const { t } = useTranslation("route-management");

  const prepareData = () => {
    const waypoints = excursion.places.map((place) => place.coordinates);

    // Extract start and end waypoints
    const startLatLng = waypoints[0];
    const endLatLng = waypoints[waypoints.length - 1];

    // Slice waypoints array to exclude the first and last elements
    const slicedWaypoints = waypoints.slice(1, waypoints.length - 1);

    return {
      waypoints: slicedWaypoints,
      startLatLng,
      endLatLng,
      travelMode: excursion.travelMode,
    };
  };

  const onOpenGoogleNavigator = () => {
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${
      startLatLng.lat
    },${startLatLng.lng}&destination=${endLatLng.lat},${endLatLng.lng}${
      waypoints.length > 0 ? `&waypoints=${waypointsString}` : ""
    }&travelmode=${travelMode.toLowerCase()}`;

    window.open(url, "_blank");
  };

  const onOpenYandexNavigator = () => {
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("~");

    const url = `https://yandex.ru/maps/?rtext=${startLatLng.lat},${
      startLatLng.lng
    }${waypoints.length > 0 ? `~${waypointsString}` : ""}~${endLatLng.lat},${
      endLatLng.lng
    }&rtt=${travelMode === TravelModesEnum.DRIVING ? "auto" : "pd"}`;

    window.open(url, "_blank");
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      className={"NavigationRoot"}
      gap={"1em"}
      display={excursion.places.length > 1 ? "flex" : "none"}
    >
      <Button
        onClick={onOpenGoogleNavigator}
        startIcon={<NearMeIcon color={"primary"} />}
        variant={"outlined"}
        color={"secondary"}
      >
        {t("navigator.google")}
      </Button>
      <Button
        onClick={onOpenYandexNavigator}
        startIcon={<NearMeIcon color={"primary"} />}
        variant={"outlined"}
        color={"secondary"}
      >
        {t("navigator.yandex")}
      </Button>
    </Stack>
  );
};

export default NavigatorControls;
