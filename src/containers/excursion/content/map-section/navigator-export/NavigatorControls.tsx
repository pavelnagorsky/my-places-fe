import { Button, Stack } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useFormContext } from "react-hook-form-mui";
import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";

const NavigatorControls = () => {
  const { getValues } = useFormContext<IExcursionBuilderForm>();
  const { t } = useTranslation("route-management");
  const places = useAppSelector(selectItems);

  const prepareData = () => {
    const travelMode = getValues("travelMode");
    const waypoints = places.map((place) => place.coordinates);

    // Extract start and end waypoints
    const startLatLng = waypoints[0];
    const endLatLng = waypoints[waypoints.length - 1];

    // Slice waypoints array to exclude the first and last elements
    const slicedWaypoints = waypoints.slice(1, waypoints.length - 1);

    return { waypoints: slicedWaypoints, startLatLng, endLatLng, travelMode };
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
      gap={"1em"}
      display={places.length > 1 ? "flex" : "none"}
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
