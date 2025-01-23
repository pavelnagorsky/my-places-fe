import { Button, Stack } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import utils from "@/shared/utils";
import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";

const NavigatorControls = () => {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();
  const places = useAppSelector(selectItems);

  const prepareData = () => {
    const waypoints = places.map((place) => place.coordinates);
    const coordinatesStartString = getValues("searchFrom.coordinates");
    const startLatLng = coordinatesStartString
      ? utils.stringToLatLng(coordinatesStartString)
      : null;
    const coordinatesEndString = getValues("searchTo.coordinates");
    const endLatLng = coordinatesEndString
      ? utils.stringToLatLng(coordinatesEndString)
      : null;

    return { waypoints, startLatLng, endLatLng };
  };

  const onOpenGoogleNavigator = () => {
    const { waypoints, startLatLng, endLatLng } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatLng.lat},${startLatLng.lng}&destination=${endLatLng.lat},${endLatLng.lng}&waypoints=${waypointsString}&travelmode=driving`;

    window.open(url, "_blank");
  };

  const onOpenYandexNavigator = () => {
    const { waypoints, startLatLng, endLatLng } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("~");

    const url = `https://yandex.ru/maps/?rtext=${startLatLng.lat},${startLatLng.lng}~${waypointsString}~${endLatLng.lat},${endLatLng.lng}&rtt=auto`;

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
        Google навигатор
      </Button>
      <Button
        onClick={onOpenYandexNavigator}
        startIcon={<NearMeIcon color={"primary"} />}
        variant={"outlined"}
        color={"secondary"}
      >
        Yandex навигатор
      </Button>
    </Stack>
  );
};

export default NavigatorControls;
