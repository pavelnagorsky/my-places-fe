import { Button, Stack } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

const NavigatorControls = () => {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();
  const { t } = useTranslation("route-management");
  const places = useAppSelector(selectItems);
  const sendAnalytics = useAnalytics();

  const prepareData = () => {
    const travelMode = getValues("travelMode");
    const waypoints = places.map((place) => place.coordinates);
    const coordinatesStartString = getValues("searchFrom.coordinates");
    const startLatLng = coordinatesStartString
      ? utils.stringToLatLng(coordinatesStartString)
      : null;
    const coordinatesEndString = getValues("searchTo.coordinates");
    const selectedEndLatLng = coordinatesEndString
      ? utils.stringToLatLng(coordinatesEndString)
      : null;
    const adjustedWaypoints = !!selectedEndLatLng
      ? waypoints
      : waypoints.slice(0, -1);
    const endLatLng = selectedEndLatLng || waypoints[waypoints.length - 1];

    return { waypoints: adjustedWaypoints, startLatLng, endLatLng, travelMode };
  };

  const onOpenGoogleNavigator = () => {
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng) return;
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "route: open Google Navigator",
    });
    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${
      startLatLng.lat
    },${startLatLng.lng}&destination=${endLatLng.lat},${
      endLatLng.lng
    }&waypoints=${waypointsString}&travelmode=${travelMode.toLowerCase()}`;

    window.open(url, "_blank");
  };

  const onOpenYandexNavigator = () => {
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng) return;
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "route: open Yandex Navigator",
    });
    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("~");

    const url = `https://yandex.ru/maps/?rtext=${startLatLng.lat},${
      startLatLng.lng
    }${waypoints.length > 0 ? "~" : ""}${waypointsString}~${endLatLng.lat},${
      endLatLng.lng
    }&rtt=${travelMode === TravelModesEnum.DRIVING ? "auto" : "pd"}`;

    window.open(url, "_blank");
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={"1em"}
      display={isValid && places.length > 0 ? "flex" : "none"}
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
